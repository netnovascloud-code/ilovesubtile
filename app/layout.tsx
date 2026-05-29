import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdblockNotice } from "@/components/layout/AdblockNotice";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
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
    default: "Konver — Free Online File Converter & Tools",
    template: "%s | Konver",
  },
  description:
    "Convert anything online for free: documents, audio, video, images, subtitles, code and text. 150+ fast, focused tools. Drop your file, get your result.",
  applicationName: "Konver",
  openGraph: {
    type: "website",
    siteName: "Konver",
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
      <head>
        {/* Ezoic — display ads. No-op until the domain is verified in Ezoic. */}
        <Script id="ezoic-sa" src="//www.ezojs.com/ezoic/sa.min.js" strategy="afterInteractive" async />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Syncs <html lang>/<dir> to the URL locale without opting out of SSG. */}
        <HtmlLang />
        {/* Resets scroll to the top on every route change. */}
        <ScrollToTop />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <AdblockNotice />
      </body>
    </html>
  );
}
