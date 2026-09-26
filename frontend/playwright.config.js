import { defineConfig, devices } from '@playwright/test';

// Smoke tests only cover the unauthenticated routing/auth-gating layer
// (login page, ProtectedRoute redirects). Authenticated-page smoke tests
// aren't possible without a real Asgardeo test account: SessionBridge
// (see src/features/authentication/presentation/SessionBridge.jsx) re-derives
// isAuthenticated from the Asgardeo SDK's own restored session on every load
// and calls clearSession() whenever that SDK session is absent - so a fake
// session written directly into the zustand/localStorage state gets wiped
// before the router ever sees it. That's a deliberate, good security property
// (client-side state can't be forged to bypass login), not a test gap to
// route around.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
