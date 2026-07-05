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
     * Verifies that the specified product and price are visible in the cart.
     */
    async verifyProductInCart(productName: string, price: string) {
        await this.waitForNetworkIdle(this.page);
        await expect(this.page.getByText(productName, { exact: true }).nth(0)).toBeVisible();
        await expect(this.page.getByText(price, { exact: true }).nth(0)).toBeVisible();
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
