import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VsPage } from "@/components/tools/VsPage";
import { VS, VS_IDS } from "@/lib/vs";
import { ogImageUrl } from "@/lib/seo";

export function generateStaticParams() {
  return VS_IDS.map((competitor) => ({ competitor }));
}

export function generateMetadata({ params }: { params: { competitor: string } }): Metadata {
  const vs = VS[params.competitor];
  if (!vs) return {};
  return {
    title: { absolute: vs.metaTitle },
    description: vs.metaDescription,
    alternates: { canonical: `/vs/${vs.id}` },
    openGraph: { title: vs.metaTitle, description: vs.metaDescription, url: `https://konver.app/vs/${vs.id}`, siteName: "Konver", type: "website", images: [ogImageUrl(vs.metaTitle, vs.metaDescription)] },
    twitter: { card: "summary_large_image", images: [ogImageUrl(vs.metaTitle, vs.metaDescription)] },
  };
}

export default function Page({ params }: { params: { competitor: string } }) {
  const vs = VS[params.competitor];
  if (!vs) notFound();
  return <VsPage vs={vs} />;
}
