import type { Metadata } from "next";
import { Suspense } from "react";
import { MfaGuard } from "@/components/auth/MfaGuard";

export const metadata: Metadata = {
  title: "Two-factor authentication — Konvertools",
  robots: { index: false, follow: false },
};

// Client-rendered (reads ?redirect and talks to Supabase MFA), so opt out of
// static prerendering and wrap useSearchParams in Suspense.
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="container flex min-h-[60vh] max-w-md items-center justify-center py-16">
      <div className="w-full">
        <Suspense fallback={null}>
          <MfaGuard />
        </Suspense>
      </div>
    </main>
  );
}
