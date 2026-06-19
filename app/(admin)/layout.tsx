'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, BarChart3, Brain, Activity, Settings, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

const navItems = [
  { href: '/admin', label: '대시보드', icon: LayoutDashboard },
  { href: '/admin/users', label: '사용자', icon: Users },
  { href: '/admin/analytics', label: '분석', icon: BarChart3 },
  { href: '/admin/ml', label: 'ML 모델', icon: Brain },
  { href: '/admin/activity', label: '활동', icon: Activity },
  { href: '/admin/settings', label: '설정', icon: Settings },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex bg-[#f2ede7] min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-stone-200/60 bg-white/50 sticky top-0 self-start h-screen p-4 gap-1">
        <div className="mb-5 px-3 pt-2">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Admin</p>
          <p className="text-sm font-bold text-stone-800 mt-0.5">Forma Dashboard</p>
        </div>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${isActive
                  ? 'bg-[#e07b55] text-white shadow-sm shadow-[#e07b55]/30'
                  : 'text-stone-600 hover:bg-[#e07b55]/10 hover:text-[#e07b55]'}
              `}
            >
              <Icon size={16} />
              {label}
              {isActive && <ChevronRight size={14} className="ml-auto opacity-70" />}
            </Link>
          )
        })}
      </aside>

      {/* Content area */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  )
}
