import { Locator, Page, expect } from "@playwright/test";

export class MainPage {
    public readonly page: Page;
    
    // Flex Items
    private readonly aAccountLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.aAccountLink = page.getByRole("link", { name: "Account", exact: true });
    }
    
    async clickAccountLink() {
        await this.page.waitForLoadState("networkidle");
        await this.aAccountLink.first().click();
        await expect(this.page).toHaveURL(/.*account/);
    }
}