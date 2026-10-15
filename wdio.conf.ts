export const config = {
    runner: 'local',

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    specs: ['./test/**/*.ts'],

    maxInstances: 1,

    capabilities: [
        {
            platformName: 'Android',
            'appium:deviceName': 'emulator-5554',
            'appium:automationName': 'UiAutomator2',
            'appium:platformVersion': '15',
            'appium:appPackage': 'com.android.settings',
            'appium:appActivity': '.Settings',
        },
    ],

    services: [],

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
        timeout: 60000,
    },
};