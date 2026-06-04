"use client";

/**
 * Route-segment error boundary. Catches render/runtime errors in any page so
 * the app shows a recoverable panel instead of React's bare "client-side
 * exception" screen.
 *
 * Special case: ChunkLoadError. After a new deploy, Vercel removes the old
 * build's JS chunks; a tab still running the previous build throws
 * ChunkLoadError on the next client navigation. A one-shot reload pulls the
 * fresh build. A sessionStorage guard prevents a reload loop if the error is
 * something else.
 */

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const RELOAD_GUARD = "konver_chunk_reloaded";

function isChunkLoadError(err: unknown): boolean {
  const e = err as { name?: string; message?: string } | null;
  const msg = `${e?.name ?? ""} ${e?.message ?? ""}`;
  return /ChunkLoadError|Loading chunk|Loading CSS chunk|importing a module script failed|dynamically imported module/i.test(msg);
}

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (isChunkLoadError(error) && typeof window !== "undefined") {
      if (!sessionStorage.getItem(RELOAD_GUARD)) {
        sessionStorage.setItem(RELOAD_GUARD, "1");
        window.location.reload();
      }
    } else {
      // Clear the guard on any non-chunk error so a future deploy can reload.
      try { sessionStorage.removeItem(RELOAD_GUARD); } catch { /* ignore */ }
    }
  }, [error]);

  const chunk = isChunkLoadError(error);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold text-ink-900">
        {chunk ? "Updating to the latest version…" : "Something went wrong"}
      </h1>
      <p className="mt-2 max-w-md text-sm text-ink-500">
        {chunk
          ? "A new version was just released. We're reloading the page to fetch it."
          : "An unexpected error occurred. You can retry — if it keeps happening, reload the page."}
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" onClick={() => window.location.reload()}>Reload page</Button>
      </div>
    </div>
  );
}
