import { render, screen } from "@testing-library/react";
import Loading from "@/app/loading";
import { expect } from "vitest";

describe("Loading Component", () => {
  it("renders loading spinner and text", () => {
    render(<Loading />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
