import { expect, test } from "@playwright/test";
import { sections } from "../../lib/site";

test("above 900px the sidebar and gutter are visible", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.locator("aside")).toBeVisible();
  await expect(page.locator("section .content").first()).toBeVisible();
  await expect(
    page.locator("section > div[aria-hidden='true']").first(),
  ).toBeVisible();
});

test("below 900px the sidebar and gutter are hidden but the tabs stay", async ({ page }) => {
  await page.setViewportSize({ width: 880, height: 900 });
  await page.goto("/");

  await expect(page.locator("aside")).toBeHidden();
  await expect(page.locator("section > div[aria-hidden='true']").first()).toBeHidden();

  // the tab bar is the only navigation left, so it must never be hidden
  await expect(page.getByRole("navigation", { name: "Sections" })).toBeVisible();
});

test("the tab bar scrolls horizontally at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");

  const tabs = page.getByRole("navigation", { name: "Sections" });
  await expect(tabs).toBeVisible();

  const { scrollWidth, clientWidth } = await tabs.evaluate((el) => ({
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
  }));
  expect(scrollWidth).toBeGreaterThan(clientWidth);

  // the last tab must be reachable by scrolling, not clipped away
  const last = tabs.locator(`a[href="#${sections[sections.length - 1].id}"]`);
  await last.scrollIntoViewIfNeeded();
  await expect(last).toBeInViewport();
});

test("the page never scrolls horizontally at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");

  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflows).toBe(false);
});
