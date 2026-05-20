"use client";

import Image from "next/image";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { getTipProvidersBySport } from "@/lib/tip-providers";
import { cn } from "@/lib/utils";

type SportTipProvidersProps = {
  sportSlug: string;
  sportName: string;
};

export default function SportTipProviders({
  sportSlug,
  sportName,
}: SportTipProvidersProps) {
  const { isSubscribed, toggle } = useSubscriptions();
  const providers = getTipProvidersBySport(sportSlug);

  if (providers.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-foreground">
        {sportName} 자세 팁 코치
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        마음에 드는 코치를 구독하면 메인 페이지 즐겨찾기에 추가됩니다.
      </p>

      <ul className="mt-6 space-y-4">
        {providers.map((provider) => {
          const subscribed = isSubscribed(provider.id);

          return (
            <li
              key={provider.id}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary">
                <Image
                  src={provider.avatarUrl}
                  alt={provider.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">
                  {provider.name}
                </p>
                <p className="mt-0.5 text-sm font-medium text-primary">
                  {provider.specialty}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {provider.bio}
                </p>
              </div>

              <Button
                type="button"
                variant={subscribed ? "outline" : "default"}
                size="sm"
                className={cn(
                  "shrink-0 self-center gap-1.5",
                  subscribed &&
                    "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                )}
                onClick={() => toggle(provider.id)}
                aria-pressed={subscribed}
              >
                {subscribed ? (
                  "구독 취소"
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" aria-hidden />
                    구독
                  </>
                )}
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
