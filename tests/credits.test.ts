import { describe, it, expect } from "vitest";
import {
  transcribeCost,
  translateCost,
  tieredCost,
  countWords,
  CREDIT_COST,
  LONG_TEXT_THRESHOLD,
} from "@/lib/credits";

// Flow 1 (credits) — pure cost math, the single source of truth the API gateway
// mirrors. These assert exact billing amounts: if rounding/tiering ever drifts,
// users are over/under-charged, so each test pins a precise value.
describe("transcribeCost — 10 credits per STARTED minute (min 1 min)", () => {
  it("nominal: rounds the minute UP", () => {
    expect(transcribeCost(60)).toBe(10); // exactly 1 min
    expect(transcribeCost(61)).toBe(20); // 1m01s -> 2 min -> 20
    expect(transcribeCost(600)).toBe(100); // 10 min
  });
  it("edge: zero/short still bills at least one minute", () => {
    expect(transcribeCost(0)).toBe(10);
    expect(transcribeCost(1)).toBe(10);
  });
  it("FAILURE-DETECTION: must not floor (61s is NOT 1 minute)", () => {
    // If the impl regressed to Math.floor, 61s would wrongly bill 10 credits.
    expect(transcribeCost(61)).not.toBe(10);
  });
});

describe("translateCost — 5 credits per STARTED 1000 words (min 5)", () => {
  it("nominal", () => {
    expect(translateCost(1000)).toBe(5);
    expect(translateCost(1001)).toBe(10);
    expect(translateCost(2500)).toBe(15);
  });
  it("edge: empty text still bills the minimum", () => {
    expect(translateCost(0)).toBe(5);
  });
});

describe("tieredCost — short vs long tier at LONG_TEXT_THRESHOLD", () => {
  it("just under the threshold = short tier", () => {
    expect(tieredCost("humanize", LONG_TEXT_THRESHOLD - 1)).toBe(CREDIT_COST.humanize.short);
    expect(tieredCost("rephrase", 100)).toBe(CREDIT_COST.rephrase.short);
  });
  it("at/over the threshold = long tier", () => {
    expect(tieredCost("humanize", LONG_TEXT_THRESHOLD)).toBe(CREDIT_COST.humanize.long);
    expect(tieredCost("summarize", 5000)).toBe(CREDIT_COST.summarize.long);
  });
  it("FAILURE-DETECTION: the threshold is inclusive on the long side", () => {
    // A boundary off-by-one (>= vs >) would charge the short tier here.
    expect(tieredCost("humanize", LONG_TEXT_THRESHOLD)).not.toBe(CREDIT_COST.humanize.short);
  });
});

describe("countWords", () => {
  it("counts whitespace-separated tokens, trims, collapses runs", () => {
    expect(countWords("hello world")).toBe(2);
    expect(countWords("  a  b   c ")).toBe(3);
  });
  it("empty / whitespace-only = 0", () => {
    expect(countWords("")).toBe(0);
    expect(countWords("   \n\t ")).toBe(0);
  });
});
