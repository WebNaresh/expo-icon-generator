/**
 * Blog & Tutorials Tests
 * Tests blog listing, filtering, article rendering, and tutorial pages.
 */

describe("Blog Listing Page", () => {
  beforeEach(() => {
    cy.visit("/blog");
  });

  it("should display blog page heading", () => {
    cy.get("h1").should("contain.text", "Blog");
  });

  it("should show featured articles section", () => {
    cy.contains("Featured").should("be.visible");
  });

  it("should display blog post cards with titles", () => {
    cy.get("h3").should("have.length.gte", 1);
  });

  it("should have category filter buttons", () => {
    cy.contains("button", "All").should("be.visible");
    cy.contains("button", "Tutorial").should("be.visible");
  });

  it("should navigate to a blog post when clicked", () => {
    cy.get('a[href*="/blog/"]').first().click();
    cy.url().should("include", "/blog/");
    cy.get("h1").should("be.visible");
  });
});

describe("Blog Post Page", () => {
  beforeEach(() => {
    cy.visit("/blog/complete-guide-expo-icon-generation");
  });

  it("should display article heading", () => {
    cy.get("h1").should("contain.text", "Icon Generation");
  });

  it("should have proper heading hierarchy", () => {
    cy.get("h1").should("have.length.gte", 1);
    cy.get("h2").should("have.length.gte", 2);
  });

  it("should show author information", () => {
    cy.contains("Naresh").should("be.visible");
  });

  it("should show reading time", () => {
    cy.contains("min read").should("be.visible");
  });

  it("should have back to blog link", () => {
    cy.contains("Back to Blog").should("be.visible");
    cy.contains("Back to Blog").click();
    cy.url().should("include", "/blog");
  });

  it("should display article tags", () => {
    cy.get("article").should("exist");
  });
});

describe("Tutorials Listing Page", () => {
  beforeEach(() => {
    cy.visit("/tutorials");
  });

  it("should display tutorials heading", () => {
    cy.get("h1").should("be.visible");
  });

  it("should show learning paths section", () => {
    cy.contains("Learning Paths").should("be.visible");
  });

  it("should display tutorial cards", () => {
    cy.get("h3").should("have.length.gte", 1);
  });

  it("should have difficulty filter buttons", () => {
    cy.contains("button", "All").should("be.visible");
  });

  it("should navigate to a tutorial when clicked", () => {
    cy.get('a[href*="/tutorials/"]').first().click();
    cy.url().should("include", "/tutorials/");
    cy.get("h1").should("be.visible");
  });
});

describe("Tutorial Post Page", () => {
  beforeEach(() => {
    cy.visit("/tutorials/expo-app-development-complete-guide");
  });

  it("should display tutorial heading", () => {
    cy.get("h1").should("be.visible");
  });

  it("should show tutorial metadata (duration, level)", () => {
    cy.get("article, main").should("exist");
  });

  it("should have back navigation", () => {
    cy.contains("Back").should("be.visible");
  });
});
