import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";

export class ProductListPage extends PlaywrightFunctions {
    private readonly productCard: Locator;

    constructor(page: Page) {
        super(page);
        this.productCard = page.locator("a.group.block");
    }

    async openProduct(productName: string) {
        await this.productCard.filter({ hasText: productName }).first().click();
        await this.waitForNetworkIdle(this.page);
        await expect(this.page).toHaveURL(/\/products\/.+/);
    }

    async verifyProductVisible(productName: string) {
        await expect(this.productCard.filter({ hasText: productName }).first()).toBeVisible();
    }
}
