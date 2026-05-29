import type { Metadata } from "next";
import { CategoryPage, categoryMetadata } from "@/components/tools/CategoryPage";

export const metadata: Metadata = categoryMetadata("developer");

export default function Page() {
  return <CategoryPage category="developer" />;
}
