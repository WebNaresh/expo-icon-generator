/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://expo-assets-generator.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  trailingSlash: false,
  autoLastmod: false, // Prevents using current build date for lastmod

  // Force single sitemap with very large size limit to prevent splitting
  sitemapSize: 100000,
  changefreq: "weekly",
  priority: 0.7,

  // Custom robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "*",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "*",
        crawlDelay: 1,
      },
    ],
  },

  // Exclude certain paths from sitemap
  exclude: ["/api/*", "/_next/*", "/404", "/500", "/apple-icon.png", "/manifest.webmanifest", "/opengraph-image.png"],

  // Add back the important pages via additionalPaths but ensure single sitemap
  additionalPaths: async () => {
    return [
      // Blog pages (using stable 2026 dates)
      {
        loc: "/blog/complete-guide-expo-icon-generation",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: "2026-01-15",
      },
      {
        loc: "/blog/ios-android-icon-requirements-2024",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: "2026-01-10",
      },
      {
        loc: "/blog/icon-design-best-practices",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: "2026-01-05",
      },
      {
        loc: "/blog/automated-icon-generation-workflow",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: "2026-01-02",
      },
      {
        loc: "/blog/app-store-optimization-icons",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: "2026-01-01",
      },
      {
        loc: "/blog/react-native-icon-performance",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: "2026-01-01",
      },
      // Tutorial pages (using stable 2026 update dates)
      {
        loc: "/tutorials/expo-app-development-complete-guide",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: "2026-05-23",
      },
      {
        loc: "/tutorials/professional-icon-design-masterclass",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: "2026-05-23",
      },
      {
        loc: "/tutorials/react-native-performance-optimization",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: "2026-05-23",
      },
      {
        loc: "/tutorials/app-store-submission-guide",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: "2026-05-23",
      },
      {
        loc: "/tutorials/adaptive-icons-android-tutorial",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: "2026-05-23",
      },
      {
        loc: "/tutorials/expo-eas-build-deployment",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: "2026-05-23",
      },
    ];
  },

  // Simplified transform function - no additionalPaths to avoid complexity
  transform: async (_, path) => {
    let priority = 0.7;
    let changefreq = "monthly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path.startsWith("/blog")) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path === "/tutorials") {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path.startsWith("/tutorials/")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path === "/faq") {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path === "/privacy" || path === "/terms") {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path.startsWith("/contributors")) {
      priority = 0.6;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      // lastmod is intentionally omitted for dynamic/general pages to prevent unnecessary re-crawling
    };
  },
};
