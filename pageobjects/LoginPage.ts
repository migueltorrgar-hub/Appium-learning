import BasePage from './BasePage';
import { expect } from '@wdio/globals';

class LoginPage extends BasePage {
    get usernameInput() {
        return $('#username');
    }

    get passwordInput() {
        return $('#password');
    }

    get loginButton() {
        return $('button[type="submit"]');
    }

    get logoutButton() {
    return $('a[href="/logout"]');
}

    get flashMessage() {
        return $('#flash');
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.setValue(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.setValue(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

     async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async clickLogout(): Promise<void> {
    await this.logoutButton.click();
    }

    async getFlashMessage(): Promise<string> {
    await this.flashMessage.waitForDisplayed({ timeout: 5000 });
    return (await this.flashMessage.getText()).trim();
}

    async isFlashMessageDisplayed(): Promise<boolean> {
    return await this.flashMessage.isDisplayed();
    }

    async expectFlashMessageToContain(expectedText: string): Promise<void> {
    await expect(this.flashMessage).toBeDisplayed();
    await expect(this.flashMessage).toHaveText(
        expect.stringContaining(expectedText)
    );
}

    async expectSuccessfulLoginMessage(): Promise<void> {
    await this.expectFlashMessageToContain(
        'You logged into a secure area!'
    );
}

    async expectSuccessfulLogoutMessage(): Promise<void> {
    await this.expectFlashMessageToContain(
        'You logged out of the secure area!'
    );
}

}

export default LoginPage;