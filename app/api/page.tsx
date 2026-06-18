import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { buildToolMetadata } from "@/lib/seo";
import { ApiDocsBody } from "./ApiDocsBody";

const tool = TOOLS_BY_SLUG.api;
export const metadata: Metadata = buildToolMetadata(tool);

export default function ApiDocsPage() {
  return (
    <ToolPageShell tool={tool}>
      <ApiDocsBody locale="en" />
    </ToolPageShell>
  );
}
