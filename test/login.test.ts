import { browser, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/LoginPage';

import {
    validUsername,
    validPassword,
    invalidUsername,
    invalidPassword
} from './test-data/login-data';




describe('Login functionality', () => {
    let loginPage: LoginPage;

    beforeEach(async () => {
        loginPage = new LoginPage();

        await browser.url('https://the-internet.herokuapp.com/login');
    });

    it('should log in successfully with valid credentials', async () => {
    await loginPage.login(validUsername, validPassword);

    await loginPage.expectSuccessfulLoginMessage();
    
    });

     it('should display an error message with invalid credentials', async () => {
        await loginPage.login(invalidUsername, invalidPassword);

         await loginPage.expectFlashMessageToContain(
            'Your username is invalid!'
        );

    });


it('should display an error message when login fields are empty', async () => {
    await loginPage.login('', '');

    await loginPage.expectFlashMessageToContain(
        'Your username is invalid!'
    );
});


it('should log out successfully after logging in', async () => {
    await loginPage.login(validUsername, validPassword);

    await loginPage.expectSuccessfulLoginMessage();

    await loginPage.clickLogout();

    await loginPage.expectSuccessfulLogoutMessage();

    await expect(loginPage.usernameInput).toBeDisplayed();
    await expect(loginPage.passwordInput).toBeDisplayed();
    await expect(loginPage.logoutButton).not.toBeDisplayed();
});

});