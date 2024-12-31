import { env } from "@/lib/env";
import type { NextAuthConfig } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || "",
      clientSecret: env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
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
      }
      return session;
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
