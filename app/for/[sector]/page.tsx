import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorPage } from "@/components/tools/SectorPage";
import { SECTORS, SECTOR_IDS } from "@/lib/sectors";

export function generateStaticParams() {
  return SECTOR_IDS.map((sector) => ({ sector }));
}

export function generateMetadata({ params }: { params: { sector: string } }): Metadata {
  const sector = SECTORS[params.sector];
  if (!sector) return {};
  return {
    title: { absolute: sector.metaTitle },
    description: sector.metaDescription,
    alternates: { canonical: `/for/${sector.id}` },
    openGraph: {
      title: sector.metaTitle,
      description: sector.metaDescription,
      url: `https://konver.app/for/${sector.id}`,
      siteName: "Konver",
      type: "website",
    },
  };
}

export default function Page({ params }: { params: { sector: string } }) {
  const sector = SECTORS[params.sector];
  if (!sector) notFound();
  return <SectorPage sector={sector} />;
}
