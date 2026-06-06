import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorPage } from "@/components/tools/SectorPage";
import { SECTORS, SECTOR_IDS } from "@/lib/sectors";
import { ogImageUrl } from "@/lib/seo";

export function generateStaticParams() {
  return SECTOR_IDS.map((sector) => ({ sector }));
}

export async function generateMetadata(props: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const params = await props.params;
  const sector = SECTORS[params.sector];
  if (!sector) return {};
  return {
    title: { absolute: sector.metaTitle },
    description: sector.metaDescription,
    alternates: { canonical: `/for/${sector.id}` },
    openGraph: {
      title: sector.metaTitle,
      description: sector.metaDescription,
      url: `https://konvertools.com/for/${sector.id}`,
      siteName: "Konvertools",
      type: "website",
      images: [ogImageUrl(sector.metaTitle, sector.metaDescription)],
    },
    twitter: { card: "summary_large_image", images: [ogImageUrl(sector.metaTitle, sector.metaDescription)] },
  };
}

export default async function Page(props: { params: Promise<{ sector: string }> }) {
  const params = await props.params;
  const sector = SECTORS[params.sector];
  if (!sector) notFound();
  return <SectorPage sector={sector} />;
}
