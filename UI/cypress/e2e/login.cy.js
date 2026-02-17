/// <reference types="cypress" />

import { loginPage } from '../support/pages/login.page';

describe('US-0002 - Login na Plataforma', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('CT-007 - Deve fazer login com credenciais válidas', () => {
    cy.fixture('data').then((dados) => {
      loginPage.login(dados.email, dados.senha);
      cy.get('body')
        .should('contain', 'Welcome');
      loginPage.logout();
      cy.get('body')
        .should('not.contain', 'Welcome')
        .and('not.contain', 'Logout');
    });
  });

  it('CT-008 - Deve exibir erro ao informar senha inválida', () => {
    cy.fixture('data').then((dados) => {
      loginPage.login(dados.email, 'SenhaInvalida123');
      loginPage.getErrorMessage()
        .should('be.visible')
        .and('contain', 'Erro');
      cy.get('body')
        .should('not.contain', 'Welcome');
    });
  });

  it('CT-010 - Não deve bloquear usuário após 3 tentativas inválidas (Regra não implementada)', () => {
    cy.fixture('data').then((dados) => {
      for (let i = 1; i <= 3; i++) {
        loginPage.login(dados.email, 'SenhaInvalida123');
        loginPage.getErrorMessage().should('be.visible');
      }
      loginPage.login(dados.email, 'SenhaInvalida123');
      loginPage.getErrorMessage().should('be.visible');
      cy.get('body')
        .should('not.contain', 'bloqueado');
    });
  });
});