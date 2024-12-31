import { Providers } from "@/app/providers";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type React from "react";
import "tailwindcss/tailwind.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  preload: true,
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload: true,
  display: "swap",
  fallback: ["monospace"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  title: {
    template: "%s | Coastal Configurations",
    default: "Coastal Configurations",
  },
  description:
    "Coastal Configurations is a platform for creating and sharing configurations for pc building",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full`}
    >
      <body className="antialiased h-full">
        <Providers>
          {/*
            Note: The `PageLayout` is a Client Component and should not be directly included here.
            Instead, it will be included within individual pages.
          */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
