/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://expo-assets-generator.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  trailingSlash: false,

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
  exclude: ["/api/*", "/_next/*", "/404", "/500"],

  // Add back the important pages via additionalPaths but ensure single sitemap
  additionalPaths: async () => {
    return [
      // Blog pages
      {
        loc: "/blog/complete-guide-expo-icon-generation",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/blog/ios-android-icon-requirements-2024",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/blog/icon-design-best-practices",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/blog/automated-icon-generation-workflow",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/blog/app-store-optimization-icons",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/blog/react-native-icon-performance",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      // Tutorial pages
      {
        loc: "/tutorials/expo-app-development-complete-guide",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/tutorials/professional-icon-design-masterclass",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/tutorials/react-native-performance-optimization",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/tutorials/app-store-submission-guide",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/tutorials/adaptive-icons-android-tutorial",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/tutorials/expo-eas-build-deployment",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
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
      lastmod: new Date().toISOString(),
    };
  },
};
