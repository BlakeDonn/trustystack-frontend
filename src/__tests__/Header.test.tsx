import Header from "@/components/common/Header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  it("renders the header correctly", () => {
    render(<Header />);
    const headerElement = screen.getByText(/My Next\.js App/i);
    expect(headerElement).toBeInTheDocument();
  });
});
