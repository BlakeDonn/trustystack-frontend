"use client";

import { SignInForm } from "@/components/auth/SignInForm";

export default function SignIn() {
  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-2xl font-bold text-center">Sign In</h1>
      <SignInForm />
    </div>
  );
}
