"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import * as React from "react";

import { HorizontalScrollRow } from "@/components/horizontal-scroll-row";
import { useSportFavorites } from "@/hooks/use-sport-favorites";
import { sports, type SportItem } from "@/lib/sports-data";

function sortSportsByFavorites(
  items: SportItem[],
  favoriteSlugs: string[],
): SportItem[] {
  if (favoriteSlugs.length === 0) return items;

  const favoriteSet = new Set(favoriteSlugs);
  const favorites = favoriteSlugs
    .map((slug) => items.find((sport) => sport.slug === slug))
    .filter((sport): sport is SportItem => sport !== undefined);
  const rest = items.filter((sport) => !favoriteSet.has(sport.slug));

  return [...favorites, ...rest];
}

export default function SportStoryRow() {
  const { slugs: favoriteSlugs } = useSportFavorites();

  const sortedSports = React.useMemo(
    () => sortSportsByFavorites(sports, favoriteSlugs),
    [favoriteSlugs],
  );

  const favoriteSet = React.useMemo(
    () => new Set(favoriteSlugs),
    [favoriteSlugs],
  );

  return (
    <section className="border-b border-border bg-[var(--hero-surface)] px-4 pt-8 pb-5 md:pt-10 md:pb-6">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 inline-flex rounded-xl border border-[var(--hero-border)] bg-[#f1ede6] px-3 py-1.5 text-sm font-semibold text-[var(--hero-score-text)] dark:bg-muted dark:text-muted-foreground">
          스포츠별 자세 가이드
        </p>

        <HorizontalScrollRow className="-mx-1">
          <ul className="flex min-w-min gap-4 px-1">
            {sortedSports.map((sport) => {
              const isFavorite = favoriteSet.has(sport.slug);

              return (
                <li key={sport.slug} className="w-[88px] shrink-0 sm:w-[96px]">
                  <Link
                    href={`/sports/${sport.slug}`}
                    className="group flex flex-col items-center gap-2 focus-visible:outline-none"
                    aria-label={`${sport.name} ${sport.league} 페이지로 이동`}
                  >
                    <div
                      className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full p-3 shadow-sm transition-shadow group-hover:ring-2 group-hover:ring-inset group-hover:ring-white/25 group-focus-visible:ring-2 group-focus-visible:ring-inset group-focus-visible:ring-primary"
                      style={{ backgroundColor: sport.brandColor }}
                    >
                      {isFavorite && (
                        <Star
                          className="absolute left-0 top-1 z-10 h-3.5 w-3.5 fill-red-500 text-red-500 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
                          aria-hidden
                        />
                      )}
                      <Image
                        src={sport.leagueLogo}
                        alt={`${sport.league} 로고`}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <p className="truncate text-center text-xs font-medium text-foreground">
                      {sport.name}
                    </p>
                    <p className="truncate text-center text-[11px] text-muted-foreground">
                      {sport.caption}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
