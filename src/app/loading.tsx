"use client";

import React from "react";
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Spinner size="lg" color="default" aria-label="Loading" />
      <span className="mt-4 text-lg">Loading...</span>
    </div>
  );
}
