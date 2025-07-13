import type { MetadataRoute } from 'next'

/**
 * Sitemap configuration for Expo Icon Generator
 * Optimized for SEO with proper priorities and change frequencies
 * Follows Google XML Sitemap Protocol and Next.js MetadataRoute.Sitemap specification
 *
 * Only includes URLs that correspond to actual pages in the app directory structure
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://expo-assets-generator.vercel.app'

  // Use a fixed date for better caching and consistency
  // Update this date when you make significant changes to the site
  const lastModified = new Date('2024-12-15T00:00:00.000Z')

  return [
    // Home page - The main Expo Icon Generator tool page
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Contributors page - Information about project contributors
    {
      url: `${baseUrl}/contributors/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
