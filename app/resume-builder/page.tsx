import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ResumeBuilderClient } from "@/components/tools/clients/ResumeBuilderClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["resume-builder"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ResumeBuilderClient />
    </ToolPageShell>
  );
}
