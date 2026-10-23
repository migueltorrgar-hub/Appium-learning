

import { $, expect } from '@wdio/globals';
import SauceDemoPage, { PRODUCTS, PRODUCT_NAMES } from '../pageobjects/SauceDemoPage';


describe('SauceDemo shopping cart', () => {
    const sauceDemoPage = new SauceDemoPage();

    beforeEach(async () => {
        await sauceDemoPage.open();
        await sauceDemoPage.resetCart();
        await sauceDemoPage.login('standard_user', 'secret_sauce');
    });

    it('should add two products to the shopping cart', async () => {
        await sauceDemoPage.addProductToCart(PRODUCTS.backpack);

        await expect(sauceDemoPage.shoppingCartBadge).toHaveText('1');

        await sauceDemoPage.addProductToCart(PRODUCTS.bikeLight);

        await expect(sauceDemoPage.shoppingCartBadge).toHaveText('2');

        await sauceDemoPage.openShoppingCart();

        await expect(sauceDemoPage.productNames).toBeElementsArrayOfSize(2);

        await expect(sauceDemoPage.productPrices[0]).toHaveText('$29.99');

        await expect(sauceDemoPage.productPrices[1]).toHaveText('$9.99');

        await expect(sauceDemoPage.productNames[0]).toHaveText(
              PRODUCT_NAMES.backpack
        );

        await expect(sauceDemoPage.productNames[1]).toHaveText(
             PRODUCT_NAMES.bikeLight
        );

        await sauceDemoPage.removeProductFromCart(PRODUCTS.bikeLight);

        await expect(sauceDemoPage.shoppingCartBadge).toHaveText('1');

        await expect(sauceDemoPage.productNames).toBeElementsArrayOfSize(1);

        await expect(sauceDemoPage.productNames[0]).toHaveText(
            PRODUCT_NAMES.backpack
        );
    });


    it('should show an empty cart after removing all products', async () => {
    await expect($('.inventory_list')).toBeDisplayed();

    await sauceDemoPage.addProductToCart(PRODUCTS.backpack);

    await sauceDemoPage.openShoppingCart();

    await sauceDemoPage.removeProductFromCart(PRODUCTS.backpack);

    await expect(
        await sauceDemoPage.getCartItemCount()
    ).toBe(0);
    });

    it('should navigate to checkout overview', async () => {
    await sauceDemoPage.addProductToCart(PRODUCTS.backpack);
    await sauceDemoPage.addProductToCart(PRODUCTS.bikeLight);

    await sauceDemoPage.openShoppingCart();
    await sauceDemoPage.clickCheckout();

    await sauceDemoPage.enterCheckoutInformation(
        'Paco',
        'Pil',
        '03123'
    );

    await sauceDemoPage.clickContinue();

    await expect($('.summary_subtotal_label')).toHaveText(
        'Item total: $39.98'
    );
    
    await expect(sauceDemoPage.taxLabel).toHaveText('Tax: $3.20');

    await expect(sauceDemoPage.totalLabel).toHaveText('Total: $43.18');
    });

    it('should show an error when checkout information is empty', async () => {
    await sauceDemoPage.addProductToCart(PRODUCTS.backpack);
    await sauceDemoPage.openShoppingCart();
    await sauceDemoPage.clickCheckout();

    await sauceDemoPage.clickContinue();

    await expect(sauceDemoPage.checkoutError).toHaveText(
        'Error: First Name is required'
    );

    await sauceDemoPage.firstNameInput.setValue('Paco');
    await sauceDemoPage.clickContinue();

    await expect(sauceDemoPage.checkoutError).toHaveText(
    'Error: Last Name is required'
    );

    await sauceDemoPage.lastNameInput.setValue('Pil');
    await sauceDemoPage.clickContinue();

    await expect(sauceDemoPage.checkoutError).toHaveText(
    'Error: Postal Code is required'
    );
    });

    it('should preserve cart items after returning from checkout', async () => {
    await sauceDemoPage.addProductToCart(PRODUCTS.backpack);
    await sauceDemoPage.addProductToCart(PRODUCTS.bikeLight);

    await sauceDemoPage.openShoppingCart();

    await sauceDemoPage.clickCheckout();

    await sauceDemoPage.goBack();

    await expect(sauceDemoPage.productNames).toBeElementsArrayOfSize(2);
    
    await expect(sauceDemoPage.productNames[0]).toHaveText(
        PRODUCT_NAMES.backpack
    );

    await expect(sauceDemoPage.productNames[1]).toHaveText(
        PRODUCT_NAMES.bikeLight
    );
    await expect(sauceDemoPage.shoppingCartBadge).toHaveText('2');
    });
});