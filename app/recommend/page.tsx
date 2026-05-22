import RecommendPageContent from "@/components/recommend-page-content";

type RecommendPageProps = {
  searchParams: Promise<{ sport?: string }>;
};

export default async function RecommendPage({
  searchParams,
}: RecommendPageProps) {
  const { sport } = await searchParams;
  const backHref = sport ? `/sports/${sport}` : "/";

  return (
    <RecommendPageContent highlightSport={sport} backHref={backHref} />
  );
}
