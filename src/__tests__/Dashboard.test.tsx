// src/__tests__/Dashboard.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "@/app/dashboard/page";
import { useSession, signOut } from "next-auth/react";
import { vi, expect } from "vitest";

vi.mock("next-auth/react");

describe("Dashboard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Header and welcome message correctly", () => {
    (useSession as vi.Mock).mockReturnValue({
      data: { user: { name: "John Doe", email: "john@example.com" } },
      status: "authenticated",
    });

    render(<Dashboard />);
    expect(screen.getByText(/welcome, john doe/i)).toBeInTheDocument();
    expect(
      screen.getByText(/your email: john@example.com/i),
    ).toBeInTheDocument();
  });

  it("displays message when not authenticated", () => {
    (useSession as vi.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Dashboard />);
    expect(screen.getByText(/you are not signed in/i)).toBeInTheDocument();
  });
});
