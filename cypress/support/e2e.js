require('./commands');
require('cypress-mochawesome-reporter/register');

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    cy.screenshot({ capture: 'runner' });
  }
});