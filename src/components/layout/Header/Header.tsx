// src/components/Header/Header.tsx

import { Suspense } from "react";
import { auth } from "@/auth/auth";
import { Navbar, NavbarBrand, NavbarContent } from "@lib/nextui";
import { CoastalLogo } from "@/components/branding/CoastalLogo";
import Loading from "@/app/loading";
import styles from "./Header.module.css";
import NavigationLinks from "./Navigation/NavigationLinks";
import UserMenu from "./UserMenu/UserMenu";
import SearchInput from "./Search/SearchInput";

export default async function Header() {
  const session = await auth();

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent className={styles.navbarContent}>
        {/* Left Section: Brand Logo */}
        <NavbarBrand className={styles.navbarBrand}>
          <CoastalLogo />
        </NavbarBrand>

        {/* Center Section: Navigation Links */}
        <NavigationLinks />

        {/* Right Section: Search and User Menu */}
        <NavbarContent as="div" className="flex items-center" justify="end">
          <Suspense fallback={<Loading />}>
            <SearchInput />
          </Suspense>

          {session && (
            <Suspense fallback={<Loading />}>
              <UserMenu user={session.user} />
            </Suspense>
          )}
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
}
