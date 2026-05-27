"use client";

import * as React from "react";
import Link from "next/link";
import { Database, FileSearch, Menu, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const topMenus = [
  { label: "ALL", href: "/lesson/titanic" },
  { label: "R.A.G SYSTEM", href: "/lesson/titanic" },
  { label: "ARCHITECTURE", href: "/lesson/titanic" },
  { label: "AGENT", href: "/lesson/titanic" },
  { label: "BACKEND", href: "/lesson/titanic" },
  { label: "MOBILE", href: "/lesson/titanic" },
  { label: "DEVOPS", href: "/lesson/titanic" },
  { label: "NLP", href: "/lesson/titanic" },
  { label: "수업편", href: "/lesson/titanic" },
];

const lessonMenus = [
  {
    label: "데이터 수집",
    href: "/lesson/titanic/data-collection",
    icon: Database,
  },
  {
    label: "데이터 분석",
    href: "/lesson/titanic",
    icon: FileSearch,
  },
  {
    label: "모델링",
    href: "/lesson/titanic",
    icon: Sparkles,
  },
];

export default function TitanicLessonLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/70">
        <div className="mx-auto flex max-w-screen-xl items-center gap-3 overflow-x-auto px-4 py-3 text-[11px] font-semibold tracking-wide text-muted-foreground md:px-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="사이드바 열기"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-4 w-4" aria-hidden />
          </Button>
          {topMenus.map((menu) => (
            <Link key={menu.label} href={menu.href} className="whitespace-nowrap">
              {menu.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-xl gap-8 px-4 py-8 md:px-6">
        <aside className="hidden w-56 shrink-0 border-r border-border pr-5 md:block">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-muted-foreground">
            LESSON
          </p>
          <nav className="space-y-1" aria-label="타이타닉 서브 메뉴">
            {lessonMenus.map((menu) => {
              const Icon = menu.icon;
              return (
                <Link
                  key={menu.label}
                  href={menu.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                  <span>{menu.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0 flex-1">{children}</section>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="border-b border-border">
            <SheetTitle>LESSON</SheetTitle>
          </SheetHeader>
          <nav className="space-y-1 p-3" aria-label="타이타닉 서브 메뉴(모바일)">
            {lessonMenus.map((menu) => {
              const Icon = menu.icon;
              return (
                <Link
                  key={menu.label}
                  href={menu.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                  <span>{menu.label}</span>
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
