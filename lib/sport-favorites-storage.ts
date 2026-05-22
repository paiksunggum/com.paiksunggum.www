const STORAGE_KEY = "forma:favorite-sports";
export const SPORT_FAVORITES_CHANGE_EVENT = "forma:sport-favorites-changed";

function readSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((slug): slug is string => typeof slug === "string");
  } catch {
    return [];
  }
}

function writeSlugs(slugs: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new CustomEvent(SPORT_FAVORITES_CHANGE_EVENT));
}

export function getFavoriteSportSlugs(): string[] {
  return readSlugs();
}

export function isSportFavorite(sportSlug: string): boolean {
  return readSlugs().includes(sportSlug);
}

export function addFavoriteSport(sportSlug: string) {
  const slugs = readSlugs();
  if (slugs.includes(sportSlug)) return;
  writeSlugs([...slugs, sportSlug]);
}

export function removeFavoriteSport(sportSlug: string) {
  writeSlugs(readSlugs().filter((slug) => slug !== sportSlug));
}

export function toggleFavoriteSport(sportSlug: string): boolean {
  if (isSportFavorite(sportSlug)) {
    removeFavoriteSport(sportSlug);
    return false;
  }
  addFavoriteSport(sportSlug);
  return true;
}
