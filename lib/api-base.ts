/**
 * Chat: same-origin Route Handler (/chat/api/chat) unless NEXT_PUBLIC_* points at FastAPI.
 * GEMINI_API_KEY stays server-only (never NEXT_PUBLIC_*).
 */
export function getChatApiUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (fromEnv) {
    return `${fromEnv.replace(/\/$/, "")}/chat`;
  }
  return "/chat/api/chat";
}

/**
 * Browser: same-origin proxy (/api/backend → FastAPI) to avoid CORS / Failed to fetch.
 * Override with NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_BASE_URL when needed.
 */
export function getApiBase(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return "/api/backend";
  }
  return "http://127.0.0.1:8000";
}
