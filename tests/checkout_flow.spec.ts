import { test, expect } from '@playwright/test';
import { URL } from '#constants/url';
import { PageObjectModel } from '#src/pages/page_object_model';

const purchaseEmail = `spree-user-${Date.now()}@example.com`;
const purchasePassword = 'Test1234!';
const productName = 'Automatic Espresso Machine';
const productPrice = '$879.99';

test.describe('Spree Commerce checkout flow', () => {
  test('registers, logs in, adds a product, and completes checkout', async ({ browser }) => {
    const page = await browser.newPage();
    const pom = new PageObjectModel(page);

    await pom.mainPage.navigateToUrl(URL.BASE_URL);
    await pom.mainPage.clickAccountLink();
    await pom.signInPage.clickSignUpLink();
    await pom.createAccountPage.createAccount('Test', 'User', purchaseEmail, purchasePassword);

    await pom.mainPage.navigateToUrl(URL.BASE_URL);
    await pom.mainPage.goToShopAll();
    await pom.productListPage.verifyProductVisible(productName);
    await pom.productListPage.openProduct(productName);
    await pom.productDetailPage.verifyProductTitle(productName);
    await pom.productDetailPage.addToCart();

    await pom.mainPage.goToCart();
    await pom.cartPage.verifyProductInCart(productName, productPrice);
    await pom.cartPage.proceedToCheckout();

    await pom.checkoutPage.fillContactInformation(purchaseEmail);
    await pom.checkoutPage.fillShippingAddress({
      firstName: 'Test',
      lastName: 'User',
      address1: '123 Main Street',
      address2: 'Suite 100',
      city: 'Boston',
      state: 'Massachusetts',
      postalCode: '02118',
      phone: '5551234567',
      country: 'United States',
    });
    await pom.checkoutPage.selectPaymentMethod();
    await pom.checkoutPage.agreeToTerms();
    await pom.checkoutPage.placeOrder();
    await pom.checkoutPage.verifyOrderConfirmation();
  });
});
