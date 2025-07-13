import { NextRequest, NextResponse } from 'next/server'

/**
 * Next.js Middleware for Expo Icon Generator
 *
 * Handles PWA manifest compatibility by rewriting requests from
 * /manifest.json to serve content from /manifest.webmanifest
 * while keeping the URL as /manifest.json for better compatibility.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle manifest.json rewrite for PWA compatibility
  if (pathname === '/manifest.json') {
    // Rewrite to serve manifest.webmanifest content while keeping the URL as manifest.json
    const url = request.nextUrl.clone()
    url.pathname = '/manifest.webmanifest'

    return NextResponse.rewrite(url, {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    })
  }

  // Continue with the request for all other paths
  return NextResponse.next()
}

/**
 * Middleware configuration
 * 
 * Specifies which paths should be processed by the middleware.
 * We only need to process the manifest.json path for our redirect.
 */
export const config = {
  matcher: [
    // Match only the manifest.json path
    '/manifest.json',
  ],
}
