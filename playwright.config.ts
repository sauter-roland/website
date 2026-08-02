import { defineConfig, devices } from "@playwright/test";

// Defaults to 3001 so the suite never fights `npm run dev` on 3000. Override with
// PLAYWRIGHT_PORT if that one is taken too.
const port = Number(process.env.PLAYWRIGHT_PORT ?? 3001);
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    // the production build, not `next dev` — the dev overlay injects a focusable
    // <nextjs-portal> that lands in the tab order and mutates the DOM on keypress
    command: `npm run build && npm run start -- -p ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
