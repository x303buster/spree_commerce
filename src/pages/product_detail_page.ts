import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";

export class ProductDetailPage extends PlaywrightFunctions {
    private readonly btnAddToCart: Locator;
    private readonly productTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.btnAddToCart = page.getByRole("button", { name: /add to cart/i });
        this.productTitle = page.locator("h1, h2, h3").first();
    }

    async addToCart() {
        await this.btnAddToCart.click();
        await this.waitForNetworkIdle(this.page);
    }

    async verifyProductTitle(expectedTitle: string) {
        await expect(this.productTitle).toContainText(expectedTitle);
    }
}
