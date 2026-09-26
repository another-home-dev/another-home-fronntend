import { test, expect } from '@playwright/test';

// Real, unauthenticated-only smoke coverage of the routing/auth-gating layer.
// See playwright.config.js for why authenticated pages aren't covered here.

test.describe('Login page', () => {
  test('renders the Asgardeo sign-in form', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign In with Asgardeo/i })).toBeVisible();
    await expect(page.getByText(/WSO2 Asgardeo Identity Provider/i)).toBeVisible();
  });
});

test.describe('Route guarding for an unauthenticated visitor', () => {
  const protectedPaths = [
    '/dashboard',
    '/hostel',
    '/students',
    '/maintenance',
    '/visitors',
    '/payments',
    '/room-allocation',
    '/reports',
    '/announcements',
    '/notifications',
    '/settings',
    '/profile',
  ];

  for (const path of protectedPaths) {
    test(`${path} redirects to /login`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/login$/);
      await expect(page.getByRole('button', { name: /Sign In with Asgardeo/i })).toBeVisible();
    });
  }

  test('the super-admin-only /admin/wardens route also redirects to /login', async ({ page }) => {
    await page.goto('/admin/wardens');
    await expect(page).toHaveURL(/\/login$/);
  });

  test('root path eventually lands on /login, not a blank or broken page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login$/);
  });

  test('an unknown path redirects to /login rather than 404ing', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page).toHaveURL(/\/login$/);
  });
});
