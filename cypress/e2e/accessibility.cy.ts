/**
 * Accessibility & Dark Theme Tests
 * Validates dark theme, responsive design, and basic a11y.
 */

describe("Dark Theme", () => {
  it("should have dark class on html element", () => {
    cy.visit("/");
    cy.get("html").should("have.class", "dark");
  });

  it("should have dark background on body", () => {
    cy.visit("/");
    cy.get("body").should("have.css", "background-color").and("not.equal", "rgb(255, 255, 255)");
  });

  it("should maintain dark theme across pages", () => {
    const pages = ["/", "/blog", "/faq", "/tutorials", "/contributors"];
    pages.forEach((path) => {
      cy.visit(path);
      cy.get("html").should("have.class", "dark");
    });
  });
});

describe("Responsive Design", () => {
  const viewports: Cypress.ViewportPreset[] = ["iphone-6", "ipad-2", "macbook-15"];

  viewports.forEach((viewport) => {
    it(`should render homepage on ${viewport}`, () => {
      cy.viewport(viewport);
      cy.visit("/");
      cy.get("h1").should("be.visible");
      cy.get("nav").should("be.visible");
    });
  });
});

describe("Basic Accessibility", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have lang attribute on html", () => {
    cy.get("html").should("have.attr", "lang", "en");
  });

  it("should have only one H1 per page", () => {
    cy.get("h1").should("have.length", 1);
  });

  it("should have alt text on all images", () => {
    cy.get("img").each(($img) => {
      cy.wrap($img).should("have.attr", "alt").and("not.be.empty");
    });
  });

  it("should have visible focus indicators on interactive elements", () => {
    cy.get("a").first().focus();
    cy.get("a").first().should("have.css", "outline-style").and("not.equal", "none");
  });

  it("should have proper form labels or aria-labels", () => {
    cy.get('input[type="file"]').should("exist");
    // The upload area has an aria-label
    cy.get('[aria-label*="Upload"]').should("exist");
  });
});

describe("404 Page", () => {
  it("should show not found for invalid routes", () => {
    cy.visit("/this-page-does-not-exist", { failOnStatusCode: false });
    cy.contains("404").should("be.visible");
  });

  it("should show not found for invalid blog slug", () => {
    cy.visit("/blog/non-existent-blog-post", { failOnStatusCode: false });
    cy.contains("404").should("be.visible");
  });
});

describe("PWA & Manifest", () => {
  it("should serve manifest.webmanifest", () => {
    cy.request("/manifest.webmanifest").then((response) => {
      expect(response.status).to.eq(200);
      const manifest = response.body;
      expect(manifest).to.have.property("name");
      expect(manifest).to.have.property("icons");
    });
  });

  it("should serve robots.txt", () => {
    cy.request("/robots.txt").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.contain("Sitemap");
      expect(response.body).to.contain("User-agent");
    });
  });

  it("should serve sitemap.xml", () => {
    cy.request("/sitemap.xml").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.contain("<urlset");
    });
  });
});
