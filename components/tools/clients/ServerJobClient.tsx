"use client";

import { useState } from "react";
import { UploadZone } from "@/components/tools/UploadZone";
import { ProcessingScreen } from "@/components/tools/ProcessingScreen";
import { ResultScreen } from "@/components/tools/ResultScreen";

export type ServerJobSpec = {
  slug: string;
  name: string;
  accept: string[];
  freeMaxMb: number;
  outputType: string;
};

type Phase = "idle" | "uploading" | "processing" | "done" | "error";

export function ServerJobClient({
  tool,
  crossLinks = [],
}: {
  tool: ServerJobSpec;
  crossLinks?: { href: string; label: string }[];
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("Uploading…");
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string | null>(null);

  async function start(f: File) {
    setFile(f);
    setPhase("uploading");
    setStatus("Uploading your file…");
    setError(null);

    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch(`/api/process/${tool.slug}`, { method: "POST", body: fd });

      if (res.status === 503) {
        setPhase("error");
        setError(
          "This tool isn't wired up to a backend yet. Configure Supabase + the relevant Edge Function to enable it.",
        );
        return;
      }
      if (!res.ok) {
        setPhase("error");
        setError(`Server returned ${res.status}. Try again in a moment.`);
        return;
      }

      setStatus("Processing your file…");
      setPhase("processing");
      const data = (await res.json()) as { url?: string; filename?: string };
      if (!data.url) {
        setPhase("error");
        setError("The server didn't return a result URL.");
        return;
      }
      setResultUrl(data.url);
      setResultName(data.filename ?? `${tool.slug}.${tool.outputType.toLowerCase()}`);
      setPhase("done");
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : "Network error.");
    }
  }

  function reset() {
    setPhase("idle");
    setFile(null);
    setError(null);
    setResultUrl(null);
    setResultName(null);
  }

  if (phase === "done" && resultUrl && resultName) {
    return (
      <ResultScreen
        filename={resultName}
        onDownload={() => {
          const a = document.createElement("a");
          a.href = resultUrl;
          a.download = resultName;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }}
        onReset={reset}
        crossLinks={crossLinks}
      />
    );
  }

  if ((phase === "uploading" || phase === "processing") && file) {
    return <ProcessingScreen filename={file.name} fileSize={file.size} status={status} />;
  }

  return (
    <div className="space-y-4">
      <UploadZone
        accept={tool.accept}
        maxMb={tool.freeMaxMb}
        onFile={start}
        cta={`Start ${tool.name.toLowerCase()}`}
      />
      {phase === "error" && error && (
        <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  );
}
