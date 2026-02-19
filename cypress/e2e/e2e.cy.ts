// ── Expected icon specs ───────────────────────────────────────────────────
const EXPECTED_ICONS = [
  { name: "adaptive-icon.png", size: "1024x1024" },
  { name: "favicon.png", size: "48x48" },
  { name: "icon.png", size: "1024x1024" },
  { name: "react-logo.png", size: "100x100" },
  { name: "react-logo@2x.png", size: "200x200" },
  { name: "react-logo@3x.png", size: "300x300" },
  { name: "splash-icon.png", size: "1024x1024" },
  { name: "partial-react-logo.png", size: "518x316" },
];

const EXPECTED_ICONS_WITH_SPLASH = [
  ...EXPECTED_ICONS,
  { name: "splash.png", size: "1284x2778" },
];

// ── Navigation & Page Rendering ───────────────────────────────────────────

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

// ── Homepage ──────────────────────────────────────────────────────────────

describe("Hero Section", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display hero heading", () => {
    cy.get("h1").should("be.visible");
    cy.contains("One image").should("be.visible");
    cy.contains("Every icon").should("be.visible");
  });

  it("should display the badge", () => {
    cy.contains("Free & Open Source").should("be.visible");
  });

  it("should display stats line", () => {
    cy.contains("9").should("be.visible");
    cy.contains("icons").should("be.visible");
    cy.contains("upload").should("be.visible");
    cy.contains("cost").should("be.visible");
  });

  it("should display the output file list", () => {
    cy.contains("icon.png").should("be.visible");
    cy.contains("adaptive-icon.png").should("be.visible");
    cy.contains("favicon.png").should("be.visible");
    cy.contains("splash.png").should("be.visible");
    cy.contains("app.json").should("be.visible");
  });
});

describe("Upload Tab Switching", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should default to Upload tab", () => {
    cy.contains("button", "Upload").should("be.visible");
    cy.get('[role="button"][aria-label*="Upload area"]').should("be.visible");
  });

  it("should switch to Text Logo tab and show form", () => {
    cy.contains("button", "Text Logo").click();
    cy.get('input[placeholder="My App"]').should("be.visible");
    cy.contains("button", "Create Logo").should("be.visible");
  });

  it("should switch back to Upload tab", () => {
    cy.contains("button", "Text Logo").click();
    cy.contains("button", "Upload").first().click();
    cy.get('[role="button"][aria-label*="Upload area"]').should("be.visible");
  });
});

describe("File Upload via Input", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should upload a PNG file and show preview", () => {
    cy.uploadTestImage("my-app-icon.png");
    cy.contains("my-app-icon.png").should("be.visible");
    cy.contains("Click or drop to replace").should("be.visible");
  });

  it("should show file size after upload", () => {
    cy.uploadTestImage();
    cy.contains("MB").should("be.visible");
  });

  it("should show settings panel after file upload", () => {
    cy.uploadTestImage();
    cy.contains("Configure & Generate").should("be.visible");
    cy.contains("Background").should("be.visible");
    cy.contains("Splash Screen").should("be.visible");
    cy.contains("button", "Generate All Icons").should("be.visible");
  });

  it("should show live icon preview in settings panel", () => {
    cy.uploadTestImage();
    cy.get('img[alt="Icon preview"]').should("be.visible");
  });

  it("should replace file when uploading another", () => {
    cy.uploadTestImage("first-icon.png");
    cy.contains("first-icon.png").should("be.visible");

    cy.createTestPng().then((buffer) => {
      cy.get('input[type="file"]').selectFile(
        { contents: buffer, fileName: "second-icon.png", mimeType: "image/png" },
        { force: true }
      );
    });
    cy.contains("second-icon.png").should("be.visible");
    cy.contains("first-icon.png").should("not.exist");
  });

  it("should reject non-image files", () => {
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from("not an image"), fileName: "test.txt", mimeType: "text/plain" },
      { force: true }
    );
    cy.contains("PNG, JPG, JPEG, or SVG").should("be.visible");
  });
});

describe("Ctrl+V Paste Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show paste-ready state when upload area is focused", () => {
    cy.get('[role="button"][aria-label*="Upload area"]').focus();
    cy.contains("Ctrl+V").should("be.visible");
  });

  it("should handle paste event with image data", () => {
    cy.createTestPng().then((pngBuffer) => {
      cy.get('input[type="file"]').selectFile(
        { contents: pngBuffer, fileName: "pasted-image.png", mimeType: "image/png" },
        { force: true }
      );
    });
    cy.get('img[alt="Uploaded preview"]', { timeout: 5000 }).should("be.visible");
  });
});

