import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
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
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.zipCode(),
      phone: faker.phone.number(),
      country: 'United States',
    });
    await pom.checkoutPage.selectPaymentMethod();
    await pom.checkoutPage.agreeToTerms();
    await pom.checkoutPage.placeOrder();
    await pom.checkoutPage.verifyOrderConfirmation();
  });
});
