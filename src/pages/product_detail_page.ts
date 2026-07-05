import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";

export class ProductDetailPage extends PlaywrightFunctions {
    private readonly btnAddToCart: Locator;
    private readonly btnAdding: Locator;
    private readonly productTitle: Locator;

    /**
     * Initializes the product detail page and locates the add-to-cart controls.
     */
    constructor(page: Page) {
        super(page);
        this.btnAddToCart = page.getByRole("button", { name: /Add to cart/i });
        this.btnAdding = page.getByRole("button", { name: /Adding.../i });
        this.productTitle = page.locator("h1, h2, h3").first();
    }

    /**
     * Adds the current product to the cart and waits for the action to complete.
     */
    async addToCart() : Promise<void> {
        await this.waitForPageToLoad(this.page);
        await this.clickThenWait(this.btnAddToCart);
        await this.isLocatorHidden(this.btnAdding);
    }

    /**
     * Verifies that the product title contains the expected text.
     */
    async verifyProductTitle(expectedTitle: string) : Promise<void> {
        await expect(this.productTitle).toContainText(expectedTitle);
    }
}
