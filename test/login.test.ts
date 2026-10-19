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

       await expect(loginPage.flashMessage).toBeDisplayed();

        await expect(loginPage.flashMessage).toHaveText(
        expect.stringContaining('You logged into a secure area!')
);
    });

     it('should display an error message with invalid credentials', async () => {
        await loginPage.login('wronguser', 'wrongpassword');

          await expect(loginPage.flashMessage).toBeDisplayed();

         await expect(loginPage.flashMessage).toHaveText(
        expect.stringContaining('Your username is invalid!')
        );

    });


    it('should log out successfully after logging in', async () => {
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

        const successMessage = await loginPage.getFlashMessage();
        expect(successMessage).toContain('You logged into a secure area!');

        await loginPage.clickLogout();

        await expect(loginPage.flashMessage).toBeDisplayed();

        await expect(loginPage.flashMessage).toHaveText(
        expect.stringContaining('You logged out of the secure area!')
);

        await expect(loginPage.usernameInput).toBeDisplayed();
        await expect(loginPage.passwordInput).toBeDisplayed();

        await expect(loginPage.logoutButton).not.toBeDisplayed();

    });
});