/// <reference types="cypress" />

const homePage = {
  openMenu(menu) {
    return cy.get(`[href="/Tab/${menu}"]`).click();
  },
  goHome() {
    return cy.visit('/');
  },
};

module.exports = { homePage };