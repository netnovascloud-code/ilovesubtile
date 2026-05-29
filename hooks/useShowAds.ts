"use client";

import { useUser } from "@/hooks/useUser";
import { ADS_ENABLED } from "@/lib/ads";

/**
 * Ads are shown only when globally enabled (ADS_ENABLED) AND the user is on
 * the Free plan. Pro and Business never see ads. While the user state is
 * loading we return false to avoid a flash of ads for paying users.
 */
export function useShowAds(): boolean {
  const { plan, loading } = useUser();
  if (!ADS_ENABLED) return false;
  if (loading) return false;
  return plan !== "pro" && plan !== "business";
}
