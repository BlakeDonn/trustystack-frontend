import { NAV_LINKS } from "@/constants/headerConstants";
import { NavbarContent } from "@lib/nextui";
import NavigationItem from "./NavigationItem";
import styles from "../Header.module.css";

export default function NavigationLinks() {
  return (
    <NavbarContent className={`${styles.navigationLinks} hidden sm:flex`}>
      {NAV_LINKS.map((link) => (
        <NavigationItem key={link.name} {...link} />
      ))}
    </NavbarContent>
  );
} 