import Login from "@/components/Login";
import { fireEvent, render, screen } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { vi } from "vitest";

vi.mock("next-auth/react");

describe("Login Component", () => {
  it("calls signIn on form submission with credentials", async () => {
    const mockSignIn = vi.mocked(signIn);
    mockSignIn.mockResolvedValue({ ok: true });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText(/Login button/i));

    expect(mockSignIn).toHaveBeenCalledWith("credentials", {
      redirect: false,
      email: "test@example.com",
      password: "password123",
      callbackUrl: "/",
    });
  });

  it("initiates signIn with GitHub when GitHub button is clicked", () => {
    const mockSignIn = vi.mocked(signIn);
    render(<Login />);

    fireEvent.click(screen.getByText(/Login with GitHub/i));

    expect(mockSignIn).toHaveBeenCalledWith("github", { callbackUrl: "/" });
  });

  it("initiates signIn with Google when Google button is clicked", () => {
    const mockSignIn = vi.mocked(signIn);
    render(<Login />);

    fireEvent.click(screen.getByText(/Login with Google/i));

    expect(mockSignIn).toHaveBeenCalledWith("google", { callbackUrl: "/" });
  });
});
