"use client";

/**
 * Root error boundary — replaces the whole document (incl. the root layout)
 * when an error escapes a route segment, e.g. an error thrown during the root
 * layout render itself. Must render its own <html>/<body>.
 *
 * Like app/error.tsx, a ChunkLoadError after a fresh deploy triggers a
 * one-shot reload so a stale tab picks up the new build.
 */

import { useEffect } from "react";

const RELOAD_GUARD = "konver_chunk_reloaded";

function isChunkLoadError(err: unknown): boolean {
  const e = err as { name?: string; message?: string } | null;
  const msg = `${e?.name ?? ""} ${e?.message ?? ""}`;
  return /ChunkLoadError|Loading chunk|Loading CSS chunk|importing a module script failed|dynamically imported module/i.test(msg);
}

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    if (isChunkLoadError(error) && typeof window !== "undefined" && !sessionStorage.getItem(RELOAD_GUARD)) {
      sessionStorage.setItem(RELOAD_GUARD, "1");
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", margin: 0 }}>
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: 480 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#111827" }}>Something went wrong</h1>
          <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
            An unexpected error occurred. Please reload the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: "1.5rem", padding: "0.5rem 1.25rem", borderRadius: "0.5rem", border: "none", background: "#4f46e5", color: "#fff", fontWeight: 600, cursor: "pointer" }}
          >
            Reload page
          </button>
        </div>
      </body>
    </html>
  );
}
