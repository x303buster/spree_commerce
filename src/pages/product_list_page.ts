import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";

export class ProductListPage extends PlaywrightFunctions {
    private readonly productCard: Locator;

    /**
     * Initializes the product list page and locates the product cards.
     */
    constructor(page: Page) {
        super(page);
        this.productCard = page.locator("a.group.block");
    }

    /**
     * Opens the product card that matches the given product name.
     */
    async openProduct(productName: string) {
        await this.productCard.filter({ hasText: productName }).first().click();
        await this.waitForNetworkIdle(this.page);
        await expect(this.page).toHaveURL(/\/products\/.+/);
    }

    /**
     * Verifies that a product card for the given product name is visible.
     */
    async verifyProductVisible(productName: string) {
        await expect(this.productCard.filter({ hasText: productName }).first()).toBeVisible();
    }
}
