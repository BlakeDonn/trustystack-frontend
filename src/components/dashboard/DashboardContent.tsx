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
        welcomeMsg
      }
    }
  }
`;

interface DashboardData {
  projects: string[];
  welcomeMsg: string;
}

interface GetDashboardDataResponse {
  dashboard: {
    dashboardData: DashboardData;
  };
}

export default function DashboardContent() {
  const { data: session, status } = useSession();

  // Move the useGraphQL hook before any conditional returns
  const { data, error, isLoading } = useGraphQL<
    GetDashboardDataResponse,
    undefined
  >({
    query: GET_DASHBOARD.loc?.source.body || "",
    variables: undefined,
    options: {
      enabled: status === "authenticated", // This will prevent the query from running until authenticated
      onError: (err) => {
        console.error("Error fetching dashboard data:", err);
      },
    },
  });

  // Handle loading state for session
  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    return <p>Please sign in to view your dashboard.</p>;
  }

  if (isLoading) return <p>Loading Dashboard...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.dashboard.dashboardData) return <p>No data found</p>;

  const { projects, welcomeMsg } = data.dashboard.dashboardData;

  return (
    <div>
      <h2>My Projects</h2>
      <ul>
        {projects.map((proj) => (
          <li key={proj}>{proj}</li>
        ))}
      </ul>
      <p>{welcomeMsg}</p>
    </div>
  );
}
