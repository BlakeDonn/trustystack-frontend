// src/__tests__/NavigationLinks.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import NavigationLinks from "@/components/layout/Header/NavigationLinks";
import { Navbar } from "@nextui-org/react";
import { expect } from "vitest";
describe("NavigationLinks Component", () => {
  const renderComponent = () => {
    render(
      <Navbar>
        <NavigationLinks />
      </Navbar>,
    );
  };

  it("renders all navigation links correctly", () => {
    renderComponent();

    expect(screen.getByText(/Features/i)).toBeInTheDocument();
    expect(screen.getByText(/Customers/i)).toBeInTheDocument();
    expect(screen.getByText(/Integrations/i)).toBeInTheDocument();
  });
});
