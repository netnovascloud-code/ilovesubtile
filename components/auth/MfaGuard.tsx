"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ShieldCheck, AlertCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseBrowser } from "@/lib/supabase/client";

/**
 * Mandatory TOTP two-factor flow. Two states, decided on mount:
 *   • no verified factor  → ENROL (show QR + secret, verify a code)
 *   • a verified factor   → CHALLENGE (enter the current code)
 * On success the session is upgraded to aal2 and we leave to `redirect`.
 *
 * There is deliberately NO "disable / remove 2FA" affordance — once enrolled it
 * stays. The only escape is logging out (so a broken setup never traps a user).
 */

type Mode = "loading" | "enroll" | "challenge" | "error";

function safeRedirect(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return "/dashboard";
  if (raw.startsWith("/auth/") || raw === "/login" || raw === "/register") return "/dashboard";
  return raw;
}

export function MfaGuard() {
  const router = useRouter();
  const params = useSearchParams();
  const dest = safeRedirect(params.get("redirect"));

  const [mode, setMode] = useState<Mode>("loading");
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  const finish = useCallback(() => {
    router.replace(dest);
    router.refresh();
  }, [router, dest]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    (async () => {
      let sb: ReturnType<typeof getSupabaseBrowser>;
      try { sb = getSupabaseBrowser(); } catch { setError("Authentication is unavailable."); setMode("error"); return; }
      try {
        const { data: aalData } = await sb.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aalData?.currentLevel === "aal2") { finish(); return; }

        const { data: factors, error: lfErr } = await sb.auth.mfa.listFactors();
        if (lfErr) throw lfErr;
        const verified = factors?.totp ?? [];
        if (verified.length > 0) {
          setFactorId(verified[0].id);
          setMode("challenge");
          return;
        }
        // No verified factor → enrol a fresh one. Clean up any stale unverified
        // factors first so a fresh QR is always shown.
        const stale = (factors?.all ?? []).filter((f) => f.factor_type === "totp" && f.status === "unverified");
        for (const f of stale) { try { await sb.auth.mfa.unenroll({ factorId: f.id }); } catch { /* ignore */ } }
        const { data: enr, error: enErr } = await sb.auth.mfa.enroll({ factorType: "totp", friendlyName: `Authenticator ${Date.now()}` });
        if (enErr) throw enErr;
        setFactorId(enr.id);
        setQr(enr.totp.qr_code);
        setSecret(enr.totp.secret);
        setMode("enroll");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not start two-factor setup.");
        setMode("error");
      }
    })();
  }, [finish]);

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!factorId || busy) return;
    const clean = code.replace(/\D/g, "").slice(0, 6);
    if (clean.length !== 6) { setError("Enter the 6-digit code from your authenticator app."); return; }
    setBusy(true); setError(null);
    try {
      const sb = getSupabaseBrowser();
      const { error: vErr } = await sb.auth.mfa.challengeAndVerify({ factorId, code: clean });
      if (vErr) throw vErr;
      finish();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code. Please try again.");
      setCode("");
    } finally { setBusy(false); }
  }

  async function logout() {
    try { await getSupabaseBrowser().auth.signOut(); } catch { /* ignore */ }
    window.location.assign("/login");
  }

  return (
    <div className="rounded-xl border border-ink-100 bg-white p-6 shadow-card">
      <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-600">
        <ShieldCheck className="h-5 w-5" />
      </div>
      <h1 className="text-center text-xl font-semibold text-ink-900">Two-factor authentication</h1>

      {mode === "loading" && (
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Checking your security setup…
        </p>
      )}

      {mode === "enroll" && (
        <div className="mt-4">
          <p className="text-sm text-ink-600">
            Your account requires two-factor authentication. Scan this QR code with an authenticator
            app (Google Authenticator, Authy, 1Password…), then enter the 6-digit code to finish.
          </p>
          {qr && (
            <div className="mt-4 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qr} alt="Two-factor QR code" className="h-44 w-44 rounded-lg border border-ink-100 bg-white p-2" />
            </div>
          )}
          {secret && (
            <p className="mt-2 text-center text-xs text-ink-400">
              Can&apos;t scan? Enter this key: <code className="break-all font-mono text-ink-600">{secret}</code>
            </p>
          )}
          <Form code={code} setCode={setCode} busy={busy} onSubmit={verify} cta="Verify & enable" />
        </div>
      )}

      {mode === "challenge" && (
        <div className="mt-4">
          <p className="text-sm text-ink-600">Enter the 6-digit code from your authenticator app to continue.</p>
          <Form code={code} setCode={setCode} busy={busy} onSubmit={verify} cta="Verify" autoFocus />
        </div>
      )}

      {mode === "error" && (
        <p className="mt-6 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}

      {mode !== "error" && error && (
        <p className="mt-3 flex items-start gap-1.5 text-sm text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}

      <button onClick={logout} className="mx-auto mt-6 flex items-center gap-1.5 text-xs text-ink-400 hover:text-ink-700">
        <LogOut className="h-3.5 w-3.5" /> Log out
      </button>
    </div>
  );
}

function Form({
  code, setCode, busy, onSubmit, cta, autoFocus,
}: {
  code: string;
  setCode: (v: string) => void;
  busy: boolean;
  onSubmit: (e: React.FormEvent) => void;
  cta: string;
  autoFocus?: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      <Input
        inputMode="numeric"
        autoComplete="one-time-code"
        autoFocus={autoFocus}
        maxLength={6}
        placeholder="123456"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        aria-label="6-digit authentication code"
        className="text-center font-mono text-lg tracking-[0.4em]"
      />
      <Button type="submit" className="w-full" disabled={busy || code.length !== 6}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null} {cta}
      </Button>
    </form>
  );
}
