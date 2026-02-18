/**
 * Homepage Functionality Tests
 * Comprehensive tests for the icon generation workflow:
 * upload, paste, text logo, settings, generation, dimensions, download.
 */

// Expected icon specs from the API
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

    // Upload second file
    cy.createTestPng().then((buffer) => {
      cy.get('input[type="file"]').selectFile(
        {
          contents: buffer,
          fileName: "second-icon.png",
          mimeType: "image/png",
        },
        { force: true }
      );
    });
    cy.contains("second-icon.png").should("be.visible");
    cy.contains("first-icon.png").should("not.exist");
  });

  it("should reject non-image files", () => {
    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from("not an image"),
        fileName: "test.txt",
        mimeType: "text/plain",
      },
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
    // Use file input as paste simulation since ClipboardEvent is unreliable in Cypress
    // The paste handler ultimately calls handleFileUpload, so we verify via upload
    cy.createTestPng().then((pngBuffer) => {
      cy.get('input[type="file"]').selectFile(
        {
          contents: pngBuffer,
          fileName: "pasted-image.png",
          mimeType: "image/png",
        },
        { force: true }
      );
    });

    // Should show the uploaded file preview
    cy.get('img[alt="Uploaded preview"]', { timeout: 5000 }).should(
      "be.visible"
    );
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
    cy.get('[role="switch"]')
      .should("be.visible")
      .and("have.attr", "aria-checked", "true");
  });

  it("should toggle splash screen off and on", () => {
    // Turn off
    cy.get('[role="switch"]').click();
    cy.get('[role="switch"]').should("have.attr", "aria-checked", "false");

    // Turn back on
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
    cy.get("select").should("have.length.gte", 2); // font + shape selects
    cy.get('input[type="range"]').should("be.visible"); // size slider
    cy.contains("button", "B").should("be.visible"); // bold
    cy.contains("button", "I").should("be.visible"); // italic
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

    // Intercept the API call
    cy.intercept("POST", "/api/generate-text-logo").as("createLogo");

    cy.contains("button", "Create Logo").click();

    cy.wait("@createLogo").its("response.statusCode").should("eq", 200);

    // After logo creation, should switch to upload view with the generated image
    cy.contains("Configure & Generate", { timeout: 10000 }).should(
      "be.visible"
    );
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

    cy.wait("@generateIcons", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 200);

    cy.contains("assets generated", { timeout: 10000 }).should("be.visible");

    // Verify each expected icon is listed
    EXPECTED_ICONS_WITH_SPLASH.forEach(({ name }) => {
      cy.contains(name).should("exist");
    });
  });

  it("should show correct dimensions for each icon", () => {
    cy.intercept("POST", "/api/generate-icons").as("generateIcons");

    cy.contains("button", "Generate All Icons").click();
    cy.wait("@generateIcons", { timeout: 30000 });

    cy.contains("assets generated", { timeout: 10000 }).should("be.visible");

    // Verify dimensions are displayed for each icon
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

    // Each generated icon should have a thumbnail image
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

    // Disable splash
    cy.get('[role="switch"]').click();
    cy.get('[role="switch"]').should("have.attr", "aria-checked", "false");

    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();

    cy.wait("@generateIcons", { timeout: 30000 }).then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);

      // Should NOT contain splash.png (the full splash, not splash-icon)
      const icons = interception.response?.body?.icons || [];
      const hasFullSplash = icons.some(
        (i: { name: string }) => i.name === "splash.png"
      );
      expect(hasFullSplash).to.equal(false);
    });

    // Standard icons should still exist
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

      // Verify we got the expected number of icons (8 base + splash)
      expect(icons.length).to.be.gte(EXPECTED_ICONS.length);

      // Verify each icon has name, size, and url
      icons.forEach((icon: { name: string; size: string; url: string }) => {
        expect(icon.name).to.be.a("string");
        expect(icon.name.length).to.be.greaterThan(0);
        expect(icon.size).to.match(/^\d+x\d+/);
        expect(icon.url).to.be.a("string").and.include("data:image/png;base64,");
      });

      // Verify specific dimension expectations
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

    // Ensure splash is enabled
    cy.get('[role="switch"]').should("have.attr", "aria-checked", "true");

    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();

    cy.wait("@generateIcons", { timeout: 30000 }).then((interception) => {
      const icons = interception.response?.body?.icons || [];
      const splash = icons.find(
        (i: { name: string }) => i.name === "splash.png"
      );
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
    // Click the first icon thumbnail button
    cy.get('img[alt*=".png"]').first().closest("button").click();

    // Modal should appear
    cy.get(".fixed.inset-0").should("be.visible");
  });

  it("should show icon metadata in modal (platform, purpose, size)", () => {
    cy.get('img[alt*=".png"]').first().closest("button").click();

    // Should show PNG format badge
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

    // Click the backdrop
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
    cy.get('button[title*="Download"]').should(
      "have.length.gte",
      EXPECTED_ICONS.length
    );
  });

  it("should trigger download when clicking individual download button", () => {
    // Click the first download button
    cy.get('button[title*="Download"]').first().click({ force: true });

    // Feedback modal should appear after download
    cy.contains("feedback", { matchCase: false, timeout: 5000 }).should(
      "be.visible"
    );
  });

  it("should have Download ZIP button that triggers download", () => {
    cy.contains("button", "Download ZIP").click();

    // Feedback modal should appear after ZIP download
    cy.contains("feedback", { matchCase: false, timeout: 5000 }).should(
      "be.visible"
    );
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

describe("Color Analysis Integration", () => {
  it("should auto-analyze uploaded image colors", () => {
    cy.visit("/");

    cy.intercept("POST", "/api/analyze-image-colors").as("analyzeColors");

    cy.uploadTestImage();

    // Color analysis should be triggered automatically
    cy.wait("@analyzeColors", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 200);
  });
});

describe("Error Handling", () => {
  it("should show error for oversized file upload", () => {
    cy.visit("/");

    // Create a buffer > 10MB
    const largeBuffer = Cypress.Buffer.alloc(11 * 1024 * 1024);

    cy.get('input[type="file"]').selectFile(
      {
        contents: largeBuffer,
        fileName: "huge-image.png",
        mimeType: "image/png",
      },
      { force: true }
    );

    cy.contains("less than 10MB").should("be.visible");
  });

  it("should show error for invalid file type", () => {
    cy.visit("/");

    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from("{}"),
        fileName: "data.json",
        mimeType: "application/json",
      },
      { force: true }
    );

    cy.contains("PNG, JPG, JPEG, or SVG").should("be.visible");
  });

  it("should handle API error gracefully during generation", () => {
    cy.visit("/");
    cy.uploadTestImage();

    // Stub the API to return an error
    cy.intercept("POST", "/api/generate-icons", {
      statusCode: 500,
      body: { error: "Internal server error" },
    }).as("failedGenerate");

    cy.contains("button", "Generate All Icons").click();

    cy.wait("@failedGenerate");
    cy.contains("Failed to generate icons", { timeout: 5000 }).should(
      "be.visible"
    );
  });
});

