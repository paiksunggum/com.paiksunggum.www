"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSportFavorites } from "@/hooks/use-sport-favorites";
import { cn } from "@/lib/utils";

type SportPageHeaderProps = {
  slug: string;
  league: string;
  name: string;
  caption: string;
  brandColor: string;
  leagueLogo: string;
};

export default function SportPageHeader({
  slug,
  league,
  name,
  caption,
  brandColor,
  leagueLogo,
}: SportPageHeaderProps) {
  const { isFavorite, toggle } = useSportFavorites();
  const favorited = isFavorite(slug);

  return (
    <div className="flex items-center gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full p-3.5 shadow-sm"
          style={{ backgroundColor: brandColor }}
        >
          <Image
            src={leagueLogo}
            alt={`${league} 로고`}
            width={56}
            height={56}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary">{league}</p>
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{caption}</p>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className={cn(
          "shrink-0 gap-1.5 border-border bg-[#EFEBE4] text-[var(--hero-score-text)] shadow-xs hover:bg-[#E8E3DC] hover:text-[var(--hero-score-text)] dark:bg-muted dark:text-muted-foreground dark:hover:bg-accent dark:border-border",
          favorited && "border-primary/35",
        )}
        onClick={() => toggle(slug)}
        aria-pressed={favorited}
      >
        {favorited ? (
          "즐겨찾기 취소"
        ) : (
          <>
            <Star className="h-4 w-4" aria-hidden />
            즐겨찾기
          </>
        )}
      </Button>
    </div>
  );
}
