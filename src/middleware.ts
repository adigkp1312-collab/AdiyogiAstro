import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const protectedRoutes: string[] = [];

// These sub-routes are publicly accessible (no auth required)
const publicSubRoutes = [
  "/birth-chart/new",
];

const adminRoutes = ["/admin"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Check if the route is an admin route
  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAdminRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }

    return NextResponse.next();
  }

  // Check if the route is a public sub-route (allowed without auth)
  const isPublicSubRoute = publicSubRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPublicSubRoute) {
    return NextResponse.next();
  }

  // Check if the route is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
