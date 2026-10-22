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


    it('should display an error message when the username is incorrect', async () => {
    await loginPage.login(invalidUsername, validPassword);
    await loginPage.expectFlashMessageToContain(
        'Your username is invalid!'
    );
});

    

    it('should display an error message when the password is incorrect', async () => {
    await loginPage.login(validUsername, invalidPassword);

    await loginPage.expectFlashMessageToContain(
        'Your password is invalid!'
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

it('should deny access to the secure page after logout', async () => {
    await loginPage.login(validUsername, validPassword);

    await loginPage.expectSuccessfulLoginMessage();

    await loginPage.clickLogout();

    await loginPage.expectSuccessfulLogoutMessage();

    await browser.url('https://the-internet.herokuapp.com/secure');

    await loginPage.expectFlashMessageToContain(
         'You must login to view the secure area!'
    );

    await expect(loginPage.usernameInput).toBeDisplayed();
    await expect(loginPage.passwordInput).toBeDisplayed();
});

});