

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

        await sauceDemoPage.expectCartSubtotal(39.98);

        await sauceDemoPage.expectCartToContainProducts([
        PRODUCT_NAMES.backpack,
        PRODUCT_NAMES.bikeLight
        ]);

        await sauceDemoPage.removeProductFromCart(PRODUCTS.bikeLight);

        await expect(sauceDemoPage.shoppingCartBadge).toHaveText('1');

        await expect(sauceDemoPage.productNames).toBeElementsArrayOfSize(1);

        await sauceDemoPage.expectProductInCart(
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

    await sauceDemoPage.expectCheckoutSummary(39.98, 3.20, 43.18);
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

    it('should complete the checkout successfully', async () => {
    await sauceDemoPage.addProductToCart(PRODUCTS.backpack);
    await sauceDemoPage.openShoppingCart();
    await sauceDemoPage.clickCheckout();

    await sauceDemoPage.enterCheckoutInformation(
        'Paco',
        'Pil',
        '03123'
    );

    await sauceDemoPage.clickContinue();
    await sauceDemoPage.clickFinish();

    await sauceDemoPage.expectCheckoutCompleted();
    await sauceDemoPage.expectCheckoutConfirmationMessage();
    });

    it('should have an empty cart after completing checkout', async () => {
    await sauceDemoPage.addProductToCart(PRODUCTS.backpack);
    await sauceDemoPage.openShoppingCart();
    await sauceDemoPage.clickCheckout();

    await sauceDemoPage.enterCheckoutInformation(
        'Paco',
        'Pil',
        '03123'
    );

    await sauceDemoPage.clickContinue();
    await sauceDemoPage.clickFinish();

    await sauceDemoPage.openShoppingCart();

    await expect(
        await sauceDemoPage.getCartItemCount()
        ).toBe(0);
});


it('should return to products page when cancelling checkout', async () => {
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
    await sauceDemoPage.clickCancel();

    await expect($('.inventory_list')).toBeDisplayed();

    await sauceDemoPage.openShoppingCart();

    await expect(sauceDemoPage.productNames).toBeElementsArrayOfSize(2);

    await expect(sauceDemoPage.productNames[0]).toHaveText(
        PRODUCT_NAMES.backpack
    );

    await expect(sauceDemoPage.productNames[1]).toHaveText(
        PRODUCT_NAMES.bikeLight
    );

    await expect(sauceDemoPage.shoppingCartBadge).toHaveText('2');
});



it('should sort products by price from low to high', async () => {
    await sauceDemoPage.sortProductsByPriceLowToHigh();

    const prices = await sauceDemoPage.inventoryItemPrices;

    const actualPrices: number[] = [];

    for (const element of prices) {
        const priceText = await element.getText();
        actualPrices.push(
            parseFloat(priceText.replace('$', ''))
        );
    }

    const sortedPrices = [...actualPrices].sort(
        (a, b) => a - b
    );

    expect(actualPrices).toEqual(sortedPrices);
});

});