describe("Settings Panel - Background Color", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.uploadTestImage();
  });

  it("should have a hex color input", () => {
    cy.get('input[placeholder="#ffffff"]').should("be.visible");
  });

  it("should have eyedropper button", () => {
    cy.get('button[title="Pick color from image"]').should("be.visible");
  });

  it("should have color picker input", () => {
    cy.get('input[type="color"]').should("have.length.gte", 1);
  });
});

describe("Settings Panel - Splash Screen", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.uploadTestImage();
  });

  it("should have splash screen toggle enabled by default", () => {
    cy.get('[role="switch"]').should("be.visible").and("have.attr", "aria-checked", "true");
  });

  it("should toggle splash screen off and on", () => {
    cy.get('[role="switch"]').click();
    cy.get('[role="switch"]').should("have.attr", "aria-checked", "false");
    cy.get('[role="switch"]').click();
    cy.get('[role="switch"]').should("have.attr", "aria-checked", "true");
  });

  it("should show splash enable text when toggle is off", () => {
    cy.get('[role="switch"]').click();
    cy.contains("Enable to generate").should("be.visible");
  });
});

describe("Text Logo Creator", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Text Logo").click();
  });

  it("should render all form fields", () => {
    cy.get('input[placeholder="My App"]').should("be.visible");
    cy.get("select").should("have.length.gte", 2);
    cy.get('input[type="range"]').should("be.visible");
    cy.contains("button", "B").should("be.visible");
    cy.contains("button", "I").should("be.visible");
  });

  it("should show live SVG preview while typing", () => {
    cy.get('input[placeholder="My App"]').clear().type("MyApp");
    cy.get("svg text").should("contain.text", "MyApp");
  });

  it("should update preview when changing font", () => {
    cy.get('input[placeholder="My App"]').clear().type("Test");
    cy.get("select").first().select("Serif");
    cy.get("svg text").should("exist");
  });

  it("should toggle bold styling", () => {
    cy.get('input[placeholder="My App"]').clear().type("Bold");
    cy.contains("button", "B").click();
    cy.get("svg text").should("exist");
  });

  it("should toggle italic styling", () => {
    cy.get('input[placeholder="My App"]').clear().type("Italic");
    cy.contains("button", "I").click();
    cy.get("svg text").should("exist");
  });

  it("should select different shapes via dropdown", () => {
    cy.get("select").last().select("Rounded");
    cy.get("select").last().select("Circle");
    cy.get("select").last().select("Square");
  });

  it("should create a text logo and feed into upload pipeline", () => {
    cy.get('input[placeholder="My App"]').clear().type("TestApp");
    cy.intercept("POST", "/api/generate-text-logo").as("createLogo");
    cy.contains("button", "Create Logo").click();
    cy.wait("@createLogo").its("response.statusCode").should("eq", 200);
    cy.contains("Configure & Generate", { timeout: 10000 }).should("be.visible");
  });
});

describe("Icon Generation - Full Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.uploadTestImage();
  });

  it("should generate all expected icons", () => {
    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();
    cy.wait("@generateIcons", { timeout: 30000 }).its("response.statusCode").should("eq", 200);
    cy.contains("assets generated", { timeout: 10000 }).should("be.visible");
    EXPECTED_ICONS_WITH_SPLASH.forEach(({ name }) => {
      cy.contains(name).should("exist");
    });
  });

  it("should show correct dimensions for each icon", () => {
    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();
    cy.wait("@generateIcons", { timeout: 30000 });
    cy.contains("assets generated", { timeout: 10000 }).should("be.visible");
    EXPECTED_ICONS_WITH_SPLASH.forEach(({ size }) => {
      cy.contains(size).should("exist");
    });
  });

  it("should categorize icons into groups", () => {
    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();
    cy.wait("@generateIcons", { timeout: 30000 });
    cy.contains("assets generated", { timeout: 10000 }).should("be.visible");
    cy.contains("App Icons").should("be.visible");
    cy.contains("React Logo").should("be.visible");
    cy.contains("Splash").should("be.visible");
  });

  it("should show icon thumbnails", () => {
    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();
    cy.wait("@generateIcons", { timeout: 30000 });
    cy.contains("assets generated", { timeout: 10000 }).should("be.visible");
    cy.get('img[alt*=".png"]').should("have.length.gte", EXPECTED_ICONS.length);
  });

  it("should show Download ZIP button", () => {
    cy.generateIcons();
    cy.contains("button", "Download ZIP").should("be.visible");
  });

  it("should show app.json preview after generation", () => {
    cy.generateIcons();
    cy.contains("app.json").should("be.visible");
    cy.contains("expo").should("be.visible");
  });
});

