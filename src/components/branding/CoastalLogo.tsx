"use client";

interface CoastalLogoProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export const CoastalLogo = ({
  width = "auto",
  height = "100%",
  color = "currentColor",
}: CoastalLogoProps) => (
  <img
    src="/CoastalLogo.svg"
    alt="Coastal Logo"
    style={{
      width,
      height,
      fill: color,
      display: "block",
      objectFit: "contain",
    }}
  />
);
