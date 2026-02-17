const assert = require('assert');
const catalogPage = require('../pages/catalog.page');

describe('Mobile - Catálogo de Produtos', () => {

    it('Deve validar navegação e preço do produto', async () => {

        // Navegação com reset
        await catalogPage.goToBrowseWithReset();

        // Esperar produtos carregarem
        await catalogPage.waitForProductsToLoad();

        // Capturar preço
        const catalogPrice = await catalogPage.getCatalogPrice();

        console.log('Preço capturado:', catalogPrice);

        assert.ok(catalogPrice.includes('R$'), 'Preço não encontrado no catálogo');
    });

});