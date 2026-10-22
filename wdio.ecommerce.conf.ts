import { config as baseConfig } from './wdio.conf';

export const config = {
    ...baseConfig,

    automationProtocol: 'webdriver',

    specs: ['./test/ecommerce.test.ts'],

    capabilities: [
        {
            platformName: 'Android',
            'appium:deviceName': 'emulator-5554',
            'appium:automationName': 'UiAutomator2',
            'appium:platformVersion': '15',
            browserName: 'Chrome',
            'wdio:enforceWebDriverClassic': true,
        },
    ],
};