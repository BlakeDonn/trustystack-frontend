"use client";

import Header from "@/components/common/Header";
import { SignInForm } from "@/components/auth/SignInForm";
import { signOut, useSession } from "next-auth/react";
import loading from "./loading";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return loading();
  }

  return (
    <div className="min-h-screen">
      <Header />
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <SignInForm callbackUrl="/dashboard" />
      )}
    </div>
  );
}
