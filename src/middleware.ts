import NextAuth from "next-auth";
import { authOptions } from "./config/auth.config";

export default NextAuth(authOptions).auth;

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
