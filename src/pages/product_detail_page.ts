import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";

export class ProductDetailPage extends PlaywrightFunctions {
    private readonly btnAddToCart: Locator;
    private readonly btnAdding: Locator;
    private readonly productTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.btnAddToCart = page.getByRole("button", { name: /Add to cart/i });
        this.btnAdding = page.getByRole("button", { name: /Adding.../i });
        this.productTitle = page.locator("h1, h2, h3").first();
    }

    async addToCart() : Promise<void> {
        await this.waitForPageToLoad(this.page);
        await this.clickThenWait(this.btnAddToCart);
        await this.isLocatorHidden(this.btnAdding);
    }

    async verifyProductTitle(expectedTitle: string) : Promise<void> {
        await expect(this.productTitle).toContainText(expectedTitle);
    }
}
