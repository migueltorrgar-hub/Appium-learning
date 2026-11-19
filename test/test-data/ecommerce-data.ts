import { PRODUCTS, PRODUCT_NAMES } from '../../pageobjects/SauceDemoPage';

const PRODUCT_PRICES = {
    backpack: 29.99,
    bikeLight: 9.99,
};

type ProductKey = keyof typeof PRODUCTS;

export const createSelectedProducts = (productKeys: ProductKey[]) => {
    return productKeys.map((key) => ({
        id: PRODUCTS[key],
        name: PRODUCT_NAMES[key],
        price: PRODUCT_PRICES[key],
    }));
};