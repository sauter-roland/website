import { expect, test } from "@playwright/test";
import { sections } from "../../lib/site";

/**
 * The title bar and tab bar are both sticky, so ~78px of viewport is permanently occupied.
 * Without `scroll-margin-top` on every section an anchor jump parks the heading underneath
 * them — the failure the spec warns is easy to miss by eye.
 */
const STICKY_CHROME = 78;

for (const source of ["Sections", "File explorer"] as const) {
  test(`clicking a ${source} entry lands the heading below the sticky bars`, async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: source });

    for (const section of sections) {
      await nav.locator(`a[href="#${section.id}"]`).click();
      await page.waitForFunction(
        (id) => window.location.hash === `#${id}`,
        section.id,
      );
      // poll instead of a fixed sleep so this doesn't flake on slow CI runners
      const heading = page.locator(`#${section.id} h1, #${section.id} h2`).first();
      await expect
        .poll(async () => (await heading.boundingBox())?.y ?? -1, {
          message: `${section.id} heading is hidden behind the sticky chrome`,
        })
        .toBeGreaterThanOrEqual(STICKY_CHROME);
    }
  });
}

test("the two sticky bars together occupy the height scroll-margin-top accounts for", async ({
  page,
}) => {
  await page.goto("/");

  const titleBar = (await page.getByRole("banner").boundingBox())!;
  const tabBar = (await page
    .getByRole("navigation", { name: "Sections" })
    .boundingBox())!;

  const occupied = titleBar.height + tabBar.height;
  const scrollMargin = await page
    .locator("section")
    .first()
    .evaluate((el) => parseFloat(getComputedStyle(el).scrollMarginTop));

  expect(scrollMargin).toBeGreaterThan(occupied);
});
