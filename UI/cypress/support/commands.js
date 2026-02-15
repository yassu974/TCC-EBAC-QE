/// <reference types="cypress" />

const { homePage }    = require('./pages/home.page');
const loginPage       = require('./pages/login.page');
const { profilePage } = require('./pages/profile.page');

Cypress.Commands.add('loginViaUI', (email, password) => {
  homePage.openMenu('Account');
  loginPage.login(email, password);

  homePage.openMenu('Account');
  profilePage.customerName().should('be.visible');

  homePage.goHome();
});

Cypress.Commands.add('clearCart', () => {
  cy.log('Abrindo o carrinho');
  cy.get('.r-mh9cjk > .r-18u37iz > :nth-child(2) > .css-146c3p1')
    .filter(':visible')
    .last()
    .click();

  const removeSel = '[data-testid="remove"], [data-testid="removeFromCart"]';
  const emptyMsgRx = /Your cart is empty/i;

  function removeAll() {
    cy.get('body').then(($body) => {
      const count = $body.find(removeSel).length;

      if (count === 0) {
        cy.log('Validando carrinho vazio');
        if ($body.text().match(emptyMsgRx)) {
          cy.contains(emptyMsgRx).should('be.visible');
        } else {
          cy.wrap($body.find(removeSel)).should('have.length', 0);
        }
        cy.log('Voltando para Home');
        homePage.goHome();
        return;
      }

      cy.get(removeSel).first().scrollIntoView().click();

      cy.get('body').should(($b) => {
        const newCount = $b.find(removeSel).length;
        expect(newCount, 'quantidade de itens após remoção').to.be.lessThan(count);
      });

      removeAll();
    });
  }

  removeAll();
});

Cypress.Commands.add('goToBrowse', () => {
  homePage.openMenu('Browse');
});

Cypress.Commands.add('openRandomInStockProduct', (maxTries = 6) => {
  function tryOne(triesLeft) {
    cy.get('[data-testid="productDetails"]').filter(':visible').then(($els) => {
      expect($els.length, 'produtos em Browse').to.be.greaterThan(0);
      const idx = Cypress._.random(0, $els.length - 1);
      cy.wrap($els.eq(idx)).scrollIntoView().click();
    });

    cy.get('[data-testid="addToCart"]', { timeout: 10000 })
      .should('be.visible')
      .then(($btn) => {
        const disabled = $btn.is(':disabled') || $btn.attr('aria-disabled') === 'true';
        if (disabled) {
          if (triesLeft > 1) {
            homePage.openMenu('Browse');
            tryOne(triesLeft - 1);
          } else {
            throw new Error('Não encontrei produto com estoque após várias tentativas.');
          }
        }
      });
  }

  cy.url().then((u) => {
    if (!/\/Tab\/Browse/i.test(u)) homePage.openMenu('Browse');
  });

  tryOne(maxTries);
});

Cypress.Commands.add('addRandomAvailableProductToCart', (maxTries = 6) => {
  function tryOne(triesLeft) {
    cy.url().then((u) => {
      if (!/\/Tab\/Browse/i.test(u)) homePage.openMenu('Browse');
    });

    cy.get('[data-testid="productDetails"]').filter(':visible').then(($els) => {
      expect($els.length, 'produtos em Browse').to.be.greaterThan(0);
      const idx = Cypress._.random(0, $els.length - 1);
      cy.wrap($els.eq(idx)).scrollIntoView().click();
    });

    cy.get('[data-testid="addToCart"]', { timeout: 10000 }).should('be.visible').click();

    cy.get('body', { timeout: 6000 }).then(($b) => {
      const isCart =
        /cart/i.test(window.location.href) ||
        $b.find('[data-testid="selectAddressOrContinueToPayment"]').length > 0 ||
        /My Cart/i.test($b.text());

      if (!isCart) {
        if (triesLeft > 1) {
          homePage.openMenu('Browse');
          tryOne(triesLeft - 1);
        } else {
          throw new Error('Não consegui adicionar nenhum produto ao carrinho após várias tentativas.');
        }
      }
    });
  }

  tryOne(maxTries);
});

Cypress.Commands.add('continueToPayment', () => {
  cy.get('[data-testid="selectAddressOrContinueToPayment"]').click();
});

Cypress.Commands.add('completeCheckout', () => {
  cy.get('[data-testid="completeCheckout"]').click();
});

Cypress.Commands.add('assertOrderSuccess', () => {
  cy.contains(/Order Success/i).should('be.visible');

  cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > [style="background-color: rgb(242, 242, 242); display: flex;"] > :nth-child(1) > :nth-child(1) > .r-13awgt0 > :nth-child(1) > .css-175oi2r > .css-146c3p1')
    .should('be.visible');
});