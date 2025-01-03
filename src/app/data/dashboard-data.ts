// app/data/dashboard.ts
import "server-only";
import { cookies } from "next/headers";
import { auth } from "@/auth/auth";

const RUST_BACKEND_URL =
  process.env.RUST_BACKEND_URL || "http://localhost:8000";

export interface DashboardData {
  projects: string[];
  welcomeMsg: string;
}

export async function getDashboardDTO(): Promise<DashboardData | null> {
  // 1. NextAuth check
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  // 2. Get the raw session token from cookies
  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get("next-auth.session-token")?.value ??
    cookieStore.get("authjs.session-token")?.value;

  if (!sessionToken) {
    return null;
  }

  // 3. Post to Rust
  const payload = {
    user_id: Number.parseInt(session.user.id, 10),
    session_token: sessionToken,
  };

  const res = await fetch(`${RUST_BACKEND_URL}/api/dashboard_data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // Possibly credentials: 'include' if you need cookies passed
  });

  if (!res.ok) {
    return null; // 401 or 500 => just null
  }

  // 4. Return the JSON
  const data: DashboardData = await res.json();
  return data;
}
