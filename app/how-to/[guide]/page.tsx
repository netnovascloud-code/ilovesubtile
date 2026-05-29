import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HowToPage } from "@/components/tools/HowToPage";
import { HOWTOS, HOWTO_IDS } from "@/lib/howto";

export function generateStaticParams() {
  return HOWTO_IDS.map((guide) => ({ guide }));
}

export function generateMetadata({ params }: { params: { guide: string } }): Metadata {
  const howto = HOWTOS[params.guide];
  if (!howto) return {};
  return {
    title: { absolute: howto.metaTitle },
    description: howto.metaDescription,
    alternates: { canonical: `/how-to/${howto.id}` },
    openGraph: { title: howto.metaTitle, description: howto.metaDescription, url: `https://wyrlo.io/how-to/${howto.id}`, siteName: "Wyrlo", type: "article" },
  };
}

export default function Page({ params }: { params: { guide: string } }) {
  const howto = HOWTOS[params.guide];
  if (!howto) notFound();
  return <HowToPage howto={howto} />;
}
