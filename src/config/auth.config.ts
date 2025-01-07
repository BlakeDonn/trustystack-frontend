import { env } from "@/lib/env";
import type { NextAuthConfig } from "next-auth";

export const authOptions: NextAuthConfig = {
  providers: [],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (env.ADMIN_LIST.includes(token.email)) {
        token.role = "admin";
      }
      if (user) {
        token.role = user.role || "user";
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (env.ADMIN_LIST.includes(token.email)) {
        token.role = "admin";
      }
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.sub || "0";
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");

      if (isAdminRoute && auth?.user.role !== "admin") {
        return Response.redirect(new URL("/unauthorized", nextUrl));
      }
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
