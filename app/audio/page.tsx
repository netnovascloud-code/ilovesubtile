import type { Metadata } from "next";
import { CategoryPage, categoryMetadata } from "@/components/tools/CategoryPage";

export const metadata: Metadata = categoryMetadata("audio");

export default function Page() {
  return <CategoryPage category="audio" />;
}
