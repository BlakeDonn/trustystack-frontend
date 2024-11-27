// src/__tests__/UserMenu.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserMenu from "@/components/layout/Header/UserMenu";
import { SessionProvider } from "next-auth/react";
import { signOut } from "next-auth/react";
import { expect, vi } from "vitest";

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  ...vi.importActual("next-auth/react"),
  signOut: vi.fn(),
}));

describe("UserMenu Component", () => {
  const mockUserName = "John Doe";
  const mockUserEmail = "john.doe@example.com";

  const renderComponent = () => {
    render(
      <SessionProvider>
        <UserMenu userName={mockUserName} userEmail={mockUserEmail} />
      </SessionProvider>,
    );
  };

  it("renders user avatar correctly", () => {
    renderComponent();
    const avatarButton = screen.getByRole("button", { name: /john doe/i });
    expect(avatarButton).toBeInTheDocument();
  });

  it("opens dropdown menu on avatar click", () => {
    renderComponent();
    const avatarButton = screen.getByRole("button", { name: /john doe/i });
    fireEvent.click(avatarButton);

    // Check for menu items
    expect(screen.getByText(/signed in as/i)).toBeInTheDocument();
    expect(screen.getByText(mockUserEmail)).toBeInTheDocument();
    expect(screen.getByText(/my settings/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("calls signOut when 'Log Out' is clicked", () => {
    renderComponent();
    const avatarButton = screen.getByRole("button", { name: /john doe/i });
    fireEvent.click(avatarButton);

    const logoutButton = screen.getByText(/log out/i);
    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalled();
  });
});
