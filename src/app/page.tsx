"use client";

import Header from "@/components/Header";
import Login from "@/components/Login";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <Header />
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <button type={"button"} onClick={() => signOut()}>
            Logout
          </button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
