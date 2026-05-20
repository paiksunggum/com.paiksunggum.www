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
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
        {sportName} 자세 팁 코치
      </h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        마음에 드는 코치를 구독하면 메인 페이지 즐겨찾기에 추가됩니다.
      </p>

      <ul className="mt-6 space-y-4">
        {providers.map((provider) => {
          const subscribed = isSubscribed(provider.id);

          return (
            <li
              key={provider.id}
              className="flex gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-red-600">
                <Image
                  src={provider.avatarUrl}
                  alt={provider.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-neutral-900 dark:text-neutral-50">
                  {provider.name}
                </p>
                <p className="mt-0.5 text-sm font-medium text-red-700 dark:text-red-400">
                  {provider.specialty}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
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
                    "border-[#E10600] bg-[#E10600] text-white hover:bg-[#c40500] hover:text-white",
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
