

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
});