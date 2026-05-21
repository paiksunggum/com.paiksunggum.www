"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { HorizontalScrollRow } from "@/components/horizontal-scroll-row";
import { featuredMatches, type FeaturedMatch } from "@/lib/featured-matches";
import { cn } from "@/lib/utils";

function ScoreBar({ match }: { match: FeaturedMatch }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 text-sm font-semibold text-[var(--hero-score-text)] sm:text-base">
      <div aria-hidden className="min-w-0" />

      <div className="flex min-w-0 items-center justify-center gap-2 sm:gap-3">
        <Image
          src={match.home.logo}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 object-contain opacity-90"
        />
        <span className="hidden sm:inline">{match.home.abbr}</span>
        <span className="tabular-nums">{match.home.score}</span>
        <span className="text-[10px] font-bold tracking-[0.18em] sm:text-xs">
          {match.status}
        </span>
        <span className="tabular-nums">{match.away.score}</span>
        <span className="hidden sm:inline">{match.away.abbr}</span>
        <Image
          src={match.away.logo}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 object-contain opacity-90"
        />
      </div>

      <div className="flex min-w-0 justify-end">
        <Link
          href="/chat"
          className="shrink-0 rounded-full border border-[var(--hero-border)] bg-[var(--hero-control-idle)] px-3.5 py-1.5 text-sm font-bold tracking-wide transition-colors hover:bg-[var(--hero-control-hover)] sm:px-4 sm:py-2 sm:text-base"
          aria-label="AI Chat 페이지로 이동"
        >
          AI Chat
        </Link>
      </div>
    </div>
  );
}

function MatchVisual({ match }: { match: FeaturedMatch }) {
  return (
    <Link
      href={`/sports/${match.sportSlug}`}
      className="group relative block min-h-[min(35vh,350px)] overflow-hidden md:min-h-[37vh]"
      aria-label={`${match.home.name} vs ${match.away.name} 경기 상세`}
    >
      {/* Single continuous blend in OKLab — perceptually even flow between team colors */}
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg_in_oklab,var(--hero-match-from),var(--hero-match-to))]"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(115deg in oklab, ${match.home.color}, ${match.away.color})`,
          opacity: 0.72,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[var(--hero-scrim)]"
        aria-hidden
      />

      {/* Giant background abbreviations */}
      <span
        className="pointer-events-none absolute left-[4%] top-1/2 -translate-y-1/2 select-none text-[clamp(5rem,18vw,11rem)] font-black leading-none tracking-tighter text-white/[0.12]"
        aria-hidden
      >
        {match.home.abbr}
      </span>
      <span
        className="pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 select-none text-[clamp(5rem,18vw,11rem)] font-black leading-none tracking-tighter text-white/[0.12]"
        aria-hidden
      >
        {match.away.abbr}
      </span>

      {/* Team logos */}
      <div className="absolute inset-0 flex items-center justify-between px-[8%] sm:px-[12%]">
        <div className="flex flex-col items-center gap-3 transition-transform group-hover:scale-105">
          <div className="relative h-[min(28vw,140px)] w-[min(28vw,140px)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] sm:h-36 sm:w-36">
            <Image
              src={match.home.logo}
              alt={match.home.name}
              fill
              sizes="140px"
              className="object-contain"
              priority
            />
          </div>
          <p className="hero-readable-tight text-sm font-bold tracking-wide text-white sm:text-base">
            {match.home.abbr}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-[var(--hero-glass)] backdrop-blur-sm">
          <span className="hero-readable-tight text-xs font-bold text-white">VS</span>
        </div>

        <div className="flex flex-col items-center gap-3 transition-transform group-hover:scale-105">
          <div className="relative h-[min(28vw,140px)] w-[min(28vw,140px)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] sm:h-36 sm:w-36">
            <Image
              src={match.away.logo}
              alt={match.away.name}
              fill
              sizes="140px"
              className="object-contain"
            />
          </div>
          <p className="hero-readable-tight text-sm font-bold tracking-wide text-white sm:text-base">
            {match.away.abbr}
          </p>
        </div>
      </div>

      {/* Bottom meta */}
      <div className="absolute bottom-6 left-0 right-0 flex items-end justify-between px-5 sm:px-8">
        <div className="hero-readable">
          <p className="text-sm font-medium text-white sm:text-base">
            {match.date}
          </p>
          {match.venue && (
            <p className="hero-readable-tight mt-0.5 text-xs text-white/80">{match.venue}</p>
          )}
        </div>
        <span className="hero-readable-tight rounded-full border border-white/25 bg-[var(--hero-glass)] px-3 py-1 text-xs font-bold tracking-wider text-white backdrop-blur-sm">
          {match.league}
        </span>
      </div>
    </Link>
  );
}

export default function FeaturedMatchHero() {
  const [index, setIndex] = React.useState(0);
  const match = featuredMatches[index];

  return (
    <section className="relative isolate w-full overflow-hidden bg-[var(--hero-surface)] pt-14">
      {/* Score strip */}
      <div className="relative z-10 border-b border-[var(--hero-border)] bg-[var(--hero-surface)]">
        <ScoreBar match={match} />
      </div>

      {/* Main match visual */}
      <MatchVisual match={match} />

      {/* Match picker dots + thumbnails */}
      <div className="border-b border-[var(--hero-border)] bg-[var(--hero-surface)] pt-3 pb-0">
        <HorizontalScrollRow className="scroll-px-4">
          <div className="mx-auto flex w-max items-center gap-2 px-4">
          {featuredMatches.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                i === index
                  ? "border-[var(--hero-border-strong)] bg-[var(--hero-control-active)] text-[var(--hero-foreground)] shadow-sm"
                  : "border-[var(--hero-border)] bg-[var(--hero-control-idle)] text-[var(--hero-muted)] hover:bg-[var(--hero-control-hover)] hover:text-[var(--hero-foreground)]",
              )}
              aria-label={`${m.home.abbr} vs ${m.away.abbr}`}
              aria-current={i === index ? "true" : undefined}
            >
              <Image
                src={m.home.logo}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]"
              />
              <span>{m.home.abbr}</span>
              <span className="text-[var(--hero-muted)]/50">·</span>
              <span>{m.away.abbr}</span>
              <Image
                src={m.away.logo}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]"
              />
            </button>
          ))}
          </div>
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
