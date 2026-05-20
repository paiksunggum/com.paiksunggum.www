import Link from "next/link";
import Image from "next/image";
import { Activity, Target, Trophy } from "lucide-react";

import FeaturedMatchHero from "@/components/featured-match-hero";
import SportStoryRow from "@/components/sport-story-row";
import SubscribedFavoritesRow from "@/components/subscribed-favorites-row";
import { featuredMatches } from "@/lib/featured-matches";

const postureHighlights = [
  {
    title: "Injury Prevention",
    description:
      "Properly distributes impact across joints and muscles, preventing severe injuries.",
  },
  {
    title: "Maximized Power",
    description:
      "Efficiently transfers force from the lower body and core to achieve maximum power with minimal effort.",
  },
  {
    title: "Accuracy & Agility",
    description:
      "A consistent, correct form reduces mistakes and enables quick, nimble reactions for the next move.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <FeaturedMatchHero />

      <SportStoryRow />

      <SubscribedFavoritesRow />

      {/* Posture importance */}
      <section className="border-t border-black bg-neutral-50 px-4 py-12 dark:border-neutral-100 dark:bg-neutral-900/30 md:py-16">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
            <Image
              src="/posture-runner.png"
              alt="Runner showing athletic posture"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent lg:bg-gradient-to-r" />
          </div>

          <div className="px-6 py-8 sm:px-8 md:py-10">
            <p className="text-sm font-semibold text-[#E10600]">
              FORM MATTERS
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
              The Importance of Form
            </h2>
            <div className="mt-6 space-y-4">
              {postureHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60"
                >
                  <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent results */}
      <section className="border-t border-black bg-white px-4 py-10 dark:border-neutral-100 dark:bg-neutral-950 md:py-14">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            주요 경기 결과
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {featuredMatches.map((match) => {
              const homeWon = match.home.score > match.away.score;
              const awayWon = match.away.score > match.home.score;

              return (
                <li key={match.id}>
                  <Link
                    href={`/sports/${match.sportSlug}`}
                    className="block overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/40"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900">
                      <span className="text-xs font-bold tracking-wider text-neutral-500">
                        {match.league}
                      </span>
                      <span className="text-xs font-semibold text-[#E10600]">
                        {match.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-5">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="relative h-12 w-12">
                          <Image
                            src={match.home.logo}
                            alt={match.home.name}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-bold">{match.home.abbr}</span>
                        <span
                          className={`text-2xl font-black tabular-nums ${homeWon ? "text-neutral-900 dark:text-white" : "text-neutral-400"}`}
                        >
                          {match.home.score}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-neutral-400">
                        VS
                      </span>
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="relative h-12 w-12">
                          <Image
                            src={match.away.logo}
                            alt={match.away.name}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-bold">{match.away.abbr}</span>
                        <span
                          className={`text-2xl font-black tabular-nums ${awayWon ? "text-neutral-900 dark:text-white" : "text-neutral-400"}`}
                        >
                          {match.away.score}
                        </span>
                      </div>
                    </div>
                    <p className="border-t border-neutral-200 px-4 py-2 text-center text-xs text-neutral-500 dark:border-neutral-800">
                      {match.date}
                      {match.venue ? ` · ${match.venue}` : ""}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Three columns — posture features */}
      <section className="border-t border-black bg-neutral-50 px-4 py-12 dark:border-neutral-100 dark:bg-neutral-900/30 md:py-16">
        <div className="mx-auto grid max-w-5xl md:grid-cols-3">
          <div className="border-b border-black px-5 py-8 text-center dark:border-neutral-100 md:border-b-0 md:border-r md:px-8 md:text-left">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-[#E10600] dark:border-neutral-700 dark:bg-neutral-950 md:mx-0">
              <Target className="h-6 w-6" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              종목별 자세 분석
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              NBA, EPL, NFL 등 주요 리그 종목별로 올바른 자세와 동작을
              확인하세요.
            </p>
          </div>
          <div className="border-b border-black px-5 py-8 text-center dark:border-neutral-100 md:border-b-0 md:border-r md:px-8 md:text-left">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-[#E10600] dark:border-neutral-700 dark:bg-neutral-950 md:mx-0">
              <Activity className="h-6 w-6" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              경기 기반 가이드
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              실제 경기에서 자주 쓰이는 동작을 기준으로 자세 교정 포인트를
              제공합니다.
            </p>
          </div>
          <div className="px-5 py-8 text-center md:px-8 md:text-left">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-[#E10600] dark:border-neutral-700 dark:bg-neutral-950 md:mx-0">
              <Trophy className="h-6 w-6" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              리그별 맞춤 콘텐츠
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              상단 리그 로고를 눌러 해당 스포츠의 자세 가이드 페이지로
              바로 이동할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
