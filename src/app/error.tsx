"use client";

import Button from "@/components/ui/Button";
import { useEffect } from "react";

export default function DefaultError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <Button
          onClick={reset}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
          disabled={false}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
