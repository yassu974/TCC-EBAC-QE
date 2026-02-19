import { cartPage } from './pages/cart.page';
import { productPage } from './pages/product.page';
import { loginPage } from './pages/login.page';

const { uniqueEmail, uniquePassword } = require('./utils');

// --------------------------------------------------
// LIMPAR CARRINHO
// --------------------------------------------------
Cypress.Commands.add('clearCart', () => {
  cy.visit('/carrinho/');
  cartPage.removeFirstItemIfExists();
});

// --------------------------------------------------
// ADICIONAR PRODUTO VARIÁVEL
// --------------------------------------------------
Cypress.Commands.add('addVariableProductToCart', ({
  slug,
  size,
  color,
  qty = 1
}) => {

  cy.visit(`/product/${slug}/`);

  cy.get('select[name="attribute_size"]')
    .select(size, { force: true });

  cy.get('select[name="attribute_color"]')
    .select(color, { force: true });

  if (qty > 1) {
    cy.get('input.qty')
      .should('be.visible')
      .clear()
      .type(String(qty))
      .trigger('change');
  }

  cy.get('button.single_add_to_cart_button')
    .should('not.have.class', 'disabled')
    .click();

  cy.get('.woocommerce-message', { timeout: 10000 })
    .should('be.visible')
    .and('contain', 'no seu carrinho');
});

// --------------------------------------------------
// LOGIN
// --------------------------------------------------
Cypress.Commands.add('login', (email, password) => {
  loginPage.visit();
  loginPage.login(email, password);
});

// --------------------------------------------------
// CRIAR CONTA DINÂMICA
// --------------------------------------------------
Cypress.Commands.add('createAccount', () => {

  const email = uniqueEmail('qa.ebac', 'teste.com');
  const password = uniquePassword(12);

  cy.visit('/minha-conta/');

  cy.get('#reg_email')
    .should('be.visible')
    .clear()
    .type(email);

  cy.get('#reg_password')
    .should('be.visible')
    .clear()
    .type(password);

  // BOTÃO REGISTER - seletor correto (input submit)
  cy.get('input[name="register"]')
    .should('be.visible')
    .click();

  // valida se entrou na conta
  cy.get('body', { timeout: 10000 })
    .should('contain', 'Logout');

  // salva credenciais criadas
  cy.wrap({ email, password }).as('createdUser');
});