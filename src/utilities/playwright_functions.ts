import { Page, Locator } from "@playwright/test";

export class PlaywrightFunctions {
    public readonly page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToUrl(url: string = "/"): Promise<void> {
        await this.page.goto(url);
        await this.waitForNetworkIdle(this.page);
    }

    async waitForNetworkIdle(page: Page, timeout: number = 15000): Promise<void> {
        await this.page.waitForLoadState("networkidle", { timeout });
     }

    async waitForPageToLoad(page: Page, timeout: number = 15000): Promise<void> {
        await this.page.waitForLoadState("load", { timeout });
    }

    async clickThenWait(locator: Locator): Promise<void> {
        await locator.click();
        await this.waitForPageToLoad(this.page);
    }

    /**
   * Waits for the specified locator to become hidden within the given timeout.
   * Retries hidden check at the specified polling interval if initial wait fails.
   * @param locator - The Playwright Locator to check for hidden state.
   * @param timeout - Maximum time to wait for the locator to become hidden (in milliseconds). Default is 5000.
   * @param polling - Interval between hidden checks when retrying (in milliseconds). Default is 100.
   */
  async isLocatorHidden(locator: Locator, timeout: number = 5000, polling: number = 100): Promise<boolean> {
    try {
      await locator.waitFor({ state: "hidden", timeout });
      return true;
    } catch (error) {
      console.warn(`Locator ${locator.toString()} not hidden, retrying...`);
      const startTime = Date.now();
      while (Date.now() - startTime < timeout) {
        if (await locator.isHidden()) {
          return true;
        }
        await this.page.waitForTimeout(polling);
      }
      console.warn(`Locator ${locator.toString()} is still visible due: ${error}`);
      return false;
    }
  }
}