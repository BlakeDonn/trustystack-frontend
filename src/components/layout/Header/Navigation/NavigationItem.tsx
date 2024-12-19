'use client';

import { Link, NavbarItem } from "@lib/nextui";
import type { NavLink } from "@/constants/headerConstants";

export default function NavigationItem({ name, href, isActive }: NavLink) {
  return (
    <NavbarItem isActive={isActive}>
      <Link
        href={href}
        color={isActive ? "secondary" : "foreground"}
        aria-current={isActive ? "page" : undefined}
      >
        {name}
      </Link>
    </NavbarItem>
  );
} 