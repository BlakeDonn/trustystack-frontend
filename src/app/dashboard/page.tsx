// app/dashboard/page.tsx
import { Suspense } from "react";
import { auth } from "@/auth/auth";
import PageLayout from "@/components/layout/PageLayout";
import DashboardContentServer from "@/components/dashboard/DashboardContent.server";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <PageLayout>
        <h1>Please sign in to access the dashboard</h1>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Suspense fallback={<p>Loading Dashboard...</p>}>
        <DashboardContentServer />
      </Suspense>
    </PageLayout>
  );
}
