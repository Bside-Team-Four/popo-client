module.exports = {
  // set your project id: https://cloud.cypress.io/
  projectId: '76a23h',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(_on, _config) {
      // ...
    },
    baseUrl: 'http://localhost:3000',
  },
};
