import { expect, test } from "@playwright/test";
import { contacts } from "../../lib/site";

/**
 * In-content links. The first four are the ones the redesign had to carry over verbatim
 * (spec §8); the last two are the publications added with the CV content.
 */
const contentLinks = [
  "https://kongsbergdigital.com/customer-stories/shell-ormen-lange",
  "https://github.com/MolecularBioinformatics/GEMCAT",
  "https://hdl.handle.net/11250/3221977",
  "https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/",
  "https://academic.oup.com/nargab/article/7/1/lqaf003/7993917",
  "https://www.mdpi.com/2218-273X/14/5/602",
];

const allExternal = [...contentLinks, ...contacts.map((c) => c.href)];

test("every content link is present exactly once", async ({ page }) => {
  await page.goto("/");
  for (const href of contentLinks) {
    await expect(page.locator(`a[href="${href}"]`)).toHaveCount(1);
  }
});

test("links opening in a new tab are safe and say so", async ({ page }) => {
  await page.goto("/");

  for (const link of await page.locator('a[target="_blank"]').all()) {
    const rel = (await link.getAttribute("rel")) ?? "";
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
    // §7.9 — the accessible name has to mention the new tab
    expect(await link.innerText()).toMatch(/opens in a new tab/i);
  }
});

test("the thesis title is not wrapped in a stray quote", async ({ page }) => {
  await page.goto("/");
  const title = page.locator("#science em").first();
  await expect(title).toHaveText(/^Metabolites at Genome-Scale/);
  await expect(title).not.toHaveText(/"/);
});

// Hits the network, so it can be skipped offline: `npx playwright test --grep-invert @network`
test("every external link resolves @network", async ({ request }) => {
  const failures: string[] = [];

  for (const href of allExternal) {
    try {
      const response = await request.get(href, {
        timeout: 20_000,
        maxRedirects: 5,
        headers: { "user-agent": "Mozilla/5.0 (link check)" },
      });
      // the host is up but refusing a non-browser client — the link itself is fine.
      // 999 is LinkedIn's anti-scraping status.
      if (response.status() >= 400 && ![403, 429, 999].includes(response.status())) {
        failures.push(`${href} → ${response.status()}`);
      }
    } catch (error) {
      failures.push(`${href} → ${(error as Error).message}`);
    }
  }

  expect(failures).toEqual([]);
});
