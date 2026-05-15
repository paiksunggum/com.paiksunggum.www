"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavWeather from "@/components/nav-weather";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = React.useState(false);

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOpen(false);
  }

  return (
    <nav
      className={
        isHome
          ? "absolute top-0 left-0 z-50 w-full border-b border-white/10 bg-gradient-to-b from-black/55 via-black/25 to-transparent backdrop-blur-[2px]"
          : "w-full border-b border-border bg-background"
      }
      aria-label="메인 네비게이션"
    >
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        <div className="flex min-w-0 items-center">
          <Link
            href="/"
            className={
              isHome
                ? "shrink-0 text-base font-semibold text-white hover:text-white/85 transition-colors"
                : "shrink-0 text-base font-semibold text-foreground hover:opacity-80 transition-opacity"
            }
          >
            RagWatson
          </Link>
          <NavWeather isHome={isHome} />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="/titanic"
            className={
              isHome
                ? "inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors"
                : "inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            }
          >
            [타이타닉]
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className={
                  isHome
                    ? "inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors"
                    : "inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                }
                aria-label="로그인"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                로그인
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>로그인</DialogTitle>
                <DialogDescription>
                  이메일과 비밀번호를 입력하세요.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleLoginSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="login-email">이메일</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-password">비밀번호</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">로그인</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
}
