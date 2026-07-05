import { Page } from '@playwright/test';
import { MainPage } from '#src/pages/main_page';
import { SignInPage } from '#src/pages/sign_in_page';
import { CreateAccountPage } from '#src/pages/create_account_page';
import { ProductListPage } from '#src/pages/product_list_page';
import { ProductDetailPage } from '#src/pages/product_detail_page';
import { CartPage } from '#src/pages/cart_page';
import { CheckoutPage } from '#src/pages/checkout_page';

export class PageObjectModel {
    private readonly page: Page;
    public readonly mainPage: MainPage;
    public readonly signInPage: SignInPage;
    public readonly createAccountPage: CreateAccountPage;
    public readonly productListPage: ProductListPage;
    public readonly productDetailPage: ProductDetailPage;
    public readonly cartPage: CartPage;
    public readonly checkoutPage: CheckoutPage;

    /**
     * Initializes all page-object instances for the test framework.
     */
    constructor(page: Page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.signInPage = new SignInPage(page);
        this.createAccountPage = new CreateAccountPage(page);
        this.productListPage = new ProductListPage(page);
        this.productDetailPage = new ProductDetailPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }
}