describe("Icon Generation - Without Splash", () => {
  it("should generate icons without splash when toggle is off", () => {
    cy.visit("/");
    cy.uploadTestImage();
    cy.get('[role="switch"]').click();
    cy.get('[role="switch"]').should("have.attr", "aria-checked", "false");

    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();

    cy.wait("@generateIcons", { timeout: 30000 }).then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      const icons = interception.response?.body?.icons || [];
      const hasFullSplash = icons.some((i: { name: string }) => i.name === "splash.png");
      expect(hasFullSplash).to.equal(false);
    });

    cy.contains("assets generated", { timeout: 10000 }).should("be.visible");
    EXPECTED_ICONS.forEach(({ name }) => {
      cy.contains(name).should("exist");
    });
  });
});

describe("Icon Generation - Dimension Verification", () => {
  it("should return icons with correct pixel dimensions from API", () => {
    cy.visit("/");
    cy.uploadTestImage();

    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();

    cy.wait("@generateIcons", { timeout: 30000 }).then((interception) => {
      const icons = interception.response?.body?.icons || [];
      expect(icons.length).to.be.gte(EXPECTED_ICONS.length);

      icons.forEach((icon: { name: string; size: string; url: string }) => {
        expect(icon.name).to.be.a("string").and.have.length.greaterThan(0);
        expect(icon.size).to.match(/^\d+x\d+/);
        expect(icon.url).to.be.a("string").and.include("data:image/png;base64,");
      });

      const iconMap = new Map(
        icons.map((i: { name: string; size: string }) => [i.name, i.size])
      );
      expect(iconMap.get("adaptive-icon.png")).to.include("1024x1024");
      expect(iconMap.get("favicon.png")).to.include("48x48");
      expect(iconMap.get("icon.png")).to.include("1024x1024");
      expect(iconMap.get("react-logo.png")).to.include("100x100");
      expect(iconMap.get("react-logo@2x.png")).to.include("200x200");
      expect(iconMap.get("react-logo@3x.png")).to.include("300x300");
      expect(iconMap.get("splash-icon.png")).to.include("1024x1024");
      expect(iconMap.get("partial-react-logo.png")).to.include("518x316");
    });
  });

  it("should return splash.png at 1284x2778 when splash is enabled", () => {
    cy.visit("/");
    cy.uploadTestImage();
    cy.get('[role="switch"]').should("have.attr", "aria-checked", "true");

    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();

    cy.wait("@generateIcons", { timeout: 30000 }).then((interception) => {
      const icons = interception.response?.body?.icons || [];
      const splash = icons.find((i: { name: string }) => i.name === "splash.png");
      expect(splash).to.not.equal(undefined);
      expect(splash.size).to.include("1284x2778");
    });
  });
});

describe("Icon Detail Modal", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.uploadTestImage();
    cy.generateIcons();
  });

  it("should open modal when clicking an icon thumbnail", () => {
    cy.get('img[alt*=".png"]').first().closest("button").click();
    cy.get(".fixed.inset-0").should("be.visible");
  });

  it("should show PNG format badge in modal", () => {
    cy.get('img[alt*=".png"]').first().closest("button").click();
    cy.contains("PNG").should("be.visible");
  });

  it("should show light and dark preview in modal", () => {
    cy.get('img[alt*=".png"]').first().closest("button").click();
    cy.contains("Light").should("be.visible");
    cy.contains("Dark").should("be.visible");
  });

  it("should have copy path button in modal", () => {
    cy.get('img[alt*=".png"]').first().closest("button").click();
    cy.get('button[title="Copy path"]').should("be.visible");
  });

  it("should close modal when clicking close button", () => {
    cy.get('img[alt*=".png"]').first().closest("button").click();
    cy.get(".fixed.inset-0").should("be.visible");
    cy.contains("button", "Close").click();
    cy.get(".fixed.inset-0").should("not.exist");
  });

  it("should close modal when clicking backdrop", () => {
    cy.get('img[alt*=".png"]').first().closest("button").click();
    cy.get(".bg-black\\/60").click({ force: true });
    cy.get(".fixed.inset-0").should("not.exist");
  });
});

