import { authOptions } from "@/config/auth.config";
import NextAuth from "next-auth";

export const { auth: middleware } = NextAuth(authOptions);
export const config = {
  matcher: ["/protected", "/dashboard/:path*"],
};
