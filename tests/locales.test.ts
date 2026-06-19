import { describe, it, expect } from "vitest";
import { isLocale, localePath, isRtl, DEFAULT_LOCALE, NON_DEFAULT_LOCALES, LANGUAGE_NAMES } from "@/lib/i18n/locales";

describe("isLocale", () => {
  it("accepts known locales, rejects unknown", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("xx")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});

describe("localePath", () => {
  it("default locale (en) has no prefix", () => {
    expect(localePath("en")).toBe("/");
    expect(localePath("en", "workflow")).toBe("/workflow");
    expect(localePath("en", "/workflow")).toBe("/workflow"); // leading slash stripped
  });
  it("non-default locales are prefixed", () => {
    expect(localePath("fr")).toBe("/fr");
    expect(localePath("fr", "workflow")).toBe("/fr/workflow");
    expect(localePath("fr", "/workflow")).toBe("/fr/workflow");
  });
});

describe("locale tables are consistent", () => {
  it("20 locales total, en is default and not in NON_DEFAULT_LOCALES", () => {
    expect(NON_DEFAULT_LOCALES).toHaveLength(19);
    expect(NON_DEFAULT_LOCALES).not.toContain(DEFAULT_LOCALE);
    expect(Object.keys(LANGUAGE_NAMES)).toHaveLength(20);
  });
  it("every locale has a display name; no duplicate locales", () => {
    const all = [DEFAULT_LOCALE, ...NON_DEFAULT_LOCALES];
    expect(new Set(all).size).toBe(all.length);
    for (const l of all) expect(LANGUAGE_NAMES[l]).toBeTruthy();
  });
  it("only Arabic is RTL", () => {
    expect(isRtl("ar")).toBe(true);
    expect(isRtl("en")).toBe(false);
    expect(isRtl("fr")).toBe(false);
  });
});