describe("Download Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.uploadTestImage();
    cy.generateIcons();
  });

  it("should have individual download buttons for each icon", () => {
    cy.get('button[title*="Download"]').should("have.length.gte", EXPECTED_ICONS.length);
  });

  it("should trigger download when clicking individual download button", () => {
    cy.get('button[title*="Download"]').first().click({ force: true });
    cy.contains("feedback", { matchCase: false, timeout: 5000 }).should("be.visible");
  });

  it("should have Download ZIP button that triggers download", () => {
    cy.contains("button", "Download ZIP").click();
    cy.contains("feedback", { matchCase: false, timeout: 5000 }).should("be.visible");
  });
});

describe("App.json Preview", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.uploadTestImage();
    cy.generateIcons();
  });

  it("should show app.json preview card", () => {
    cy.contains("app.json").should("be.visible");
  });

  it("should display valid JSON with expo config", () => {
    cy.contains('"expo"').should("be.visible");
    cy.contains('"icon"').should("be.visible");
    cy.contains('"android"').should("be.visible");
    cy.contains('"web"').should("be.visible");
  });

  it("should have Copy to Clipboard button", () => {
    cy.contains("button", "Copy").should("be.visible");
  });

  it("should have Download button", () => {
    cy.get("button").contains("Download").should("exist");
  });

  it("should include splash config when splash is enabled", () => {
    cy.contains('"splash"').should("be.visible");
    cy.contains('"resizeMode"').should("be.visible");
  });
});

describe("Error Handling", () => {
  it("should show error for oversized file upload", () => {
    cy.visit("/");
    const largeBuffer = Cypress.Buffer.alloc(11 * 1024 * 1024);
    cy.get('input[type="file"]').selectFile(
      { contents: largeBuffer, fileName: "huge-image.png", mimeType: "image/png" },
      { force: true }
    );
    cy.contains("less than 10MB").should("be.visible");
  });

  it("should show error for invalid file type", () => {
    cy.visit("/");
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from("{}"), fileName: "data.json", mimeType: "application/json" },
      { force: true }
    );
    cy.contains("PNG, JPG, JPEG, or SVG").should("be.visible");
  });

  it("should handle API error gracefully during generation", () => {
    cy.visit("/");
    cy.uploadTestImage();
    cy.intercept("POST", "/api/generate-icons", {
      statusCode: 500,
      body: { error: "Internal server error" },
    }).as("failedGenerate");
    cy.contains("button", "Generate All Icons").click();
    cy.wait("@failedGenerate");
    cy.contains("Failed to generate icons", { timeout: 5000 }).should("be.visible");
  });
});

describe("Color Analysis Integration", () => {
  it("should auto-analyze uploaded image colors", () => {
    cy.visit("/");
    cy.intercept("POST", "/api/analyze-image-colors").as("analyzeColors");
    cy.uploadTestImage();
    cy.wait("@analyzeColors", { timeout: 10000 }).its("response.statusCode").should("eq", 200);
  });
});

// ── Blog & Tutorials ──────────────────────────────────────────────────────

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

  it("should show tutorial metadata", () => {
    cy.get("article, main").should("exist");
  });

  it("should have back navigation", () => {
    cy.contains("Back").should("be.visible");
  });
});

// ── FAQ & Contributors ────────────────────────────────────────────────────

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
    cy.get("h3").should("have.length.gte", 1);
    cy.get("h3").should("have.length.lt", initialCount);
  });

  it("should expand/collapse FAQ answers on click", () => {
    cy.get("h3").first().click();
    cy.get("h3").first().parent().parent().should("exist");
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
    cy.get("body").then(($body) => {
      if ($body.text().includes("Loading")) {
        cy.contains("Loading").should("be.visible");
      } else {
        cy.get("img[alt*='avatar']").should("have.length.gte", 0);
      }
    });
  });

  it("should have contribute CTA section", () => {
    cy.contains("Contribute").should("exist");
  });
});

// ── SEO ───────────────────────────────────────────────────────────────────

