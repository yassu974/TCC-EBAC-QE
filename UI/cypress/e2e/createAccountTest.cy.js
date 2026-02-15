/// <reference types="cypress" />

const { homePage }      = require('../support/pages/home.page');
const loginPage         = require('../support/pages/login.page');
const registerPage      = require('../support/pages/register.page');
const { profilePage }   = require('../support/pages/profile.page');
const {
  uniqueEmail,
  uniquePhone,
  randomFirstName,
  randomLastName,
  uniquePassword,
} = require('../support/utils');

describe('Fluxo de criação de conta', () => {
  beforeEach(() => {
    cy.setCookie('ebacStoreVersion', 'v2', { domain: 'lojaebac.ebaconline.art.br' });
    cy.visit('/');
  });

  it('Deve criar a conta (dados dinâmicos)', () => {
    const user = {
      firstName: randomFirstName(),
      lastName:  randomLastName(),
      phone:     uniquePhone(),
      email:     uniqueEmail(),
      password:  uniquePassword(12),
    };

    homePage.openMenu('Account');
    loginPage.goToRegister();
    registerPage.createAccount(user);

    homePage.openMenu('Account');
    profilePage.customerName().should('contain', user.firstName);
  });
});