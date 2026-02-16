const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'UI/cypress/reports/html',
    charts: true,
    reportPageTitle: 'EBAC Store E2E',
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: false,
    saveAllAttempts: false,
  },

  e2e: {
    baseUrl: 'http://localhost',
    specPattern: 'UI/cypress/e2e/**/*.cy.js',
    fixturesFolder: 'UI/cypress/fixtures',
    supportFile: 'UI/cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },

    screenshotsFolder: 'UI/cypress/reports/screenshots',
    videosFolder: 'UI/cypress/reports/videos',
  },
});