"use client";

import { useMemo, useState } from "react";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// All factors are "to the base unit"; conversion is value * fromFactor / toFactor.
type LinearGroup = { id: string; label: string; base: string; units: { id: string; label: string; factor: number }[] };

const GROUPS: LinearGroup[] = [
  { id: "length", label: "Length", base: "m", units: [
    { id: "mm", label: "Millimetres", factor: 0.001 },
    { id: "cm", label: "Centimetres", factor: 0.01 },
    { id: "m", label: "Metres", factor: 1 },
    { id: "km", label: "Kilometres", factor: 1000 },
    { id: "in", label: "Inches", factor: 0.0254 },
    { id: "ft", label: "Feet", factor: 0.3048 },
    { id: "yd", label: "Yards", factor: 0.9144 },
    { id: "mi", label: "Miles", factor: 1609.344 },
  ] },
  { id: "weight", label: "Weight", base: "g", units: [
    { id: "mg", label: "Milligrams", factor: 0.001 },
    { id: "g", label: "Grams", factor: 1 },
    { id: "kg", label: "Kilograms", factor: 1000 },
    { id: "t", label: "Tonnes", factor: 1_000_000 },
    { id: "oz", label: "Ounces", factor: 28.3495 },
    { id: "lb", label: "Pounds", factor: 453.592 },
  ] },
  { id: "area", label: "Area", base: "m²", units: [
    { id: "cm2", label: "cm²", factor: 0.0001 },
    { id: "m2", label: "m²", factor: 1 },
    { id: "km2", label: "km²", factor: 1_000_000 },
    { id: "ha", label: "Hectares", factor: 10_000 },
    { id: "ft2", label: "ft²", factor: 0.092903 },
    { id: "ac", label: "Acres", factor: 4046.86 },
  ] },
  { id: "speed", label: "Speed", base: "m/s", units: [
    { id: "ms", label: "m/s", factor: 1 },
    { id: "kmh", label: "km/h", factor: 1 / 3.6 },
    { id: "mph", label: "mph", factor: 0.44704 },
    { id: "kn", label: "Knots", factor: 0.514444 },
    { id: "fts", label: "ft/s", factor: 0.3048 },
  ] },
];

function convertLinear(value: number, fromFactor: number, toFactor: number) {
  return (value * fromFactor) / toFactor;
}

// Temperature isn't a linear scale, handled separately.
function convertTemp(v: number, from: string, to: string): number {
  let c: number;
  if (from === "C") c = v; else if (from === "F") c = (v - 32) * 5 / 9; else c = v - 273.15;
  if (to === "C") return c; if (to === "F") return c * 9 / 5 + 32; return c + 273.15;
}

function round(n: number) {
  if (!isFinite(n)) return "—";
  const abs = Math.abs(n);
  const digits = abs === 0 ? 0 : abs < 0.01 ? 6 : abs < 1 ? 4 : abs < 100 ? 3 : 2;
  return n.toFixed(digits).replace(/\.?0+$/, "");
}

export function UnitConverterClient() {
  const [groupId, setGroupId] = useState("length");
  const [tempFrom, setTempFrom] = useState("C");
  const [tempTo, setTempTo] = useState("F");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [value, setValue] = useState<string>("1");
  const [copied, setCopied] = useState(false);

  const group = GROUPS.find((g) => g.id === groupId);

  const output = useMemo(() => {
    const v = parseFloat(value);
    if (!isFinite(v)) return "";
    if (groupId === "temperature") return round(convertTemp(v, tempFrom, tempTo));
    if (!group) return "";
    const f = group.units.find((u) => u.id === fromUnit)?.factor ?? 1;
    const t = group.units.find((u) => u.id === toUnit)?.factor ?? 1;
    return round(convertLinear(v, f, t));
  }, [value, group, groupId, fromUnit, toUnit, tempFrom, tempTo]);

  function swap() {
    if (groupId === "temperature") { setTempFrom(tempTo); setTempTo(tempFrom); }
    else { setFromUnit(toUnit); setToUnit(fromUnit); }
  }

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  const selectCls = "rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[...GROUPS.map((g) => ({ id: g.id, label: g.label })), { id: "temperature", label: "Temperature" }].map((g) => (
          <button key={g.id} onClick={() => { setGroupId(g.id); if (g.id !== "temperature" && group) { setFromUnit(group.units[0].id); setToUnit(group.units[1]?.id ?? group.units[0].id); } }}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${groupId === g.id ? "border-brand-300 bg-brand-50 text-brand-700" : "border-ink-200 bg-white text-ink-600 hover:border-ink-300"}`}>
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid items-end gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-ink-500">From</label>
          <div className="flex gap-2">
            <input value={value} onChange={(e) => setValue(e.target.value)} type="number" inputMode="decimal" className={`flex-1 ${selectCls}`} />
            {groupId === "temperature" ? (
              <select value={tempFrom} onChange={(e) => setTempFrom(e.target.value)} className={selectCls}>
                <option value="C">°C</option><option value="F">°F</option><option value="K">K</option>
              </select>
            ) : (
              <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className={selectCls}>
                {group?.units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
              </select>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center pb-1">
          <Button size="sm" variant="outline" onClick={swap}><ArrowRightLeft className="h-3.5 w-3.5" /></Button>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-ink-500">To</label>
          <div className="flex gap-2">
            <input readOnly value={output} className={`flex-1 bg-ink-50/50 ${selectCls}`} />
            {groupId === "temperature" ? (
              <select value={tempTo} onChange={(e) => setTempTo(e.target.value)} className={selectCls}>
                <option value="C">°C</option><option value="F">°F</option><option value="K">K</option>
              </select>
            ) : (
              <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className={selectCls}>
                {group?.units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
              </select>
            )}
            <Button size="sm" variant="outline" onClick={copy} disabled={!output}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>
      </div>
      <p className="text-xs text-ink-400">Instant, in-browser conversion. Free and unlimited.</p>
    </div>
  );
}
