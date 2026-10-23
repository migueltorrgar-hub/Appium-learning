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

    get shoppingCartBadge() {
        return $('.shopping_cart_badge');
    }

    get productNames() {
        return $$('.inventory_item_name');
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

    async removeProductFromCart(productId: string): Promise<void> {
        await this.removeFromCartButton(productId).click();
    }

      private addToCartButton(productId: string) {
        return $(`#add-to-cart-${productId}`);
    }

    private removeFromCartButton(productId: string) {
        return $(`#remove-${productId}`);
    }
}

export default SauceDemoPage;