// src/components/Header/UserMenu.tsx

import { User } from "next-auth";
import UserMenuButton from "./UserMenuButton";
import UserMenuDropdown from "./UserMenuDropdown";

interface UserMenuProps {
  user: User | underfined;
}

export default function UserMenu({ user }: UserMenuProps) {
  if (!user) return null;

  return (
    <div className="relative">
      <UserMenuButton user={user} />
    </div>
  );
}
