/**
 * SEO Tests
 * Validates meta tags, canonical URLs, structured data, and SEO elements.
 */

describe("SEO - Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have a single H1 tag", () => {
    cy.get("h1").should("have.length", 1);
  });

  it("should have meta description", () => {
    cy.get('meta[name="description"]')
      .should("have.attr", "content")
      .and("contain", "Expo");
  });

  it("should have canonical URL pointing to root", () => {
    cy.get('link[rel="canonical"]')
      .should("have.attr", "href")
      .and("contain", "expo-assets-generator.vercel.app");
  });

  it("should have Open Graph tags", () => {
    cy.get('meta[property="og:title"]').should("exist");
    cy.get('meta[property="og:description"]').should("exist");
    cy.get('meta[property="og:type"]')
      .should("have.attr", "content", "website");
    cy.get('meta[property="og:image"]').should("exist");
  });

  it("should have Twitter Card tags", () => {
    cy.get('meta[name="twitter:card"]')
      .should("have.attr", "content", "summary_large_image");
    cy.get('meta[name="twitter:title"]').should("exist");
  });

  it("should have robots meta allowing indexing", () => {
    cy.get('meta[name="robots"]')
      .should("have.attr", "content")
      .and("contain", "index");
  });

  it("should have google-site-verification (single, no placeholder)", () => {
    cy.get('meta[name="google-site-verification"]').should("have.length", 1);
    cy.get('meta[name="google-site-verification"]')
      .should("have.attr", "content")
      .and("not.equal", "your-google-verification-code");
  });

  it("should have structured data scripts", () => {
    cy.get('script[type="application/ld+json"]').should("have.length.gte", 1);
  });
});

describe("SEO - Canonical URLs on subpages", () => {
  const pages = [
    { path: "/blog", expected: "/blog" },
    { path: "/tutorials", expected: "/tutorials" },
    { path: "/faq", expected: "/faq" },
    { path: "/privacy", expected: "/privacy" },
    { path: "/terms", expected: "/terms" },
    { path: "/contributors", expected: "/contributors" },
  ];

  pages.forEach(({ path, expected }) => {
    it(`${path} should have correct canonical URL`, () => {
      cy.visit(path);
      cy.get('link[rel="canonical"]')
        .should("have.attr", "href")
        .and("contain", expected);
    });
  });
});

describe("SEO - Blog Post Pages", () => {
  it("should have article-specific Open Graph type", () => {
    cy.visit("/blog/complete-guide-expo-icon-generation");
    cy.get('meta[property="og:type"]')
      .should("have.attr", "content", "article");
  });

  it("should have canonical URL matching slug", () => {
    cy.visit("/blog/icon-design-best-practices");
    cy.get('link[rel="canonical"]')
      .should("have.attr", "href")
      .and("contain", "/blog/icon-design-best-practices");
  });
});
