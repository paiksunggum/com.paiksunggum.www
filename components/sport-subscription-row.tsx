"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import * as React from "react";

import { HorizontalScrollRow } from "@/components/horizontal-scroll-row";
import {
  SUBSCRIPTION_AVATAR_SIZE,
  SubscriptionCircleAvatar,
} from "@/components/subscription-circle-avatar";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { getRecommendedProvidersForSport } from "@/lib/tip-providers";
import { cn } from "@/lib/utils";

type SportSubscriptionRowProps = {
  sportSlug: string;
};

export default function SportSubscriptionRow({
  sportSlug,
}: SportSubscriptionRowProps) {
  const { ready, ids, providers: subscribedAll } = useSubscriptions();

  const subscribed = React.useMemo(
    () => subscribedAll.filter((p) => p.sportSlug === sportSlug),
    [subscribedAll, sportSlug],
  );

  const recommended = React.useMemo(
    () => getRecommendedProvidersForSport(sportSlug, ids, 12),
    [sportSlug, ids],
  );

  const rowItems = React.useMemo(() => {
    const subscribedIds = new Set(subscribed.map((p) => p.id));
    const extra = recommended.filter((p) => !subscribedIds.has(p.id));
    return [...subscribed, ...extra];
  }, [subscribed, recommended]);

  if (!ready) {
    return null;
  }

  return (
    <section
      aria-label="구독 및 추천 코치"
      className="bg-[#f1efe7] px-4 py-3"
    >
      <div className="mx-auto max-w-3xl">
        <HorizontalScrollRow className="-mx-1">
          <ul className="flex min-w-min items-center gap-2 px-1">
            <li className="shrink-0">
              <Link
                href={`/recommend?sport=${sportSlug}`}
                className={cn(
                  "flex items-center justify-center rounded-full bg-[#041E42] text-white",
                  "transition-opacity hover:opacity-90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                )}
                style={{
                  width: SUBSCRIPTION_AVATAR_SIZE,
                  height: SUBSCRIPTION_AVATAR_SIZE,
                }}
                aria-label="코치 추천 보기"
              >
                <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden />
              </Link>
            </li>

            {rowItems.map((provider) => (
              <li
                key={provider.id}
                className="shrink-0"
                title={provider.name}
              >
                <SubscriptionCircleAvatar
                  src={provider.avatarUrl}
                  alt={provider.name}
                  seed={provider.id}
                />
              </li>
            ))}
          </ul>
        </HorizontalScrollRow>
      </div>
    </section>
  );
}
