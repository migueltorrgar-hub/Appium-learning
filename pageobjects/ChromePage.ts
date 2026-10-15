import { expect } from '@wdio/globals';


class ChromePage {

    get chromeIcon() {
        return $('~Chrome');
    }

    async expectChromeDisplayed() {
        await expect(this.chromeIcon).toBeDisplayed();
    }

async openChrome() {
    await this.chromeIcon.click();
    }

}

export default new ChromePage();