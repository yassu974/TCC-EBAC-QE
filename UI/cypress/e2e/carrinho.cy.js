/// <reference types="cypress" />

import { cartPage } from '../support/pages/cart.page';

describe('US-0001 - Adicionar item ao carrinho', () => {
  afterEach(() => {
    cy.clearCart();
  });

  it('CT-001 - Deve adicionar produto variável ao carrinho com sucesso', () => {
    cy.addVariableProductToCart({
      slug: 'ingrid-running-jacket',
      size: 'XS',
      color: 'Orange',
      qty: 1
    });
  });

  it('CT-003 - Não deve permitir adicionar mais de 10 itens (Regra não implementada)', () => {
    cy.addVariableProductToCart({
      slug: 'ingrid-running-jacket',
      size: 'XS',
      color: 'Orange',
      qty: 11
    });
    cartPage.openCart();
    cartPage.getQuantity()
      .should('have.value', '11');
  });

  it('CT-006 - Não deve permitir ultrapassar R$990 (Regra não implementada)', () => {
    cy.addVariableProductToCart({
      slug: 'ingrid-running-jacket',
      size: 'XS',
      color: 'Orange',
      qty: 12
    });
    cartPage.openCart();
    cartPage.getTotal()
      .invoke('text')
      .then((totalText) => {
        const total = parseFloat(
          totalText
            .replace('R$', '')
            .replace('.', '')
            .replace(',', '.')
            .trim()
        );
        expect(total).to.be.greaterThan(990);
      });
  });
});