// src/app/dashboard/page.tsx

import { auth } from "@/auth/auth";
import PageLayout from "@/components/layout/PageLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <PageLayout>
      <DashboardContent user={session?.user} />
    </PageLayout>
  );
}
