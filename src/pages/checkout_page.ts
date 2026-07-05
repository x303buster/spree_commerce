import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    phone?: string;
    country?: string;
}

export class CheckoutPage extends PlaywrightFunctions {
    private readonly txtEmail: Locator;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtCompany: Locator;
    private readonly txtAddress1: Locator;
    private readonly txtAddress2: Locator;
    private readonly txtCity: Locator;
    private readonly txtZip: Locator;
    private readonly txtPhone: Locator;
    private readonly selectCountry: Locator;
    private readonly selectState: Locator;
    private readonly paymentMethodOnTerms: Locator;
    private readonly chkAgreeToTerms: Locator;
    private readonly btnPlaceOrder: Locator;

    constructor(page: Page) {
        super(page);
        this.txtEmail = page.locator("#email");
        this.txtFirstName = page.locator("#ship-first_name");
        this.txtLastName = page.locator("#ship-last_name");
        this.txtCompany = page.locator("#ship-company");
        this.txtAddress1 = page.locator("#ship-address1");
        this.txtAddress2 = page.locator("#ship-address2");
        this.txtCity = page.locator("#ship-city");
        this.txtZip = page.locator("#ship-postal_code");
        this.txtPhone = page.locator("#ship-phone");
        this.selectCountry = page.getByRole("combobox", { name: /country/i });
        this.selectState = page.getByRole("combobox", { name: /state/i });
        this.paymentMethodOnTerms = page.getByRole("radio", { name: /On terms/i });
        this.chkAgreeToTerms = page.getByRole("checkbox", { name: /I agree to the Privacy Policy and Terms of Service/i });
        this.btnPlaceOrder = page.getByRole("button", { name: /Place Order/i });
    }

    async fillContactInformation(email: string) {
        await this.txtEmail.fill(email);
    }

    async fillShippingAddress(address: ShippingAddress) {
        await this.selectCountry.selectOption({ label: address.country ?? "United States" });
        await this.txtFirstName.fill(address.firstName);
        await this.txtLastName.fill(address.lastName);
        if (address.company) await this.txtCompany.fill(address.company);
        await this.txtAddress1.fill(address.address1);
        if (address.address2) await this.txtAddress2.fill(address.address2);
        await this.txtCity.fill(address.city);
        await this.selectState.selectOption({ label: address.state });
        await this.txtZip.fill(address.postalCode);
        if (address.phone) await this.txtPhone.fill(address.phone);
    }

    async selectPaymentMethod() {
        await this.paymentMethodOnTerms.check();
    }

    async agreeToTerms() {
        await this.chkAgreeToTerms.check();
    }

    async placeOrder() {
        await this.btnPlaceOrder.click();
        await this.waitForNetworkIdle(this.page);
    }

    async verifyOrderConfirmation() {
        await expect(this.page.getByText(/order number|thank you|success/i)).toBeVisible();
    }
}
