import { ImageResponse } from "next/og";

// Apple touch icon (home-screen / bookmark on iOS). 180×180 is the size iOS
// downsamples from. Solid brand fill so Apple's rounded mask looks clean.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BRAND = "#2D6BE4";

export default function AppleIcon() {
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
          fontSize: 120,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
