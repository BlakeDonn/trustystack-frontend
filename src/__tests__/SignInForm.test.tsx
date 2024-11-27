import { SignInForm } from "@/components/auth/SignInForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";
import React from "react";
import { expect, vi } from "vitest";

describe("SignInForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders the Sign In button", () => {
    render(<SignInForm />);
    expect(
      screen.getByRole("button", { name: /sign in with google/i }),
    ).toBeInTheDocument();
  });

  it("displays loading state when sign-in is in progress", async () => {
    render(<SignInForm />);
    const signInButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });

    fireEvent.click(signInButton);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("google", {
        callbackUrl: "/dashboard",
      });
    });
  });

  it("handles successful sign-in", async () => {
    (signIn as vi.Mock).mockResolvedValueOnce({ ok: true });

    render(<SignInForm />);
    const signInButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("google", {
        callbackUrl: "/dashboard",
      });
    });
  });

  it("handles sign-in failure", async () => {
    (signIn as vi.Mock).mockRejectedValueOnce(
      new Error("Failed to sign in with Google"),
    );

    render(<SignInForm />);
    const signInButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("google", {
        callbackUrl: "/dashboard",
      });
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(
      "Sign-in error:",
      new Error("Failed to sign in with Google"),
    );
  });

  it("resets loading state after error", async () => {
    (signIn as vi.Mock).mockRejectedValueOnce(new Error("Sign-in failed"));

    render(<SignInForm />);
    const signInButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("google", {
        callbackUrl: "/dashboard",
      });
    });

    expect(signInButton).not.toBeDisabled();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(
      "Sign-in error:",
      new Error("Sign-in failed"),
    );
  });
});
