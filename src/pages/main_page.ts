import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";
import { Locator, Page, expect } from "@playwright/test";

export class MainPage extends PlaywrightFunctions {
   
    // Flex Items
    private readonly aAccountLink: Locator;
    private readonly aShopAllLink: Locator;
    private readonly aCartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.aAccountLink = page.getByRole("link", { name: "Account", exact: true });
        this.aShopAllLink = page.getByRole("link", { name: "Shop All" });
        this.aCartLink = page.getByRole("link", { name: "Cart" });
    }
    
    /**
     * Clicks the account link and waits for the account page to load.
     * @returns A promise that resolves when the account page has loaded.
     */
    async clickAccountLink() {
        await this.page.waitForLoadState("networkidle");
        await this.aAccountLink.first().click();
        await expect(this.page).toHaveURL(/.*account/);
    }

    async goToShopAll() {
        await this.page.waitForLoadState("networkidle");
        await this.aShopAllLink.click();
        await expect(this.page).toHaveURL(/\/products/);
    }

    async goToCart() {
        await this.page.waitForLoadState("networkidle");
        await this.aCartLink.click();
        await expect(this.page).toHaveURL(/\/cart/);
    }
}