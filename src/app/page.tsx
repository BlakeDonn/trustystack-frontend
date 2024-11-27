"use client";

import React, { ReactElement } from "react";
import { SignInForm } from "@/components/auth/SignInForm";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Loading from "./loading";
import PageLayout from "@/components/layout/PageLayout";

const Home: React.FC = React.memo((): ReactElement => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <PageLayout>
      {session ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-xl">Welcome, {session.user?.name}!</p>
          <Button type="button" onClick={() => signOut()} className="mt-4">
            Logout
          </Button>
        </div>
      ) : (
        <SignInForm callbackUrl="/dashboard" />
      )}
    </PageLayout>
  );
});

export default Home;

