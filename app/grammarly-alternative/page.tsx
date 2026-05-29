import type { Metadata } from "next";
import { CompetitorPage } from "@/components/alternatives/CompetitorPage";
import { ALTERNATIVES } from "@/lib/tools-config";

const alt = ALTERNATIVES.find((a) => a.slug === "grammarly-alternative")!;

export const metadata: Metadata = {
  title: alt.metaTitle,
  description: alt.metaDescription,
  alternates: { canonical: `/${alt.slug}` },
};

export default function Page() {
  return <CompetitorPage alt={alt} />;
}
