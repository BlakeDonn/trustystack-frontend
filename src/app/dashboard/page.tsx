// src/app/dashboard/page.tsx

"use client";

import PageLayout from "@/components/layout/PageLayout";
import { Card, CardBody } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { type ReactElement } from "react";
import Loading from "../loading";

const Dashboard: React.FC = React.memo((): ReactElement => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return <div>You are not signed in.</div>;
  }

  return (
    <PageLayout>
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
    </PageLayout>
  );
});

export default Dashboard;
