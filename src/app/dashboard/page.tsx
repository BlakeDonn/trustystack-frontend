// src/app/dashboard/page.tsx

"use client";

import React from "react";
import Header from "@/components/layout/Header/Header";
import { useSession } from "next-auth/react";
import { Card, CardBody } from "@nextui-org/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  // Handle loading state
  if (status === "loading") {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!session) {
    return <div>You are not signed in.</div>;
  }

  return (
    <div>
      <Header />

      <div className="p-4">
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold">
              Welcome, {session.user?.name}!
            </h3>
            <span>Your email: {session.user?.email}</span>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
