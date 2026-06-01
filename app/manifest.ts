import type { MetadataRoute } from "next";

// Web app manifest — makes Konver installable (PWA) and gives the right name,
// colours and icons when added to a home screen. Served at /manifest.webmanifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Konver — Free Online Tools",
    short_name: "Konver",
    description:
      "Convert files, images, audio, video, code & text — 150+ fast, focused tools. No sign-up, runs in your browser.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    categories: ["productivity", "utilities"],
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
