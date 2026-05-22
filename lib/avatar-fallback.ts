/** Deterministic placeholder portraits when avatar URL is missing or fails to load. */
const FALLBACK_PORTRAITS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
] as const;

export const FALLBACK_PORTRAIT_COUNT = FALLBACK_PORTRAITS.length;

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getFallbackAvatarUrl(seed: string, variant = 0): string {
  const index =
    (hashString(seed) + variant) % FALLBACK_PORTRAITS.length;
  return FALLBACK_PORTRAITS[index];
}

export function resolveAvatarUrl(
  url: string | undefined | null,
  seed: string,
): string {
  const trimmed = url?.trim();
  if (trimmed) return trimmed;
  return getFallbackAvatarUrl(seed);
}
