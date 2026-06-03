import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdblockNotice } from "@/components/layout/AdblockNotice";
import { EzoicLoader } from "@/components/ads/EzoicLoader";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";
import { CATEGORIES } from "@/lib/tools-config";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Konvertools — Free Online File Converter & Tools",
    template: "%s | Konvertools",
  },
  description:
    "Convert anything online for free: documents, audio, video, images, subtitles, code and text. 150+ fast, focused tools. Drop your file, get your result.",
  applicationName: "Konvertools",
  openGraph: {
    type: "website",
    siteName: "Konvertools",
    images: [`${SITE_URL}/og/i?title=${encodeURIComponent("Konvertools — Free Online Tools")}&sub=${encodeURIComponent("Convert files, images, audio, video, code & text — 150+ tools")}`],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/og/i?title=${encodeURIComponent("Konvertools — Free Online Tools")}&sub=${encodeURIComponent("Convert files, images, audio, video, code & text — 150+ tools")}`],
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
        {/* Ezoic — display ads. Loaded only for Free users when ADS_ENABLED is
            on (see EzoicLoader); never injected for Pro/Business or while ads
            are globally disabled. */}
        <EzoicLoader />
        {/* Site-level structured data: WebSite (with sitelink-search action),
            Organization, and a SiteNavigationElement listing every category
            hub. Helps Google understand the catalogue and surface category
            sitelinks. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "Konvertools",
                url: SITE_URL,
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${SITE_URL}/?q={search_term_string}`,
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "Organization",
                name: "Konvertools",
                url: SITE_URL,
                logo: `${SITE_URL}/og/default.png`,
              },
              {
                "@type": "SiteNavigationElement",
                name: "Tool categories",
                hasPart: CATEGORIES.map((c) => ({
                  "@type": "WebPage",
                  name: `${c.label} tools`,
                  url: `${SITE_URL}/${c.id}`,
                  description: c.blurb,
                })),
              },
            ],
          }) }}
        />
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
