"use client";

import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type NavVariant = "home" | "warm" | "default";

export function getNavVariant(pathname: string): NavVariant {
  if (pathname === "/") return "home";
  if (pathname === "/chat" || pathname.startsWith("/chat/")) return "warm";
  return "default";
}

export function navBarClassName(variant: NavVariant) {
  if (variant === "home") {
    return "absolute top-0 left-0 z-50 w-full border-b border-[var(--hero-border)] bg-[var(--nav-surface)]/95 backdrop-blur-[2px]";
  }
  if (variant === "warm") {
    return "w-full border-b border-[var(--hero-border)] bg-[var(--nav-surface)]";
  }
  return "w-full border-b border-border bg-background";
}

export function navLogoClassName(variant: NavVariant) {
  if (variant === "home" || variant === "warm") {
    return "!text-[#0D3D2E] dark:!text-foreground";
  }
  return undefined;
}

export function navActionClassName(variant: NavVariant) {
  if (variant === "home" || variant === "warm") {
    return "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#0D3D2E]/15 bg-white/70 text-[#0D3D2E] shadow-sm transition-colors hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-foreground dark:hover:bg-white/20";
  }
  return "inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground";
}

export function NavTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6} className="z-[60]">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
