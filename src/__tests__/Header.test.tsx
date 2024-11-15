import Header from "@/components/Header";
import { render, screen } from "@testing-library/react";

describe("Header Component", () => {
  it("renders the header correctly", () => {
    render(<Header />);
    const headerElement = screen.getByText(/My Next\.js App/i);
    expect(headerElement).toBeInTheDocument();
  });
});
