const STORAGE_KEY = "forma:subscribed-providers";
export const SUBSCRIPTIONS_CHANGE_EVENT = "forma:subscriptions-changed";

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function writeIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(SUBSCRIPTIONS_CHANGE_EVENT));
}

export function getSubscribedProviderIds(): string[] {
  return readIds();
}

export function isProviderSubscribed(providerId: string): boolean {
  return readIds().includes(providerId);
}

export function subscribeProvider(providerId: string) {
  const ids = readIds();
  if (ids.includes(providerId)) return;
  writeIds([...ids, providerId]);
}

export function unsubscribeProvider(providerId: string) {
  writeIds(readIds().filter((id) => id !== providerId));
}

export function toggleProviderSubscription(providerId: string): boolean {
  if (isProviderSubscribed(providerId)) {
    unsubscribeProvider(providerId);
    return false;
  }
  subscribeProvider(providerId);
  return true;
}
