// src/__tests__/UserMenu.test.tsx

import UserMenu from "@/components/layout/Header/UserMenu";
import { fireEvent, render, screen } from "@testing-library/react";
import { signOut } from "next-auth/react";
import React from "react";
import { expect, vi } from "vitest";

vi.mock("next-auth/react");

describe("UserMenu Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user avatar correctly", () => {
    render(<UserMenu userName="Jane Doe" userEmail="jane@example.com" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens dropdown menu on avatar click", () => {
    render(<UserMenu userName="Jane Doe" userEmail="jane@example.com" />);
    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);
    expect(screen.getByText(/signed in as/i)).toBeInTheDocument();
    expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
  });

  it("calls signOut when 'Log Out' is clicked", () => {
    render(<UserMenu userName="Jane Doe" userEmail="jane@example.com" />);
    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);
    const logoutItem = screen.getByText(/log out/i);
    fireEvent.click(logoutItem);
    expect(signOut).toHaveBeenCalled();
  });
});
