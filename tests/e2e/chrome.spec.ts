import { expect, test } from "@playwright/test";
import { contacts } from "../../lib/site";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("title bar holds only the window dots and the file path", async ({ page }) => {
  const titleBar = page.getByRole("banner");

  await expect(titleBar).toContainText("~/roland");
  await expect(titleBar).toContainText("about.tsx");

  // §10 — no contact links, no search, no nav up here
  await expect(titleBar.locator("a")).toHaveCount(0);
  await expect(titleBar.locator("button")).toHaveCount(0);

  const dots = titleBar.locator("i");
  await expect(dots).toHaveCount(3);
  await expect(titleBar.locator("[aria-hidden='true']").first()).toBeAttached();
});

test("status bar shows the branch, encoding and byline", async ({ page }) => {
  const statusBar = page.getByRole("contentinfo");

  await expect(statusBar).toContainText("Oslo, Norway");
  await expect(statusBar).toContainText("main");
  await expect(statusBar).toContainText("UTF-8");
  await expect(statusBar).toContainText("Roland Sauter · 2026");
});

test("contact links appear once each, in the sidebar only", async ({ page }) => {
  for (const contact of contacts) {
    const links = page.locator(`a[href="${contact.href}"]`);
    await expect(links).toHaveCount(1);

    // and that one occurrence is inside the sidebar
    await expect(page.locator("aside").locator(`a[href="${contact.href}"]`)).toHaveCount(1);
  }
});
