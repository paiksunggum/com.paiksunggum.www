'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, X } from 'lucide-react'
import type { ReactNode } from 'react'

const navItems = [
  { href: '/admin',          label: 'Dashboard' },
  { href: '/admin/insights', label: 'Insights'  },
  { href: '/admin/reports',  label: 'Reports'   },
  { href: '/admin/activity', label: 'Activity'  },
  { href: '/admin/settings', label: 'Settings'  },
]

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full px-6 py-8">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-7 h-7 rounded-lg bg-[#e07b55] flex items-center justify-center">
          <span className="text-white text-xs font-black">F</span>
        </div>
        <span className="font-black text-stone-900 dark:text-foreground text-sm tracking-tight">Forma</span>
      </div>

      {/* Profile */}
      <div className="mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
          <div className="w-full h-full bg-gradient-to-br from-[#e07b55] to-[#c96b47] flex items-center justify-center text-white text-xl font-black">
            백
          </div>
        </div>
        <p className="font-black text-stone-900 dark:text-foreground text-sm">백성검</p>
        <p className="text-xs text-stone-400 dark:text-muted-foreground mt-0.5">Admin Director</p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`py-2 px-3 rounded-xl text-sm transition-colors
                ${isActive
                  ? 'font-black text-stone-900 dark:text-foreground bg-white dark:bg-card shadow-sm dark:shadow-none'
                  : 'font-medium text-stone-400 dark:text-muted-foreground hover:text-stone-700 dark:hover:text-foreground'}`}
            >
              {isActive && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e07b55] mr-2 mb-0.5" />
              )}
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-2 text-sm text-stone-400 dark:text-muted-foreground hover:text-stone-700 dark:hover:text-foreground transition-colors mt-4 px-3">
        <div className="w-7 h-7 rounded-full bg-stone-900 dark:bg-muted flex items-center justify-center">
          <LogOut size={13} className="text-white dark:text-foreground" />
        </div>
        <span className="font-medium">Log out</span>
      </button>
    </div>
  )
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f5f0e8] dark:bg-background">

      {/* ── 모바일 상단 바 ──────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center h-14 px-4 bg-[#f5f0e8] dark:bg-background border-b border-stone-200/60 dark:border-border">
        <button onClick={() => setOpen(true)} className="p-2 -ml-2 text-stone-600 dark:text-muted-foreground hover:text-stone-900 dark:hover:text-foreground">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2 ml-2">
          <div className="w-6 h-6 rounded-md bg-[#e07b55] flex items-center justify-center">
            <span className="text-white text-[10px] font-black">F</span>
          </div>
          <span className="font-black text-stone-900 dark:text-foreground text-sm">Forma</span>
        </div>
      </div>

      {/* ── 모바일 드로어 오버레이 ─────────────────────────── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── 모바일 드로어 패널 ─────────────────────────────── */}
      <div className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#f5f0e8] dark:bg-background shadow-xl transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-stone-400 dark:text-muted-foreground hover:text-stone-700 dark:hover:text-foreground"
        >
          <X size={18} />
        </button>
        <SidebarContent pathname={pathname} onClose={() => setOpen(false)} />
      </div>

      {/* ── 데스크탑 사이드바 ──────────────────────────────── */}
      <aside className="hidden lg:block w-52 shrink-0">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* ── 콘텐츠 ────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 pt-14 lg:pt-0">
        {children}
      </div>

    </div>
  )
}
