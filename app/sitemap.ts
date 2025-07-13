import type { MetadataRoute } from 'next'

// TypeScript interface for contributor data
interface Contributor {
  username: string
  name: string | null
  avatar_url: string
  profile_url: string
  contributions: number
  bio: string | null
  location: string | null
  company: string | null
  blog: string | null
  twitter_username: string | null
  public_repos: number
  followers: number
  created_at: string
}

interface ContributorsResponse {
  contributors: Contributor[]
  total: number
}

// Fetch contributors for sitemap generation
async function fetchContributors(): Promise<Contributor[]> {
  // During build time, return empty array to avoid fetch errors
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL_URL) {
    console.log('Build time: Skipping contributor fetch for sitemap')
    return []
  }

  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const response = await fetch(
      `${baseUrl}/api/contributors`,
      {
        next: { revalidate: 3600 } // Revalidate every hour
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch contributors for sitemap')
      return []
    }

    const data: ContributorsResponse = await response.json()
    return data.contributors || []
  } catch (error) {
    console.error('Error fetching contributors for sitemap:', error)
    return []
  }
}

/**
 * Sitemap configuration for Expo Icon Generator
 * Optimized for SEO with proper priorities and change frequencies
 * Follows Google XML Sitemap Protocol and Next.js MetadataRoute.Sitemap specification
 *
 * Includes both static pages and dynamically generated contributor pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://expo-assets-generator.vercel.app'

  // Use a fixed date for better caching and consistency
  // Update this date when you make significant changes to the site
  const lastModified = new Date('2024-12-15T00:00:00.000Z')

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
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

  // Fetch contributors and generate dynamic pages
  try {
    const contributors = await fetchContributors()

    const contributorPages: MetadataRoute.Sitemap = contributors.map((contributor) => ({
      url: `${baseUrl}/contributors/${contributor.username}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...contributorPages]
  } catch (error) {
    console.error('Error generating sitemap with contributors:', error)
    // Return static pages only if contributor fetch fails
    return staticPages
  }
}
