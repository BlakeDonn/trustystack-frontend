// src/__tests__/Dashboard.test.tsx

import Dashboard from "@/app/dashboard/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { expect, vi } from "vitest";

vi.mock("next-auth/react");

describe("Dashboard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Header and welcome message correctly", async () => {
    (useSession as vi.Mock).mockReturnValue({
      data: { user: { name: "John Doe", email: "john@example.com" } },
      status: "authenticated",
    });

    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText(/welcome, john doe/i)).toBeInTheDocument();
      expect(
        screen.getByText(/your email: john@example.com/i),
      ).toBeInTheDocument();
    });
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
