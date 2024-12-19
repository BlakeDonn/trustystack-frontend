"use client";

import { Button } from "@lib/nextui";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button type="button" onClick={() => signOut()} className="mt-4">
      Logout
    </Button>
  );
}
