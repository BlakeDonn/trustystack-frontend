"use client";

import { User } from "next-auth";
import type { DashboardData } from "@/app/data/dashboard-data";

interface DashboardContentProps {
  user: User;
  dashboardData: DashboardData;
}

export default function DashboardContent({ user, dashboardData }: DashboardContentProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <p>API Version: {dashboardData.apiVersion}</p>
      {/* Add more dashboard content using the data */}
    </div>
  );
}
