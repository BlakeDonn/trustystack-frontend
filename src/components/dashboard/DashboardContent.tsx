// src/components/dashboard/DashboardContent.tsx

"use client";

import React from "react";
import { useGraphQL } from "@/hooks/useGraphQL";
import { gql } from "graphql-tag";
import { useSession } from "next-auth/react";

const GET_DASHBOARD = gql`
  query GetDashboard {
    dashboard {
      dashboardData {
        projects
        welcome_msg
      }
    }
  }
`;

interface DashboardData {
  projects: string[];
  welcome_msg: string;
}

interface GetDashboardDataResponse {
  dashboard: {
    dashboardData: DashboardData;
  };
}

export default function DashboardContent() {
  const { data: session, status } = useSession();

  // Handle loading state for session
  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    return <p>Please sign in to view your dashboard.</p>;
  }

  // Define the fetch function tailored for the dashboard query
  const fetchDashboard = async (): Promise<DashboardData> => {
    const request = {
      query: GET_DASHBOARD.loc?.source.body || "",
    };

    const response = await fetchGraphQL<GetDashboardDataResponse>({
      query: request.query,
    });

    if (!response.data) {
      throw new Error("No data returned from GraphQL query");
    }

    return response.data.dashboard.dashboardData;
  };

  // Use React Query to fetch the dashboard data
  const { data, error, isLoading } = useGraphQL<
    GetDashboardDataResponse,
    undefined
  >({
    query: GET_DASHBOARD.loc?.source.body || "",
    variables: undefined, // No variables needed
    options: {
      enabled: status === "authenticated", // Run query only when authenticated
      onError: (err) => {
        console.error("Error fetching dashboard data:", err);
      },
    },
  });

  if (isLoading) return <p>Loading Dashboard...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.dashboard.dashboardData) return <p>No data found</p>;

  const { projects, welcome_msg } = data.dashboard.dashboardData;

  return (
    <div>
      <h2>My Projects</h2>
      <ul>
        {projects.map((proj) => (
          <li key={proj}>{proj}</li>
        ))}
      </ul>
      <p>{welcome_msg}</p>
    </div>
  );
}
