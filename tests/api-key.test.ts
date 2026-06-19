import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { sha256Hex, isValidApiKeyFormat, isKeyUsable } from "@/supabase/functions/_shared/api-key";

// Flow 4 (API auth). The api-gateway imports this exact module. We verify the
// hashing matches a known SHA-256, the prefix gate, and the usability rule
// (revoked or not-found => rejected). DB-bound parts (rate limit, credit spend,
// per-user isolation) require a test Supabase — see README / "what remains".
describe("sha256Hex", () => {
  it("matches Node's SHA-256 for the same input", async () => {
    const raw = "knv_live_abcdef0123456789";
    expect(await sha256Hex(raw)).toBe(createHash("sha256").update(raw).digest("hex"));
  });
  it("is deterministic and differs per input", async () => {
    expect(await sha256Hex("a")).toBe(await sha256Hex("a"));
    expect(await sha256Hex("a")).not.toBe(await sha256Hex("b"));
  });
});

describe("isValidApiKeyFormat", () => {
  it("ACCEPTS current and legacy prefixes", () => {
    expect(isValidApiKeyFormat("knv_live_x")).toBe(true);
    expect(isValidApiKeyFormat("wyr_live_x")).toBe(true);
    expect(isValidApiKeyFormat("cf_live_x")).toBe(true);
  });
  it("REJECTS random / wrong-shaped keys", () => {
    expect(isValidApiKeyFormat("sk-openai-style")).toBe(false);
    expect(isValidApiKeyFormat("random123")).toBe(false);
    expect(isValidApiKeyFormat("")).toBe(false);
    expect(isValidApiKeyFormat("Bearer knv_x")).toBe(false); // must be the raw key
  });
});

describe("isKeyUsable", () => {
  it("ACCEPTS an existing, non-revoked key", () => {
    expect(isKeyUsable({ revoked: false })).toBe(true);
  });
  it("REJECTS a revoked key", () => {
    expect(isKeyUsable({ revoked: true })).toBe(false);
  });
  it("REJECTS a not-found key (null/undefined)", () => {
    expect(isKeyUsable(null)).toBe(false);
    expect(isKeyUsable(undefined)).toBe(false);
  });
});
