"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export type AppPlan = "free" | "pro" | "business";

export type AppProfile = {
  user: User | null;
  plan: AppPlan;
  loading: boolean;
};

export function useUser(): AppProfile {
  const [state, setState] = useState<AppProfile>({ user: null, plan: "free", loading: true });

  useEffect(() => {
    let cancelled = false;
    let supabase: ReturnType<typeof getSupabaseBrowser>;
    try {
      supabase = getSupabaseBrowser();
    } catch {
      setState({ user: null, plan: "free", loading: false });
      return;
    }

    supabase.auth.getUser().then(async ({ data }) => {
      if (cancelled) return;
      const user = data.user;
      if (!user) {
        setState({ user: null, plan: "free", loading: false });
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;
      setState({ user, plan: (profile?.plan as AppPlan) ?? "free", loading: false });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      setState((prev) => ({ ...prev, user: session?.user ?? null, loading: false }));
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
