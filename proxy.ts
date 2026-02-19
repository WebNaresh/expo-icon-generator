import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, origin, search } = request.nextUrl;

  // Rewrite /manifest.json → /manifest.webmanifest
  if (pathname === "/manifest.json") {
    return NextResponse.rewrite(new URL("/manifest.webmanifest", origin));
  }

  // Redirect trailing slashes (except root)
  if (pathname !== "/" && pathname.endsWith("/")) {
    const canonical = pathname.slice(0, -1) + search;
    return NextResponse.redirect(new URL(canonical, origin), 301);
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Canonical URL header
  const canonical = `${origin}${pathname}`;
  response.headers.set("Link", `<${canonical}>; rel="canonical"`);

  return response;
}

/**
 * Middleware configuration
 *
 * Specifies which paths should be processed by the proxy.
 * Handles manifest.json rewrite, trailing slash redirects, and canonical headers.
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap).*)",
  ],
};
