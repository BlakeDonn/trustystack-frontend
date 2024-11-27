"use client";

import { SignInForm } from "@/components/auth/SignInForm";
import Header from "@components/layout/Header/Header";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Loading from "./loading";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <Button type="button" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      ) : (
        <SignInForm callbackUrl="/dashboard" />
      )}
    </div>
  );
}
