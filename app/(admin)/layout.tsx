'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import type { ReactNode } from 'react'

const navItems = [
  { href: '/admin',          label: 'Dashboard' },
  { href: '/admin/insights', label: 'Insights'  },
  { href: '/admin/reports',  label: 'Reports'   },
  { href: '/admin/activity', label: 'Activity'  },
  { href: '/admin/settings', label: 'Settings'  },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[#f5f0e8]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-52 shrink-0 px-6 py-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-[#e07b55] flex items-center justify-center">
            <span className="text-white text-xs font-black">F</span>
          </div>
          <span className="font-black text-stone-900 text-sm tracking-tight">Forma</span>
        </div>

        {/* Profile */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full bg-stone-300 flex items-center justify-center text-white text-xl font-black mb-3 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-[#e07b55] to-[#c96b47] flex items-center justify-center">
              백
            </div>
          </div>
          <p className="font-black text-stone-900 text-sm">백성검</p>
          <p className="text-xs text-stone-400 mt-0.5">Admin Director</p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`py-2 px-3 rounded-xl text-sm transition-colors
                  ${isActive
                    ? 'font-black text-stone-900 bg-white shadow-sm'
                    : 'font-medium text-stone-400 hover:text-stone-700'}`}
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
        <button className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 transition-colors mt-4 px-3">
          <div className="w-7 h-7 rounded-full bg-stone-900 flex items-center justify-center">
            <LogOut size={13} className="text-white" />
          </div>
          <span className="font-medium">Log out</span>
        </button>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  )
}
