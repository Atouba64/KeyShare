import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

const protectedRoutes = ["/dashboard", "/list-account", "/onboarding", "/admin"];
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("ks_session")?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;
  const isLoggedIn = Boolean(session?.user?.id);

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (isProtected && !isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && isLoggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = session?.user?.role ? "/dashboard" : "/onboarding";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin") && session?.user?.role !== "ADMIN") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (pathname === "/list-account" && isLoggedIn) {
    const role = session?.user?.role;
    if (role && !["PROVIDER", "BOTH", "ADMIN"].includes(role)) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/list-account/:path*",
    "/onboarding/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
