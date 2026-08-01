import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("both navigations are labelled and distinguishable", async ({ page }) => {
  await expect(page.getByRole("navigation", { name: "File explorer" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Sections" })).toBeVisible();

  // two navs pointing at the same anchors is only acceptable because both are named
  const names = await page
    .locator("nav")
    .evaluateAll((navs) => navs.map((n) => n.getAttribute("aria-label")));
  expect(names.every(Boolean)).toBe(true);
  expect(new Set(names).size).toBe(names.length);
});

test("there is one main landmark and one h1", async ({ page }) => {
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("heading levels never skip", async ({ page }) => {
  const levels = await page
    .locator("h1, h2, h3, h4, h5, h6")
    .evaluateAll((els) => els.map((el) => Number(el.tagName[1])));

  expect(levels[0]).toBe(1);
  for (let i = 1; i < levels.length; i++) {
    expect(
      levels[i] - levels[i - 1],
      `heading ${i} jumps from h${levels[i - 1]} to h${levels[i]}`,
    ).toBeLessThanOrEqual(1);
  }
});

test("decoration is hidden from assistive tech", async ({ page }) => {
  // line-number gutters
  const gutters = page.locator("section > div[aria-hidden='true']");
  await expect(gutters).toHaveCount(5);

  // window dots, file-type glyphs, blinking cursor, live dot
  for (const selector of [
    "header > div[aria-hidden='true']",
    "nav[aria-label='File explorer'] a span[aria-hidden='true']",
    ".cursor",
    "footer span[aria-hidden='true']",
  ]) {
    const nodes = page.locator(selector);
    expect(await nodes.count()).toBeGreaterThan(0);
    for (const node of await nodes.all()) {
      await expect(node).toHaveAttribute("aria-hidden", "true");
    }
  }
});

test("no line numbers or icon glyphs reach the accessibility tree", async ({ page }) => {
  const text = await page.locator("main").innerText();
  expect(text).toContain("Roland Sauter");

  // the decorative glyphs used for file icons and bullets
  for (const glyph of ["◆", "▪", "◼", "▤", "↗"]) {
    const exposed = await page.evaluate((g) => {
      const walk = (node: Element): boolean => {
        if (node.getAttribute("aria-hidden") === "true") return false;
        for (const child of Array.from(node.children)) if (walk(child)) return true;
        return Array.from(node.childNodes).some(
          (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.includes(g),
        );
      };
      return walk(document.body);
    }, glyph);
    expect(exposed, `${glyph} is exposed to screen readers`).toBe(false);
  }
});

/**
 * The `ghost` colour is 2.45:1 on purpose (§2) — it paints the decorative line-number
 * gutters and nothing else. axe measures contrast on anything visually rendered, including
 * aria-hidden text, so those two decorations are excluded by selector rather than by
 * switching the rule off everywhere.
 */
const DECORATIVE_LINE_NUMBERS = [
  "section > div[aria-hidden='true']", // section gutters
  "#projects span[aria-hidden='true']", // diff-block line numbers
];

test("axe reports no WCAG 2.1 A/AA violations", async ({ page }) => {
  let builder = new AxeBuilder({ page }).withTags([
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
  ]);
  for (const selector of DECORATIVE_LINE_NUMBERS) builder = builder.exclude(selector);

  const results = await builder.analyze();

  expect(
    results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`),
  ).toEqual([]);
});

test("the ghost colour is confined to aria-hidden line numbers", async ({ page }) => {
  const misuse = await page.evaluate(() => {
    const ghost = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-ghost")
      .trim();
    const toRgb = (hex: string) =>
      `rgb(${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(", ")})`;
    const target = toRgb(ghost);

    return Array.from(document.querySelectorAll<HTMLElement>("*"))
      .filter((el) => getComputedStyle(el).color === target)
      .filter((el) => el.textContent?.trim())
      .filter((el) => !el.closest("[aria-hidden='true']"))
      .map((el) => el.tagName + ": " + el.textContent!.trim().slice(0, 30));
  });

  expect(misuse).toEqual([]);
});
