// src/graphql/queries/dashboardData.ts
import { gql } from "graphql-tag";

export const GET_DASHBOARD = gql`
  query GetDashboard {
    dashboard {
      dashboardData {
        projects
        welcomeMsg
      }
    }
  }
`;
