import type { MetadataRoute } from 'next'

/**
 * Dynamic robots.txt configuration for Expo Icon Generator
 * 
 * This file generates a robots.txt that allows all search engine crawlers
 * to access all pages of the website, helping with SEO and search indexing.
 * 
 * Following Next.js App Router best practices for SEO optimization.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // No disallow rules - we want all pages to be crawlable
    },
    sitemap: 'https://expo-assets-generator.vercel.app/sitemap.xml',
    // Optional: specify the host for better SEO
    host: 'https://expo-assets-generator.vercel.app',
  }
}
