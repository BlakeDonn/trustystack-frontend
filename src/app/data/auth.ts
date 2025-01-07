// app/data/auth.ts
import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";

/**
 * In a real app, you'd do real token decryption/verification.
 * For example, verifying a JWT, or pulling from NextAuth session, etc.
 */
async function decryptAndValidate(tokenValue: string | undefined) {
  if (!tokenValue) return null;

  // Placeholder. Insert your real logic here.
  // For example, decode a JWT and verify its signature, or
  // look up a session in your DB.
  const decoded = {
    userId: "123",
    role: "admin", // or 'user'
    // ...
  };
  return decoded;
}

/**
 * This is a "User" class that we can safely pass around
 * on the server. We do NOT pass the entire token or
 * internal secrets around in it.
 */
export class User {
  id: string;
  role: string;

  constructor(id: string, role: string) {
    this.id = id;
    this.role = role;
  }

  get isAdmin() {
    return this.role === "admin";
  }
}

/**
 * Using `cache` so repeated calls in a single request get the same result.
 * If you want a fresh read each time, omit the cache.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("next-auth.session-token")?.value ??
    cookieStore.get("authjs.session-token")?.value;

  const decoded = await decryptAndValidate(token);
  if (!decoded) return null;

  return new User(decoded.userId, decoded.role);
});
