"use client";

import { User } from "next-auth";

interface AdminDashboardProps {
  user: User;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, Administrator {user.name}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Admin Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">User Management</h3>
            {/* Add user management controls */}
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">System Settings</h3>
            {/* Add system settings controls */}
          </div>
        </div>
      </div>
    </div>
  );
} 