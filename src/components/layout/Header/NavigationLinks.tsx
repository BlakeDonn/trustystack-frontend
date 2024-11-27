// src/components/Header/NavigationLinks.tsx

import React from "react";
import { NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { NAV_LINKS, type NavLink } from "@/constants/headerConstants";
import styles from "./Header.module.css";

const NavigationLinks: React.FC = () => (
  <NavbarContent className={`${styles.navigationLinks} hidden sm:flex`}>
    {NAV_LINKS.map((link: NavLink) => (
      <NavbarItem key={link.name} isActive={link.isActive}>
        <Link
          href={link.href}
          color={link.isActive ? "secondary" : "foreground"}
          aria-current={link.isActive ? "page" : undefined}
        >
          {link.name}
        </Link>
      </NavbarItem>
    ))}
  </NavbarContent>
);

export default React.memo(NavigationLinks);
