import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";
import { defaultRedirectForRole } from "@/lib/navigation";

const protectedRoutes = ["/dashboard", "/list-account", "/admin"];
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
    const next = url.searchParams.get("next");
    url.pathname = next && next.startsWith("/") && !next.startsWith("//")
      ? next
      : defaultRedirectForRole(session?.user?.role ?? null);
    url.searchParams.delete("next");
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin") && session?.user?.role !== "ADMIN") {
    const url = request.nextUrl.clone();
    url.pathname = "/marketplace";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/list-account/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
