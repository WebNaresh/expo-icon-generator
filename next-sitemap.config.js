/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://expo-assets-generator.vercel.app",
  generateRobotsTxt: false, // Disable since we have app/robots.ts
  generateIndexSitemap: false, // Ensure no index sitemap is created
  trailingSlash: false,

  // Force single sitemap with large size limit
  sitemapSize: 50000, // Increased to ensure all URLs fit in one sitemap
  
  // Sitemap configuration for better SEO
  changefreq: "weekly",
  priority: 0.7,

  // Exclude certain paths from sitemap
  exclude: [
    "/api/*", // Exclude API routes from sitemap
    "/admin/*", // Exclude admin routes if any
    "/_next/*", // Exclude Next.js internal routes
    "/404",
    "/500",
  ],

  // Additional paths to include in sitemap
  additionalPaths: async (config) => {
    const result = [];

    // Blog pages
    const blogPages = [
      {
        loc: "/blog",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
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
    ];

    // Tutorial pages - All 6 dynamic tutorial routes
    const tutorialPages = [
      {
        loc: "/tutorials",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      // Featured tutorials (higher priority)
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
      // Additional tutorials (good priority)
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

    // Support and Legal pages
    const supportPages = [
      {
        loc: "/faq",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/privacy",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/terms",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
    ];

    // Remove non-existent feature pages that were causing indexing issues

    // Remove non-existent platform pages that were causing indexing issues

    // Remove non-existent format pages that were causing indexing issues

    // Remove non-existent documentation pages that were causing indexing issues

    // Remove non-existent tool pages that were causing indexing issues

    // Add only existing pages to result
    result.push(
      ...blogPages,
      ...tutorialPages,
      ...supportPages
      // Removed non-existent pages that were causing Google Search Console indexing issues:
      // featurePages, platformPages, formatPages, docPages, toolPages
    );

    // Fetch dynamic contributor pages
    try {
      const baseUrl =
        process.env.SITE_URL || "https://expo-assets-generator.vercel.app";
      const response = await fetch(`${baseUrl}/api/contributors`);

      if (response.ok) {
        const data = await response.json();
        const contributors = data.contributors || [];

        // Add contributor pages
        contributors.forEach((contributor) => {
          result.push({
            loc: `/contributors/${contributor.username}`,
            changefreq: "monthly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
          });
        });
      }
    } catch (error) {
      console.warn("Failed to fetch contributors for sitemap:", error);
    }

    return result;
  },

  // Transform function to customize sitemap entries
  transform: async (_, path) => {
    // Custom priority and changefreq based on path
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
      // Featured tutorials get higher priority
      if (
        path.includes("expo-app-development-complete-guide") ||
        path.includes("professional-icon-design-masterclass") ||
        path.includes("react-native-performance-optimization")
      ) {
        priority = 0.9;
      } else {
        priority = 0.8;
      }
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
