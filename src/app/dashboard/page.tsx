// app/dashboard/page.tsx
import { auth } from "@/auth/auth";
import PageLayout from "@/components/layout/PageLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default async function DashboardPage() {
  // Basic server check for session
  const session = await auth();
  if (!session?.user) {
    return (
      <PageLayout>
        <h1>Please sign in to access the dashboard</h1>
      </PageLayout>
    );
  }

  // If signed in, render the Client Component that uses React Query
  return (
    <PageLayout>
      <DashboardContent />
    </PageLayout>
  );
}
