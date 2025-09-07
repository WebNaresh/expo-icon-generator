import type { MetadataRoute } from 'next'

/**
 * Dynamic robots.txt configuration for Expo Icon Generator
 *
 * This file generates a robots.txt that allows all search engine crawlers
 * to access all pages of the website, helping with SEO and search indexing.
 *
 * Note: next-sitemap will also generate a robots.txt file. This file serves
 * as a fallback and for additional customization if needed.
 *
 * Following Next.js App Router best practices for SEO optimization.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: 'https://expo-assets-generator.vercel.app/sitemap.xml',
    host: 'https://expo-assets-generator.vercel.app',
  }
}
