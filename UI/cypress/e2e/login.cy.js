describe('US-0002 - Login na Plataforma', () => {

  beforeEach(() => {
    cy.visit('http://localhost/minha-conta/');
  });

  it('CT-007 - Deve fazer login com credenciais válidas', () => {
    cy.fixture('data').then((dados) => {
      cy.get('#username').clear().type(dados.email);
      cy.get('#password').clear().type(dados.senha);

      cy.get('.woocommerce-form > .button')
        .click();

      cy.get('body')
        .should('contain', 'Welcome');

      cy.contains('a', 'Logout')
        .click();

      cy.get('body')
        .should('not.contain', 'Welcome')
        .and('not.contain', 'Logout');
    });

  });
  it('CT-008 - Deve exibir erro ao informar senha inválida', () => {
    cy.fixture('data').then((dados) => {
      cy.get('#username').clear().type(dados.email);
      cy.get('#password').clear().type('SenhaInvalida123');

      cy.get('.woocommerce-form > .button')
        .click();

      cy.get('.woocommerce-error')
        .should('be.visible')
        .and('contain', 'Erro');

      cy.get('body')
        .should('not.contain', 'Welcome');
    });

  });

  it('CT-010 - Não deve bloquear usuário após 3 tentativas inválidas (Regra não implementada)', () => {
    cy.fixture('data').then((dados) => {
      for (let i = 1; i <= 3; i++) {

        cy.get('#username').clear().type(dados.email);
        cy.get('#password').clear().type('SenhaInvalida123');

        cy.get('.woocommerce-form > .button')
          .click();

        cy.get('.woocommerce-error')
          .should('be.visible');

      }

      cy.get('#username').clear().type(dados.email);
      cy.get('#password').clear().type('SenhaInvalida123');

      cy.get('.woocommerce-form > .button')
        .click();

      cy.get('.woocommerce-error')
        .should('be.visible');

      cy.get('body')
        .should('not.contain', 'bloqueado');

    });

  });

});