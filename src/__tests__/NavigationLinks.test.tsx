// src/__tests__/NavigationLinks.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import NavigationLinks from "@/components/layout/Header/NavigationLinks";
import { NAV_LINKS } from "@/constants/headerConstants";
describe("NavigationLinks Component", () => {
  it("renders all navigation links correctly", () => {
    render(<NavigationLinks />);

    NAV_LINKS.forEach((link) => {
      const linkElement = screen.getByText(link.name);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", link.href);
      if (link.isActive) {
        expect(linkElement).toHaveAttribute("aria-current", "page");
      }
    });
  });
});
