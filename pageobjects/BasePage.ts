import { driver } from '@wdio/globals';

class BasePage {

    async goToHome() {
        await driver.pressKeyCode(3);
    }

    async goBack() {
    await driver.pressKeyCode(4);
}

}

export default BasePage;