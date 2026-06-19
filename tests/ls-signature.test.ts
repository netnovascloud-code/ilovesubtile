import { describe, it, expect } from "vitest";
import { createHmac } from "node:crypto";
import { verifySignature, timingSafeEqualHex } from "@/supabase/functions/_shared/ls-signature";

// Flow 2 (Lemon Squeezy webhook auth). The webhook imports this exact module,
// so we test the real verification used in production. A forged/tampered/missing
// signature MUST be rejected (otherwise anyone could grant themselves Pro).
const secret = "test_webhook_secret_123";
const body = JSON.stringify({ meta: { event_name: "subscription_created" }, data: { id: "42" } });
const sign = (b: string, s = secret) => createHmac("sha256", s).update(b).digest("hex");

describe("verifySignature", () => {
  it("ACCEPTS a correctly signed payload", async () => {
    expect(await verifySignature(body, sign(body), secret)).toBe(true);
  });
  it("ACCEPTS despite surrounding whitespace / uppercase hex", async () => {
    expect(await verifySignature(body, `  ${sign(body).toUpperCase()}  `, secret)).toBe(true);
  });
  it("REJECTS a tampered body (signature no longer matches)", async () => {
    expect(await verifySignature(body + "x", sign(body), secret)).toBe(false);
  });
  it("REJECTS a forged signature made with the wrong secret", async () => {
    expect(await verifySignature(body, sign(body, "attacker-secret"), secret)).toBe(false);
  });
  it("REJECTS a missing/empty signature", async () => {
    expect(await verifySignature(body, "", secret)).toBe(false);
  });
});

describe("timingSafeEqualHex", () => {
  it("true for equal, false for differing or length-mismatched", () => {
    expect(timingSafeEqualHex("deadbeef", "deadbeef")).toBe(true);
    expect(timingSafeEqualHex("deadbeef", "deadbee0")).toBe(false);
    expect(timingSafeEqualHex("ab", "abcd")).toBe(false);
  });
});
