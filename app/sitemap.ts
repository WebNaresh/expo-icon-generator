import type { MetadataRoute } from 'next'

/**
 * Sitemap configuration for Expo Icon Generator
 * Optimized for SEO with proper priorities and change frequencies
 * Follows Google XML Sitemap Protocol and Next.js MetadataRoute.Sitemap specification
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://expo-assets-generator.vercel.app'

  // Use a fixed date for better caching and consistency
  // Update this date when you make significant changes to the site
  const lastModified = new Date('2024-12-15T00:00:00.000Z')

  return [
    // Home page - Highest priority
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Core tool features - High priority
    {
      url: `${baseUrl}/generator/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Getting started and guides
    {
      url: `${baseUrl}/getting-started/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/examples/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Open source and community pages
    {
      url: `${baseUrl}/opensource/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Legal and policy pages - Lower priority, infrequent changes
    {
      url: `${baseUrl}/terms/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
