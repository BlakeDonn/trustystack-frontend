"use client";

import { Button } from "@lib/nextui";
import { signOut } from "@auth/auth";

export default function LogoutButton() {
  return (
    <Button type="button" onClick={() => signOut()} className="mt-4">
      Logout
    </Button>
  );
}
