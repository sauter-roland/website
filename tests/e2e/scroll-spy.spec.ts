import { expect, test } from "@playwright/test";
import { sections } from "../../lib/site";

/**
 * §10 — "Scrolling updates both the sidebar highlight and the active tab."
 * Both navigations read one shared IntersectionObserver, so they must never disagree.
 */
test("both navigations follow the scroll position", async ({ page }) => {
  await page.goto("/");

  const explorer = page.getByRole("navigation", { name: "File explorer" });
  const tabs = page.getByRole("navigation", { name: "Sections" });

  for (const section of sections) {
    // land where an anchor jump lands: section top, minus the scroll-margin that clears the
    // sticky chrome. Scrolling the section flush to y=0 instead would push the observer's
    // detection band past the end of the shorter sections.
    await page.locator(`#${section.id}`).evaluate((el) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const scrollMargin = parseFloat(getComputedStyle(el).scrollMarginTop);
      window.scrollTo({ top: top - scrollMargin, behavior: "instant" });
    });

    await expect(explorer.locator("a[aria-current='true']")).toHaveText(
      new RegExp(section.file.replace(".", "\\.")),
    );
    await expect(tabs.locator("a[aria-current='true']")).toHaveText(section.file);

    // exactly one highlight in each nav — never zero, never two
    await expect(explorer.locator("a[aria-current='true']")).toHaveCount(1);
    await expect(tabs.locator("a[aria-current='true']")).toHaveCount(1);
  }
});

test("the first section is highlighted before any scrolling happens", async ({ page }) => {
  await page.goto("/");

  const first = sections[0];
  await expect(
    page.getByRole("navigation", { name: "Sections" }).locator("a[aria-current='true']"),
  ).toHaveText(first.file);
});
