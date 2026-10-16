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

}

export default BasePage;