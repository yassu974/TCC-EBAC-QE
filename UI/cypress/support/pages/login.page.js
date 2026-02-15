/// <reference types="cypress" />

class LoginPage {
  get email()      { return cy.get('[data-testid="email"]'); }
  get password()   { return cy.get('[data-testid="password"]'); }
  get btnLogin()   { return cy.get('[data-testid="btnLogin"]'); }
  get linkSignUp() { return cy.get('[data-testid="signUp"]'); }

  login(email, password) {
    this.email.type(email);
    this.password.type(password);
    this.btnLogin.click();
  }

  goToRegister() {
    this.linkSignUp.click();
  }
}

module.exports = new LoginPage();