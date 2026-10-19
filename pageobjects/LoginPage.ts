import BasePage from './BasePage';

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

    async getFlashMessage(): Promise<string> {
        return (await this.flashMessage.getText()).trim();
    }
}

export default LoginPage;