import { describe, it, expect } from "vitest";
import { formatBytes, safeInternalPath, edgeFnUrl, uniqueFilename } from "@/lib/utils";

describe("formatBytes", () => {
  it("scales B → KB → MB → GB with rounding", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512.0 B");
    expect(formatBytes(1024)).toBe("1.0 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(1048576)).toBe("1.0 MB");
    expect(formatBytes(5 * 1024 ** 3)).toBe("5.0 GB");
  });
  it("guards invalid input", () => {
    expect(formatBytes(-1)).toBe("0 B");
    expect(formatBytes(NaN)).toBe("0 B");
    expect(formatBytes(Infinity)).toBe("0 B");
  });
});

describe("safeInternalPath — open-redirect guard", () => {
  it("allows safe same-origin root-relative paths", () => {
    expect(safeInternalPath("/dashboard")).toBe("/dashboard");
    expect(safeInternalPath("/billing?tab=plan")).toBe("/billing?tab=plan");
  });
  it("falls back for anything off-site or malformed", () => {
    expect(safeInternalPath(null)).toBe("/dashboard");
    expect(safeInternalPath(undefined)).toBe("/dashboard");
    expect(safeInternalPath("dashboard")).toBe("/dashboard");        // no leading slash
    expect(safeInternalPath("//evil.com")).toBe("/dashboard");       // protocol-relative
    expect(safeInternalPath("/\\evil.com")).toBe("/dashboard");      // backslash trick
    expect(safeInternalPath("https://evil.com")).toBe("/dashboard"); // absolute URL
    expect(safeInternalPath("/" + "a".repeat(600))).toBe("/dashboard"); // over-long
  });
  it("honours a custom fallback", () => {
    expect(safeInternalPath("javascript:alert(1)", "/login")).toBe("/login");
  });
});

describe("edgeFnUrl", () => {
  it("builds the functions path and appends query", () => {
    expect(edgeFnUrl("api-gateway").endsWith("/functions/v1/api-gateway")).toBe(true);
    expect(edgeFnUrl("ai-process", { tool: "x" }).endsWith("/functions/v1/ai-process?tool=x")).toBe(true);
  });
});

describe("uniqueFilename — prevents batch ZIP entries from overwriting each other", () => {
  it("returns the name unchanged the first time", () => {
    const used = new Set<string>();
    expect(uniqueFilename("photo.webp", used)).toBe("photo.webp");
  });
  it("suffixes ' (n)' before the extension on repeated names", () => {
    const used = new Set<string>();
    expect(uniqueFilename("photo.webp", used)).toBe("photo.webp");
    expect(uniqueFilename("photo.webp", used)).toBe("photo (2).webp");
    expect(uniqueFilename("photo.webp", used)).toBe("photo (3).webp");
  });
  it("handles extension-less names", () => {
    const used = new Set<string>();
    expect(uniqueFilename("README", used)).toBe("README");
    expect(uniqueFilename("README", used)).toBe("README (2)");
  });
  it("leaves genuinely distinct names alone", () => {
    const used = new Set<string>();
    expect(uniqueFilename("a.png", used)).toBe("a.png");
    expect(uniqueFilename("b.png", used)).toBe("b.png");
  });
});
