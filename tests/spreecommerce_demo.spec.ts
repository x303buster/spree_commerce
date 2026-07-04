import { test } from '@playwright/test';
import { URL } from '#constants/url';
import { PlaywrightFunctions } from '#src/utilities/playwright_functions';
import { PageObjectModel } from '#src/pages/page_object_model';

test.describe('Spree Commerce Demo', () => {
  let playwrightFunctions: PlaywrightFunctions;
  let pom: PageObjectModel;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    playwrightFunctions = new PlaywrightFunctions(page);
    pom = new PageObjectModel(page);
    await playwrightFunctions.navigateToUrl(URL.BASE_URL);
  });

  test('User should be able to checkout to Spree Commerce', async ({ page }) => {
    await test.step('Click on the Account link', async () => {
        await pom.mainPage.clickAccountLink();
    });
  });
});