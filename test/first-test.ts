import { expect, browser } from '@wdio/globals';

import SettingPage from '../pageobjects/SettingPage';
import NetworkPage from '../pageobjects/NetworkPage';
import ChromePage from '../pageobjects/ChromePage';



describe('Android Settings', () => {

    beforeEach(async () => {
    await SettingPage.goToHome();


    
});

it('should verify Chrome is displayed on the home screen', async () => {
    await SettingPage.goToHome();

    await expect(ChromePage.chromeIcon).toBeDisplayed();
});

     async function openInternetSettings() {
        await SettingPage.openSettings();
        await SettingPage.openNetworkInternet();
        await NetworkPage.expectInternetPage();
    }

    it('should open Chrome using accessibility id', async () => {
    await SettingPage.goToHome();

    await ChromePage.expectChromeDisplayed();
    await ChromePage.openChrome();
});

    it('should open Android Settings', async () => {

        console.log('Checking Android Settings...');

       
        
        await SettingPage.openSettings();
       
        await expect(SettingPage.networkInternetById).toBeDisplayed();

        console.log('Settings screen is displayed');


    });


   

it('should navigate to Wi-Fi and verify connection', async () => {
    await openInternetSettings();

    await NetworkPage.openInternet();
    await NetworkPage.openWifi();
    await NetworkPage.expectWifiPage();

    const initialWifiState = await NetworkPage.getWifiSwitchState();

    try {
        if (!initialWifiState) {
            await NetworkPage.toggleWifiAndWait();
        }

        await NetworkPage.expectWifiSwitchEnabled();
        await NetworkPage.expectConnected();
    } finally {
        await NetworkPage.restoreWifiState(initialWifiState);
    }
});


it('should locate the Wi-Fi switch specifically', async () => {
    await openInternetSettings();
    await NetworkPage.openInternet();
    
    await NetworkPage.androidWifiSwitch.waitForDisplayed({
    timeout: 5000,
    timeoutMsg: 'Wi-Fi switch was not displayed within 5 seconds',
});

await expect(NetworkPage.androidWifiSwitch).toBeDisplayed();

});


it('should verify the Wi-Fi switch state', async () => {
    await openInternetSettings();
    await NetworkPage.openInternet();

    let isWifiEnabled = await NetworkPage.getWifiSwitchState();

    if (!isWifiEnabled) {
        await NetworkPage.tapWifiSwitch();
        await browser.waitUntil(
            async () => await NetworkPage.getWifiSwitchState(),
            {
                timeout: 10000,
                timeoutMsg: 'Wi-Fi did not turn on',
            }
        );
    }

    isWifiEnabled = await NetworkPage.getWifiSwitchState();

    console.log('Wi-Fi enabled:', isWifiEnabled);

    expect(isWifiEnabled).toBe(true);
});

it('should verify the Wi-Fi switch is enabled for interaction', async () => {
    await openInternetSettings();
    await NetworkPage.openInternet();

    const isEnabled = await NetworkPage.isWifiSwitchElementEnabled();

    console.log('Wi-Fi switch element enabled:', isEnabled);

    expect(isEnabled).toBe(true);
});

it('should toggle the Wi-Fi switch and restore its state', async () => {
    await openInternetSettings();
    await NetworkPage.openInternet();

    const initialState = await NetworkPage.getWifiSwitchState();

    expect(typeof initialState).toBe('boolean');

    try {
        await NetworkPage.toggleWifiAndWait();

        const newState = await NetworkPage.getWifiSwitchState();

        expect(newState).toBe(!initialState);
    } finally {
        await NetworkPage.restoreWifiState(initialState);
    }

    const finalState = await NetworkPage.getWifiSwitchState();

    expect(finalState).toBe(initialState);
});

});