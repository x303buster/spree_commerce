import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";

export class CartPage extends PlaywrightFunctions {
    private readonly btnProceedToCheckout: Locator;

    constructor(page: Page) {
        super(page);
        this.btnProceedToCheckout = page.getByRole("link", { name: /Proceed to Checkout/i });
    }

    async verifyProductInCart(productName: string, price: string) {
        await expect(this.page.getByText(productName, { exact: false })).toBeVisible();
        await expect(this.page.getByText(price, { exact: false })).toBeVisible();
    }

    async verifyCartSummary(subtotal: string, total: string) {
        await expect(this.page.locator(`text=${subtotal}`)).toBeVisible();
        await expect(this.page.locator(`text=${total}`)).toBeVisible();
    }

    async proceedToCheckout() {
        await this.btnProceedToCheckout.click();
        await this.waitForNetworkIdle(this.page);
        await expect(this.page).toHaveURL(/\/checkout\//);
    }
}
