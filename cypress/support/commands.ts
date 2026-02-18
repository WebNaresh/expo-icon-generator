/// <reference types="cypress" />

/**
 * Creates a minimal valid 10x10 PNG image buffer.
 * Used across tests for file upload, paste, and drag-drop.
 */
Cypress.Commands.add("createTestPng", () => {
  // 100x100 solid blue PNG — large enough for Sharp extract/resize operations
  return cy.wrap(
    Cypress.Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAPoAAAD6AG1e1JrAAABcElEQVR4nO2SsREAMBCCflj3X4G02UALCnpOvAsIOxvUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHBIBk+Ql1AMEiGj1AXEAyS4SPUBQSDZPgIdQHh3+AB2D0ZlKD4II0AAAAASUVORK5CYII=",
      "base64"
    )
  );
});

/**
 * Uploads a test PNG file to the file input.
 * Handles the entire upload flow and waits for the preview to appear.
 */
Cypress.Commands.add("uploadTestImage", (fileName = "test-icon.png") => {
  cy.createTestPng().then((buffer) => {
    cy.get('input[type="file"]').selectFile(
      {
        contents: buffer,
        fileName,
        mimeType: "image/png",
      },
      { force: true }
    );
  });
  // Wait for upload preview to appear
  cy.contains(fileName, { timeout: 5000 }).should("be.visible");
});

/**
 * Generates icons after uploading a file.
 * Clicks the generate button and waits for results.
 */
Cypress.Commands.add("generateIcons", () => {
  cy.intercept("POST", "/api/generate-icons").as("generateIconsCmd");
  cy.contains("button", "Generate All Icons").click();
  cy.wait("@generateIconsCmd", { timeout: 30000 });
  cy.contains("assets generated", { timeout: 10000 }).should("be.visible");
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      createTestPng(): Chainable;
      uploadTestImage(fileName?: string): Chainable<void>;
      generateIcons(): Chainable<void>;
    }
  }
}

export {};
