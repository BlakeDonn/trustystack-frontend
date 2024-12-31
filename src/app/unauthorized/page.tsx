import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

export default function UnauthorizedPage() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-red-500">Unauthorized Access</h1>
        <p className="mt-4">You don't have permission to access this page.</p>
        <Link
          href="/dashboard"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Dashboard
        </Link>
      </div>
    </PageLayout>
  );
} 