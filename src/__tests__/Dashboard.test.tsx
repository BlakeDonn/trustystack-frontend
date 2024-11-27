// src/__tests__/Dashboard.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "@/app/dashboard/page";
import Header from "@/components/layout/Header/Header";
import { SessionProvider } from "next-auth/react";
import { signOut } from "next-auth/react";
import { expect, vi } from "vitest";

vi.mock("next-auth/react", () => ({
  ...vi.importActual("next-auth/react"),
  signOut: vi.fn(),
}));

describe("Dashboard Component", () => {
  const mockSession = {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    expires: "1",
  };

  const renderComponent = () => {
    render(
      <SessionProvider session={mockSession}>
        <Dashboard />
      </SessionProvider>,
    );
  };

  it("renders Header and welcome message correctly", () => {
    renderComponent();

    // Check Header
    const logoElement = screen.getByAltText(/coastal logo/i);
    expect(logoElement).toBeInTheDocument();

    // Check welcome message
    expect(screen.getByText(/welcome, john doe!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/your email: john.doe@example.com/i),
    ).toBeInTheDocument();
  });

  it("calls signOut when Logout button is clicked", () => {
    renderComponent();

    // Assuming Logout button is within Header's UserMenu
    const avatarButton = screen.getByRole("button", { name: /john doe/i });
    fireEvent.click(avatarButton);

    const logoutButton = screen.getByText(/log out/i);
    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalled();
  });

  it("displays message when not authenticated", () => {
    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>,
    );

    expect(screen.getByText(/you are not signed in./i)).toBeInTheDocument();
  });
});
