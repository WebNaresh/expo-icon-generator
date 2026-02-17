import { NextRequest, NextResponse } from 'next/server'

/**
 * Next.js Middleware for Expo Icon Generator
 *
 * Handles:
 * 1. PWA manifest compatibility by rewriting requests from /manifest.json to /manifest.webmanifest
 * 2. Canonical URL enforcement (removes trailing slashes)
 * 3. Canonical HTTP headers for SEO
 * 4. Security headers
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname } = url

  // Base URL for canonical headers
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://expo-assets-generator.vercel.app'

  // Handle manifest.json rewrite for PWA compatibility
  if (pathname === '/manifest.json') {
    // Rewrite to serve manifest.webmanifest content while keeping the URL as manifest.json
    url.pathname = '/manifest.webmanifest'

    return NextResponse.rewrite(url, {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
        'Link': `<${baseUrl}/manifest.json>; rel="canonical"`, // Canonical header
      },
    })
  }

  // Handle trailing slash redirects - redirect WITH trailing slash TO without trailing slash
  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 301) // Permanent redirect for SEO
  }

  // Continue with the request and add canonical headers
  const response = NextResponse.next()

  // Add canonical HTTP header for SEO
  const canonicalUrl = `${baseUrl}${pathname}`
  response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`)

  // Add additional SEO headers
  response.headers.set('X-Robots-Tag', 'index, follow')

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

/**
 * Middleware configuration
 *
 * Specifies which paths should be processed by the middleware.
 * Handles manifest.json rewrite, trailing slash redirects, and canonical headers.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap).*)',
  ],
}
