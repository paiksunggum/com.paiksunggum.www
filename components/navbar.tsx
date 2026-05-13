"use client";

import { LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo / Brand */}
        <span className="text-base font-semibold text-foreground tracking-tight">
          RAG Watson
        </span>

        {/* Login Button */}
        <button
          type="button"
          aria-label="로그인"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors"
        >
          <LogIn className="w-4 h-4" />
          로그인
        </button>
      </div>
    </nav>
  );
}
