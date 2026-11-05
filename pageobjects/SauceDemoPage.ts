import { $, $$, browser, expect } from '@wdio/globals';

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

    get inventoryItemPrices() {
        return $$('.inventory_item_price');
    }

    get cartItemNames() {
        return $$('.cart_item .inventory_item_name');
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

    get finishButton() {
        return $('#finish');
    }

    get cancelButton() {
        return $('#cancel');
    }

    get checkoutCompleteHeader() {
        return $('.complete-header');
    }

    get checkoutCompleteText() {
        return $('.complete-text');
    }

    get productSort() {
        return $('.product_sort_container');
    }

    get productDetailName() {
        return $('.inventory_details_name');
    }

    get productDetailDescription() {
        return $('.inventory_details_desc');
    }

    get productDetailPrice() {
        return $('.inventory_details_price');
    }

    get productDetailAddToCartButton() {
        return $('.inventory_details_desc_container button');
    }

    get productDetailRemoveButton() {
        return $('.inventory_details_desc_container button');
    }

   async resetCart(): Promise<void> {
        await browser.execute(() => {
        window.localStorage.removeItem('cart-contents');
    });
}

    async getCartItemCount(): Promise<number> {
        return (await this.productNames).length;
    }

    async expectProductInCart(productName: string): Promise<void> {
    const cartItemNames = await this.cartItemNames;

    let productExists = false;

    for (const element of cartItemNames) {
        if ((await element.getText()) === productName) {
            productExists = true;
            break;
        }
    }

    await expect(productExists).toBe(true);
    }

    async expectCartToContainProducts(expectedProductNames: string[]): Promise<void> {
    const cartItemNames = await this.cartItemNames;
    const actualProductNames: string[] = [];

    for (const element of cartItemNames) {
        actualProductNames.push(await element.getText());
    }

    expect(actualProductNames).toHaveLength(expectedProductNames.length);

    for (const productName of expectedProductNames) {
        await expect(actualProductNames).toContain(productName);
    }
    }


    async calculateCartSubtotal(): Promise<number> {
    const productPrices = await this.productPrices;
    let subtotal = 0;

    for (const element of productPrices) {
        const priceText = await element.getText();
        const price = parseFloat(priceText.replace('$', ''));

        subtotal += price;
    }

    return subtotal;
    }

    async open(): Promise<void> {
        await browser.url(this.url);
    }

    async expectCartSubtotal(expectedSubtotal: number): Promise<void> {
    const actualSubtotal = await this.calculateCartSubtotal();

    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);
    }

    async expectCheckoutSummary(
    expectedSubtotal: number,
    expectedTax: number,
    expectedTotal: number
    ): Promise<void> {
    const subtotalLabel = await $('.summary_subtotal_label').getText();
    const actualSubtotal = parseFloat(
        subtotalLabel.replace('Item total: $', '')
    );

    const taxLabel = await this.taxLabel.getText();
    const actualTax = parseFloat(
        taxLabel.replace('Tax: $', '')
    );

    const totalLabel = await this.totalLabel.getText();
    const actualTotal = parseFloat(
        totalLabel.replace('Total: $', '')
    );

    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);
    expect(actualTax).toBeCloseTo(expectedTax, 2);
    expect(actualTotal).toBeCloseTo(expectedTotal, 2);
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


    async sortProductsByPriceLowToHigh(): Promise<void> {
        await this.productSort.selectByVisibleText(
        'Price (low to high)'
        );
    }

    async sortProductsByPriceHighToLow(): Promise<void> {
        await this.productSort.selectByVisibleText('Price (high to low)');
    }

    async sortProductsByNameAtoZ(): Promise<void> {
        await this.productSort.selectByVisibleText('Name (A to Z)');
    }

    async sortProductsByNameZtoA(): Promise<void> {
        await this.productSort.selectByVisibleText('Name (Z to A)');
    }

    async openProductDetails(productName: string): Promise<void> {
        const product = await $$('.inventory_item_name')
        .find(async (element) => await element.getText() === productName);

        if (!product) {
        throw new Error(`Product "${productName}" was not found`);
        }

        await product.click();
    }

    async addProductFromDetails(): Promise<void> {
        await this.productDetailAddToCartButton.click();
    }

    async removeProductFromDetails(): Promise<void> {
        await this.productDetailRemoveButton.click();
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


    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }

    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async expectCheckoutCompleted(): Promise<void> {
        await expect(this.checkoutCompleteHeader).toHaveText(
        'Thank you for your order!'
        );
    }

    async expectCheckoutConfirmationMessage(): Promise<void> {
        await expect(this.checkoutCompleteText).toHaveText(
        'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
        );
    }

    
}

export default SauceDemoPage;