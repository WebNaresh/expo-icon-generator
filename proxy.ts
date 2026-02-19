import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, origin, search } = request.nextUrl;

  if (pathname === "/manifest.json") {
    return NextResponse.rewrite(new URL("/manifest.webmanifest", origin));
  }

  if (pathname !== "/" && pathname.endsWith("/")) {
    const canonical = pathname.slice(0, -1) + search;
    return NextResponse.redirect(new URL(canonical, origin), 301);
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Link", `<${origin}${pathname}>; rel="canonical"`);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap).*)",
  ],
};
