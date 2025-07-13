import { NextRequest, NextResponse } from 'next/server'

// TypeScript interfaces for GitHub API responses
interface GitHubContributor {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  contributions: number
}

interface GitHubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  hireable: boolean | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

interface ProcessedContributor {
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

// Cache configuration
const CACHE_DURATION = 3600 // 1 hour in seconds
const GITHUB_API_BASE = 'https://api.github.com'
const REPO_OWNER = 'WebNaresh'
const REPO_NAME = 'expo-icon-generator'

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60 // GitHub allows 60 requests per hour for unauthenticated requests

// Simple in-memory cache (in production, consider using Redis or similar)
const cache = new Map<string, { data: any; timestamp: number }>()
const rateLimitTracker = new Map<string, { count: number; resetTime: number }>()

// Helper function to check rate limits
function checkRateLimit(clientId: string): boolean {
  const now = Date.now()
  const tracker = rateLimitTracker.get(clientId)
  
  if (!tracker || now > tracker.resetTime) {
    rateLimitTracker.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (tracker.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  tracker.count++
  return true
}

// Helper function to get cached data
function getCachedData(key: string): any | null {
  const cached = cache.get(key)
  if (!cached) return null
  
  const now = Date.now()
  if (now - cached.timestamp > CACHE_DURATION * 1000) {
    cache.delete(key)
    return null
  }
  
  return cached.data
}

// Helper function to set cached data
function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() })
}

// Helper function to fetch GitHub API with error handling
async function fetchGitHubAPI(endpoint: string): Promise<any> {
  const url = `${GITHUB_API_BASE}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Expo-Icon-Generator/1.0',
        // Add GitHub token if available for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      },
      next: { revalidate: CACHE_DURATION }
    })

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded')
      }
      if (response.status === 404) {
        throw new Error('Repository not found')
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('GitHub API fetch error:', error)
    throw error
  }
}

// Main function to fetch and process contributors
async function fetchContributors(): Promise<ProcessedContributor[]> {
  const cacheKey = `contributors-${REPO_OWNER}-${REPO_NAME}`
  
  // Check cache first
  const cachedData = getCachedData(cacheKey)
  if (cachedData) {
    return cachedData
  }

  try {
    // Fetch contributors from GitHub API
    const contributors: GitHubContributor[] = await fetchGitHubAPI(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contributors`
    )

    // Fetch detailed user information for each contributor
    const processedContributors: ProcessedContributor[] = await Promise.all(
      contributors.map(async (contributor) => {
        try {
          const userDetails: GitHubUser = await fetchGitHubAPI(`/users/${contributor.login}`)
          
          return {
            username: contributor.login,
            name: userDetails.name,
            avatar_url: contributor.avatar_url,
            profile_url: contributor.html_url,
            contributions: contributor.contributions,
            bio: userDetails.bio,
            location: userDetails.location,
            company: userDetails.company,
            blog: userDetails.blog,
            twitter_username: userDetails.twitter_username,
            public_repos: userDetails.public_repos,
            followers: userDetails.followers,
            created_at: userDetails.created_at
          }
        } catch (error) {
          console.error(`Error fetching details for ${contributor.login}:`, error)
          // Return basic info if detailed fetch fails
          return {
            username: contributor.login,
            name: null,
            avatar_url: contributor.avatar_url,
            profile_url: contributor.html_url,
            contributions: contributor.contributions,
            bio: null,
            location: null,
            company: null,
            blog: null,
            twitter_username: null,
            public_repos: 0,
            followers: 0,
            created_at: new Date().toISOString()
          }
        }
      })
    )

    // Sort by contributions (descending)
    processedContributors.sort((a, b) => b.contributions - a.contributions)

    // Cache the results
    setCachedData(cacheKey, processedContributors)

    return processedContributors
  } catch (error) {
    console.error('Error fetching contributors:', error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limits
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.'
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '60'
          }
        }
      )
    }

    // Fetch contributors
    const contributors = await fetchContributors()

    return NextResponse.json(
      { 
        contributors,
        total: contributors.length,
        cached: true // This will be true if data came from cache
      },
      {
        status: 200,
        headers: {
          'Cache-Control': `public, max-age=${CACHE_DURATION}, stale-while-revalidate=86400`,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Contributors API error:', error)
    
    // Return appropriate error response
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { 
            error: 'GitHub API rate limit exceeded',
            message: 'Please try again later. Consider adding a GitHub token for higher limits.'
          },
          { status: 429 }
        )
      }
      
      if (error.message.includes('not found')) {
        return NextResponse.json(
          { 
            error: 'Repository not found',
            message: 'The specified repository could not be found.'
          },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to fetch contributors. Please try again later.'
      },
      { status: 500 }
    )
  }
}
