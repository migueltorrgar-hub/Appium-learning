
import BasePage from './BasePage';

import { driver } from '@wdio/globals';

class SettingPage extends BasePage {

   
 get networkInternetById() {
    return $(
        'android=new UiSelector().resourceId("android:id/title").text("Network & internet")'
    );
}




async openSettings() {
    await driver.terminateApp('com.android.settings');
    await driver.activateApp('com.android.settings');
}
   

    async openNetworkInternet() {

        await this.networkInternetById.waitForDisplayed({
            timeout: 10000,
        });

        await this.networkInternetById.click();
    }
}

export default new SettingPage();