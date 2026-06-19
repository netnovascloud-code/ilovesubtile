import { describe, it, expect } from "vitest";
import { formatBytes, safeInternalPath, edgeFnUrl } from "@/lib/utils";

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
