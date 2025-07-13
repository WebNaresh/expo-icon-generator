import { NextRequest, NextResponse } from 'next/server'

/**
 * Next.js Middleware for Expo Icon Generator
 * 
 * Handles PWA manifest compatibility by redirecting requests from
 * /manifest.json to /manifest.webmanifest to ensure compatibility
 * across different PWA implementations and browsers.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle manifest.json redirect for PWA compatibility
  if (pathname === '/manifest.json') {
    // Create a permanent redirect (301) to the correct manifest path
    const url = request.nextUrl.clone()
    url.pathname = '/manifest.webmanifest'
    
    return NextResponse.redirect(url, {
      status: 301, // Permanent redirect
      headers: {
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
