import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import SportTipProviders from "@/components/sport-tip-providers";
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
    <div className="min-h-screen bg-background px-4 py-10 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          홈으로
        </Link>

        <div className="flex items-center gap-4">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full p-3.5 shadow-sm"
            style={{ backgroundColor: sport.brandColor }}
          >
            <Image
              src={sport.leagueLogo}
              alt={`${sport.league} 로고`}
              width={56}
              height={56}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">
              {sport.league}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">{sport.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {sport.caption}
            </p>
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
          <Image
            src={sport.image}
            alt={sport.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <SportTipProviders sportSlug={sport.slug} sportName={sport.name} />

        <article className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
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
