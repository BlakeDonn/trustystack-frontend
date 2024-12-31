// src/app/dashboard/page.tsx

import { auth } from "@/auth/auth";
import PageLayout from "@/components/layout/PageLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { getDashboardData } from "@/app/data/dashboard-data";

export default async function DashboardPage() {
  const [session, dashboardData] = await Promise.all([
    auth(),
    getDashboardData(),
  ]);
  console.log(dashboardData);

  if (!session?.user) {
    return (
      <PageLayout>
        <h1>Please sign in to access the dashboard</h1>
      </PageLayout>
    );
  }

  if (!dashboardData) {
    return (
      <PageLayout>
        <h1>Failed to load dashboard data</h1>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <DashboardContent user={session.user} dashboardData={dashboardData} />
    </PageLayout>
  );
}
