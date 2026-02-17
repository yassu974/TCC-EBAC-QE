class CatalogPage {

    // ===== SELECTORS =====

    get browseTab() {
        return $('android=new UiSelector().descriptionContains("Browse")');
    }

    get homeTab() {
        return $('android=new UiSelector().resourceId("tab-home")');
    }

    get productPrice() {
        return $('(//android.widget.TextView[contains(@text,"R$")])[1]');
    }

    // ===== ACTIONS =====

    async goToBrowseWithReset() {
        // Primeiro clique no Browse
        await this.browseTab.waitForDisplayed({ timeout: 10000 });
        await this.browseTab.click();

        await browser.pause(2000);

        // Vai para Home
        await this.homeTab.waitForDisplayed({ timeout: 10000 });
        await this.homeTab.click();

        await browser.pause(2000);

        // Volta para Browse
        await this.browseTab.waitForDisplayed({ timeout: 10000 });
        await this.browseTab.click();

        await browser.pause(3000); // tempo extra para API carregar
    }

    async waitForProductsToLoad() {
        await browser.waitUntil(async () => {
            const elements = await $$('//android.widget.TextView[contains(@text,"R$")]');
            return elements.length > 0;
        }, {
            timeout: 15000,
            timeoutMsg: 'Produtos não carregaram na tela de Browse'
        });
    }

    async getCatalogPrice() {
        await this.productPrice.waitForDisplayed({ timeout: 10000 });
        return await this.productPrice.getText();
    }
}

module.exports = new CatalogPage();