'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import {
  Users, Activity, FileText, Brain,
  MoreHorizontal, Plus, Send, Calendar,
  Zap, Clock, CheckCircle2, TrendingUp,
} from 'lucide-react'

const contentPieData = [
  { name: '스포츠 가이드', value: 25, color: '#e07b55' },
  { name: '레슨 콘텐츠',   value: 13, color: '#7aacad' },
  { name: '타이타닉 ML',   value: 10, color: '#c4d9da' },
]

const apiBarData = [420, 680, 520, 890, 740, 960, 680]
const mlBarData  = [0.70, 0.85, 0.60, 0.90, 0.75, 0.80, 0.82]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const today = new Date()

  return (
    <div className="min-h-screen bg-[#f2ede7] p-4 md:p-5 lg:p-6 space-y-4">

      {/* ── Welcome Header ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1 pb-2">
        <div>
          <p className="text-sm text-stone-500 mb-0.5">관리자 패널에 오신 것을 환영합니다 🛠️</p>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900">Forma 대시보드</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2.5 bg-white rounded-2xl px-4 py-2.5 shadow-sm">
            <p className="text-xl font-bold text-stone-900">{today.getDate()}</p>
            <div className="w-px h-6 bg-stone-200" />
            <div>
              <p className="text-xs text-stone-400">{today.toLocaleDateString('ko-KR', { weekday: 'short' })},</p>
              <p className="text-xs font-medium text-stone-700">{today.toLocaleDateString('ko-KR', { month: 'long' })}</p>
            </div>
          </div>
          <button className="bg-[#e07b55] text-white rounded-2xl px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-[#c96b47] transition-colors whitespace-nowrap">
            작업 보기
          </button>
          <button className="bg-white rounded-2xl p-2.5 shadow-sm hover:bg-stone-50 transition-colors">
            <Calendar size={18} className="text-stone-600" />
          </button>
        </div>
      </div>

      {/* ── Quick Stats ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Hero card — Users */}
        <div className="bg-[#e07b55] rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <p className="text-sm font-medium opacity-90">총 사용자</p>
            <button className="bg-white/20 rounded-full p-1.5 hover:bg-white/30 transition-colors">
              <TrendingUp size={13} />
            </button>
          </div>
          <p className="text-4xl font-bold mb-1">1,247</p>
          <p className="text-xs opacity-75">+47명 이번 주</p>
          <div className="absolute -bottom-3 -right-3 opacity-10 pointer-events-none">
            <Users size={100} />
          </div>
        </div>

        {/* API Requests */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-stone-500">API 요청</p>
            <Activity size={16} className="text-stone-400" />
          </div>
          <p className="text-3xl font-bold text-stone-900 mb-3">3,892</p>
          <div className="flex items-end gap-1 h-10">
            {apiBarData.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all"
                style={{
                  height: `${(v / 960) * 100}%`,
                  backgroundColor: i === 5 ? '#e07b55' : '#f0ece8',
                }}
              />
            ))}
          </div>
        </div>

        {/* ML Accuracy */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-stone-500">ML 정확도</p>
            <Brain size={16} className="text-stone-400" />
          </div>
          <p className="text-3xl font-bold text-stone-900 mb-3">82.4%</p>
          <div className="flex items-end gap-0.5 h-10">
            {mlBarData.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${v * 100}%`,
                  backgroundColor: i === 6 ? '#e07b55' : '#f0ece8',
                }}
              />
            ))}
          </div>
        </div>

        {/* Sports Content */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-stone-500">스포츠 콘텐츠</p>
            <FileText size={16} className="text-stone-400" />
          </div>
          <p className="text-3xl font-bold text-stone-900 mb-3">48개</p>
          <div className="w-full bg-stone-100 rounded-full h-2 mb-1.5">
            <div className="bg-[#e07b55] h-2 rounded-full" style={{ width: '72%' }} />
          </div>
          <p className="text-xs text-stone-400">목표 67개 중 72%</p>
        </div>
      </div>

      {/* ── Main 3-column ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* 사용자 현황 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-stone-900">사용자 현황</h3>
            <button><MoreHorizontal size={18} className="text-stone-400" /></button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="border-2 border-dashed border-stone-200 rounded-xl h-24 flex items-center justify-center group hover:border-[#e07b55]/40 hover:bg-[#e07b55]/5 transition-all">
              <Plus size={20} className="text-stone-300 group-hover:text-[#e07b55] transition-colors" />
            </button>
            <div className="bg-stone-50 rounded-xl p-3 flex flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs text-stone-500">활성 사용자</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">324</p>
                <p className="text-xs text-stone-400">지금 이 순간</p>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span>🔥</span>
                <p className="text-sm font-medium text-stone-700">이번 주 가입</p>
              </div>
              <p className="font-bold text-stone-900">+47명</p>
            </div>
            <div className="flex gap-1">
              {[3, 5, 4, 8, 6, 9, 7].map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full flex-1"
                  style={{ backgroundColor: i === 5 ? '#e07b55' : '#e07b5540' }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between bg-stone-50 rounded-xl p-3.5">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-[#e07b55]" />
              <div>
                <p className="text-sm font-medium text-stone-900">오늘 신규 가입</p>
                <p className="text-xs text-stone-400">14:00 기준</p>
              </div>
            </div>
            <p className="font-bold text-stone-900">12명</p>
          </div>
        </div>

        {/* 콘텐츠 분포 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-stone-900">콘텐츠 분포</h3>
            <button><MoreHorizontal size={18} className="text-stone-400" /></button>
          </div>

          {/* Week selector */}
          <div className="grid grid-cols-7 gap-1 text-center mb-5">
            {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
              <div key={d} className="space-y-1">
                <p className="text-xs text-stone-400">{d}</p>
                <button
                  className={`w-full aspect-square rounded-full text-xs font-medium flex items-center justify-center transition-colors
                    ${i === 2
                      ? 'bg-stone-900 text-white'
                      : i === 4
                      ? 'ring-2 ring-[#e07b55] text-stone-900'
                      : 'text-stone-600 hover:bg-stone-100'}`}
                >
                  {[21, 22, 23, 24, 25, 26, 27][i]}
                </button>
              </div>
            ))}
          </div>

          {/* Donut + legend */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              {mounted ? (
                <PieChart width={104} height={104}>
                  <Pie
                    data={contentPieData}
                    cx={52} cy={52}
                    innerRadius={32} outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90} endAngle={-270}
                  >
                    {contentPieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              ) : (
                <div className="w-[104px] h-[104px]" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[10px] text-stone-400">총계</p>
                <p className="text-lg font-bold text-stone-900">48</p>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              {contentPieData.map(({ name, value, color }) => (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1">
                    <p className="text-stone-500">{name}</p>
                    <p className="font-semibold" style={{ color }}>{value}개</p>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${(value / 48) * 100}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI 현황 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col md:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-[#e07b55]" />
              <h3 className="font-semibold text-stone-900">AI 현황</h3>
            </div>
            <button><MoreHorizontal size={18} className="text-stone-400" /></button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 py-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e07b55] via-[#d0623d] to-[#b5533d] shadow-xl shadow-[#e07b55]/30 mb-4" />
            <p className="text-stone-400 text-sm">Gemini API</p>
            <p className="text-lg font-bold text-stone-900 text-center">무엇을 도와드릴까요?</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {['토큰 사용량', 'API 상태', '오류 로그'].map(label => (
              <button
                key={label}
                className="bg-stone-50 rounded-xl p-2.5 text-center hover:bg-stone-100 transition-colors"
              >
                <p className="text-xs text-stone-500 leading-tight">{label}</p>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-stone-50 rounded-xl px-3.5 py-2.5">
            <input
              type="text"
              placeholder="AI에게 물어보기.."
              className="flex-1 bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
            />
            <button className="w-7 h-7 rounded-full bg-[#e07b55] flex items-center justify-center shrink-0 hover:bg-[#c96b47] transition-colors">
              <Send size={13} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom 3-column ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* 최근 활동 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-stone-900">최근 활동</h3>
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-stone-400" />
              <button><MoreHorizontal size={18} className="text-stone-400" /></button>
            </div>
          </div>

          <div className="space-y-0.5">
            {[
              { user: '김민준', action: '회원가입',          time: '3분 전',   color: '#e07b55' },
              { user: 'AI',    action: 'Gemini 응답 완료',  time: '7분 전',   color: '#7aacad' },
              { user: '이서연', action: '타이타닉 ML 실행', time: '12분 전',  color: '#9b89c4' },
              { user: '박지호', action: '스포츠 페이지 조회', time: '18분 전', color: '#c4a882' },
            ].map(({ user, action, time, color }) => (
              <div key={user + action} className="flex items-center gap-3 py-2.5 border-b border-stone-50 last:border-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {user[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">{user}</p>
                  <p className="text-xs text-stone-400">{action}</p>
                </div>
                <p className="text-xs text-stone-400 shrink-0">{time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 서비스 현황 */}
        <div className="bg-stone-900 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="flex justify-between items-start mb-1">
            <div>
              <p className="text-sm opacity-50 mb-0.5">서비스 현황</p>
              <h3 className="text-xl font-bold">Forma AI 플랫폼</h3>
              <p className="text-sm opacity-40 mt-0.5">모든 서비스 정상 운영 중</p>
            </div>
            <button className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors shrink-0">
              <TrendingUp size={14} />
            </button>
          </div>

          <div className="space-y-2.5 mt-5">
            {[
              { label: 'FastAPI 서버',   detail: '응답 45ms',  ok: true },
              { label: 'Gemini AI',      detail: '토큰 3,892', ok: true },
              { label: 'PostgreSQL',     detail: '연결 정상',  ok: true },
              { label: 'Next.js 프론트', detail: '빌드 최신',  ok: true },
            ].map(({ label, detail, ok }) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-white/10 pb-2.5 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${ok ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  <p className="text-sm">{label}</p>
                </div>
                <p className="text-xs opacity-40">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 일별 지표 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-stone-900">일별 지표</h3>
            <button className="w-7 h-7 rounded-full bg-[#e07b55] flex items-center justify-center hover:bg-[#c96b47] transition-colors">
              <Plus size={14} className="text-white" />
            </button>
          </div>

          <div className="flex justify-between text-sm mb-0.5">
            <p className="text-stone-500">일별 방문자</p>
            <p className="font-semibold text-stone-900">총 1,204명</p>
          </div>
          <div className="flex justify-between text-xs text-stone-400 mb-4">
            <span>일 평균</span>
            <span>823명</span>
          </div>

          <div className="space-y-3 border-t border-stone-100 pt-3">
            {[
              { label: '아침 (06-12시)', emoji: '🌅', count: '312명', active: true  },
              { label: '오후 (12-18시)', emoji: '☀️', count: '589명', active: true  },
              { label: '저녁 (18-24시)', emoji: '🌙', count: '303명', active: false },
            ].map(({ label, emoji, count, active }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{emoji}</span>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors
                      ${active ? 'bg-[#e07b55] border-[#e07b55]' : 'border-stone-300'}`}
                  >
                    {active && <CheckCircle2 size={10} className="text-white" />}
                  </div>
                  <p className="text-sm text-stone-700">{label}</p>
                </div>
                <p className="text-sm font-medium text-stone-900">{count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
