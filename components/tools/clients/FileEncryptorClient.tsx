"use client";

import { useState } from "react";
import { Lock, Unlock, Loader2, Eye, EyeOff, Upload, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { decryptFile, encryptFile } from "@/lib/aes-file";
import { formatBytes } from "@/lib/utils";

type Mode = "encrypt" | "decrypt";

export function FileEncryptorClient() {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearResult() {
    setResult(null); setError(null);
  }

  async function run() {
    if (!file) return;
    setBusy(true); clearResult();
    try {
      const out = mode === "encrypt"
        ? await encryptFile(file, password)
        : await decryptFile(file, password);
      setResult({ blob: out.blob, name: out.suggestedName });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Operation failed.");
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url; a.download = result.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  const accept = mode === "encrypt" ? undefined : ".enc,application/octet-stream";
  const dropLabel = mode === "encrypt"
    ? "Click to pick a file to encrypt"
    : "Click to pick a .enc file to decrypt";

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
        {(["encrypt", "decrypt"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setFile(null); clearResult(); }}
            className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              mode === m ? "bg-rose-500 text-white" : "text-ink-600 hover:text-ink-900"
            }`}
          >
            {m === "encrypt" ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
            {m === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>
        ))}
      </div>

      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-rose-300 bg-rose-50/40 px-6 py-12 text-center transition-colors hover:brightness-95">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-600">
            <Upload className="h-6 w-6" />
          </span>
          <span className="mt-3 font-semibold text-ink-900">{dropLabel}</span>
          <span className="mt-0.5 text-xs text-ink-400">
            {mode === "encrypt" ? "Any file type — processed privately in your browser" : "Only Konver .enc containers"}
          </span>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); clearResult(); } }}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 bg-white px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-ink-900">{file.name}</div>
            <div className="text-xs text-ink-400">{formatBytes(file.size)}</div>
          </div>
          <button
            type="button"
            onClick={() => { setFile(null); clearResult(); }}
            className="rounded p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700" htmlFor="file-aes-pwd">
          Password
        </label>
        <div className="relative">
          <input
            id="file-aes-pwd"
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
            Use a long, unique password. If you lose it the file is unrecoverable — there is no reset.
          </p>
        )}
      </div>

      <Button onClick={run} disabled={busy || !file || !password} size="lg">
        {busy
          ? <Loader2 className="h-4 w-4 animate-spin" />
          : (mode === "encrypt" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />)}
        {busy
          ? (mode === "encrypt" ? "Encrypting…" : "Decrypting…")
          : (mode === "encrypt" ? "Encrypt file" : "Decrypt file")}
      </Button>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {result && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-ink-900">
                {mode === "encrypt" ? "Encrypted file ready" : "Decrypted file ready"}
              </div>
              <div className="truncate text-xs text-ink-500">{result.name} · {formatBytes(result.blob.size)}</div>
            </div>
            <Button onClick={download} size="sm">
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      )}

      <p className="text-xs text-ink-400">
        AES-256-GCM, key derived from your password via PBKDF2-SHA-256 (600 000 iterations, OWASP 2023). The original filename is embedded inside the encrypted blob so the recipient gets it back automatically on decryption. 100% in your browser — file and password never leave the device.
      </p>
    </div>
  );
}
