import { SignInForm } from "@/components/auth/SignInForm";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { vi } from "vitest";

vi.mock("next-auth/react");

describe("SignInForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  //it("handles successful sign in", async () => {
  //  const mockSignIn = vi.mocked(signIn);
  //  const onSuccess = vi.fn();
  //  mockSignIn.mockResolvedValueOnce({ ok: true, error: null });

  //  render(<SignInForm onSuccess={onSuccess} />);

  //  fireEvent.change(screen.getByLabelText(/Email/i), {
  //    target: { value: "test@example.com" },
  //  });
  //  fireEvent.change(screen.getByLabelText(/Password/i), {
  //    target: { value: "password123" },
  //  });
  //  fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

  //  await waitFor(() => {
  //    expect(onSuccess).toHaveBeenCalled();
  //  });
  //});

  //it("displays error message on failed sign in", async () => {
  //  const mockSignIn = vi.mocked(signIn);
  //  mockSignIn.mockResolvedValueOnce({
  //    ok: false,
  //    error: "Invalid credentials",
  //  });

  //  render(<SignInForm />);

  //  fireEvent.change(screen.getByLabelText(/Email/i), {
  //    target: { value: "test@example.com" },
  //  });
  //  fireEvent.change(screen.getByLabelText(/Password/i), {
  //    target: { value: "wrongpassword" },
  //  });
  //  fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

  //  await waitFor(() => {
  //    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  //  });
  //});
});
