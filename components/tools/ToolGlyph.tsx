import { FORMATS, iconSpecFor, type FormatDef, type OpKey } from "@/lib/tool-icons";
import type { ToolCategory } from "@/lib/tools-config";

/**
 * A tool's "logo" — an iLovePDF-style file/document icon rendered as inline
 * SVG. Each format is a sheet of paper: rounded page with a folded top-right
 * corner, a subtle paper gradient, a drop shadow, and a coloured footer band
 * carrying the format label (PDF, W, JPG…). Conversion tools show a source
 * sheet + target sheet with a direction arrow; other tools show one sheet plus
 * a small action-glyph bubble. Specs live in lib/tool-icons.ts, keyed by slug.
 */

const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

// Shared, format-independent defs (paper gradient + soft shadow). Rendered
// inside every glyph SVG with fixed ids: the definitions are identical across
// instances, so duplicate ids on a page resolve to the same visual — no clash.
function SheetDefs() {
  return (
    <defs>
      <linearGradient id="tgPaper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#eef2f7" />
      </linearGradient>
      <filter id="tgShadow" x="-40%" y="-25%" width="180%" height="160%">
        <feDropShadow dx="0" dy="1.4" stdDeviation="1.3" floodColor="#0f172a" floodOpacity="0.18" />
      </filter>
    </defs>
  );
}

/** Footer-band label font size, by label length, relative to sheet size. */
function labelSize(label: string, s: number): number {
  const n = label.length;
  return s * (n <= 1 ? 0.3 : n === 2 ? 0.25 : n === 3 ? 0.2 : 0.15);
}

/** A single sheet-of-paper badge: page + folded corner + coloured label band. */
function Sheet({ x, y, s, f }: { x: number; y: number; s: number; f: FormatDef }) {
  const fold = s * 0.3;
  const page = [
    `M${x + 2} ${y}`,
    `h${s - fold - 2}`,
    `l${fold} ${fold}`,
    `v${s - fold - 2}`,
    `a2 2 0 0 1 -2 2`,
    `H${x + 2}`,
    `a2 2 0 0 1 -2 -2`,
    `V${y + 2}`,
    `a2 2 0 0 1 2 -2`,
    "z",
  ].join(" ");
  const foldTri = `M${x + s - fold} ${y} L${x + s} ${y + fold} L${x + s - fold} ${y + fold} Z`;
  const bandH = s * 0.34;
  const bandY = y + s - bandH - s * 0.07;
  const bandX = x + s * 0.05;
  const bandW = s - s * 0.1;
  return (
    <g filter="url(#tgShadow)">
      <path d={page} fill="url(#tgPaper)" stroke="#e2e8f0" strokeWidth={0.8} />
      <path d={foldTri} fill={f.bg} fillOpacity={0.32} />
      <rect x={bandX} y={bandY} width={bandW} height={bandH} rx={bandH * 0.28} fill={f.bg} />
      <text
        x={x + s / 2} y={bandY + bandH / 2} dy="0.34em" textAnchor="middle"
        fontSize={labelSize(f.label, s)} fontWeight={800} fill="#fff"
        fontFamily={FONT} letterSpacing={f.label.length <= 2 ? 0.3 : 0}
      >
        {f.label}
      </text>
    </g>
  );
}

/** Action glyphs, drawn in a 24×24 box: stroked paths + circles, filled paths, or a text char. */
type GlyphDef = { d?: string[]; c?: [number, number, number][]; f?: string[]; t?: string };

