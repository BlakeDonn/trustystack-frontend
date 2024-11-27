import NotFound from "@/app/not-found";
import { render, screen } from "@testing-library/react";

describe("NotFound Component", () => {
  it("renders not found message and return home link", () => {
    render(<NotFound />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/could not find requested resource/i),
    ).toBeInTheDocument();
    const returnHomeLink = screen.getByRole("link", { name: /return home/i });
    expect(returnHomeLink).toBeInTheDocument();
    expect(returnHomeLink).toHaveAttribute("href", "/");
  });
});
