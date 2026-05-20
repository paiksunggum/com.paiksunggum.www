"use client";

import * as React from "react";

import { getTipProviderById, type TipProvider } from "@/lib/tip-providers";
import {
  getSubscribedProviderIds,
  subscribeProvider,
  SUBSCRIPTIONS_CHANGE_EVENT,
  toggleProviderSubscription,
  unsubscribeProvider,
} from "@/lib/subscriptions-storage";

export function useSubscriptions() {
  const [ids, setIds] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);

  const refresh = React.useCallback(() => {
    setIds(getSubscribedProviderIds());
  }, []);

  React.useEffect(() => {
    refresh();
    setReady(true);

    const onChange = () => refresh();
    window.addEventListener(SUBSCRIPTIONS_CHANGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(SUBSCRIPTIONS_CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  const providers = React.useMemo(
    () =>
      ids
        .map((id) => getTipProviderById(id))
        .filter((p): p is TipProvider => p !== undefined),
    [ids],
  );

  return {
    ready,
    ids,
    providers,
    isSubscribed: (providerId: string) => ids.includes(providerId),
    subscribe: subscribeProvider,
    unsubscribe: unsubscribeProvider,
    toggle: toggleProviderSubscription,
  };
}
