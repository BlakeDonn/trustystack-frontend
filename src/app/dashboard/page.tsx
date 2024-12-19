// src/app/dashboard/page.tsx

import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <PageLayout>
      <DashboardContent user={session.user} />
    </PageLayout>
  );
}
