"use client";

import { Spinner } from "@nextui-org/react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Spinner size="lg" color="default" aria-label="Loading" />
      <span className="mt-4 text-lg">Loading...</span>
    </div>
  );
}
