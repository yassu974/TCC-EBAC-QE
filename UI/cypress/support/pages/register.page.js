/// <reference types="cypress" />

class RegisterPage {
  get firstName()       { return cy.get('[data-testid="firstName"]'); }
  get lastName()        { return cy.get('[data-testid="lastName"]'); }
  get phone()           { return cy.get('[data-testid="phone"]'); }
  get email()           { return cy.get(':nth-child(7) > .css-175oi2r > [data-testid="email"]'); }
  get password()        { return cy.get(':nth-child(8) > .css-175oi2r > [data-testid="password"]'); }
  get confirmPassword() { return cy.get('[data-testid="repassword"]'); }
  get btnCreate()       { return cy.get('[data-testid="create"]'); }

  fillForm({ firstName, lastName, phone, email, password, confirmPassword }) {
    this.firstName.type(firstName);
    this.lastName.type(lastName);
    this.phone.type(phone);
    this.email.type(email);
    this.password.type(password);
    this.confirmPassword.type(confirmPassword ?? password);
  }

  submit() {
    this.btnCreate.click();
  }

  createAccount(user) {
    this.fillForm(user);
    this.submit();
  }
}

module.exports = new RegisterPage();