"use client";

import Image from "next/image";
import * as React from "react";

import {
  FALLBACK_PORTRAIT_COUNT,
  getFallbackAvatarUrl,
  resolveAvatarUrl,
} from "@/lib/avatar-fallback";
import { cn } from "@/lib/utils";

export const SUBSCRIPTION_AVATAR_SIZE = 44;

type SubscriptionCircleAvatarProps = {
  src: string;
  alt: string;
  seed?: string;
  size?: number;
  className?: string;
};

export function SubscriptionCircleAvatar({
  src,
  alt,
  seed,
  size = SUBSCRIPTION_AVATAR_SIZE,
  className,
}: SubscriptionCircleAvatarProps) {
  const id = seed ?? alt;
  const hasPrimary = Boolean(src?.trim());
  const [failedPrimary, setFailedPrimary] = React.useState(false);
  const [variant, setVariant] = React.useState(0);

  React.useEffect(() => {
    setFailedPrimary(false);
    setVariant(0);
  }, [src, id]);

  const imgSrc =
    failedPrimary || !hasPrimary
      ? getFallbackAvatarUrl(id, variant)
      : resolveAvatarUrl(src, id);

  const handleError = () => {
    if (hasPrimary && !failedPrimary) {
      setFailedPrimary(true);
      setVariant(0);
      return;
    }
    setVariant((v) =>
      v + 1 < FALLBACK_PORTRAIT_COUNT ? v + 1 : v,
    );
  };

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-muted",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        key={imgSrc}
        src={imgSrc}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        onError={handleError}
      />
    </div>
  );
}
