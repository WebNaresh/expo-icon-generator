/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://expo-assets-generator.vercel.app",
  generateRobotsTxt: true, // Enable robots.txt generation
  generateIndexSitemap: false,
  trailingSlash: false,

  // Ensure single sitemap file
  sitemapSize: 50000,
  changefreq: "weekly",
  priority: 0.7,

  // Custom robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
    ],
    // No additionalSitemaps to prevent nested indexing
    // The main sitemap.xml will be automatically referenced
  },

  // Exclude certain paths from sitemap
  exclude: ["/api/*", "/admin/*", "/_next/*", "/404", "/500"],

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
