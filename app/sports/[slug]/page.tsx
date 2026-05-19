import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getSportBySlug, sports } from "@/lib/sports-data";

type SportPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return sports.map((sport) => ({ slug: sport.slug }));
}

export default async function SportPage({ params }: SportPageProps) {
  const { slug } = await params;
  const sport = getSportBySlug(slug);

  if (!sport) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          홈으로
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-red-600 bg-white p-3 dark:bg-neutral-900">
            <Image
              src={sport.leagueLogo}
              alt={`${sport.league} 로고`}
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              {sport.league}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">{sport.name}</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {sport.caption}
            </p>
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700">
          <Image
            src={sport.image}
            alt={sport.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <article className="mt-8 space-y-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
            {sport.name} 자세 가이드
          </h2>
          <p>
            {sport.league} 선수들이 자주 사용하는 기본 자세와 움직임을 정리한
            페이지입니다. 올바른 자세는 부상 예방과 퍼포먼스 향상에
            도움이 됩니다.
          </p>
          <p>
            곧 각 동작별 상세 가이드, 체크리스트, 영상 자료가 추가될
            예정입니다.
          </p>
        </article>
      </div>
    </div>
  );
}
