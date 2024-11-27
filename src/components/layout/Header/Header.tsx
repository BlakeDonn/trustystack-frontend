// src/components/Header/Header.tsx

import Loading from "@/app/loading";
import { CoastalLogo } from "@/components/branding/CoastalLogo";
import { Input, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { Search01Icon } from "hugeicons-react";
import { useSession } from "next-auth/react";
import React, { Suspense } from "react";
import styles from "./Header.module.css";
import NavigationLinks from "./NavigationLinks";

// Lazy load UserMenu
const UserMenu = React.lazy(() => import("./UserMenu"));

const Header: React.FC = () => {
  const { data: session, status } = useSession();

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
          <Input
            classNames={{
              base: `${styles.inputWrapper} sm:max-w-[10rem]`,
              mainWrapper: "h-full",
              input: styles.inputBase,
              inputWrapper: `${styles.inputInnerWrapper} dark:${styles.inputInnerWrapperDark}`,
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<Search01Icon size={18} />}
            type="search"
          />
          {session && (
            <Suspense fallback={<Loading />}>
              <UserMenu
                userName={session.user?.name || "User"}
                userEmail={session.user?.email || "user@example.com"}
              />
            </Suspense>
          )}
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
};

export default React.memo(Header);
