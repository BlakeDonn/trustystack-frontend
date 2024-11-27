"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { type ReactNode, type ReactElement, useMemo } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = React.memo(
  ({ children }): ReactElement => {
    const router = useRouter();
    const queryClient = useMemo(() => new QueryClient(), []);

    return (
      <NextUIProvider navigate={router.push}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
      </NextUIProvider>
    );
  },
);
