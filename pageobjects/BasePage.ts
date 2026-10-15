import { driver } from '@wdio/globals';

class BasePage {

    async goToHome(): Promise<void> {
        await driver.pressKeyCode(3);
    }

    async goBack(): Promise<void> {
    await driver.pressKeyCode(4);
}

}

export default BasePage;