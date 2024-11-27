// src/__tests__/Header.test.tsx

import Header from "@/components/layout/Header/Header";
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

describe("Header Component", () => {
  const mockSession: Session = {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    expires: "1",
    // Add other necessary session properties if needed
  };

  it("renders the header correctly", () => {
    render(
      <SessionProvider session={mockSession}>
        <Header />
      </SessionProvider>,
    );

    // Check for CoastalLogo
    const logoElement = screen.getByAltText(/coastal logo/i);
    expect(logoElement).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByText(/Features/i)).toBeInTheDocument();
    expect(screen.getByText(/Customers/i)).toBeInTheDocument();
    expect(screen.getByText(/Integrations/i)).toBeInTheDocument();

    // Check for search input
    expect(screen.getByPlaceholderText(/type to search/i)).toBeInTheDocument();

    // Check for user avatar
    const avatarButton = screen.getByRole("button", { name: /john doe/i });
    expect(avatarButton).toBeInTheDocument();
  });

  it("does not render user menu when not authenticated", () => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>,
    );

    // User avatar should not be present
    const avatarButton = screen.queryByRole("button", { name: /user name/i });
    expect(avatarButton).not.toBeInTheDocument();
  });
});
