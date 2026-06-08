import type { Metadata } from "next";
import { CategoryPage, categoryMetadata } from "@/components/tools/CategoryPage";

export const metadata: Metadata = categoryMetadata("security");

export default function Page() {
  return <CategoryPage category="security" />;
}
