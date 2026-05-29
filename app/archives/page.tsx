import type { Metadata } from "next";
import { CategoryPage, categoryMetadata } from "@/components/tools/CategoryPage";

export const metadata: Metadata = categoryMetadata("archives");

export default function Page() {
  return <CategoryPage category="archives" />;
}