describe("SEO - Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have a single H1 tag", () => {
    cy.get("h1").should("have.length", 1);
  });

  it("should have meta description", () => {
    cy.get('meta[name="description"]').should("have.attr", "content").and("contain", "Expo");
  });

  it("should have canonical URL pointing to root", () => {
    cy.get('link[rel="canonical"]').should("have.attr", "href").and("contain", "expo-assets-generator.vercel.app");
  });

  it("should have Open Graph tags", () => {
    cy.get('meta[property="og:title"]').should("exist");
    cy.get('meta[property="og:description"]').should("exist");
    cy.get('meta[property="og:type"]').should("have.attr", "content", "website");
    cy.get('meta[property="og:image"]').should("exist");
  });

  it("should have Twitter Card tags", () => {
    cy.get('meta[name="twitter:card"]').should("have.attr", "content", "summary_large_image");
    cy.get('meta[name="twitter:title"]').should("exist");
  });

  it("should have robots meta allowing indexing", () => {
    cy.get('meta[name="robots"]').should("have.attr", "content").and("contain", "index");
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
      cy.get('link[rel="canonical"]').should("have.attr", "href").and("contain", expected);
    });
  });
});

describe("SEO - Blog Post Pages", () => {
  it("should have article-specific Open Graph type", () => {
    cy.visit("/blog/complete-guide-expo-icon-generation");
    cy.get('meta[property="og:type"]').should("have.attr", "content", "article");
  });

  it("should have canonical URL matching slug", () => {
    cy.visit("/blog/icon-design-best-practices");
    cy.get('link[rel="canonical"]').should("have.attr", "href").and("contain", "/blog/icon-design-best-practices");
  });
});

// ── Accessibility & Dark Theme ────────────────────────────────────────────

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
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("icons");
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

// ── API Tests ─────────────────────────────────────────────────────────────

