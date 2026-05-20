"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

type Accent = {
  border: string;
  fill: string;
};

const DEFAULT_ACCENT: Accent = {
  border: "#4a6fa5",
  fill: "#e8f0fa",
};

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function rgbToAccent(r: number, g: number, b: number): Accent {
  const { h, s, l } = rgbToHsl(r, g, b);
  const sat = Math.min(Math.max(s, 18), 62);
  return {
    border: `hsl(${Math.round(h)} ${sat}% ${Math.min(Math.max(l - 18, 28), 48)}%)`,
    fill: `hsl(${Math.round(h)} ${Math.min(sat * 0.55, 36)}% 94%)`,
  };
}

function useImageAccent(src: string): Accent {
  const [accent, setAccent] = useState<Accent>(DEFAULT_ACCENT);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const sample = 40;
        canvas.width = sample;
        canvas.height = sample;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, sample, sample);
        const { data } = ctx.getImageData(0, 0, sample, sample);
        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 128) continue;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count += 1;
        }

        if (count === 0 || cancelled) return;
        setAccent(rgbToAccent(r / count, g / count, b / count));
      } catch {
        // keep default on canvas/CORS errors
      }
    };
    img.onerror = () => {
      if (!cancelled) setAccent(DEFAULT_ACCENT);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  return accent;
}

function LongDashedBorder({
  color,
  size,
  radius,
}: {
  color: string;
  size: number;
  radius: number;
}) {
  const inset = 1.25;
  const side = size - inset * 2;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
    >
      <rect
        x={inset}
        y={inset}
        width={side}
        height={side}
        rx={radius}
        ry={radius}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="11 7"
        strokeLinecap="round"
      />
    </svg>
  );
}

type ProfileAvatarFrameProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
};

export function ProfileAvatarFrame({
  src,
  alt,
  size = 72,
  className,
  imageClassName,
  style,
}: ProfileAvatarFrameProps) {
  const accent = useImageAccent(src);
  const outerRadius = Math.round(size * 0.26);
  const innerRadius = Math.round(size * 0.2);
  const inset = Math.round(size * 0.08);

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={
        {
          width: size,
          height: size,
          borderRadius: outerRadius,
          backgroundColor: accent.fill,
          "--profile-frame-border": accent.border,
          ...style,
        } as CSSProperties
      }
    >
      <LongDashedBorder color={accent.border} size={size} radius={outerRadius} />
      <div
        className="absolute overflow-hidden"
        style={{
          inset,
          borderRadius: innerRadius,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    </div>
  );
}
