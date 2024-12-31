import { auth } from "@/auth/auth";
import PageLayout from "@/components/layout/PageLayout";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const session = await auth();

  return (
    <PageLayout>
      <AdminDashboard user={session?.user} />
    </PageLayout>
  );
}