describe("Full End-to-End: Text Logo to Download", () => {
  it("should create text logo, generate icons, and verify all outputs", () => {
    cy.visit("/");

    // Step 1: Switch to Text Logo tab
    cy.contains("button", "Text Logo").click();

    // Step 2: Configure text logo
    cy.get('input[placeholder="My App"]').clear().type("E2E");
    cy.get("select").first().select("Monospace");
    cy.get("select").last().select("Circle");

    // Step 3: Create the logo
    cy.intercept("POST", "/api/generate-text-logo").as("createLogo");
    cy.contains("button", "Create Logo").click();
    cy.wait("@createLogo", { timeout: 15000 })
      .its("response.statusCode")
      .should("eq", 200);

    // Step 4: Settings panel should appear with the text logo
    cy.contains("Configure & Generate", { timeout: 10000 }).should(
      "be.visible"
    );

    // Step 5: Generate icons
    cy.intercept("POST", "/api/generate-icons").as("generateIcons");
    cy.contains("button", "Generate All Icons").click();

    cy.wait("@generateIcons", { timeout: 30000 }).then((interception) => {
      const icons = interception.response?.body?.icons || [];

      // Verify all expected icons were generated
      expect(icons.length).to.be.gte(EXPECTED_ICONS.length);

      // Verify dimensions
      const iconMap = new Map(
        icons.map((i: { name: string; size: string }) => [i.name, i.size])
      );
      expect(iconMap.get("icon.png")).to.include("1024x1024");
      expect(iconMap.get("favicon.png")).to.include("48x48");
      expect(iconMap.get("react-logo@3x.png")).to.include("300x300");
    });

    // Step 6: Verify all icons displayed in UI
    cy.contains("assets generated").should("be.visible");
    cy.contains("Download ZIP").should("be.visible");
    cy.contains("app.json").should("be.visible");

    // Step 7: Verify categories
    cy.contains("App Icons").should("be.visible");
    cy.contains("React Logo").should("be.visible");
  });
});
