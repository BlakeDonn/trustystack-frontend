// auth.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import { authOptions } from "@/config/auth.config";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/lib/env";

const pool = new Pool({
  host: process.env.POSTGRES_HOST || "localhost",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  ...authOptions,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
