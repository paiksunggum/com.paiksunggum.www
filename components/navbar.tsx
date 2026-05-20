"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Upload } from "lucide-react";

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
import SignupDialog from "@/components/signup-dialog";
import FormaLogo from "@/components/forma-logo";
import { NavTooltip, navActionClassName } from "@/components/nav-icon-action";
import { getApiBase } from "@/lib/api-base";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = React.useState(false);

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    try {
      const res = await fetch(`${getApiBase()}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: email, password }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          detail?: unknown;
        } | null;
        const detail = body?.detail;
        const message =
          typeof detail === "string"
            ? detail
            : "로그인 요청에 실패했습니다.";
        throw new Error(message);
      }
      setOpen(false);
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "로그인 요청에 실패했습니다.",
      );
    }
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
                ? "shrink-0 transition-opacity hover:opacity-85"
                : "shrink-0 transition-opacity hover:opacity-80"
            }
          >
            <FormaLogo />
          </Link>
          <NavWeather isHome={isHome} />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          <NavTooltip label="파일 올리기">
            <Link
              href="/titanic"
              className={navActionClassName(isHome)}
              aria-label="파일 올리기"
            >
              <Upload className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </NavTooltip>
          <SignupDialog isHome={isHome} />
          <Dialog open={open} onOpenChange={setOpen}>
            <NavTooltip label="로그인">
              <DialogTrigger asChild>
                <button
                  type="button"
                  className={navActionClassName(isHome)}
                  aria-label="로그인"
                >
                  <LogIn className="h-4 w-4 shrink-0" aria-hidden="true" />
                </button>
              </DialogTrigger>
            </NavTooltip>
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
