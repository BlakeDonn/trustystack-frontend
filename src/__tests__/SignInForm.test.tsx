import { expect } from "vitest";

import { SignInForm } from "@/components/auth/SignInForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { vi } from "vitest";

vi.mock("next-auth/react");

describe("SignInForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the Sign In button", () => {
    render(<SignInForm />);
    expect(
      screen.getByRole("button", { name: /sign in with google/i }),
    ).toBeInTheDocument();
  });

  it("displays loading state when sign-in is in progress", async () => {
    const mockSignIn = vi.mocked(signIn);
    mockSignIn.mockImplementation(() => new Promise(() => {})); // Never resolve the promise to simulate loading state

    render(<SignInForm />);

    fireEvent.click(
      screen.getByRole("button", { name: /sign in with google/i }),
    );

    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("handles successful sign-in", async () => {
    const mockSignIn = vi.mocked(signIn);
    mockSignIn.mockResolvedValueOnce({ ok: true, error: null });

    render(<SignInForm />);

    fireEvent.click(
      screen.getByRole("button", { name: /sign in with google/i }),
    );

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("google", {
        callbackUrl: "/dashboard",
      });
    });
  });

  it("handles sign-in failure", async () => {
    const mockSignIn = vi.mocked(signIn);
    mockSignIn.mockRejectedValueOnce(new Error("Sign-in failed"));

    render(<SignInForm />);

    fireEvent.click(
      screen.getByRole("button", { name: /sign in with google/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(/failed to sign in with google/i),
      ).toBeInTheDocument();
    });
  });

  it("resets loading state after error", async () => {
    const mockSignIn = vi.mocked(signIn);
    mockSignIn.mockRejectedValueOnce(new Error("Sign-in failed"));

    render(<SignInForm />);

    fireEvent.click(
      screen.getByRole("button", { name: /sign in with google/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign in with google/i }),
      ).not.toBeDisabled();
    });
  });
});
