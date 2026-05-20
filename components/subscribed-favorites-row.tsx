"use client";

import Link from "next/link";
import { Star } from "lucide-react";

import { ProfileAvatarFrame } from "@/components/profile-avatar-frame";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { getSportBySlug } from "@/lib/sports-data";

export default function SubscribedFavoritesRow() {
  const { ready, providers } = useSubscriptions();

  return (
    <section
      aria-label="구독중"
      className="border-t border-border bg-muted px-4 py-6 md:py-8"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-2">
          <Star
            className="h-4 w-4 fill-primary text-primary"
            aria-hidden
          />
          <p className="text-sm font-semibold text-foreground">
            구독중
          </p>
        </div>

        {!ready ? (
          <p className="text-sm text-muted-foreground">불러오는 중…</p>
        ) : providers.length === 0 ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            스포츠별 자세 가이드에서 마음에 드는 코치를 구독하면 여기에
            표시됩니다.
          </p>
        ) : (
          <div className="-mx-1 overflow-x-auto pb-1">
            <ul className="flex min-w-min gap-4 px-1">
              {providers.map((provider) => {
                const sport = getSportBySlug(provider.sportSlug);
                return (
                  <li key={provider.id} className="w-[100px] shrink-0 sm:w-[108px]">
                    <Link
                      href={`/sports/${provider.sportSlug}`}
                      className="group flex flex-col items-center gap-2 focus-visible:outline-none"
                      aria-label={`${provider.name} · ${sport?.name ?? ""} 페이지`}
                    >
                      <ProfileAvatarFrame
                        src={provider.avatarUrl}
                        alt={provider.name}
                        className="shadow-sm transition-transform group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-[var(--profile-frame-border)] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background"
                      />
                      <p className="w-full truncate text-center text-xs font-semibold text-foreground">
                        {provider.name}
                      </p>
                      <p className="w-full truncate text-center text-[11px] text-muted-foreground">
                        {sport?.name ?? provider.sportSlug}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
