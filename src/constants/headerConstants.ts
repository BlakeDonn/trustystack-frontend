// src/constants/headerConstants.ts

import type { ListboxItemProps } from "@nextui-org/react";

export interface NavLink {
  name: string;
  href: string;
  isActive?: boolean;
}

export interface UserMenuItem {
  key: string;
  label: string;
  subLabel?: string;
  color?: ListboxItemProps["color"];
  isHeader?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { name: "Features", href: "#" },
  { name: "Customers", href: "#", isActive: true },
  { name: "Integrations", href: "#" },
];

export const USER_MENU_ITEMS: UserMenuItem[] = [
  {
    key: "profile",
    label: "Signed in as",
    subLabel: "user@example.com",
    isHeader: true,
  },
  { key: "settings", label: "My Settings" },
  { key: "team_settings", label: "Team Settings" },
  { key: "analytics", label: "Analytics" },
  { key: "system", label: "System" },
  { key: "configurations", label: "Configurations" },
  { key: "help_and_feedback", label: "Help & Feedback" },
  { key: "logout", label: "Log Out", color: "danger" },
];
