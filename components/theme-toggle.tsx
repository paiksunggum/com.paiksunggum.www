"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { navActionClassName, NavVariant } from "@/components/nav-icon-action";

function ToggleOnIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
      fill="none"
    >
      {/* Toggle housing - ON (knob right) */}
      <rect x="1" y="6" width="22" height="12" rx="6" fill="currentColor" />
      {/* Knob */}
      <circle cx="16.5" cy="12" r="4.5" fill="white" />
      {/* Moon crescent cutout */}
      <circle cx="18" cy="10.5" r="3.2" fill="currentColor" />
    </svg>
  );
}

function ToggleOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
      fill="none"
    >
      {/* Toggle housing - OFF (knob left), subdued */}
      <rect x="1" y="6" width="22" height="12" rx="6" fill="currentColor" opacity="0.25" />
      <rect x="1" y="6" width="22" height="12" rx="6" stroke="currentColor" strokeWidth="1.5" />
      {/* Knob */}
      <circle cx="7.5" cy="12" r="4.5" fill="currentColor" />
      {/* Sun rays (tiny dots) */}
      <circle cx="9.5" cy="10" r="1.2" fill="white" />
    </svg>
  );
}

export function ThemeToggle({ navVariant }: { navVariant: NavVariant }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="size-9 shrink-0" />;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="테마 전환"
      className={navActionClassName(navVariant)}
    >
      {theme === "dark" ? <ToggleOnIcon /> : <ToggleOffIcon />}
    </button>
  );
}
