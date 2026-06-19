import { describe, it, expect } from "vitest";
import { PLAN_FILE_MB, FREE_MB_BY_TYPE } from "@/lib/plan-limits";
import { DAILY_LIMIT, MONTHLY_LIMIT, ANON_DAILY_LIMIT, planLimit } from "@/lib/ai-quotas";

// Flow 3 (plan limits) — assert the caps are real and ordered, and that the
// quota resolver returns the right bucket per plan. The API gateway enforces
// PLAN_FILE_MB server-side; these are its single source of truth.
describe("per-plan upload caps (PLAN_FILE_MB)", () => {
  it("strictly increase Free < Pro < Business", () => {
    expect(PLAN_FILE_MB.free).toBeLessThan(PLAN_FILE_MB.pro);
    expect(PLAN_FILE_MB.pro).toBeLessThan(PLAN_FILE_MB.business);
  });
  it("exact KONVER caps: 20 MB / 1 GB / 5 GB", () => {
    expect(PLAN_FILE_MB.free).toBe(20);
    expect(PLAN_FILE_MB.pro).toBe(1024);
    expect(PLAN_FILE_MB.business).toBe(5120);
  });
  it("a 250 MB upload exceeds Free; a 19 MB upload is allowed", () => {
    expect(250).toBeGreaterThan(PLAN_FILE_MB.free);
    expect(19).toBeLessThanOrEqual(PLAN_FILE_MB.free);
  });
});

describe("per-file-type free caps (FREE_MB_BY_TYPE)", () => {
  it("ordered by how heavy the media is (video > audio > image >= doc > subtitle > text)", () => {
    expect(FREE_MB_BY_TYPE.video).toBeGreaterThan(FREE_MB_BY_TYPE.audio);
    expect(FREE_MB_BY_TYPE.audio).toBeGreaterThan(FREE_MB_BY_TYPE.image);
    expect(FREE_MB_BY_TYPE.image).toBeGreaterThanOrEqual(FREE_MB_BY_TYPE.subtitle);
    expect(FREE_MB_BY_TYPE.subtitle).toBeGreaterThan(FREE_MB_BY_TYPE.text);
  });
});

describe("AI quota (ai-quotas.ts)", () => {
  it("anonymous = 2/day, signed-in free = 5/day", () => {
    expect(ANON_DAILY_LIMIT).toBe(2);
    expect(DAILY_LIMIT.free).toBe(5);
  });
  it("anon is more restricted than signed-in free (incentive to sign in)", () => {
    expect(ANON_DAILY_LIMIT).toBeLessThan(DAILY_LIMIT.free);
  });
  it("planLimit: free is a daily bucket, Pro/Business are monthly", () => {
    expect(planLimit("free")).toEqual({ kind: "daily", limit: DAILY_LIMIT.free });
    expect(planLimit("pro")).toEqual({ kind: "monthly", limit: MONTHLY_LIMIT.pro });
    expect(planLimit("business")).toEqual({ kind: "monthly", limit: MONTHLY_LIMIT.business });
  });
  it("Business monthly quota > Pro monthly quota", () => {
    expect(MONTHLY_LIMIT.business).toBeGreaterThan(MONTHLY_LIMIT.pro);
  });
  it("FAILURE-DETECTION: a paid plan must NOT resolve to the daily free bucket", () => {
    expect(planLimit("pro").kind).not.toBe("daily");
  });
});
