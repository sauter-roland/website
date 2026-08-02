import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

/**
 * §10 — "No global keydown listener and no modal/overlay anywhere in the app."
 * The design deliberately has no command palette and no keyboard-shortcut navigation.
 */

test("there is no dialog, overlay or search affordance", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("[role='dialog']")).toHaveCount(0);
  await expect(page.locator("dialog")).toHaveCount(0);
  await expect(page.locator("[role='search']")).toHaveCount(0);
  await expect(page.locator("input")).toHaveCount(0);
});

/**
 * Checked in the source rather than at runtime: React 19 always attaches its own delegated
 * key listeners to the root container, so instrumenting `addEventListener` in the browser
 * cannot tell framework plumbing apart from an app-level shortcut handler.
 */
test("no source file registers a key handler", async () => {
  const roots = ["app", "lib"].map((dir) => path.join(process.cwd(), dir));
  const offenders: string[] = [];

  const walk = async (dir: string) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (/\.tsx?$/.test(entry.name)) {
        const source = await readFile(full, "utf8");
        if (/onKey(Down|Up|Press)|addEventListener\(\s*["'`]key/.test(source)) {
          offenders.push(path.relative(process.cwd(), full));
        }
      }
    }
  };

  for (const root of roots) await walk(root);
  expect(offenders).toEqual([]);
});

test("shortcut-ish keypresses open nothing and do not move focus", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Sections" })).toBeVisible();

  for (const key of ["/", "k", "Escape", "Control+k", "Meta+k"]) {
    await page.keyboard.press(key);
  }

  await expect(page.locator("[role='dialog']")).toHaveCount(0);
  await expect(page.locator("dialog")).toHaveCount(0);
  expect(await page.evaluate(() => document.activeElement?.tagName)).toBe("BODY");
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});
