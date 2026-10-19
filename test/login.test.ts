import { browser, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/LoginPage';

describe('Login functionality', () => {
    let loginPage: LoginPage;

    beforeEach(async () => {
        loginPage = new LoginPage();

        await browser.url('https://the-internet.herokuapp.com/login');
    });

    it('should log in successfully with valid credentials', async () => {
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

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


    it('should log out successfully after logging in', async () => {
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

        const successMessage = await loginPage.getFlashMessage();
        expect(successMessage).toContain('You logged into a secure area!');

        await loginPage.clickLogout();

        await expect(loginPage.usernameInput).toBeDisplayed();
        await expect(loginPage.passwordInput).toBeDisplayed();
    });
});