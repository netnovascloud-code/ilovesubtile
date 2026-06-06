import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HowToPage } from "@/components/tools/HowToPage";
import { HOWTOS, HOWTO_IDS } from "@/lib/howto";
import { ogImageUrl } from "@/lib/seo";

export function generateStaticParams() {
  return HOWTO_IDS.map((guide) => ({ guide }));
}

export async function generateMetadata(props: { params: Promise<{ guide: string }> }): Promise<Metadata> {
  const params = await props.params;
  const howto = HOWTOS[params.guide];
  if (!howto) return {};
  return {
    title: { absolute: howto.metaTitle },
    description: howto.metaDescription,
    alternates: { canonical: `/how-to/${howto.id}` },
    openGraph: { title: howto.metaTitle, description: howto.metaDescription, url: `https://konvertools.com/how-to/${howto.id}`, siteName: "Konvertools", type: "article", images: [ogImageUrl(howto.metaTitle, howto.metaDescription)] },
    twitter: { card: "summary_large_image", images: [ogImageUrl(howto.metaTitle, howto.metaDescription)] },
  };
}

export default async function Page(props: { params: Promise<{ guide: string }> }) {
  const params = await props.params;
  const howto = HOWTOS[params.guide];
  if (!howto) notFound();
  return <HowToPage howto={howto} />;
}
