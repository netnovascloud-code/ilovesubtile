import { ImageResponse } from "next/og";

// Generated favicon — the branded "K" badge (matches the header logo,
// brand-500). Replaces the blank globe most browsers show by default.
// Next serves this at /icon with a content hash for cache-busting.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const BRAND = "#2D6BE4";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND,
          color: "#fff",
          fontSize: 22,
          fontWeight: 800,
          borderRadius: 7,
          fontFamily: "sans-serif",
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
