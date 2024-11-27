import Loading from "@/app/loading";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

describe("Loading Component", () => {
  it("renders loading spinner and text", () => {
    render(<Loading />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
