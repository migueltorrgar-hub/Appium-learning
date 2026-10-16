import { driver } from '@wdio/globals';

class BasePage {

    // Returns to the Android home screen
    async goToHome(): Promise<void> {
        await driver.pressKeyCode(3);
    }

    // Navigates back to the previous screen
    async goBack(): Promise<void> {
        await driver.pressKeyCode(4);
    }

     // Waits until an element is displayed
    async waitForElementDisplayed(
        element: WebdriverIO.Element,
        timeout: number = 10000
    ): Promise<void> {
        await element.waitForDisplayed({
            timeout,
        });
    }

}

export default BasePage;