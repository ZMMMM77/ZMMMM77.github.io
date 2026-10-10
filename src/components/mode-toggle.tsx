"use client";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      aria-label="切换浅色或深色主题"
      className={cn("cursor-pointer", className)}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="size-full dark:hidden" />
      <MoonIcon className="hidden size-full dark:block" />
    </Button>
  );
}
