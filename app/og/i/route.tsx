import { ImageResponse } from "next/og";

// Dynamic Open Graph image generator. Every page's og:image / twitter:image
// points here with ?title=&sub= — replacing the 157 static /og/<slug>.png
// files that never existed (so social previews were blank). Lives under
// /og/ which the i18n middleware already skips. Runs on the edge.
export const runtime = "edge";

const BRAND = "#2563EB";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Konvertools").slice(0, 80);
  const sub = (searchParams.get("sub") || "Free online tools — no sign-up").slice(0, 130);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #ffffff 0%, #eff4ff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* top accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "1200px", height: "10px", background: BRAND }} />

        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: BRAND,
              color: "#fff",
              fontSize: "40px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            K
          </div>
          <div style={{ fontSize: "34px", fontWeight: 700, color: "#0f172a" }}>Konvertools</div>
        </div>

        {/* title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "62px", fontWeight: 800, color: "#0f172a", lineHeight: 1.05, letterSpacing: "-1.5px", maxWidth: "1000px" }}>
            {title}
          </div>
          <div style={{ fontSize: "30px", color: "#475569", maxWidth: "960px", lineHeight: 1.3 }}>
            {sub}
          </div>
        </div>

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "26px", fontWeight: 600, color: BRAND }}>konvertools.com</div>
          <div style={{ display: "flex", gap: "12px" }}>
            {["Free", "In your browser", "No sign-up"].map((t) => (
              <div key={t} style={{ fontSize: "22px", color: "#475569", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "999px", padding: "8px 18px", display: "flex" }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
