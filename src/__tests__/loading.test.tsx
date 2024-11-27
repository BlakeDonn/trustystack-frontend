import Loading from "@/app/loading";
import { render, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";

describe("Loading Component", () => {
  it("renders loading spinner and text", async () => {
    render(<Loading />);
    await waitFor(() => {
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
      expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });
  });
});
