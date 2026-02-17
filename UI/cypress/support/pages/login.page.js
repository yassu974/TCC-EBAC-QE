class LoginPage {

  visit() {
    cy.visit('/minha-conta/');
  }

  getUsernameField() {
    return cy.get('#username');
  }

  getPasswordField() {
    return cy.get('#password');
  }

  getLoginButton() {
    return cy.get('.woocommerce-form > .button');
  }

  fillUsername(username) {
    this.getUsernameField().clear().type(username);
  }

  fillPassword(password) {
    this.getPasswordField().clear().type(password);
  }

  submit() {
    this.getLoginButton().click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  getErrorMessage() {
    return cy.get('.woocommerce-error');
  }

  logout() {
    cy.contains('a', 'Logout').click();
  }

}

export const loginPage = new LoginPage();