"use client";

import { useUser } from "@/hooks/useUser";

/**
 * Ads are shown to everyone EXCEPT Pro and Business subscribers.
 * While the user state is loading we return false to avoid a flash of
 * ads for paying users.
 */
export function useShowAds(): boolean {
  const { plan, loading } = useUser();
  if (loading) return false;
  return plan !== "pro" && plan !== "business";
}
