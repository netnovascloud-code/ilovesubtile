import type { Metadata } from "next";
import { CompetitorPage } from "@/components/alternatives/CompetitorPage";
import { EXTRA_ALTERNATIVES } from "@/lib/alternatives-extra";

const alt = EXTRA_ALTERNATIVES.find((a) => a.slug === "convertio")!;

export const metadata: Metadata = {
  title: alt.metaTitle,
  description: alt.metaDescription,
  alternates: { canonical: `/alternatives/${alt.slug}` },
};

export default function Page() {
  return <CompetitorPage alt={alt} />;
}
