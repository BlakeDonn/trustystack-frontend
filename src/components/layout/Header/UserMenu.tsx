// src/components/Header/UserMenu.tsx

import type { UserMenuItem } from "@/constants/headerConstants";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ListboxItem,
  type ListboxItemProps,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React from "react";
import styles from "./Header.module.css";
import { SignOut } from "@/components/auth/signout-button";

interface UserMenuProps {
  userName: string;
  userEmail: string;
}

const USER_MENU_ITEMS: UserMenuItem[] = [
  { key: "profile", label: "Signed in as", subLabel: "", isHeader: true },
  { key: "settings", label: "My Settings" },
  { key: "team_settings", label: "Team Settings" },
  { key: "analytics", label: "Analytics" },
  { key: "system", label: "System" },
  { key: "configurations", label: "Configurations" },
  { key: "help_and_feedback", label: "Help & Feedback" },
  { key: "logout", label: "Log Out", color: "danger" },
];

const UserMenu: React.FC<UserMenuProps> = ({ userName, userEmail }) => (
  <Dropdown placement="bottom-end">
    <DropdownTrigger>
      <Avatar
        isBordered
        as="button"
        className={styles.avatarButton}
        color="secondary"
        name={userName}
        size="sm"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />
    </DropdownTrigger>
    <DropdownMenu aria-label="Profile Actions" variant="flat">
      {USER_MENU_ITEMS.map((item) =>
        item.isHeader ? (
          <DropdownItem key={item.key} className="h-14 gap-2" isDisabled>
            <p className="font-semibold">{item.label}</p>
            <p className="font-semibold">{userEmail}</p>
          </DropdownItem>
        ) : item.key === "logout" ? (
          <DropdownItem
            key={item.key}
            color={item.color}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            {item.label}
          </DropdownItem>
        ) : (
          <DropdownItem key={item.key} color={item.color}>
            {item.label}
          </DropdownItem>
        ),
      )}
    </DropdownMenu>
  </Dropdown>
);

export default React.memo(UserMenu);
