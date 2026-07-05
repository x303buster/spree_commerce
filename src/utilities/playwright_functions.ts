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
}