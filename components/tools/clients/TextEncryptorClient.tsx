"use client";

import { useState } from "react";
import { Copy, Check, Lock, Unlock, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { decryptText, encryptText } from "@/lib/aes-text";

type Mode = "encrypt" | "decrypt";

export function TextEncryptorClient() {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function run() {
    setBusy(true); setError(null); setOutput("");
    try {
      const fn = mode === "encrypt" ? encryptText : decryptText;
      setOutput(await fn(input, password));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Operation failed.");
    } finally {
      setBusy(false);
    }
  }

  function copy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const inputLabel = mode === "encrypt" ? "Plain text" : "Encrypted blob (base64)";
  const outputLabel = mode === "encrypt" ? "Encrypted blob (base64)" : "Decrypted text";
  const inputPlaceholder = mode === "encrypt"
    ? "Type or paste the message you want to encrypt…"
    : "Paste the base64 ciphertext you received…";
  const ctaIcon = mode === "encrypt" ? Lock : Unlock;
  const CtaIcon = ctaIcon;

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
        {(["encrypt", "decrypt"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setInput(""); setOutput(""); setError(null); }}
            className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              mode === m ? "bg-rose-500 text-white" : "text-ink-600 hover:text-ink-900"
            }`}
          >
            {m === "encrypt" ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            {m === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">{inputLabel}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
          spellCheck={false}
          className="h-44 w-full resize-y rounded-lg border border-ink-200 bg-white p-3 font-mono text-[13px] text-ink-900 placeholder:text-ink-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700" htmlFor="aes-pwd">
          Password
        </label>
        <div className="relative">
          <input
            id="aes-pwd"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "encrypt" ? "Pick a strong password" : "Same password used to encrypt"}
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 pr-10 text-sm text-ink-900 placeholder:text-ink-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-ink-400 hover:text-ink-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {mode === "encrypt" && (
          <p className="mt-1.5 text-xs text-ink-500">
            Use a long, unique password. If you lose it the message is unrecoverable — there is no reset.
          </p>
        )}
      </div>

      <Button onClick={run} disabled={busy || !input || !password} size="lg">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CtaIcon className="h-4 w-4" />}
        {busy
          ? (mode === "encrypt" ? "Encrypting…" : "Decrypting…")
          : (mode === "encrypt" ? "Encrypt" : "Decrypt")}
      </Button>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">{outputLabel}</label>
            <Button size="sm" variant="outline" onClick={copy}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <textarea
            value={output}
            readOnly
            spellCheck={false}
            className="h-44 w-full resize-y rounded-lg border border-ink-200 bg-ink-50/50 p-3 font-mono text-[13px] text-ink-900"
          />
        </div>
      )}

      <p className="text-xs text-ink-400">
        AES-256-GCM, key derived from your password via PBKDF2-SHA-256 (600 000 iterations, OWASP 2023). 100% in your browser — your message and password never leave the device.
      </p>
    </div>
  );
}
