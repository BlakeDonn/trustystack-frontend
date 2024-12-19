'use client';

import { Input } from "@lib/nextui";
import { Search01Icon } from "hugeicons-react";
import styles from "../Header.module.css";

export default function SearchInput() {
  return (
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
      onChange={(e) => {
        // Handle search logic here
      }}
    />
  );
} 