"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div>
      <h1>Sign Out</h1>
      <Button type={"button"} onClick={() => signOut({ callbackUrl: "/" })}>
        Confirm Sign Out
      </Button>
    </div>
  );
}
