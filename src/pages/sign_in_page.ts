import { Page, Locator } from "@playwright/test";
import { PlaywrightFunctions } from "#src/utilities/playwright_functions.js";

export class SignInPage extends PlaywrightFunctions {
  
    // Sign in modal
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnSignIn: Locator;
    private readonly aSignUpLink: Locator;

    constructor(page: Page) {
        super(page);
        this.txtEmail = page.getByPlaceholder("you@example.com");
        this.txtPassword = page.getByPlaceholder("••••••••");
        this.btnSignIn = page.getByRole("button", { name: "Sign In" });
        this.aSignUpLink = page.getByRole("link", { name: "Sign Up" });
    }

    /**
     * Signs in a user with the provided email and password.
     * @param email - The email address of the user to sign in.
     * @param password - The password of the user to sign in.
     */
    async signIn(email: string, password: string) {
        await this.page.waitForLoadState("networkidle");
        await this.txtEmail.fill(email);
        await this.txtPassword.fill(password);
        await this.btnSignIn.click();
    }

    /**
     * Clicks the sign up link to navigate to the sign up page.
     */
    async clickSignUpLink() {
        await this.clickThenWait(this.aSignUpLink);
    }
}