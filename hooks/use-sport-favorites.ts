"use client";

import * as React from "react";

import {
  addFavoriteSport,
  getFavoriteSportSlugs,
  removeFavoriteSport,
  SPORT_FAVORITES_CHANGE_EVENT,
  toggleFavoriteSport,
} from "@/lib/sport-favorites-storage";

export function useSportFavorites() {
  const [slugs, setSlugs] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);

  const refresh = React.useCallback(() => {
    setSlugs(getFavoriteSportSlugs());
  }, []);

  React.useEffect(() => {
    refresh();
    setReady(true);

    const onChange = () => refresh();
    window.addEventListener(SPORT_FAVORITES_CHANGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(SPORT_FAVORITES_CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  return {
    ready,
    slugs,
    isFavorite: (sportSlug: string) => slugs.includes(sportSlug),
    add: addFavoriteSport,
    remove: removeFavoriteSport,
    toggle: toggleFavoriteSport,
  };
}
