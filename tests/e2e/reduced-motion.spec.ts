import { expect, test, type Page } from "@playwright/test";

// `test.use({ reducedMotion })` at describe level is not applied by this Playwright version,
// so the preference is emulated explicitly on the page.
const withMotionPreference = async (
  page: Page,
  reducedMotion: "reduce" | "no-preference",
) => {
  await page.emulateMedia({ reducedMotion });
  await page.goto("/");
  expect(
    await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
  ).toBe(reducedMotion === "reduce");
};

const cursorAnimation = (page: Page) =>
  page.locator(".cursor").evaluate((el) => getComputedStyle(el).animationName);

test("the cursor blinks when no preference is set", async ({ page }) => {
  await withMotionPreference(page, "no-preference");
  expect(await cursorAnimation(page)).toBe("blink");
});

test("prefers-reduced-motion: reduce stops the cursor blink", async ({ page }) => {
  await withMotionPreference(page, "reduce");
  expect(await cursorAnimation(page)).toBe("none");
});

test("prefers-reduced-motion: reduce disables smooth scrolling", async ({ page }) => {
  await withMotionPreference(page, "reduce");
  const behavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(behavior).toBe("auto");
});
