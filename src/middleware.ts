import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(token);

  // No token? => not signed in
  //
  if (!token && req.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }
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
