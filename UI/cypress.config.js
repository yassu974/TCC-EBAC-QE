const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'UI/cypress/reports',
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    baseUrl: 'http://localhost',

    specPattern: 'UI/cypress/e2e/**/*.cy.js',
    supportFile: 'UI/cypress/support/e2e.js',
    fixturesFolder: 'UI/cypress/fixtures',

    screenshotsFolder: 'UI/cypress/reports/screenshots',
    videosFolder: 'UI/cypress/reports/videos',

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  }
});