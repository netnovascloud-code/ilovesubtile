// Hardened wrapper around SheetJS (`xlsx`) for parsing UNTRUSTED, user-uploaded
// spreadsheets in the browser.
//
// xlsx@0.18.5 (the latest published on npm) ships an unpatched prototype-
// pollution (CVE-2023-30533) and a ReDoS. SheetJS publishes fixes only via its
// own CDN, so `npm audit` reports "no fix available" for the npm package.
// Rather than change the dependency source, this wrapper neutralises the
// prototype-pollution vector at the parse boundary:
//
//   1. It snapshots the own-property names of Object/Array prototypes, runs the
//      (synchronous) `read`, then deletes anything the parse injected into
//      those prototypes. JavaScript is single-threaded, so the polluted window
//      never spans another task — the prototypes are clean again before any
//      caller code runs.
//   2. `sanitizeParsed` recursively strips __proto__/constructor/prototype keys
//      from the data handed back to the app.
//
// Writing workbooks from app-generated data (aoa_to_sheet / book_new / write)
// is not an attack vector and deliberately does NOT go through this wrapper.

type Xlsx = typeof import("xlsx");

let xlsxPromise: Promise<Xlsx> | null = null;
/** Lazy, cached dynamic import so the ~600 kB lib is only fetched on first use. */
export function loadXlsx(): Promise<Xlsx> {
  return (xlsxPromise ??= import("xlsx"));
}

const POLLUTION_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function ownNames(proto: object): Set<string> {
  return new Set(Object.getOwnPropertyNames(proto));
}

function stripInjected(proto: object, before: Set<string>): void {
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (!before.has(key)) {
      // delete may throw if the property is non-configurable; that means it was
      // already there safely, so swallowing is correct.
      try { delete (proto as Record<string, unknown>)[key]; } catch { /* already safe */ }
    }
  }
}

/**
 * Parse a workbook from untrusted bytes with prototype-pollution protection.
 * Returns the loaded xlsx module (for `.utils`) alongside the workbook.
 */
export async function safeReadWorkbook(
  data: ArrayBuffer | Uint8Array,
  opts: Record<string, unknown> = {},
): Promise<{ xlsx: Xlsx; wb: ReturnType<Xlsx["read"]> }> {
  const xlsx = await loadXlsx();
  const objBefore = ownNames(Object.prototype);
  const arrBefore = ownNames(Array.prototype);
  try {
    const wb = xlsx.read(data, { type: "array", ...opts });
    return { xlsx, wb };
  } finally {
    // Runs synchronously right after `read` returns/throws — neutralises any
    // prototype pollution before control returns to the caller.
    stripInjected(Object.prototype, objBefore);
    stripInjected(Array.prototype, arrBefore);
  }
}

/** Recursively remove prototype-pollution keys from parsed JSON before use. */
export function sanitizeParsed<T>(value: T): T {
  if (Array.isArray(value)) {
    for (const item of value) sanitizeParsed(item);
    return value;
  }
  if (value && typeof value === "object") {
    for (const key of Object.keys(value as Record<string, unknown>)) {
      if (POLLUTION_KEYS.has(key)) {
        delete (value as Record<string, unknown>)[key];
        continue;
      }
      sanitizeParsed((value as Record<string, unknown>)[key]);
    }
  }
  return value;
}
