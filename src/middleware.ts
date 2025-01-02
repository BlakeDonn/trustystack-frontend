import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // No token? => not signed in
  //
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // Check role from JWT claims (no DB needed)
  if (isAdminRoute && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // All good
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
