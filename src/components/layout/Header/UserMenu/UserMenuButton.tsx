'use client';

import { User } from "next-auth";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@lib/nextui";
import { signOut } from "next-auth/react";

interface UserMenuButtonProps {
  user: User;
}

export default function UserMenuButton({ user }: UserMenuButtonProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="flex items-center gap-2">
          {user.image && (
            <img 
              src={user.image} 
              alt={user.name || 'User'} 
              className="w-6 h-6 rounded-full"
            />
          )}
          {user.name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="profile">Profile</DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem 
          key="logout" 
          className="text-danger" 
          color="danger"
          onClick={() => signOut()}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
} 