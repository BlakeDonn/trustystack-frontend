import "server-only";
import { auth } from "@/auth/auth";
import { gqlFetch } from "@/lib/graphql-client";

export interface DashboardData {
  apiVersion: string;
  // Add other fields from your GraphQL schema
}

const DashboardQuery = `
  query DashboardData {
    apiVersion
    # Add other fields you need
  }
`;

export async function getDashboardData(): Promise<DashboardData | null> {
  const session = await auth();
  console.log(session);
  if (!session?.user) return null;

  const headers: HeadersInit = {};
  if (session.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  try {
    const data = await gqlFetch<{ DashboardData }>(DashboardQuery, {}, headers);
    return data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return null;
  }
}
