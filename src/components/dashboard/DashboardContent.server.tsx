// src/components/dashboard/DashboardContent.server.tsx
import React from "react";
import { fetchGraphQL } from "@/lib/graphqlClient";
import { GET_DASHBOARD } from "@/graphql/queries/dashboardData";

interface DashboardData {
  projects: string[];
  welcomeMsg: string;
}

interface GetDashboardResponse {
  dashboard: {
    dashboardData: DashboardData;
  };
}

export default async function DashboardContentServer() {
  const data = await fetchGraphQL<GetDashboardResponse>({
    query: GET_DASHBOARD.loc?.source.body || "",
  });

  if (!data.data?.dashboard.dashboardData) {
    return <p>No data found</p>;
  }

  const { projects, welcomeMsg } = data.data.dashboard.dashboardData;

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
