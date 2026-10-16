import { driver } from '@wdio/globals';
import BasePage from './BasePage';

class SettingPage extends BasePage {

    get networkInternetById() {
        return $(
            'android=new UiSelector().resourceId("android:id/title").text("Network & internet")'
        );
    }

    async openSettings(): Promise<void> {
        await driver.terminateApp('com.android.settings');
        await driver.activateApp('com.android.settings');
    }

    async openNetworkInternet(): Promise<void> {
    const networkInternet = this.networkInternetById;

    await networkInternet.waitForDisplayed({
        timeout: 10000,
    });

    await networkInternet.click();
}

}

export default new SettingPage();