"use client";

import { User } from "next-auth";

interface DashboardContentProps {
  user: User;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <p>Your email: {user.email}</p>
      {/* Add interactive dashboard content here */}
    </div>
  );
}
