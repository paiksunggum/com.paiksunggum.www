"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import { featuredMatches, type FeaturedMatch } from "@/lib/featured-matches";
import { cn } from "@/lib/utils";

function ScoreBar({ match }: { match: FeaturedMatch }) {
  const winner =
    match.home.score === match.away.score
      ? null
      : match.home.score > match.away.score
        ? "home"
        : "away";

  return (
    <div className="flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold text-white sm:gap-5 sm:text-base">
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
        <Image
          src={match.home.logo}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
        <span className="hidden sm:inline">{match.home.abbr}</span>
        <span
          className={cn(
            "tabular-nums",
            winner === "home" ? "text-white" : "text-white/55",
          )}
        >
          {match.home.score}
        </span>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-0.5">
        <span className="text-[10px] font-bold tracking-[0.18em] text-white/70 sm:text-xs">
          {match.status}
        </span>
        {match.status === "FINAL" && (
          <Play className="h-3 w-3 fill-white/70 text-white/70" aria-hidden />
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span
          className={cn(
            "tabular-nums",
            winner === "away" ? "text-white" : "text-white/55",
          )}
        >
          {match.away.score}
        </span>
        <span className="hidden sm:inline">{match.away.abbr}</span>
        <Image
          src={match.away.logo}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
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
      {/* Diagonal split background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(115deg, ${match.home.color} 0%, ${match.home.color} 49.5%, ${match.away.color} 50.5%, ${match.away.color} 100%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-black/20"
        aria-hidden
      />

      {/* Giant background abbreviations */}
      <span
        className="pointer-events-none absolute left-[4%] top-1/2 -translate-y-1/2 select-none text-[clamp(5rem,18vw,11rem)] font-black leading-none tracking-tighter text-white/[0.08]"
        aria-hidden
      >
        {match.home.abbr}
      </span>
      <span
        className="pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 select-none text-[clamp(5rem,18vw,11rem)] font-black leading-none tracking-tighter text-white/[0.08]"
        aria-hidden
      >
        {match.away.abbr}
      </span>

      {/* Team logos */}
      <div className="absolute inset-0 flex items-center justify-between px-[8%] sm:px-[12%]">
        <div className="flex flex-col items-center gap-3 transition-transform group-hover:scale-105">
          <div className="relative h-[min(28vw,140px)] w-[min(28vw,140px)] drop-shadow-2xl sm:h-36 sm:w-36">
            <Image
              src={match.home.logo}
              alt={match.home.name}
              fill
              sizes="140px"
              className="object-contain"
              priority
            />
          </div>
          <p className="text-sm font-bold tracking-wide text-white/90 sm:text-base">
            {match.home.abbr}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-sm">
          <span className="text-xs font-bold text-white/80">VS</span>
        </div>

        <div className="flex flex-col items-center gap-3 transition-transform group-hover:scale-105">
          <div className="relative h-[min(28vw,140px)] w-[min(28vw,140px)] drop-shadow-2xl sm:h-36 sm:w-36">
            <Image
              src={match.away.logo}
              alt={match.away.name}
              fill
              sizes="140px"
              className="object-contain"
            />
          </div>
          <p className="text-sm font-bold tracking-wide text-white/90 sm:text-base">
            {match.away.abbr}
          </p>
        </div>
      </div>

      {/* Bottom meta */}
      <div className="absolute bottom-6 left-0 right-0 flex items-end justify-between px-5 sm:px-8">
        <div>
          <p className="text-sm font-medium text-white/90 sm:text-base">
            {match.date}
          </p>
          {match.venue && (
            <p className="mt-0.5 text-xs text-white/55">{match.venue}</p>
          )}
        </div>
        <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-bold tracking-wider text-white backdrop-blur-sm">
          {match.league}
        </span>
      </div>
    </Link>
  );
}

export default function FeaturedMatchHero() {
  const [index, setIndex] = React.useState(0);
  const match = featuredMatches[index];

  function goPrev() {
    setIndex((i) => (i === 0 ? featuredMatches.length - 1 : i - 1));
  }

  function goNext() {
    setIndex((i) => (i === featuredMatches.length - 1 ? 0 : i + 1));
  }

  return (
    <section className="relative isolate w-full overflow-hidden bg-black pt-14">
      {/* Score strip */}
      <div className="relative z-10 border-b border-white/10 bg-black">
        <ScoreBar match={match} />
      </div>

      {/* Main match visual */}
      <div className="relative">
        <MatchVisual match={match} />

        {/* Carousel controls */}
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label="이전 경기"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label="다음 경기"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Match picker dots + thumbnails */}
      <div className="border-t border-white/10 bg-black px-4 py-3">
        <div className="mx-auto flex max-w-screen-xl items-center justify-center gap-2 overflow-x-auto pb-1">
          {featuredMatches.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                i === index
                  ? "border-white/30 bg-white/15 text-white"
                  : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80",
              )}
              aria-label={`${m.home.abbr} vs ${m.away.abbr}`}
              aria-current={i === index ? "true" : undefined}
            >
              <Image
                src={m.home.logo}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain"
              />
              <span>{m.home.abbr}</span>
              <span className="text-white/40">·</span>
              <span>{m.away.abbr}</span>
              <Image
                src={m.away.logo}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
