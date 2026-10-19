import { browser, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/LoginPage';

describe('Login functionality', () => {
    let loginPage: LoginPage;

    beforeEach(async () => {
        loginPage = new LoginPage();

        await browser.url('https://the-internet.herokuapp.com/login');
    });

    it('should log in successfully with valid credentials', async () => {
        await loginPage.enterUsername('tomsmith');
        await loginPage.enterPassword('SuperSecretPassword!');
        await loginPage.clickLogin();

        const message = await loginPage.getFlashMessage();

        expect(message).toContain('You logged into a secure area!');
    });

     it('should display an error message with invalid credentials', async () => {
        await loginPage.enterUsername('wronguser');
        await loginPage.enterPassword('wrongpassword');
        await loginPage.clickLogin();

        const message = await loginPage.getFlashMessage();
        expect(message).toContain('Your username is invalid!');
    });
});