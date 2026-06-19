"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { SubscriptionCircleAvatar } from "@/components/subscription-circle-avatar";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { getSportBySlug } from "@/lib/sports-data";
import { cn } from "@/lib/utils";

const MAIN_SUBSCRIPTION_AVATAR_SIZE = 72;
/** ~half of w-[100px] / sm:w-[108px] so stacked avatars peek from behind */
const STACK_OVERLAP = "-ml-[50px] sm:-ml-[54px]";

export default function SubscribedFavoritesRow() {
  const { ready, providers } = useSubscriptions();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const toggleMobileStack = useCallback(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    setMobileExpanded((open) => !open);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <section aria-label="구독중" className="bg-[#f1efe7] dark:bg-muted px-4 pb-3 pt-5">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold text-foreground">구독중</p>

        {providers.length === 0 ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            스포츠별 자세 가이드에서 마음에 드는 코치를 구독하면 여기에
            표시됩니다.
          </p>
        ) : (
          <div
            aria-expanded={mobileExpanded}
            aria-label="구독중 프로필 목록"
            className={cn(
              "group scrollbar-simple-x -mx-1 w-full overflow-x-auto overflow-y-visible pb-[var(--scrollbar-simple-slot-y)]",
              !mobileExpanded && "max-md:cursor-pointer",
            )}
            onClick={toggleMobileStack}
          >
            <ul
              className={cn(
                "flex w-fit min-w-min px-1 transition-[gap] duration-300 ease-out",
                mobileExpanded
                  ? "gap-4"
                  : cn(
                      "gap-0",
                      "[@media(hover:hover)_and_(pointer:fine)]:group-hover:gap-4",
                    ),
              )}
            >
              {providers.map((provider, index) => {
                const sport = getSportBySlug(provider.sportSlug);

                return (
                  <li
                    key={provider.id}
                    style={{ zIndex: providers.length - index }}
                    className={cn(
                      "w-[100px] shrink-0 transition-[margin] duration-300 ease-out sm:w-[108px]",
                      index > 0 &&
                        !mobileExpanded &&
                        cn(
                          STACK_OVERLAP,
                          "[@media(hover:hover)_and_(pointer:fine)]:group-hover:ml-0",
                        ),
                    )}
                  >
                    <Link
                      href={`/sports/${provider.sportSlug}`}
                      className={cn(
                        "group/link flex flex-col items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        !mobileExpanded && "max-md:pointer-events-none",
                      )}
                      aria-label={`${provider.name} · ${sport?.name ?? ""} 페이지`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <SubscriptionCircleAvatar
                        src={provider.avatarUrl}
                        alt={provider.name}
                        seed={provider.id}
                        size={MAIN_SUBSCRIPTION_AVATAR_SIZE}
                        className="shadow-sm ring-2 ring-[#f1efe7] dark:ring-muted"
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
