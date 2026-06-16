"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, X, Download, Loader2, Plus, ArrowDown, GripVertical, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import { defaultStep, runStep, STEP_LABELS, type Step, type StepKind } from "@/lib/workflow-engine";
import { TemplatesBar } from "@/components/tools/TemplatesBar";

const MAX_STEPS = 5;
const ADDABLE: StepKind[] = ["resize", "format", "rotate", "grayscale", "watermark", "to-pdf"];

const TEMPLATES: { name: string; steps: StepKind[] }[] = [
  { name: "Web-optimised photo", steps: ["resize", "format"] },
  { name: "Watermarked WebP", steps: ["watermark", "format"] },
  { name: "Image → branded PDF", steps: ["resize", "watermark", "to-pdf"] },
];

export function WorkflowBuilderClient() {
  const [file, setFile] = useState<File | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>([defaultStep("resize", 1280, 720), defaultStep("format")]);
  const [running, setRunning] = useState<number>(-1);
  const [doneIdx, setDoneIdx] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("result.bin");
  const [resultSize, setResultSize] = useState(0);
  const cleanup = useRef<string[]>([]);

  useEffect(() => () => { cleanup.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  // Assistant hand-off: when the AI assistant proposes an image pipeline it
  // stashes the ordered step kinds here and routes the user to this page. We
  // validate each against the known kinds (a stale/garbage value is ignored)
  // and pre-fill the pipeline, then clear it so a refresh starts clean.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("konver_wf_steps");
      if (!raw) return;
      sessionStorage.removeItem("konver_wf_steps");
      const kinds = (JSON.parse(raw) as unknown[])
        .filter((k): k is StepKind => typeof k === "string" && (ADDABLE as string[]).includes(k))
        .slice(0, MAX_STEPS);
      if (kinds.length) setSteps(kinds.map((k) => defaultStep(k)));
    } catch { /* ignore a malformed hand-off */ }
  }, []);

  function pick(f: File | null) {
    if (!f) return;
    setError(null); setResultUrl(null); setDoneIdx([]);
    if (srcUrl) URL.revokeObjectURL(srcUrl);
    const u = URL.createObjectURL(f);
    cleanup.current.push(u);
    setFile(f); setSrcUrl(u);
  }

  function add(kind: StepKind) {
    if (steps.length >= MAX_STEPS) return;
    setSteps((s) => [...s, defaultStep(kind, file ? 1280 : 1280)]);
  }
  function remove(id: string) { setSteps((s) => s.filter((x) => x.id !== id)); }
  function move(id: string, dir: -1 | 1) {
    setSteps((s) => {
      const i = s.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= s.length) return s;
      const next = s.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }
  function update(id: string, patch: Partial<Step>) {
    setSteps((s) => s.map((x) => x.id === id ? { ...x, ...patch } as Step : x));
  }
  function loadTemplate(t: { name: string; steps: StepKind[] }) {
    setSteps(t.steps.map((k) => defaultStep(k)));
  }

  async function run() {
    if (!file || steps.length === 0 || running !== -1) return;
    setError(null); setResultUrl(null); setDoneIdx([]);
    let cur: Blob = file;
    try {
      for (let i = 0; i < steps.length; i++) {
        setRunning(i);
        cur = await runStep(cur, steps[i]);
        setDoneIdx((d) => [...d, i]);
      }
      const ext = cur.type === "application/pdf" ? "pdf"
        : cur.type === "image/webp" ? "webp"
        : cur.type === "image/jpeg" ? "jpg"
        : cur.type === "image/png" ? "png" : "bin";
      const url = URL.createObjectURL(cur);
      cleanup.current.push(url);
      setResultUrl(url); setResultSize(cur.size);
      setResultName(`${file.name.replace(/\.[^.]+$/, "")}-konver.${ext}`);
    } catch (e) { setError(`Step ${running + 1} failed: ${(e as Error).message}`); }
    finally { setRunning(-1); }
  }

  return (
    <div className="space-y-5">
      {!file ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/40 px-6 py-14 text-center transition-colors hover:brightness-95">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Upload className="h-6 w-6" /></span>
          <span className="mt-3 font-semibold text-ink-900">Upload an image to start</span>
          <span className="mt-0.5 text-xs text-ink-400">JPG · PNG · WebP — chain up to {MAX_STEPS} steps below</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => pick(e.target.files?.[0] ?? null)} />
        </label>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-4 py-2.5">
          <div className="min-w-0 truncate text-sm"><span className="font-medium text-ink-900">{file.name}</span><span className="ml-2 text-ink-400">{formatBytes(file.size)}</span></div>
          <button onClick={() => { setFile(null); setSrcUrl(null); setResultUrl(null); }} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-ink-700"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      <TemplatesBar
        tool="workflow"
        settings={{ steps }}
        onApply={(s) => { if (Array.isArray(s.steps)) setSteps(s.steps as Step[]); }}
      />

      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-medium text-ink-700">Pipeline ({steps.length}/{MAX_STEPS} steps)</span>
          <div className="flex flex-wrap gap-1">
            {TEMPLATES.map((t) => (
              <button key={t.name} onClick={() => loadTemplate(t)} className="rounded-full border border-ink-200 bg-white px-2.5 py-1 text-xs text-ink-600 hover:border-ink-300">
                {t.name}
              </button>
            ))}
          </div>
        </div>
        <ul className="space-y-2">
          {steps.map((s, i) => (
            <li key={s.id} className={cn("rounded-lg border bg-white p-3", running === i ? "border-brand-300 ring-2 ring-brand-100" : doneIdx.includes(i) ? "border-emerald-200" : "border-ink-100")}>
              <div className="flex items-center gap-2">
                <GripVertical className="h-3.5 w-3.5 text-ink-300" />
                <span className="grid h-6 w-6 place-items-center rounded bg-indigo-50 text-xs font-bold text-indigo-700">{i + 1}</span>
                <span className="font-medium text-ink-900">{STEP_LABELS[s.kind]}</span>
                {doneIdx.includes(i) && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                {running === i && <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-500" />}
                <div className="ml-auto flex gap-1">
                  <button onClick={() => move(s.id, -1)} disabled={i === 0} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 disabled:opacity-30">↑</button>
                  <button onClick={() => move(s.id, 1)} disabled={i === steps.length - 1} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 disabled:opacity-30">↓</button>
                  <button onClick={() => remove(s.id)} className="rounded p-1 text-xs text-ink-400 hover:bg-ink-50 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <StepEditor step={s} onChange={(patch) => update(s.id, patch)} />
              {i < steps.length - 1 && <div className="mt-1 flex justify-center text-ink-300"><ArrowDown className="h-3.5 w-3.5" /></div>}
            </li>
          ))}
        </ul>
        {steps.length < MAX_STEPS && (
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="self-center text-xs text-ink-400 mr-1"><Plus className="inline h-3 w-3" /> add step:</span>
            {ADDABLE.map((k) => (
              <button key={k} onClick={() => add(k)} className="rounded-full border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300 hover:text-brand-600">{STEP_LABELS[k]}</button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={run} disabled={!file || steps.length === 0 || running !== -1} size="lg">
          {running !== -1 ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {running !== -1 ? `Running step ${running + 1}/${steps.length}…` : `Run pipeline (${steps.length})`}
        </Button>
        {resultUrl && (
          <a href={resultUrl} download={resultName}>
            <Button size="lg" variant="outline"><Download className="h-4 w-4" /> Download · {formatBytes(resultSize)}</Button>
          </a>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-xs text-ink-400">Processed 100% in your browser — your image is never uploaded. Each step feeds the next; reorder or remove freely.</p>
    </div>
  );
}

function StepEditor({ step, onChange }: { step: Step; onChange: (patch: Partial<Step>) => void }) {
  const numCls = "w-24 rounded-md border border-ink-200 bg-white px-2 py-1 text-sm";
  if (step.kind === "resize") return (
    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
      <label>Width <input type="number" min={1} max={8192} value={step.width} onChange={(e) => onChange({ width: Number(e.target.value) })} className={numCls} /></label>
      <label>Height <input type="number" min={1} max={8192} value={step.height} onChange={(e) => onChange({ height: Number(e.target.value) })} className={numCls} /></label>
      <label className="flex items-center gap-1.5"><input type="checkbox" checked={step.lockRatio} onChange={(e) => onChange({ lockRatio: e.target.checked })} /> Fit ratio</label>
    </div>
  );
  if (step.kind === "format") return (
    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
      <label>Format <select value={step.format} onChange={(e) => onChange({ format: e.target.value as Extract<Step, { kind: "format" }>["format"] })} className="rounded-md border border-ink-200 bg-white px-2 py-1">
        <option value="image/webp">WebP</option>
        <option value="image/jpeg">JPG</option>
        <option value="image/png">PNG</option>
      </select></label>
      {step.format !== "image/png" && (
        <label className="flex items-center gap-2">Quality {step.quality}
          <input type="range" min={20} max={100} value={step.quality} onChange={(e) => onChange({ quality: Number(e.target.value) })} className="w-32 accent-brand-500" />
        </label>
      )}
    </div>
  );
  if (step.kind === "rotate") return (
    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
      <label>Angle <select value={step.angle} onChange={(e) => onChange({ angle: Number(e.target.value) as 90 | 180 | 270 })} className="rounded-md border border-ink-200 bg-white px-2 py-1">
        <option value={90}>90°</option><option value={180}>180°</option><option value={270}>270°</option>
      </select></label>
    </div>
  );
  if (step.kind === "watermark") return (
    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
      <label>Text <input value={step.text} onChange={(e) => onChange({ text: e.target.value })} className="w-40 rounded-md border border-ink-200 bg-white px-2 py-1" /></label>
      <label>Position <select value={step.position} onChange={(e) => onChange({ position: e.target.value as Extract<Step, { kind: "watermark" }>["position"] })} className="rounded-md border border-ink-200 bg-white px-2 py-1">
        <option value="br">Bottom right</option><option value="bl">Bottom left</option><option value="tr">Top right</option><option value="tl">Top left</option><option value="c">Centre</option>
      </select></label>
      <label>Size <input type="number" min={12} max={300} value={step.size} onChange={(e) => onChange({ size: Number(e.target.value) })} className={numCls} /></label>
      <label>Colour <input type="color" value={step.color} onChange={(e) => onChange({ color: e.target.value })} className="h-7 w-10 cursor-pointer rounded border border-ink-200" /></label>
      <label className="flex items-center gap-2">Opacity {step.opacity}
        <input type="range" min={10} max={100} value={step.opacity} onChange={(e) => onChange({ opacity: Number(e.target.value) })} className="w-32 accent-brand-500" />
      </label>
    </div>
  );
  if (step.kind === "to-pdf") return (
    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
      <label>Page <select value={step.pageSize} onChange={(e) => onChange({ pageSize: e.target.value as Extract<Step, { kind: "to-pdf" }>["pageSize"] })} className="rounded-md border border-ink-200 bg-white px-2 py-1">
        <option value="A4">A4</option><option value="Letter">Letter</option><option value="Fit">Fit image</option>
      </select></label>
      {step.pageSize !== "Fit" && <label>Margin <input type="number" min={0} max={120} value={step.margin} onChange={(e) => onChange({ margin: Number(e.target.value) })} className={numCls} /> pt</label>}
    </div>
  );
  return null;
}
