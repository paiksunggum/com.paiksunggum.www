"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Upload, LayoutDashboard } from "lucide-react";

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
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavTooltip,
  getNavVariant,
  navActionClassName,
  navBarClassName,
  navLogoClassName,
} from "@/components/nav-icon-action";
import { getApiBase } from "@/lib/api-base";

export default function Navbar() {
  const pathname = usePathname();
  const navVariant = getNavVariant(pathname);
  const isHome = navVariant === "home";
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
    <nav className={navBarClassName(navVariant)} aria-label="메인 네비게이션">
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
            <FormaLogo className={navLogoClassName(navVariant)} />
          </Link>
          <NavWeather variant={navVariant} />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          <NavTooltip label="테마 전환">
            <ThemeToggle navVariant={navVariant} />
          </NavTooltip>
          <NavTooltip label="관리자 대시보드">
            <Link
              href="/admin"
              className={navActionClassName(navVariant)}
              aria-label="관리자 대시보드"
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </NavTooltip>
          <NavTooltip label="파일 올리기">
            <Link
              href="/lesson/titanic"
              className={navActionClassName(navVariant)}
              aria-label="파일 올리기"
            >
              <Upload className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </NavTooltip>
          <SignupDialog navVariant={navVariant} />
          <Dialog open={open} onOpenChange={setOpen}>
            <NavTooltip label="로그인">
              <DialogTrigger asChild>
                <button
                  type="button"
                  className={navActionClassName(navVariant)}
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
