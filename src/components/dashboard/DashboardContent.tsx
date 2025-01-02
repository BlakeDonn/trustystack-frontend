// src/components/dashboard/DashboardContent.tsx

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

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Please sign in to view your dashboard.</p>;
  }

  const sessionToken = session?.user?.sessionToken;

  if (!sessionToken) {
    return <p>Missing session token.</p>;
  }

  const { data, error, isLoading } = useGraphQL<
    GetDashboardDataResponse,
    undefined
  >(GET_DASHBOARD, undefined, {
    enabled: !!sessionToken,
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
