import { defineConfig, devices } from "@playwright/test";

const DEFAULT_PORT = 3001;

/**
 * Defaults to 3001 so the suite never fights `npm run dev` on 3000. Override with
 * PLAYWRIGHT_PORT if that one is taken too.
 *
 * Validated rather than coerced: a bare `Number()` turns a typo into `NaN` and an empty
 * value into `0`, either of which would silently produce `http://localhost:NaN` and a
 * `-p NaN` handed to `next start` — a confusing way to find out the variable was wrong.
 */
function resolvePort(raw: string | undefined): number {
  if (!raw) return DEFAULT_PORT;

  const port = Number(raw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(
      `PLAYWRIGHT_PORT must be an integer between 1 and 65535, got "${raw}"`,
    );
  }
  return port;
}

const port = resolvePort(process.env.PLAYWRIGHT_PORT);
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
