"use client";

import { Button } from "@heroui/react";
import { Sun, Moon } from "@gravity-ui/icons";
import { useAppTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useAppTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      isIconOnly
      variant="flat"
      aria-label="Toggle theme"
      onPress={toggleTheme}
    >
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
