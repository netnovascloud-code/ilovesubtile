import { describe, it, expect } from "vitest";
import {
  parseSubtitles, toSrt, toVtt, shiftCues, cleanCues, detectFormat, toPlainText,
} from "@/lib/srt-utils";

const SRT = `1
00:00:01,000 --> 00:00:02,500
Hello world

2
00:00:03,000 --> 00:00:04,000
Second line`;

describe("parseSubtitles — SRT", () => {
  it("parses cues with correct times and lines", () => {
    const cues = parseSubtitles(SRT);
    expect(cues).toHaveLength(2);
    expect(cues[0]).toMatchObject({ index: 1, start: 1000, end: 2500, lines: ["Hello world"] });
    expect(cues[1]).toMatchObject({ start: 3000, end: 4000, lines: ["Second line"] });
  });
  it("tolerates BOM + CRLF", () => {
    const cues = parseSubtitles("﻿" + SRT.replace(/\n/g, "\r\n"));
    expect(cues).toHaveLength(2);
    expect(cues[0].start).toBe(1000);
  });
});

describe("parseSubtitles — VTT", () => {
  it("parses a WEBVTT file with hours", () => {
    const vtt = `WEBVTT\n\n00:00:01.000 --> 00:00:02.500\nHi`;
    const cues = parseSubtitles(vtt);
    expect(cues).toHaveLength(1);
    expect(cues[0]).toMatchObject({ start: 1000, end: 2500, lines: ["Hi"] });
  });
  it("parses VTT timecodes WITHOUT hours (mm:ss.mmm)", () => {
    const vtt = `WEBVTT\n\n00:01.000 --> 00:02.500\nNo hours`;
    const cues = parseSubtitles(vtt);
    expect(cues).toHaveLength(1);
    // Must be real numbers, never NaN.
    expect(Number.isNaN(cues[0].start)).toBe(false);
    expect(cues[0].start).toBe(1000);
    expect(cues[0].end).toBe(2500);
  });
});

describe("toSrt / toVtt", () => {
  it("round-trips through SRT preserving times + lines", () => {
    const again = parseSubtitles(toSrt(parseSubtitles(SRT)));
    expect(again).toHaveLength(2);
    expect(again[0]).toMatchObject({ start: 1000, end: 2500, lines: ["Hello world"] });
  });
  it("toVtt emits a WEBVTT header and dot millisecond separator", () => {
    const vtt = toVtt(parseSubtitles(SRT));
    expect(vtt.startsWith("WEBVTT")).toBe(true);
    expect(vtt).toContain("00:00:01.000 --> 00:00:02.500");
  });
});

describe("shiftCues", () => {
  it("adds the offset to every cue", () => {
    const shifted = shiftCues(parseSubtitles(SRT), 1000);
    expect(shifted[0]).toMatchObject({ start: 2000, end: 3500 });
  });
  it("clamps negative results to 0", () => {
    const shifted = shiftCues(parseSubtitles(SRT), -5000);
    expect(shifted[0].start).toBe(0);
    expect(shifted[0].end).toBe(0);
  });
});

describe("cleanCues", () => {
  it("strips SDH brackets/parens and drops emptied cues", () => {
    const cues = [{ index: 1, start: 0, end: 1, lines: ["[music]"] }, { index: 2, start: 1, end: 2, lines: ["(sigh) ok"] }];
    const out = cleanCues(cues, { stripSdh: true, trim: true });
    expect(out).toHaveLength(1); // the "[music]"-only cue is removed
    expect(out[0].lines).toEqual(["ok"]);
  });
  it("merges consecutive duplicate cues (extends end)", () => {
    const cues = [
      { index: 1, start: 0, end: 1000, lines: ["same"] },
      { index: 2, start: 1000, end: 2000, lines: ["same"] },
    ];
    const out = cleanCues(cues, { removeDuplicates: true });
    expect(out).toHaveLength(1);
    expect(out[0].end).toBe(2000);
  });
  it("collapseWhitespace squeezes runs of spaces", () => {
    const out = cleanCues([{ index: 1, start: 0, end: 1, lines: ["a    b   c"] }], { collapseWhitespace: true });
    expect(out[0].lines[0]).toBe("a b c");
  });
});

describe("detectFormat", () => {
  it("uses the filename extension first", () => {
    expect(detectFormat("subs.vtt", "")).toBe("vtt");
    expect(detectFormat("subs.srt", "")).toBe("srt");
  });
  it("falls back to content sniffing", () => {
    expect(detectFormat(undefined, "WEBVTT\n\n...")).toBe("vtt");
    expect(detectFormat(undefined, "1\n00:00:01,000 --> 00:00:02,000\nhi")).toBe("srt");
    expect(detectFormat(undefined, "random text")).toBe("unknown");
  });
});

describe("cleanCues — normaliseShouting", () => {
  it("converts ALL-CAPS lines to sentence case", () => {
    const out = cleanCues([{ index: 1, start: 0, end: 1, lines: ["HELLO WORLD"] }], { normaliseShouting: true });
    expect(out[0].lines[0]).toBe("Hello world");
  });
  it("leaves mixed-case lines untouched", () => {
    const out = cleanCues([{ index: 1, start: 0, end: 1, lines: ["Hello World"] }], { normaliseShouting: true });
    expect(out[0].lines[0]).toBe("Hello World");
  });
  it("re-capitalises after sentence punctuation", () => {
    const out = cleanCues([{ index: 1, start: 0, end: 1, lines: ["STOP! NOW GO."] }], { normaliseShouting: true });
    expect(out[0].lines[0]).toBe("Stop! Now go.");
  });
});

describe("toPlainText", () => {
  it("one line per cue by default, merged when requested", () => {
    const cues = parseSubtitles(SRT);
    expect(toPlainText(cues)).toBe("Hello world\nSecond line\n");
    expect(toPlainText(cues, { mergeParagraphs: true })).toBe("Hello world Second line\n");
  });
});
