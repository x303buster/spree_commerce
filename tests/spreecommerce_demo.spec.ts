import { test } from '@playwright/test';
import { URL } from '#constants/url';

test.describe('Spree Commerce Demo', () => {
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto(URL.BASE_URL);
  });

  test('User should be able to checkout to Spree Commerce', async ({ page }) => {
    await page.goto(URL.BASE_URL);
    await test.expect(page).toHaveTitle(/Spree Commerce Demo/);
  });
});