const GLYPHS: Record<OpKey, GlyphDef> = {
  merge: { d: ["M2.5 12h7.5", "M6.5 8.5L10 12l-3.5 3.5", "M21.5 12H14", "M17.5 8.5L14 12l3.5 3.5"] },
  split: { d: ["M10 12H2.5", "M6 8.5L2.5 12 6 15.5", "M14 12h7.5", "M18 8.5L21.5 12 18 15.5"] },
  compress: { d: ["M12 3v6", "M9 6l3 3 3-3", "M12 21v-6", "M9 18l3-3 3 3"] },
  rotate: { d: ["M21 12a9 9 0 1 1-9-9c2.5 0 4.9 1 6.7 2.7L21 8", "M21 3v5h-5"] },
  flip: { d: ["M4 7h13", "M14 4l3 3-3 3", "M20 17H7", "M10 14l-3 3 3 3"] },
  pencil: { d: ["M4 20l1.2-4.5L16.5 4.2a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L8.5 18.8 4 20z"] },
  pen: { d: ["M12 19.5h8", "M16.8 3.2a2 2 0 0 1 2.8 2.8L8 17.6 4 19l1.4-4L16.8 3.2z"] },
  lock: { d: ["M8 11V7a4 4 0 0 1 8 0v4", "M5 11h14v9H5z"] },
  key: { c: [[8, 8, 3.5]], d: ["M10.5 10.5L20 20", "M17 17l3-3"] },
  shield: { d: ["M12 2.5l7.5 2.8v5.4c0 4.8-3.2 8.1-7.5 10.3-4.3-2.2-7.5-5.5-7.5-10.3V5.3L12 2.5z", "M8.8 11.8l2.2 2.2 4.2-4.2"] },
  shieldX: { d: ["M12 2.5l7.5 2.8v5.4c0 4.8-3.2 8.1-7.5 10.3-4.3-2.2-7.5-5.5-7.5-10.3V5.3L12 2.5z", "M9.5 9.5l5 5", "M14.5 9.5l-5 5"] },
  drop: { d: ["M12 3.5c3.5 4.3 5.8 7 5.8 9.7a5.8 5.8 0 1 1-11.6 0c0-2.7 2.3-5.4 5.8-9.7z"] },
  eraser: { d: ["M7 21l-4.3-4.3a2.4 2.4 0 0 1 0-3.4l9.6-9.6a2.4 2.4 0 0 1 3.4 0l5.6 5.6a2.4 2.4 0 0 1 0 3.4L13 21H7z", "M5 11l9 9"] },
  globe: { c: [[12, 12, 9]], d: ["M3 12h18", "M12 3c2.8 2.8 2.8 15.2 0 18-2.8-2.8-2.8-15.2 0-18z"] },
  clock: { c: [[12, 12, 9]], d: ["M12 7v5l3.5 2"] },
  sparkle: { d: ["M12 2.5l2.3 6.2 6.2 2.3-6.2 2.3L12 19.5l-2.3-6.2-6.2-2.3 6.2-2.3L12 2.5z"] },
  bolt: { d: ["M13 2.5L4.5 14H11l-1 7.5L18.5 10H12l1-7.5z"] },
  wand: { d: ["M4 20L14.5 9.5", "M15 4.5V2", "M15 12V9.5", "M11.2 7.2H8.7", "M21.3 7.2h-2.5", "M18.9 3.3l-1.8 1.8", "M18.9 11.1l-1.8-1.8"] },
  scissors: { c: [[6, 6, 2.7], [6, 18, 2.7]], d: ["M8.2 7.8L20 19.5", "M8.2 16.2L20 4.5"] },
  crop: { d: ["M7 2v15h15", "M2 7h15v15"] },
  ruler: { d: ["M3 16.5L16.5 3l4.5 4.5L7.5 21 3 16.5z", "M8.5 11.5l2 2", "M12 8l2 2", "M15.5 4.5l2 2"] },
  search: { c: [[10.5, 10.5, 6.5]], d: ["M15.5 15.5L21 21"] },
  eyeOff: { c: [[12, 12, 3]], d: ["M2.5 12S6.5 5 12 5s9.5 7 9.5 7-4 7-9.5 7S2.5 12 2.5 12z", "M4 4l16 16"] },
  check: { d: ["M4.5 12.5l4.5 4.5L19.5 6.5"] },
  plus: { d: ["M12 5v14", "M5 12h14"] },
  hash: { d: ["M9.5 4l-2 16", "M16.5 4l-2 16", "M4.5 9h16", "M3.5 15h16"] },
  tag: { c: [[7.5, 7.5, 1.6]], d: ["M3 3h8.5L21 12.5 12.5 21 3 11.5V3z"] },
  doc: { d: ["M7 2.5h6.5L18 7v14.5H7V2.5z", "M13.5 2.5V7H18", "M10 12.5h4.5", "M10 16.5h4.5"] },
  book: { d: ["M4.5 19.5a2.5 2.5 0 0 1 2.5-2.5h12.5V2.5H7A2.5 2.5 0 0 0 4.5 5v14.5z", "M4.5 19.5A2.5 2.5 0 0 0 7 22h12.5v-5"] },
  mail: { d: ["M3 5.5h18v13H3z", "M3 7.5l9 6 9-6"] },
  card: { c: [[8, 10.8, 2]], d: ["M2.5 5.5h19v13h-19z", "M5 16.2c.7-1.6 5.3-1.6 6 0", "M14.5 9.5h4.5", "M14.5 13h4.5"] },
  receipt: { d: ["M5.5 2.5h13v19l-2.2-1.6L14 21.5l-2-1.6-2 1.6-2.3-1.6L5.5 21.5v-19z", "M9 8h6", "M9 12h6"] },
  mic: { d: ["M12 2.5a2.8 2.8 0 0 1 2.8 2.8v5.4a2.8 2.8 0 1 1-5.6 0V5.3A2.8 2.8 0 0 1 12 2.5z", "M6.5 11a5.5 5.5 0 0 0 11 0", "M12 16.5v4"] },
  music: { c: [[6.5, 17.5, 2.6], [17, 15, 2.6]], d: ["M9 17.5V5.5l10.5-2V15"] },
  volume: { d: ["M4 9.5v5h3.5L13 19V5L7.5 9.5H4z", "M16.5 9a4.5 4.5 0 0 1 0 6"] },
  gauge: { d: ["M20.2 15.5a8.5 8.5 0 1 0-16.4 0", "M12 13.5L16 8"] },
  image: { c: [[8.7, 9, 1.7]], d: ["M3 4.5h18v15H3z", "M4.5 17l5-5 3.5 3.5L17 11.5l3.5 3.5"] },
  camera: { c: [[12, 13, 3.6]], d: ["M3 7.5h4L8.8 4.5h6.4L17 7.5h4v12H3v-12z"] },
  palette: { c: [[7.5, 10, 1.3], [11, 6.8, 1.3], [15.5, 8, 1.3]], d: ["M12 2.5a9.5 9.5 0 1 0 0 19c1.4 0 2-.9 2-1.9 0-1.2-1.2-1.8-.4-3 .9-1.4 6.9.8 7.9-4.1A9.5 9.5 0 0 0 12 2.5z"] },
  contrast: { c: [[12, 12, 9]], f: ["M12 3a9 9 0 0 1 0 18V3z"] },
  grid: { d: ["M3.5 3.5h7.3v7.3H3.5z", "M13.2 3.5h7.3v7.3h-7.3z", "M3.5 13.2h7.3v7.3H3.5z", "M13.2 13.2h7.3v7.3h-7.3z"] },
  diff: { d: ["M12 3v18", "M4 8h5", "M6.5 5.5v5", "M15 16h5"] },
  scan: { d: ["M3 7.5V5a2 2 0 0 1 2-2h2.5", "M16.5 3H19a2 2 0 0 1 2 2v2.5", "M21 16.5V19a2 2 0 0 1-2 2h-2.5", "M7.5 21H5a2 2 0 0 1-2-2v-2.5", "M6.5 12h11"] },
  link: { d: ["M9.5 14.5l5-5", "M13.5 17l-2 2a4 4 0 0 1-5.7-5.7l2-2", "M10.5 7l2-2a4 4 0 0 1 5.7 5.7l-2 2"] },
  phone: { d: ["M8 2.5h8v19H8z", "M11 18.5h2"] },
  sliders: { d: ["M4 7h16", "M14 4.8v4.4", "M4 12h16", "M8 9.8v4.4", "M4 17h16", "M16 14.8v4.4"] },
  smile: { c: [[12, 12, 9]], d: ["M8.7 14a4.3 4.3 0 0 0 6.6 0", "M9.3 9.7h.01", "M14.7 9.7h.01"] },
  qr: { d: ["M3.5 3.5h6v6h-6z", "M14.5 3.5h6v6h-6z", "M3.5 14.5h6v6h-6z", "M14.5 14.5h2.5v2.5h-2.5z", "M18.5 18.5h2v2h-2z"] },
  barcode: { d: ["M4 5v14", "M7 5v14", "M10.5 5v14", "M13.5 5v14", "M17 5v14", "M20 5v14"] },
  eq: { t: "=" },
  quote: { t: "”" },
};

