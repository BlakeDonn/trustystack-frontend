"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={() => signOut({ callbackUrl: "/" })}>
        Confirm Sign Out
      </button>
    </div>
  );
} 