import { expect } from '@wdio/globals';
import SauceDemoPage from '../pageobjects/SauceDemoPage';
import { createUser } from './test-data/user-data';

describe('SauceDemo authentication', () => {
    const sauceDemoPage = new SauceDemoPage();

     const successfulUsers = [
        { userKey: 'standard', description: 'standard user' },
        { userKey: 'problem', description: 'problem user' },
        { userKey: 'performanceGlitch', description: 'performance glitch user' },
    ] as const;

    successfulUsers.forEach(({ userKey, description }) => {
    it(`should login successfully with ${description}`, async () => {
        const user = createUser(userKey);

        await sauceDemoPage.open();
        await sauceDemoPage.login(user.username, user.password);
        await sauceDemoPage.expectSuccessfulLogin();
        });
    });

    it('should not login with locked out user', async () => {
        const user = createUser('lockedOut');

        await sauceDemoPage.open();
        await sauceDemoPage.login(user.username, user.password);
    
        const errorMessage = await sauceDemoPage.getLoginError();

         await expect(errorMessage).toBe(
        'Epic sadface: Sorry, this user has been locked out.'
        );
    });

 });
