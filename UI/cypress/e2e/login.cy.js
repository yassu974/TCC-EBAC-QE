/// <reference types="cypress" />

import { loginPage } from '../support/pages/login.page';

describe('US-0002 - Login na Plataforma', () => {
  let user;

  before(() => {
    cy.createAccount();

    cy.get('@createdUser').then((u) => {
      user = u;
    });

    cy.contains('Logout').click();
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it('CT-007 - Deve fazer login com credenciais válidas', () => {
    loginPage.login(user.email, user.password);

    cy.get('body')
      .should('contain', 'Logout');

    loginPage.logout();

    cy.get('body')
      .should('not.contain', 'Logout');
  });

  it('CT-008 - Deve exibir erro ao informar senha inválida', () => {
    loginPage.login(user.email, 'SenhaInvalida123');

    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Erro');

    cy.get('body')
      .should('not.contain', 'Logout');
  });

  it('CT-010 - Não deve bloquear usuário após 3 tentativas inválidas (Regra não implementada)', () => {
    for (let i = 1; i <= 3; i++) {
      loginPage.login(user.email, 'SenhaInvalida123');
      loginPage.getErrorMessage().should('be.visible');
    }

    loginPage.login(user.email, 'SenhaInvalida123');
    loginPage.getErrorMessage().should('be.visible');

    cy.get('body')
      .should('not.contain', 'bloqueado');
  });

});