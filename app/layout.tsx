import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdblockNotice } from "@/components/layout/AdblockNotice";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CaptionFlow — Free Online Subtitle Tools",
    template: "%s | CaptionFlow",
  },
  description:
    "Free online subtitle tools: generate, translate, sync, convert, edit. Powered by Whisper AI. Sixteen focused tools for SRT, VTT and captioned video.",
  applicationName: "CaptionFlow",
  openGraph: {
    type: "website",
    siteName: "CaptionFlow",
    images: ["/og/default.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/default.png"],
  },
  alternates: {
    canonical: "/",
    languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${HREFLANG_PREFIX[l]}/`])),
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <AdblockNotice />
      </body>
    </html>
  );
}
