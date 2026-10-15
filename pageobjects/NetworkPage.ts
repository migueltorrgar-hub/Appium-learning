import { expect, browser } from '@wdio/globals';
import BasePage from './BasePage';

class NetworkPage extends BasePage {

    get internetTitle() {
         return $( 'android=new UiSelector().resourceId("android:id/title").text("Internet")');
    }

    get wifi() {
        return $(
           'android=new UiSelector().resourceId("android:id/title").text("Wi-Fi")'
        );
    }

    get connected() {
        return $(
             'android=new UiSelector().resourceId("android:id/summary").textContains("Connected")'
        );
    }


    get wifiSwitch() {
    return $(
        'android=new UiSelector().className("android.widget.Switch").resourceId("com.android.settings:id/switchWidget")'
    );
}



get androidWifiSwitch() {
    return this.wifiSwitch;
}

async expectWifiSwitchEnabled(): Promise<void> {
    const isEnabled = await this.getWifiSwitchState();
    expect(isEnabled).toBe(true);
}


async getWifiSwitchState(): Promise<boolean> {
    await this.wifiSwitch.waitForDisplayed({
        timeout: 5000,
    });

    const checked = await this.wifiSwitch.getAttribute('checked');

    console.log('Wi-Fi switch checked attribute:', checked);

    return checked === 'true';
}

async toggleWifiAndWait(): Promise<void> {
    const initialState = await this.getWifiSwitchState();

    await this.tapWifiSwitch();

    await browser.waitUntil(
        async () => (await this.getWifiSwitchState()) !== initialState,
        {
            timeout: 5000,
            timeoutMsg: 'Wi-Fi switch state did not change'
        }
    );
}

async restoreWifiState(initialState: boolean): Promise<void> {
    const currentState = await this.getWifiSwitchState();

    if (currentState !== initialState) {
        await this.tapWifiSwitch();

        await browser.waitUntil(
            async () =>
                (await this.getWifiSwitchState()) === initialState,
            {
                timeout: 10000,
                timeoutMsg: 'Wi-Fi switch did not return to its original state'
            }
        );
    }
}

async openInternet(): Promise<void> {
    await this.internetTitle.waitForDisplayed({
        timeout: 5000,
    });

    await this.internetTitle.click();
}


async tapWifiSwitch(): Promise<void> {
    await this.wifiSwitch.waitForDisplayed({
        timeout: 5000,
    });

    await this.wifiSwitch.click();
}


async openWifi(): Promise<void> {
    await this.wifi.waitForDisplayed({
        timeout: 10000,
        timeoutMsg: 'The Wi-Fi option was not displayed',
    });

    await this.wifi.click();
}


async expectConnected(): Promise<void> {
    await this.connected.waitForDisplayed({
        timeout: 5000,
    });

    const connectionText = await this.connected.getText();

    expect(connectionText).toContain('Connected');
}

    async expectWifiPage(): Promise<void> {

        await expect(this.wifi).toBeDisplayed();

}



async isWifiEnabled(): Promise<boolean> {
    return await this.getWifiSwitchState();
}

async expectInternetPage(): Promise<void> {
    await this.internetTitle.waitForDisplayed({
        timeout: 10000,
        timeoutMsg: 'The Internet screen was not displayed',
    });

    await expect(this.internetTitle).toHaveText('Internet');
}






}

export default new NetworkPage();