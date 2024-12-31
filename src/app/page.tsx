import { auth } from "@/auth/auth";
import PageLayout from "@/components/layout/PageLayout";
import SignInForm from "@/components/auth/SignInForm";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <SignInForm callbackUrl="/dashboard" />
      </div>
    </PageLayout>
  );
}
