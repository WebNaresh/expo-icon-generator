import type { MetadataRoute } from 'next'

/**
 * Sitemap configuration for Expo Icon Generator
 * Optimized for SEO with proper priorities and change frequencies
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://expo-icon-generator.vercel.app'
  const currentDate = new Date()

  return [
    // Home page - Highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Core tool features - High priority
    {
      url: `${baseUrl}/generator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Getting started and guides
    {
      url: `${baseUrl}/getting-started`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/examples`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Open source and community pages
    {
      url: `${baseUrl}/opensource`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Legal and policy pages - Lower priority, infrequent changes
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
