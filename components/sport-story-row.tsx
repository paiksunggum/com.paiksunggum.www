import Image from "next/image";
import Link from "next/link";

import { sports } from "@/lib/sports-data";

export default function SportStoryRow() {
  return (
    <section className="border-t border-black bg-white px-4 py-8 dark:border-neutral-100 dark:bg-neutral-950 md:py-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          스포츠별 자세 가이드
        </p>

        <div className="-mx-1 overflow-x-auto pb-2">
          <ul className="flex min-w-min gap-4 px-1">
            {sports.map((sport) => (
              <li key={sport.slug} className="w-[88px] shrink-0 sm:w-[96px]">
                <Link
                  href={`/sports/${sport.slug}`}
                  className="group flex flex-col items-center gap-2 focus-visible:outline-none"
                  aria-label={`${sport.name} ${sport.league} 페이지로 이동`}
                >
                  <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-red-600 bg-white p-2 shadow-sm transition-transform group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-red-600 group-focus-visible:ring-offset-2 dark:bg-neutral-900 dark:ring-offset-neutral-950">
                    <Image
                      src={sport.leagueLogo}
                      alt={`${sport.league} 로고`}
                      width={52}
                      height={52}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <p className="truncate text-center text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    {sport.name}
                  </p>
                  <p className="truncate text-center text-[11px] text-neutral-500 dark:text-neutral-400">
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
