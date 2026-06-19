'use client'

import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Settings, Info, ArrowRight } from 'lucide-react'

const activityData = [
  { day: '01', value: 2100 },
  { day: '02', value: 2900 },
  { day: '03', value: 2400 },
  { day: '04', value: 2200 },
  { day: '05', value: 3892 },
  { day: '06', value: 2700 },
  { day: '07', value: 3300 },
]

const topPerformers = [
  { name: '김민준',  handle: '@minjun',   pct: '39%', bg: '#e07b55' },
  { name: '이서연',  handle: '@seoyeon',  pct: '18%', bg: '#f5c842' },
  { name: '박지호',  handle: '@jiho',     pct: '25%', bg: '#7aacad' },
]

const channels = [
  { name: 'Titanic ML', handle: '@titanic', pct: '+12%', color: '#e07b55' },
  { name: 'Sports',     handle: '@sports',  pct: '+4%',  color: '#7aacad' },
  { name: 'AI Chat',    handle: '@chat',    pct: '+7%',  color: '#9b89c4' },
  { name: 'Admin',      handle: '@admin',   pct: '+2%',  color: '#c4a882' },
]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-5 lg:p-8 space-y-6">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-stone-900 tracking-tight">Dashboard</h1>
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">1</span>
            <button className="text-stone-400 hover:text-stone-600 transition-colors">
              <Settings size={17} />
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-10 mt-5">
            {[
              { label: 'API 요청',  value: '3,892' },
              { label: '총 사용자', value: '1,247' },
              { label: '콘텐츠',    value: '48개'  },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-stone-500 flex items-center gap-1 mb-1">
                  {label}
                  <Info size={11} className="text-stone-400" />
                </p>
                <p className="text-3xl font-black text-stone-900 tracking-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade banner */}
        <div className="hidden lg:flex shrink-0 w-64 bg-[#f0ebe0] rounded-2xl p-5 relative overflow-hidden">
          <div>
            <p className="text-lg font-black text-stone-900 leading-snug">
              <span className="text-[#e07b55]">Upgrade</span> Your<br />Platform
            </p>
            <p className="text-xs text-stone-400 mt-1">Pro plan for better results</p>
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#e07b55] text-white font-black text-xs flex items-center justify-center shadow-lg shadow-[#e07b55]/30">
            NOW
          </button>
          {/* Decorative arcs */}
          <svg className="absolute -top-2 -right-2 opacity-30" width="100" height="80" viewBox="0 0 100 80">
            <path d="M 80 70 Q 50 10 20 40" stroke="#7aacad" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M 90 65 Q 55 0 15 35" stroke="#e07b55" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M 100 60 Q 60 -10 10 30" stroke="#c4a882" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* ── Activity + Top Performers ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Area chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-stone-900">Activity</h2>
            <div className="flex items-center gap-3">
              <p className="text-xs text-stone-400">매 3시간 업데이트</p>
              <button className="text-xs border border-stone-200 rounded-full px-3 py-1.5 text-stone-600 font-medium">
                01-07 Jun ▾
              </button>
            </div>
          </div>

          {mounted ? (
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={activityData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#e07b55" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#e07b55" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                  tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                  formatter={(v: number) => [`${v.toLocaleString()}`, 'API 요청']}
                  labelFormatter={l => `Day ${l}`}
                />
                <Area type="monotone" dataKey="value" stroke="#e07b55" strokeWidth={2.5}
                  fill="url(#areaGrad)" dot={false} activeDot={{ r: 5, fill: '#e07b55' }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[180px]" />
          )}
        </div>

        {/* Top performers */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-2xl font-black text-stone-900 mb-5">Top Users</h2>
          <div className="space-y-4">
            {topPerformers.map(({ name, handle, pct, bg }) => (
              <div key={handle} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  {name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-stone-900">{name}</p>
                  <p className="text-xs text-stone-400">{handle}</p>
                </div>
                <p className="text-sm font-black text-stone-900">{pct}</p>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800 transition-colors mt-5 font-medium">
            View More <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Channels ───────────────────────────────────────────── */}
      <div className="bg-[#e4f0f0] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Description */}
          <div className="shrink-0 sm:w-44">
            <p className="text-2xl font-black text-stone-900 mb-2">Channels</p>
            <p className="text-sm text-stone-500 leading-relaxed">
              서비스 채널별 통계 <strong>1주일</strong> 기준
            </p>
          </div>

          {/* Channel cards */}
          <div className="flex gap-3 flex-1 overflow-x-auto pb-1">
            {channels.map(({ name, handle, pct, color }) => (
              <div
                key={name}
                className="bg-white rounded-2xl p-4 min-w-[110px] shrink-0 flex flex-col items-center gap-2"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black"
                  style={{ backgroundColor: color }}
                >
                  {name[0]}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-stone-900">{name}</p>
                  <p className="text-[10px] text-stone-400">{handle}</p>
                </div>
                <p className={`text-lg font-black ${pct.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                  {pct}
                </p>
              </div>
            ))}

            {/* Full Stats button */}
            <div className="bg-[#7aacad] rounded-2xl p-4 min-w-[100px] shrink-0 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#6a9c9d] transition-colors">
              <p className="text-white font-black text-sm text-center leading-tight">Full<br />Stats</p>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight size={14} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
