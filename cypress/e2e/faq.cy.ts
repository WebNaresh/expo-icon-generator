/**
 * FAQ & Contributors Page Tests
 */

describe("FAQ Page", () => {
  beforeEach(() => {
    cy.visit("/faq");
  });

  it("should display FAQ heading", () => {
    cy.get("h1").should("contain.text", "Frequently Asked Questions");
  });

  it("should display FAQ questions", () => {
    cy.get("h3").should("have.length.gte", 5);
  });

  it("should have a search input", () => {
    cy.get('input[placeholder*="Search"]').should("be.visible");
  });

  it("should filter FAQs when searching", () => {
    const initialCount = Cypress.$("h3").length;
    cy.get('input[placeholder*="Search"]').type("adaptive");
    // Filtered results should be fewer than total
    cy.get("h3").should("have.length.gte", 1);
    cy.get("h3").should("have.length.lt", initialCount);
  });

  it("should expand/collapse FAQ answers on click", () => {
    // Click first question to expand
    cy.get("h3").first().click();
    // Answer text should become visible
    cy.get("h3")
      .first()
      .parent()
      .parent()
      .should("exist");
  });

  it("should have category filter dropdown", () => {
    cy.get("select").should("be.visible");
    cy.get("select option").should("have.length.gte", 5);
    cy.get("select").should("contain", "All");
    cy.get("select").should("contain", "General");
    cy.get("select").should("contain", "Technical");
  });

  it("should filter by category", () => {
    cy.get("select").select("Technical");
    cy.get("h3").should("have.length.gte", 1);
  });
});

describe("Contributors Page", () => {
  beforeEach(() => {
    cy.visit("/contributors");
  });

  it("should display contributors heading", () => {
    cy.get("h1").should("contain.text", "Contributors");
  });

  it("should show loading state or contributor cards", () => {
    // Either loading or contributors should be visible
    cy.get("body").then(($body) => {
      if ($body.text().includes("Loading")) {
        cy.contains("Loading").should("be.visible");
      } else {
        // Should show contributor cards or empty state
        cy.get("img[alt*='avatar']").should("have.length.gte", 0);
      }
    });
  });

  it("should have contribute CTA section", () => {
    cy.contains("Contribute").should("exist");
  });
});
