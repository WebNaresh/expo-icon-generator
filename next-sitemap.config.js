/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://expo-assets-generator.vercel.app",
  generateRobotsTxt: true, // Generate robots.txt file
  generateIndexSitemap: true, // Generate sitemap index for large sites
  trailingSlash: false, // Ensure no trailing slashes for consistent URLs

  // Sitemap configuration for better SEO
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,

  // Custom robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
    ],
    additionalSitemaps: [
      "https://expo-assets-generator.vercel.app/sitemap.xml",
    ],
  },

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

    // Feature-specific pages for better search targeting
    const featurePages = [
      {
        loc: "/features/icon-generation",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/features/background-color-detection",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/features/multi-platform-support",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/features/smart-color-analysis",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
    ];

    // Platform-specific pages
    const platformPages = [
      {
        loc: "/platforms/ios",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/platforms/android",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/platforms/web",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/platforms/react-native",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
    ];

    // Icon format specific pages
    const formatPages = [
      {
        loc: "/formats/adaptive-icon",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/formats/app-icon",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/formats/favicon",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/formats/splash-icon",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
    ];

    // Documentation pages
    const docPages = [
      {
        loc: "/docs/getting-started",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/docs/api-reference",
        changefreq: "monthly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/docs/troubleshooting",
        changefreq: "monthly",
        priority: 0.5,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/docs/faq",
        changefreq: "monthly",
        priority: 0.5,
        lastmod: new Date().toISOString(),
      },
    ];

    // Tool-specific pages
    const toolPages = [
      {
        loc: "/tools/expo-icon-generator",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/tools/react-native-icons",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/tools/app-store-icons",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
    ];

    // Add all pages to result
    result.push(
      ...featurePages,
      ...platformPages,
      ...formatPages,
      ...docPages,
      ...toolPages
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
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7;
    let changefreq = "monthly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path.startsWith("/contributors")) {
      priority = 0.6;
      changefreq = "monthly";
    } else if (path.startsWith("/features/")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/platforms/")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/tools/")) {
      priority = 0.9;
      changefreq = "weekly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