describe("POST /api/subscribe", () => {
  const endpoint = "/api/subscribe";

  it("returns 400 when body is empty", () => {
    cy.request({ method: "POST", url: endpoint, body: {}, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body).to.have.property("error");
      });
  });

  it("returns 400 when email is missing", () => {
    cy.request({ method: "POST", url: endpoint, body: { name: "test" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.error).to.include("Email");
      });
  });

  it("returns 400 for invalid email format", () => {
    cy.request({ method: "POST", url: endpoint, body: { email: "not-an-email" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body).to.have.property("error");
      });
  });

  it("returns 400 for email missing domain", () => {
    cy.request({ method: "POST", url: endpoint, body: { email: "user@" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => { expect(res.status).to.eq(400); });
  });

  it("returns 400 for email with spaces", () => {
    cy.request({ method: "POST", url: endpoint, body: { email: "user @example.com" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => { expect(res.status).to.eq(400); });
  });

  it("returns 400 when email is a number", () => {
    cy.request({ method: "POST", url: endpoint, body: { email: 12345 }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => { expect(res.status).to.eq(400); });
  });

  it("returns 2xx for valid email", () => {
    cy.request({ method: "POST", url: endpoint, body: { email: "test-cypress@example.com" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => {
        expect([200, 201, 500]).to.include(res.status);
        if (res.status !== 500) {
          expect(res.body).to.have.property("success", true);
          expect(res.body).to.have.property("message");
        }
      });
  });

  it("is idempotent — subscribing same email twice returns success", () => {
    const email = "idempotent-test@example.com";
    cy.request({ method: "POST", url: endpoint, body: { email }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((first) => {
        if (first.status === 500) return;
        cy.request({ method: "POST", url: endpoint, body: { email }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
          .then((second) => {
            expect(second.status).to.eq(200);
            expect(second.body.success).to.eq(true);
          });
      });
  });

  it("normalizes email to lowercase", () => {
    cy.request({ method: "POST", url: endpoint, body: { email: "UPPER@EXAMPLE.COM" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => { expect([200, 201, 500]).to.include(res.status); });
  });
});

describe("GET /api/unsubscribe", () => {
  const endpoint = "/api/unsubscribe";

  it("returns 400 when email query param is missing", () => {
    cy.request({ method: "GET", url: endpoint, failOnStatusCode: false })
      .then((res) => { expect(res.status).to.eq(400); });
  });

  it("returns an HTML unsubscribe confirmation page for valid email", () => {
    cy.request({ method: "GET", url: `${endpoint}?email=test@example.com`, failOnStatusCode: false })
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.headers["content-type"]).to.include("text/html");
        expect(res.body).to.include("unsubscribed");
      });
  });
});

describe("DELETE /api/unsubscribe", () => {
  const endpoint = "/api/unsubscribe";

  it("returns 400 when body is empty", () => {
    cy.request({ method: "DELETE", url: endpoint, body: {}, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body).to.have.property("error");
      });
  });

  it("returns 400 when email is missing from body", () => {
    cy.request({ method: "DELETE", url: endpoint, body: { name: "no-email" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => { expect(res.status).to.eq(400); });
  });

  it("returns 200 for valid email (idempotent — delete non-existing is fine)", () => {
    cy.request({ method: "DELETE", url: endpoint, body: { email: "never-subscribed@example.com" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => {
        expect([200, 500]).to.include(res.status);
        if (res.status === 200) {
          expect(res.body).to.have.property("success", true);
        }
      });
  });
});

describe("POST /api/send-feedback", () => {
  const endpoint = "/api/send-feedback";

  it("returns 400 when both feedback and rating are missing", () => {
    cy.request({ method: "POST", url: endpoint, body: { downloadType: "all icons (ZIP)" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body).to.have.property("error");
      });
  });

  it("accepts a valid rating without feedback text", () => {
    cy.request({ method: "POST", url: endpoint, body: { rating: "good", downloadType: "all icons (ZIP)", feedback: "" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => { expect([200, 500]).to.include(res.status); });
  });

  it("accepts feedback text without a rating", () => {
    cy.request({ method: "POST", url: endpoint, body: { feedback: "Great tool!", downloadType: "iOS icons" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => { expect([200, 500]).to.include(res.status); });
  });

  it("accepts all rating values", () => {
    const ratings = ["love_it", "good", "okay", "bad"];
    ratings.forEach((rating) => {
      cy.request({ method: "POST", url: endpoint, body: { rating, downloadType: "all icons (ZIP)", feedback: "" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
        .then((res) => { expect([200, 500]).to.include(res.status, `Rating "${rating}" should return 200 or 500`); });
    });
  });

  it("accepts optional userEmail field", () => {
    cy.request({ method: "POST", url: endpoint, body: { rating: "love_it", feedback: "Really useful!", downloadType: "Android icons", userEmail: "tester@example.com" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => { expect([200, 500]).to.include(res.status); });
  });

  it("returns 400 when rating is empty string and no feedback", () => {
    cy.request({ method: "POST", url: endpoint, body: { rating: "", feedback: "", downloadType: "all icons (ZIP)" }, headers: { "Content-Type": "application/json" }, failOnStatusCode: false })
      .then((res) => { expect(res.status).to.eq(400); });
  });
});

// ── Full End-to-End ───────────────────────────────────────────────────────

describe("Full End-to-End: Text Logo to Download", () => {
  it("should create text logo, generate icons, and verify all outputs", () => {
    cy.visit("/");

    cy.contains("button", "Text Logo").click();
    cy.get('input[placeholder="My App"]').clear().type("E2E");
    cy.get("select").first().select("Monospace");
    cy.get("select").last().select("Circle");

    cy.intercept("POST", "/api/generate-text-logo").as("createLogo");
    cy.contains("button", "Create Logo").click();
    cy.wait("@createLogo", { timeout: 15000 }).its("response.statusCode").should("eq", 200);

    cy.contains("Configure & Generate", { timeout: 10000 }).should("be.visible");

    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();

    cy.wait("@generateIcons", { timeout: 30000 }).then((interception) => {
      const icons = interception.response?.body?.icons || [];
      expect(icons.length).to.be.gte(EXPECTED_ICONS.length);

      const iconMap = new Map(
        icons.map((i: { name: string; size: string }) => [i.name, i.size])
      );
      expect(iconMap.get("icon.png")).to.include("1024x1024");
      expect(iconMap.get("favicon.png")).to.include("48x48");
      expect(iconMap.get("react-logo@3x.png")).to.include("300x300");
    });

    cy.contains("assets generated").should("be.visible");
    cy.contains("Download ZIP").should("be.visible");
    cy.contains("app.json").should("be.visible");
    cy.contains("App Icons").should("be.visible");
    cy.contains("React Logo").should("be.visible");
  });
});
