import { notFound } from "next/navigation";

import SportPageHeader from "@/components/sport-page-header";
import SportSubscriptionRow from "@/components/sport-subscription-row";
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
    <div className="min-h-screen bg-background text-foreground">
      <SportSubscriptionRow sportSlug={sport.slug} />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <SportPageHeader
          slug={sport.slug}
          league={sport.league}
          name={sport.name}
          caption={sport.caption}
          brandColor={sport.brandColor}
          leagueLogo={sport.leagueLogo}
        />

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
