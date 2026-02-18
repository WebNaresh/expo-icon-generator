/**
 * Page Accessibility & Rendering Tests
 * Visits every page in the sitemap and verifies core elements render correctly.
 */

describe("Page Rendering", () => {
  const pages = [
    { path: "/", title: "Expo Assets Generator" },
    { path: "/blog", title: "Blog" },
    { path: "/tutorials", title: "Tutorials" },
    { path: "/faq", title: "FAQ" },
    { path: "/contributors", title: "Contributors" },
    { path: "/privacy", title: "Privacy Policy" },
    { path: "/terms", title: "Terms" },
    { path: "/thanks-gift", title: "Support" },
  ];

  pages.forEach(({ path, title }) => {
    it(`should load ${path} with correct title`, () => {
      cy.visit(path);
      cy.title().should("contain", title);
    });
  });

  const blogSlugs = [
    "complete-guide-expo-icon-generation",
    "ios-android-icon-requirements-2024",
    "icon-design-best-practices",
    "automated-icon-generation-workflow",
    "app-store-optimization-icons",
    "react-native-icon-performance",
  ];

  blogSlugs.forEach((slug) => {
    it(`should load blog post /blog/${slug}`, () => {
      cy.visit(`/blog/${slug}`);
      cy.get("h1").should("exist").and("be.visible");
      cy.title().should("contain", "Expo Icon Generator Blog");
    });
  });

  const tutorialSlugs = [
    "expo-app-development-complete-guide",
    "professional-icon-design-masterclass",
    "react-native-performance-optimization",
    "app-store-submission-guide",
    "adaptive-icons-android-tutorial",
    "expo-eas-build-deployment",
  ];

  tutorialSlugs.forEach((slug) => {
    it(`should load tutorial /tutorials/${slug}`, () => {
      cy.visit(`/tutorials/${slug}`);
      cy.get("h1").should("exist").and("be.visible");
      cy.title().should("contain", "Expo Icon Generator Tutorials");
    });
  });
});

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have a visible navbar with navigation links", () => {
    cy.get("nav").should("be.visible");
    cy.get('nav a[href="/blog"]').should("exist");
    cy.get('nav a[href="/tutorials"]').should("exist");
    cy.get('nav a[href="/faq"]').should("exist");
    cy.get('nav a[href="/contributors"]').should("exist");
  });

  it("should navigate to blog page via navbar", () => {
    cy.get('nav a[href="/blog"]').click();
    cy.url().should("include", "/blog");
    cy.get("h1").should("contain.text", "Blog");
  });

  it("should navigate to tutorials page via navbar", () => {
    cy.get('nav a[href="/tutorials"]').click();
    cy.url().should("include", "/tutorials");
    cy.get("h1").should("be.visible");
  });

  it("should navigate to FAQ page via navbar", () => {
    cy.get('nav a[href="/faq"]').click();
    cy.url().should("include", "/faq");
    cy.get("h1").should("contain.text", "Frequently Asked Questions");
  });

  it("should have a footer with all sections", () => {
    cy.get("footer").should("be.visible");
    cy.get("footer").within(() => {
      cy.contains("Navigation").should("be.visible");
      cy.contains("Resources").should("be.visible");
      cy.contains("Products").should("be.visible");
    });
  });

  it("should have footer links to legal pages", () => {
    cy.get('footer a[href="/privacy"]').should("exist");
    cy.get('footer a[href="/terms"]').should("exist");
  });
});
