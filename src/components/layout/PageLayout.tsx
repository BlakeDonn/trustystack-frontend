"use client";

import React, { type ReactNode } from "react";
import Header from "./Header/Header";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = React.memo(({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
});

export default PageLayout;
