import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];
 
  // Exclude API routes and static files
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Check if it's a custom domain or localhost
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
      : hostname.replace(`.localhost:3000`, "");

  // Rewrite the URL for matched domains
  if (currentHost === "app") {
    return NextResponse.rewrite(new URL(`/app${url.pathname}`, request.url));
  }

  // Add the subdomain to the request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-subdomain", subdomain);

  // Rewrite for subdomains
  if (hostname.includes(".") && !url.pathname.startsWith("/_next")) {
    
    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