function OpGlyph({ op, color }: { op: OpKey; color: string }) {
  const g = GLYPHS[op];
  if (g.t) {
    return (
      <text x={12} y={12} dy="0.4em" textAnchor="middle" fontSize={20} fontWeight={800} fill={color} fontFamily={FONT}>
        {g.t}
      </text>
    );
  }
  return (
    <g stroke={color} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {g.d?.map((d) => <path key={d} d={d} />)}
      {g.c?.map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />)}
      {g.f?.map((d) => <path key={d} d={d} fill={color} stroke="none" />)}
    </g>
  );
}

export function ToolGlyph({
  slug,
  category,
  px = 52,
}: {
  slug?: string;
  category?: ToolCategory;
  /** Accepted for legacy call-site compatibility; no longer used. */
  iconName?: string;
  px?: number;
}) {
  const spec = iconSpecFor(slug, category);

  if (spec.kind === "convert") {
    const from = FORMATS[spec.from];
    const to = FORMATS[spec.to];
    return (
      <svg viewBox="0 0 48 48" width={px} height={px} aria-hidden className="inline-block select-none">
        <SheetDefs />
        {/* source sheet behind, target sheet in front, offset down-right */}
        <Sheet x={0.5} y={1.5} s={27} f={from} />
        <Sheet x={18} y={17.5} s={28.5} f={to} />
        {/* direction bubble in the free top-right corner */}
        <circle cx={40} cy={8.5} r={7.5} fill="#fff" stroke="#e2e8f0" strokeWidth={1} />
        <g stroke="#334155" strokeWidth={1.9} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M37 5.5l5.2 5.2" />
          <path d="M42.5 6.8v4.2h-4.2" />
        </g>
      </svg>
    );
  }

  const f = FORMATS[spec.badge];
  return (
    <svg viewBox="0 0 48 48" width={px} height={px} aria-hidden className="inline-block select-none">
      <SheetDefs />
      <Sheet x={3.5} y={3} s={32} f={f} />
      {/* action-glyph bubble in the bottom-right corner */}
      <circle cx={37} cy={37} r={11} fill="#fff" stroke="#e2e8f0" strokeWidth={1} />
      <g transform="translate(37 37) scale(0.6) translate(-12 -12)">
        <OpGlyph op={spec.op} color={f.bg} />
      </g>
    </svg>
  );
}
