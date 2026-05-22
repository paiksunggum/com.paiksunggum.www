"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import * as React from "react";

import { SubscriptionCircleAvatar } from "@/components/subscription-circle-avatar";
import { Button } from "@/components/ui/button";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { sports } from "@/lib/sports-data";
import {
  getProvidersGroupedBySport,
  type ProvidersBySport,
} from "@/lib/tip-providers";
import { cn } from "@/lib/utils";

type RecommendPageContentProps = {
  highlightSport?: string;
  backHref?: string;
};

function sortSections(
  sections: ProvidersBySport[],
  highlightSport?: string,
): ProvidersBySport[] {
  if (!highlightSport) return sections;

  const highlighted = sections.find((s) => s.sportSlug === highlightSport);
  const rest = sections.filter((s) => s.sportSlug !== highlightSport);
  return highlighted ? [highlighted, ...rest] : sections;
}

export default function RecommendPageContent({
  highlightSport,
  backHref = "/",
}: RecommendPageContentProps) {
  const { isSubscribed, toggle } = useSubscriptions();

  const sportNames = React.useMemo(
    () => new Map(sports.map((s) => [s.slug, s.name])),
    [],
  );

  const sections = React.useMemo(
    () => sortSections(getProvidersGroupedBySport(sportNames), highlightSport),
    [sportNames, highlightSport],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-lg px-4 py-6">
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          뒤로
        </Link>

        <h1 className="text-xl font-bold tracking-tight">추천</h1>

        <ul className="mt-5">
          {sections.map((section) => (
            <li key={section.sportSlug}>
              <p className="sticky top-14 z-10 bg-background py-2 text-xs font-semibold text-muted-foreground">
                {section.sportName}
              </p>

              {section.providers.map((provider) => {
                const subscribed = isSubscribed(provider.id);

                return (
                  <div
                    key={provider.id}
                    className="flex items-center gap-3 border-b border-border/60 py-2.5 last:border-b-0"
                  >
                    <SubscriptionCircleAvatar
                      src={provider.avatarUrl}
                      alt={provider.name}
                      seed={provider.id}
                      size={40}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {provider.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {provider.specialty}
                      </p>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant={subscribed ? "outline" : "default"}
                      className={cn(
                        "h-8 shrink-0 px-3 text-xs",
                        subscribed && "text-muted-foreground",
                      )}
                      onClick={() => toggle(provider.id)}
                      aria-pressed={subscribed}
                    >
                      {subscribed ? "취소" : "구독"}
                    </Button>
                  </div>
                );
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
