import { Page, Locator } from "@playwright/test";
import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";

export class CreateAccountPage extends PlaywrightFunctions {
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly txtPasswordConfirmation: Locator;
    private readonly chkAgreeToTerms: Locator;
    private readonly btnCreateAccount: Locator;

    /**
     * Initializes the create-account page object and locates the form fields.
     */
    constructor(page: Page) {
        super(page);

        this.txtFirstName = page.getByRole("textbox", { name: "First Name" });
        this.txtLastName = page.getByRole("textbox", { name: "Last Name" });
        this.txtEmail = page.getByRole("textbox", { name: "Email" });
        this.txtPassword = page.getByRole("textbox", { name: "Password" }).nth(1);
        this.txtPasswordConfirmation = page.locator("#passwordConfirmation");
        this.chkAgreeToTerms = page.locator('#policy-consent');
        this.btnCreateAccount = page.getByRole("button", { name: "Create Account" });
    }

    /**
     * Fills out the create account form and submits it.
     * @param firstName - The first name of the user to create an account for.
     * @param lastName - The last name of the user to create an account for.
     * @param email - The email address of the user to create an account for.
     * @param password - The password for the new account.
     */
    async createAccount(firstName: string, lastName: string, email: string, password: string) {
        await this.txtFirstName.fill(firstName);
        await this.txtLastName.fill(lastName);
        await this.txtEmail.fill(email);
        await this.txtPassword.fill(password);
        await this.txtPasswordConfirmation.fill(password);
        await this.chkAgreeToTerms.check();
        await this.btnCreateAccount.click();
    }
}