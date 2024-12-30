// src/components/Header/UserMenu.tsx

import type { User } from "next-auth";
import UserMenuButton from "./UserMenuButton";

interface UserMenuProps {
  user: User | undefined;
}

export default function UserMenu({ user }: UserMenuProps) {
  if (!user) return null;

  return (
    <div className="relative">
      <UserMenuButton user={user} />
    </div>
  );
}
