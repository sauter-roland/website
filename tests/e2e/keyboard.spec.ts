import { expect, test } from "@playwright/test";
import { contacts, sections } from "../../lib/site";

const focused = (page: import("@playwright/test").Page) =>
  page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el) return null;
    const style = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      href: el.getAttribute("href"),
      text: el.textContent?.trim() ?? "",
      outlineWidth: parseFloat(style.outlineWidth),
      outlineStyle: style.outlineStyle,
    };
  });

test("the skip link is the first stop and becomes visible on focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skip = page.locator("a.skip-link");
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveAttribute("href", "#about");
});

test("focus traverses skip link, sidebar, tabs, then content", async ({ page }) => {
  await page.goto("/");

  const expected = [
    "#about", // skip link
    ...sections.map((s) => `#${s.id}`), // sidebar file tree
    ...contacts.map((c) => c.href), // sidebar contact links
    ...sections.map((s) => `#${s.id}`), // tab bar
  ];

  for (const href of expected) {
    await page.keyboard.press("Tab");
    const current = await focused(page);
    expect(current?.href).toBe(href);
  }

  // the next stop is the first link inside the page content
  await page.keyboard.press("Tab");
  const inContent = await page.evaluate(
    () => !!document.activeElement?.closest("section .content"),
  );
  expect(inContent).toBe(true);
});

test("every interactive element shows a visible focus ring", async ({ page }) => {
  await page.goto("/");

  const focusableCount = await page.evaluate(
    () => document.querySelectorAll("a[href], button, input, select, textarea").length,
  );
  expect(focusableCount).toBeGreaterThan(10);

  // walk the whole focusable chain and assert the outline is actually drawn
  for (let i = 0; i < focusableCount; i++) {
    await page.keyboard.press("Tab");
    const current = await focused(page);
    expect(current, `lost focus after ${i} tabs`).not.toBeNull();
    expect(current!.tag, `tab order left the page after ${i} tabs`).not.toBe("body");
    expect(current!.outlineStyle, `no outline style on <${current!.tag}>`).not.toBe("none");
    expect(
      current!.outlineWidth,
      `zero-width outline on <${current!.tag}>`,
    ).toBeGreaterThan(0);
  }
});
