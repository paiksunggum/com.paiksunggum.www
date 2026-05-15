"use client";

import * as React from "react";
import { Cloud } from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

type WeatherData = {
  city: string;
  temp_c: number;
  description: string;
  icon: string;
};

type NavWeatherProps = {
  isHome: boolean;
};

export default function NavWeather({ isHome }: NavWeatherProps) {
  const [weather, setWeather] = React.useState<WeatherData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;

    async function load(lat?: number, lon?: number) {
      const params = new URLSearchParams();
      if (lat != null && lon != null) {
        params.set("lat", String(lat));
        params.set("lon", String(lon));
      } else {
        params.set("city", "Seoul");
      }

      try {
        const res = await fetch(
          `${API_BASE}/weather/current?${params.toString()}`
        );
        if (!res.ok) return;
        const data = (await res.json()) as WeatherData;
        if (!cancelled) setWeather(data);
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => load(pos.coords.latitude, pos.coords.longitude),
        () => load(),
        { timeout: 5000, maximumAge: 300_000 }
      );
    } else {
      load();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const shell = isHome
    ? "border-white/20 bg-white/10 text-white"
    : "border-border bg-muted/50 text-foreground";

  if (loading) {
    return (
      <div
        className={`ml-3 flex h-8 items-center gap-2 rounded-full border px-3 text-xs ${shell}`}
        aria-hidden
      >
        <span className="h-3 w-16 animate-pulse rounded bg-current/20" />
      </div>
    );
  }

  if (!weather) {
    return (
      <div
        className={`ml-3 flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs opacity-70 ${shell}`}
        title="날씨를 불러올 수 없습니다"
      >
        <Cloud className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>—</span>
      </div>
    );
  }

  const label = `${weather.city} · ${weather.description}`;

  return (
    <div
      className={`ml-3 flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium ${shell}`}
      title={label}
      aria-label={label}
    >
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 shrink-0 -my-1"
      />
      <span className="tabular-nums">{weather.temp_c}°</span>
      <span
        className={
          isHome
            ? "hidden text-white/75 sm:inline"
            : "hidden text-muted-foreground sm:inline"
        }
      >
        {weather.city}
      </span>
    </div>
  );
}
