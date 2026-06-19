import { describe, it, expect, vi } from "vitest";
import { parseDsn, captureEdgeException } from "@/supabase/functions/_shared/sentry";

const DSN = "https://abc123publickey@o42.ingest.sentry.io/1234567";

describe("parseDsn", () => {
  it("builds the store URL + key from a valid DSN", () => {
    expect(parseDsn(DSN)).toEqual({
      url: "https://o42.ingest.sentry.io/api/1234567/store/",
      key: "abc123publickey",
    });
  });
  it("returns null for a malformed DSN (no key / no project)", () => {
    expect(parseDsn("not a url")).toBeNull();
    expect(parseDsn("https://o42.ingest.sentry.io/1234567")).toBeNull(); // no public key
    expect(parseDsn("https://key@host/")).toBeNull(); // no project id
  });
});

describe("captureEdgeException", () => {
  it("NO-OPS when there is no DSN (inert until configured)", async () => {
    const fetchImpl = vi.fn();
    const sent = await captureEdgeException(new Error("boom"), { fn: "api-gateway" }, { dsn: "", fetchImpl });
    expect(sent).toBe(false);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("POSTs a well-formed event to the right endpoint when a DSN is set", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true } as Response);
    const sent = await captureEdgeException(
      new Error("kaboom"),
      { fn: "lemonsqueezy-webhook", userId: "user-1", request: { method: "POST", route: "/webhook" } },
      { dsn: DSN, fetchImpl },
    );
    expect(sent).toBe(true);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://o42.ingest.sentry.io/api/1234567/store/");
    expect((init.headers as Record<string, string>)["X-Sentry-Auth"]).toContain("sentry_key=abc123publickey");
    const body = JSON.parse(init.body as string);
    expect(body.tags.function).toBe("lemonsqueezy-webhook");
    expect(body.user.id).toBe("user-1");
    expect(body.exception.values[0].value).toBe("kaboom");
  });

  it("never throws even if the transport fails (monitoring must not break the fn)", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("network down"));
    const sent = await captureEdgeException(new Error("x"), { fn: "ai-process" }, { dsn: DSN, fetchImpl });
    expect(sent).toBe(false);
  });

  it("coerces non-Error throwables to an Error", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true } as Response);
    await captureEdgeException("string failure", { fn: "api-gateway" }, { dsn: DSN, fetchImpl });
    const body = JSON.parse(fetchImpl.mock.calls[0][1].body as string);
    expect(body.exception.values[0].value).toBe("string failure");
  });
});
