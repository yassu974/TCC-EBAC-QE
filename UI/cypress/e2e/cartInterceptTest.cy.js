/// <reference types="cypress" />

const { email, senha } = require('../fixtures/data.json');

describe('Fluxo de inclusão e edição de produtos no carrinho com Intercept', () => {
  beforeEach(() => {
  cy.setCookie('ebacStoreVersion', 'v2', { domain: 'lojaebac.ebaconline.art.br' });
  cy.visit('/');

  cy.intercept('GET', '**/public/getCart*').as('getCart');
  cy.intercept('PUT', '**/public/updateCart/*', (req) => {
    req.continue((res) => {
      expect(res.statusCode).to.eq(200);
      expect(res.body).to.exist;
    });
  }).as('updateCart');
  cy.intercept('POST', '**/public/authUser').as('authUser');
  cy.intercept('GET', '**/api/getUserAddresses').as('getUserAddresses');
});

  it('Deve fazer o login, esvaziar carrinho e incluir um produto no carrinho', () => {
    cy.loginViaUI(email, senha);
    cy.wait(['@authUser', '@getUserAddresses']);

    cy.clearCart();
    cy.wait('@getCart');

    cy.openRandomInStockProduct();
    cy.addRandomAvailableProductToCart();

    cy.wait(['@updateCart', '@getCart']);
    cy.contains(/My Cart/i).should('be.visible');
  });

  it('Deve aumentar a quantidade de itens no carrinho', () => {
    cy.loginViaUI(email, senha);
    cy.clearCart();
    cy.openRandomInStockProduct();
    cy.addRandomAvailableProductToCart();
    cy.wait(['@updateCart', '@getCart']);

    cy.get('[data-testid="addItem"]').first().click();

    cy.wait(['@updateCart', '@getCart']);

    cy.contains(/My Cart/i).should('be.visible');
    cy.get('[data-testid="addItem"]').should('exist');
  });

  it('Deve remover o item do carrinho', () => {
  cy.loginViaUI(email, senha);
  cy.clearCart();
  cy.openRandomInStockProduct();
  cy.addRandomAvailableProductToCart();
  cy.wait(['@updateCart', '@getCart']);
  cy.contains(/My Cart/i).should('be.visible');

  cy.get('[data-testid="remove"]').filter(':visible').first().scrollIntoView().click();
  cy.wait('@updateCart');
  cy.wait('@getCart');

  const ensureCartEmpty = (tries = 3) => {
    cy.get('body').then(($b) => {
      const isEmpty = /Your cart is empty/i.test($b.text());
      const removeCount = $b.find('[data-testid="remove"]').length;

      if (isEmpty) {
        cy.contains(/Your cart is empty/i).should('be.visible');
        return;
      }

      if (removeCount > 0 && tries > 0) {
        cy.get('[data-testid="remove"]').filter(':visible').first().scrollIntoView().click();
        cy.wait('@updateCart');
        cy.wait('@getCart');
        ensureCartEmpty(tries - 1);
      } else {
        cy.get('[data-testid="remove"]').should('have.length', 0);
      }
    });
  };

  ensureCartEmpty();
});
});