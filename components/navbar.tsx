"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <nav
      className="w-full border-b border-border bg-background"
      aria-label="메인 네비게이션"
    >
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-base font-semibold text-foreground hover:opacity-80 transition-opacity"
        >
          RagWatson
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="로그인"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            로그인
          </button>
        </div>
      </div>
    </nav>
  );
}
