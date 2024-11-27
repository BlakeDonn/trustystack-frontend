// src/__tests__/Header.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header/Header";
import { useSession } from "next-auth/react";
import { vi, expect } from "vitest";

vi.mock("next-auth/react");

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the header correctly when authenticated", () => {
    (useSession as vi.Mock).mockReturnValue({
      data: {
        user: { name: "John Doe", email: "john@example.com" },
        session: true,
      },
      status: "authenticated",
    });

    render(<Header />);
    expect(screen.getByAltText(/coastal logo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type to search/i)).toBeInTheDocument();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("does not render user menu when not authenticated", () => {
    (useSession as vi.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Header />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
