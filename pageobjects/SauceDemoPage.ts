import { $, $$, browser } from '@wdio/globals';

export const PRODUCTS = {
    backpack: 'sauce-labs-backpack',
    bikeLight: 'sauce-labs-bike-light',
};

export const PRODUCT_NAMES = {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
};

class SauceDemoPage {

    readonly url = 'https://www.saucedemo.com/';
    get usernameInput() {
        return $('#user-name');
    }

    get passwordInput() {
        return $('#password');
    }

    get loginButton() {
        return $('#login-button');
    }

    get shoppingCartLink() {
        return $('.shopping_cart_link');
    }

    get checkoutButton() {
        return $('#checkout');
    }

    get continueButton() {
        return $('#continue');
    }

    get shoppingCartBadge() {
        return $('.shopping_cart_badge');
    }

    get productNames() {
        return $$('.inventory_item_name');
    }

    get productPrices() {
        return $$('.inventory_item_price');
    }

    get firstNameInput() {
        return $('#first-name');
    }

    get lastNameInput() {
        return $('#last-name');
    }

    get postalCodeInput() {
        return $('#postal-code');
    }

    get taxLabel() {
        return $('.summary_tax_label');
    }

    get totalLabel() {
        return $('.summary_total_label');
    }

    get checkoutError() {
        return $('[data-test="error"]');
    }

   async resetCart(): Promise<void> {
        await browser.execute(() => {
        window.localStorage.removeItem('cart-contents');
    });
}

    async getCartItemCount(): Promise<number> {
        return (await this.productNames).length;
    }

    async open(): Promise<void> {
        await browser.url(this.url);
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
         await $('.inventory_list').waitForDisplayed({ timeout: 10000 });
    }

    async addProductToCart(productId: string): Promise<void> {
        await this.addToCartButton(productId).click();
    }

    async openShoppingCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async removeProductFromCart(productId: string): Promise<void> {
        await this.removeFromCartButton(productId).click();
    }

      private addToCartButton(productId: string) {
        return $(`#add-to-cart-${productId}`);
    }

    private removeFromCartButton(productId: string) {
        return $(`#remove-${productId}`);
    }

    async enterCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
    ): Promise<void> {
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.postalCodeInput.setValue(postalCode);
    }

    async goBack(): Promise<void> {
        await browser.back();
    }

    
}

export default SauceDemoPage;