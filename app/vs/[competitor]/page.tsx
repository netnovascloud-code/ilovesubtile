import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VsPage } from "@/components/tools/VsPage";
import { VS, VS_IDS } from "@/lib/vs";
import { ogImageUrl } from "@/lib/seo";

export function generateStaticParams() {
  return VS_IDS.map((competitor) => ({ competitor }));
}

export async function generateMetadata(props: { params: Promise<{ competitor: string }> }): Promise<Metadata> {
  const params = await props.params;
  const vs = VS[params.competitor];
  if (!vs) return {};
  return {
    title: { absolute: vs.metaTitle },
    description: vs.metaDescription,
    alternates: { canonical: `/vs/${vs.id}` },
    openGraph: { title: vs.metaTitle, description: vs.metaDescription, url: `https://konvertools.com/vs/${vs.id}`, siteName: "Konvertools", type: "website", images: [ogImageUrl(vs.metaTitle, vs.metaDescription)] },
    twitter: { card: "summary_large_image", images: [ogImageUrl(vs.metaTitle, vs.metaDescription)] },
  };
}

export default async function Page(props: { params: Promise<{ competitor: string }> }) {
  const params = await props.params;
  const vs = VS[params.competitor];
  if (!vs) notFound();
  return <VsPage vs={vs} />;
}
