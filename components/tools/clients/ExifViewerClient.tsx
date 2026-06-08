"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Download, ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniDrop } from "@/components/tools/MiniDrop";
import { formatBytes } from "@/lib/utils";

type Tags = Record<string, string>;

const TAG_NAMES: Record<number, string> = {
  0x010f: "Make", 0x0110: "Camera model", 0x0112: "Orientation", 0x0131: "Software",
  0x0132: "Date/time", 0x013b: "Artist", 0x8298: "Copyright", 0x9003: "Date taken",
  0x829a: "Exposure time", 0x829d: "F-number", 0x8827: "ISO", 0x920a: "Focal length",
  0xa002: "Width", 0xa003: "Height",
};
const GPS_NAMES: Record<number, string> = { 0x0001: "GPS lat ref", 0x0002: "GPS latitude", 0x0003: "GPS long ref", 0x0004: "GPS longitude" };

function readEntries(dv: DataView, tiff: number, ifd: number, le: boolean, names: Record<number, string>, out: Tags, follow?: { exif?: number[]; gps?: number[] }) {
  const u16 = (o: number) => dv.getUint16(o, le);
  const u32 = (o: number) => dv.getUint32(o, le);
  const count = u16(ifd);
  for (let i = 0; i < count; i++) {
    const e = ifd + 2 + i * 12;
    const tag = u16(e), type = u16(e + 2), num = u32(e + 4);
    const sizes: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 9: 4, 10: 8 };
    const byteLen = (sizes[type] ?? 1) * num;
    const valOff = byteLen <= 4 ? e + 8 : tiff + u32(e + 8);
    if (follow?.exif && tag === 0x8769) { follow.exif.push(tiff + u32(e + 8)); continue; }
    if (follow?.gps && tag === 0x8825) { follow.gps.push(tiff + u32(e + 8)); continue; }
    const name = names[tag];
    if (!name) continue;
    let value = "";
    if (type === 2) {
      let s = "";
      for (let j = 0; j < num && dv.getUint8(valOff + j); j++) s += String.fromCharCode(dv.getUint8(valOff + j));
      value = s.trim();
    } else if (type === 3) value = String(u16(valOff));
    else if (type === 4) value = String(u32(valOff));
    else if (type === 5 || type === 10) {
      const parts: string[] = [];
      for (let j = 0; j < num; j++) {
        const n = le ? dv.getUint32(valOff + j * 8, true) : dv.getUint32(valOff + j * 8, false);
        const d = le ? dv.getUint32(valOff + j * 8 + 4, true) : dv.getUint32(valOff + j * 8 + 4, false);
        parts.push(d ? String(+(n / d).toFixed(4)) : String(n));
      }
      value = parts.join(", ");
    }
    if (value) out[name] = value;
  }
}

function parseExif(buf: ArrayBuffer): { tags: Tags; hasGps: boolean } {
  const dv = new DataView(buf);
  const out: Tags = {};
  if (dv.getUint16(0) !== 0xffd8) return { tags: out, hasGps: false };
  let offset = 2, hasGps = false;
  while (offset + 4 < dv.byteLength) {
    const marker = dv.getUint16(offset);
    if (marker === 0xffe1) {
      const tiff = offset + 10; // APP1(2) + size(2) + "Exif\0\0"(6)
      if (dv.getUint32(offset + 4) !== 0x45786966) break; // not "Exif"
      const le = dv.getUint16(tiff) === 0x4949;
      const ifd0 = tiff + dv.getUint32(tiff + 4, le);
      const follow = { exif: [] as number[], gps: [] as number[] };
      readEntries(dv, tiff, ifd0, le, TAG_NAMES, out, follow);
      for (const ex of follow.exif) readEntries(dv, tiff, ex, le, TAG_NAMES, out);
      for (const g of follow.gps) { hasGps = true; readEntries(dv, tiff, g, le, GPS_NAMES, out); }
      break;
    }
    if ((marker & 0xff00) !== 0xff00) break;
    offset += 2 + dv.getUint16(offset + 2);
  }
  return { tags: out, hasGps };
}

export function ExifViewerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<Tags | null>(null);
  const [hasGps, setHasGps] = useState(false);
  const [cleanUrl, setCleanUrl] = useState<string | null>(null);
  const [cleanSize, setCleanSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const cleanup = useRef<string | null>(null);

  useEffect(() => () => { if (cleanup.current) URL.revokeObjectURL(cleanup.current); }, []);

  async function onFile(f: File) {
    setFile(f); setCleanUrl(null); setBusy(true);
    try {
      const { tags, hasGps } = parseExif(await f.arrayBuffer());
      setTags(tags); setHasGps(hasGps);
    } finally { setBusy(false); }
  }

  // Re-encoding through a canvas drops every metadata segment (EXIF, GPS, XMP).
  async function strip() {
    if (!file) return;
    setBusy(true);
    try {
      // Bake in EXIF orientation before we strip metadata, otherwise a phone
      // photo (Orientation 6/8) loses its tag and renders sideways.
      const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width; canvas.height = bmp.height;
      canvas.getContext("2d")!.drawImage(bmp, 0, 0);
      bmp.close?.();
      const isJpg = /jpe?g/i.test(file.type);
      const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), isJpg ? "image/jpeg" : "image/png", isJpg ? 0.95 : undefined));
      if (cleanup.current) URL.revokeObjectURL(cleanup.current);
      const url = URL.createObjectURL(blob);
      cleanup.current = url;
      setCleanUrl(url); setCleanSize(blob.size);
    } finally { setBusy(false); }
  }

  const entries = tags ? Object.entries(tags) : [];
  const ext = file && /jpe?g/i.test(file.type) ? "jpg" : "png";

  return (
    <div className="space-y-5">
      <MiniDrop
        label="Image (JPEG keeps EXIF)"
        accept={{ "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"], "image/tiff": [".tif", ".tiff"] }}
        icon={<ImageIcon className="h-5 w-5" />}
        onFile={onFile}
        current={file}
      />

      {busy && <div className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" /> Working…</div>}

      {file && !busy && (
        hasGps ? (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>This image contains <strong>GPS location</strong> data. Strip the metadata before sharing it publicly.</span>
          </div>
        ) : entries.length > 0 ? (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-800">
            <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>This image carries camera/software metadata (no GPS found).</span>
          </div>
        ) : (
          <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>No EXIF metadata found in this image.</span>
          </div>
        )
      )}

      {entries.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-ink-100">
          <table className="w-full text-sm">
            <tbody>
              {entries.map(([k, v]) => (
                <tr key={k} className="border-b border-ink-100 last:border-0">
                  <td className="bg-ink-50/50 px-3 py-2 font-medium text-ink-600">{k}</td>
                  <td className="px-3 py-2 text-ink-900">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {file && !busy && (
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={strip} variant={cleanUrl ? "outline" : "primary"} size="lg">
            <ShieldCheck className="h-4 w-4" /> {cleanUrl ? "Re-strip" : "Remove all metadata"}
          </Button>
          {cleanUrl && (
            <a href={cleanUrl} download={`${file.name.replace(/\.[^.]+$/, "")}-clean.${ext}`}>
              <Button size="lg"><Download className="h-4 w-4" /> Download clean image · {formatBytes(cleanSize)}</Button>
            </a>
          )}
        </div>
      )}

      <p className="text-xs text-ink-400">Parsed and cleaned entirely in your browser — your image is never uploaded.</p>
    </div>
  );
}
