import Image from "next/image";
import Link from "next/link";

import { sports } from "@/lib/sports-data";

export default function SportStoryRow() {
  return (
    <section className="border-t border-border bg-background px-4 py-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 inline-flex rounded-xl border border-[#676783] bg-[#676783] px-3 py-1.5 text-sm font-semibold text-white">
          스포츠별 자세 가이드
        </p>

        <div className="-mx-1 overflow-x-auto pb-2 scrollbar-simple-x">
          <ul className="flex min-w-min gap-4 px-1">
            {sports.map((sport) => (
              <li key={sport.slug} className="w-[88px] shrink-0 sm:w-[96px]">
                <Link
                  href={`/sports/${sport.slug}`}
                  className="group flex flex-col items-center gap-2 focus-visible:outline-none"
                  aria-label={`${sport.name} ${sport.league} 페이지로 이동`}
                >
                  <div
                    className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full p-3 shadow-sm transition-transform group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background"
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
        </div>
      </div>
    </section>
  );
}
