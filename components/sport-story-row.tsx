import Image from "next/image";
import Link from "next/link";

import { HorizontalScrollRow } from "@/components/horizontal-scroll-row";
import { sports } from "@/lib/sports-data";

export default function SportStoryRow() {
  return (
    <section className="border-b border-border bg-[var(--hero-surface)] px-4 pt-8 pb-0 md:pt-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 inline-flex rounded-xl border border-[var(--hero-border)] bg-[#f1ede6] px-3 py-1.5 text-sm font-semibold text-[var(--hero-score-text)]">
          스포츠별 자세 가이드
        </p>

        <HorizontalScrollRow className="-mx-1">
          <ul className="flex min-w-min gap-4 px-1">
            {sports.map((sport) => (
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
            ))}
          </ul>
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
