import { expect } from '@wdio/globals';
import BasePage from './BasePage';

class ChromePage extends BasePage {

    get chromeIcon() {
        return $('~Chrome');
    }

    async expectChromeDisplayed(): Promise<void> {
        await expect(this.chromeIcon).toBeDisplayed();
    }

    async openChrome(): Promise<void> {
        await this.chromeIcon.click();
    }

}

export default new ChromePage();