"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Download } from "lucide-react";
import { UploadZone } from "@/components/tools/UploadZone";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { getChrome, t as tt } from "@/lib/i18n/chrome";
import { getToolUi } from "@/lib/i18n/tool-ui";
import { callTool } from "@/lib/tool-api";
import { LANGUAGES, type LanguageCode } from "@/lib/languages";

type JobStatus = "queued" | "running" | "done" | "error";
type Job = { code: LanguageCode; status: JobStatus; url?: string; filename?: string; error?: string };

const PARALLEL = 4;

export function BatchTranslateClient() {
  const [file, setFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<Set<LanguageCode>>(new Set(["EN", "ES", "FR"]));
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const chrome = getChrome(locale);
  const ui = getToolUi(locale).batch;
  const translateUi = getToolUi(locale).translate;

  function toggle(code: LanguageCode) {
    const next = new Set(selected);
    if (next.has(code)) next.delete(code);
    else next.add(code);
    setSelected(next);
  }

  async function translateOne(f: File, target: LanguageCode): Promise<Job> {
    try {
      const fd = new FormData();
      fd.append("file", f);
      fd.append("target_lang", target);
      const res = await callTool("translate-subtitles", fd);
      if (!res.ok) {
        return { code: target, status: "error", error: tt(chrome.errors.serverReturned, { status: res.status }) };
      }
      const data = (await res.json()) as { url?: string; filename?: string };
      if (!data.url) return { code: target, status: "error", error: chrome.errors.noResultUrl };
      return { code: target, status: "done", url: data.url, filename: data.filename };
    } catch (err) {
      return { code: target, status: "error", error: err instanceof Error ? err.message : chrome.errors.network };
    }
  }

  async function start() {
    if (!file) return;
    if (selected.size === 0) {
      setError(ui.atLeast2);
      return;
    }
    setError(null);
    setRunning(true);
    const codes = Array.from(selected);
    const initial: Job[] = codes.map((c) => ({ code: c, status: "queued" }));
    setJobs(initial);

    // Run PARALLEL at a time so we don't hammer the edge function.
    const cursor = { i: 0 };
    async function worker() {
      while (cursor.i < codes.length) {
        const idx = cursor.i++;
        const code = codes[idx];
        setJobs((prev) =>
          prev?.map((j) => (j.code === code ? { ...j, status: "running" } : j)) ?? null,
        );
        const result = await translateOne(file!, code);
        setJobs((prev) => prev?.map((j) => (j.code === code ? result : j)) ?? null);
      }
    }
    await Promise.all(Array.from({ length: Math.min(PARALLEL, codes.length) }, worker));
    setRunning(false);
  }

  function reset() {
    setFile(null);
    setJobs(null);
    setError(null);
  }

  if (file && jobs) {
    const allDone = jobs.every((j) => j.status === "done" || j.status === "error");
    return (
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-ink-900">{allDone ? ui.allDone : ui.translating}</h3>
            <p className="mt-1 text-sm text-ink-500">{file.name}</p>
          </div>
          {allDone && (
            <Button variant="outline" onClick={reset}>
              {chrome.result.tryAnother}
            </Button>
          )}
        </div>

        <ul className="mt-6 divide-y divide-ink-100">
          {jobs.map((j) => {
            const lang = LANGUAGES.find((l) => l.code === j.code);
            return (
              <li key={j.code} className="flex items-center gap-3 py-3 text-sm">
                <div className="w-10 text-xs font-mono uppercase text-ink-400">{j.code}</div>
                <div className="flex-1">
                  <div className="text-ink-900">{lang?.native ?? j.code}</div>
                  {j.error && <div className="text-xs text-red-600">{j.error}</div>}
                </div>
                {j.status === "queued" && <span className="text-xs text-ink-400">…</span>}
                {j.status === "running" && <Loader2 className="h-4 w-4 animate-spin text-brand-500" />}
                {j.status === "done" && j.url && j.filename && (
                  <a
                    href={j.url}
                    download={j.filename}
                    className="inline-flex items-center gap-1 rounded border border-ink-200 px-3 py-1 text-xs font-medium text-ink-900 hover:bg-ink-50"
                  >
                    <Download className="h-3 w-3" />
                    .srt
                  </a>
                )}
                {j.status === "error" && <span className="text-xs text-red-600">error</span>}
                {j.status === "done" && !j.url && <CheckCircle2 className="h-4 w-4 text-green-600" />}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (file) {
    return (
      <div className="rounded-lg border border-ink-100 bg-white p-8 shadow-card">
        <div className="text-sm text-ink-500">{file.name}</div>
        <h3 className="mt-4 font-semibold text-ink-900">{ui.selectTargets}</h3>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {LANGUAGES.map((l) => (
            <label
              key={l.code}
              className="flex cursor-pointer items-center gap-2 rounded border border-ink-100 bg-white px-3 py-2 text-sm hover:bg-ink-50"
            >
              <input
                type="checkbox"
                checked={selected.has(l.code)}
                onChange={() => toggle(l.code)}
                className="h-4 w-4 rounded border-ink-200 text-brand-500 focus:ring-brand-500"
              />
              <span className="text-ink-900">{l.native}</span>
              <span className="text-xs text-ink-400">{l.code}</span>
            </label>
          ))}
        </div>

        {error && (
          <p className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        <div className="mt-6 flex gap-2">
          <Button onClick={start} disabled={running}>
            {running ? ui.translating : translateUi.translateNow}
          </Button>
          <Button variant="outline" onClick={reset}>
            {chrome.sync.cancel}
          </Button>
        </div>
      </div>
    );
  }

  return <UploadZone accept={["srt", "vtt"]} maxMb={50} onFile={setFile} />;
}
