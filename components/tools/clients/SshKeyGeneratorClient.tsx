"use client";

import { useState } from "react";
import { Copy, Check, Download, KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateEd25519SshKey, generateRsaSshKey } from "@/lib/openssh";

type Algo = "ed25519" | "rsa-2048" | "rsa-3072" | "rsa-4096";

const ALGOS: { id: Algo; label: string; hint: string }[] = [
  { id: "ed25519", label: "Ed25519", hint: "Recommended — fast, small, modern" },
  { id: "rsa-2048", label: "RSA 2048", hint: "Wide compatibility" },
  { id: "rsa-3072", label: "RSA 3072", hint: "Stronger RSA" },
  { id: "rsa-4096", label: "RSA 4096", hint: "Strongest RSA, slower" },
];

export function SshKeyGeneratorClient() {
  const [algo, setAlgo] = useState<Algo>("ed25519");
  const [comment, setComment] = useState("");
  const [pub, setPub] = useState("");
  const [priv, setPriv] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"pub" | "priv" | null>(null);

  async function generate() {
    setBusy(true); setError(null); setPub(""); setPriv("");
    try {
      const c = comment.trim();
      const pair = algo === "ed25519"
        ? await generateEd25519SshKey(c)
        : await generateRsaSshKey(Number(algo.slice(4)) as 2048 | 3072 | 4096, c);
      setPub(pair.openSshPublic);
      setPriv(pair.openSshPrivate);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setBusy(false);
    }
  }

  function copy(kind: "pub" | "priv") {
    navigator.clipboard.writeText(kind === "pub" ? pub : priv);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1500);
  }

  function download(kind: "pub" | "priv") {
    const isPub = kind === "pub";
    const blob = new Blob([isPub ? pub + "\n" : priv], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isPub
      ? (algo === "ed25519" ? "id_ed25519.pub" : "id_rsa.pub")
      : (algo === "ed25519" ? "id_ed25519" : "id_rsa");
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Algorithm</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ALGOS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAlgo(a.id)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                algo === a.id
                  ? "border-rose-400 bg-rose-50/50"
                  : "border-ink-200 bg-white hover:bg-ink-50"
              }`}
            >
              <div className="text-sm font-semibold text-ink-900">{a.label}</div>
              <div className="mt-0.5 text-xs text-ink-500">{a.hint}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700" htmlFor="ssh-comment">
          Comment <span className="font-normal text-ink-400">(optional, usually your email)</span>
        </label>
        <input
          id="ssh-comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="alice@workstation"
          spellCheck={false}
          className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        />
      </div>

      <Button onClick={generate} disabled={busy} size="lg">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
        {busy ? "Generating in your browser…" : "Generate SSH key pair"}
      </Button>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {pub && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">Public key (OpenSSH)</label>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => copy("pub")}>
                {copied === "pub" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "pub" ? "Copied" : "Copy"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => download("pub")}>
                <Download className="h-3.5 w-3.5" /> Download
              </Button>
            </div>
          </div>
          <textarea
            value={pub}
            readOnly
            spellCheck={false}
            className="h-20 w-full resize-y rounded-lg border border-ink-200 bg-ink-50/50 p-3 font-mono text-[12px] text-ink-900"
          />
          <p className="text-xs text-ink-500">
            Paste this one-liner into <code className="font-mono">~/.ssh/authorized_keys</code> on a server, or into the SSH-keys page of GitHub / GitLab / your cloud provider.
          </p>
        </div>
      )}

      {priv && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-ink-700">Private key (OpenSSH)</label>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => copy("priv")}>
                {copied === "priv" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "priv" ? "Copied" : "Copy"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => download("priv")}>
                <Download className="h-3.5 w-3.5" /> Download
              </Button>
            </div>
          </div>
          <textarea
            value={priv}
            readOnly
            spellCheck={false}
            className="h-56 w-full resize-y rounded-lg border border-ink-200 bg-ink-50/50 p-3 font-mono text-[12px] text-ink-900"
          />
          <p className="text-xs text-rose-700">
            Save this file as <code className="font-mono">~/.ssh/id_{algo === "ed25519" ? "ed25519" : "rsa"}</code> and <code className="font-mono">chmod 600</code> it. Never share it. To add a passphrase later, run <code className="font-mono">ssh-keygen -p -f &lt;file&gt;</code>.
          </p>
        </div>
      )}

      <p className="text-xs text-ink-400">
        100% in your browser — the private key never leaves this page. Generated with WebCrypto (RSA) and the audited @noble/curves library (Ed25519).
      </p>
    </div>
  );
}
