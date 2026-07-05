import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";

export class CartPage extends PlaywrightFunctions {
    private readonly btnProceedToCheckout: Locator;

    /**
     * Initializes the cart page object and locates the checkout button.
     */
    constructor(page: Page) {
        super(page);
        this.btnProceedToCheckout = page.getByRole("link", { name: /Proceed to Checkout/i });
    }

    /**
     * Verifies that the specified product and price are visible together in a single cart item.
     */
    async verifyProductInCart(productName: string, price: string) {
        await this.waitForNetworkIdle(this.page);

        const cartItem = this.page
            .locator("li, tr, div")
            .filter({ hasText: productName })
            .filter({ hasText: price })
            .first();

        await expect(cartItem).toBeVisible({ timeout: 10000 });
    }

    /**
     * Confirms that the cart subtotal and total summary values are displayed.
     */
    async verifyCartSummary(subtotal: string, total: string) {
        await this.waitForNetworkIdle(this.page);
        await expect(this.page.locator(`text=${subtotal}`)).toBeVisible();
        await expect(this.page.locator(`text=${total}`)).toBeVisible();
    }

    /**
     * Proceeds to the checkout page from the cart.
     */
    async proceedToCheckout() {
        await this.btnProceedToCheckout.click();
        await this.waitForNetworkIdle(this.page);
        await expect(this.page).toHaveURL(/\/checkout\//);
    }
}
