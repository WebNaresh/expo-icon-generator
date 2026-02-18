// Support file for Cypress e2e tests
// Runs before every spec file

import "./commands";

// Suppress uncaught exceptions from the app (e.g. hydration errors, third-party scripts)
Cypress.on("uncaught:exception", () => false);
