"use client";

import { useEffect, useState } from "react";
import { Copy, KeyRound, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { edgeFnUrl } from "@/lib/utils";

type ApiKey = {
  id: string;
  name: string;
  key_prefix: string;
  last_used_at: string | null;
  revoked: boolean;
  created_at: string;
};

export function ApiKeysCard({ plan, credits }: { plan: string; credits: number }) {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [freshKey, setFreshKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [pendingRevoke, setPendingRevoke] = useState<ApiKey | null>(null);
  const [revoking, setRevoking] = useState(false);

  const isBusiness = plan === "business";
  const activeKeys = keys.filter((k) => !k.revoked);
  const MAX_KEYS = 10;
  const atKeyLimit = activeKeys.length >= MAX_KEYS;
  const nameValid = name.trim().length > 0;

  async function authedFetch(body: object) {
    const supabase = getSupabaseBrowser();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("not signed in");
    return fetch(edgeFnUrl("api-keys"), {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  async function load() {
    setLoading(true);
    try {
      const res = await authedFetch({ action: "list" });
      const data = await res.json();
      setKeys(data.keys ?? []);
    } catch {
      // not configured / offline
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function create() {
    if (!nameValid) { setError("Give the key a name first."); return; }
    if (atKeyLimit) { setError(`You can have up to ${MAX_KEYS} active keys. Revoke one first.`); return; }
    setCreating(true);
    setError(null);
    setFreshKey(null);
    try {
      const res = await authedFetch({ action: "create", name: name.trim().slice(0, 60) });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error === "business_plan_required" ? "API access requires the Business plan." : data.error);
        return;
      }
      setFreshKey(data.key);
      setName("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setCreating(false);
    }
  }

  async function confirmRevoke() {
    if (!pendingRevoke) return;
    setRevoking(true);
    try {
      await authedFetch({ action: "revoke", id: pendingRevoke.id });
      // Clear the one-time "copy your key" banner so a revoked key never lingers.
      setFreshKey(null);
      setCopied(false);
      await load();
      setPendingRevoke(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not revoke the key.");
    } finally {
      setRevoking(false);
    }
  }

  return (
    <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-ink-500" />
          <h3 className="font-semibold text-ink-900">API keys</h3>
        </div>
        <div className="text-sm text-ink-500">
          Credits: <span className="font-semibold text-ink-900">{credits.toLocaleString()}</span>
        </div>
      </div>

      {!isBusiness && (
        <p className="mt-3 rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          The REST API is a Business-plan feature. Upgrade to generate keys and call the API.
        </p>
      )}

      {freshKey && (
        <div className="mt-4 rounded border border-green-200 bg-green-50 p-3">
          <p className="text-xs text-green-800">Copy your key now — it won&apos;t be shown again.</p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 overflow-x-auto rounded bg-white px-2 py-1 font-mono text-xs text-ink-900">
              {freshKey}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(freshKey);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-4">
        {loading ? (
          <p className="text-sm text-ink-400">Loading…</p>
        ) : keys.filter((k) => !k.revoked).length === 0 ? (
          <p className="text-sm text-ink-500">No active keys yet.</p>
        ) : (
          <ul className="divide-y divide-ink-100 text-sm">
            {keys.filter((k) => !k.revoked).map((k) => (
              <li key={k.id} className="flex items-center justify-between py-2">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink-900">{k.name || "API key"}</p>
                  <p className="mt-0.5 text-xs text-ink-400">
                    <code className="font-mono">{k.key_prefix}…</code>
                    <span className="ml-2">
                      {k.last_used_at ? `used ${new Date(k.last_used_at).toLocaleDateString()}` : "never used"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setPendingRevoke(k)}
                  className="inline-flex items-center gap-1 rounded p-1 text-xs text-ink-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Revoke
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          disabled={!isBusiness || creating || atKeyLimit}
          placeholder="Key name (required, e.g. Production)"
          onKeyDown={(e) => {
            if (e.key === "Enter" && isBusiness && !creating && nameValid && !atKeyLimit) create();
          }}
          className="flex-1 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-ink-50"
        />
        <Button size="sm" onClick={create} disabled={!isBusiness || creating || !nameValid || atKeyLimit}>
          <Plus className="h-3.5 w-3.5" />
          {creating ? "Generating…" : "Generate API key"}
        </Button>
      </div>
      {isBusiness && atKeyLimit && (
        <p className="mt-2 text-xs text-amber-700">You&apos;ve reached the maximum of {MAX_KEYS} active keys. Revoke one to create another.</p>
      )}

      <ConfirmDialog
        open={pendingRevoke !== null}
        busy={revoking}
        options={{
          title: "Revoke this API key permanently?",
          body: `"${pendingRevoke?.name || "API key"}" (${pendingRevoke?.key_prefix ?? ""}…) — this action is irreversible. Every application currently using this key will stop working immediately and start receiving 401 errors. The key cannot be reactivated; you'll have to create a new one and update your integrations.`,
          confirmLabel: "Yes, revoke permanently",
          cancelLabel: "Cancel",
          danger: true,
        }}
        onConfirm={confirmRevoke}
        onClose={() => setPendingRevoke(null)}
      />
    </div>
  );
}
