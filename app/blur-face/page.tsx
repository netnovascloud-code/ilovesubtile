import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { BlurFaceClient } from "@/components/tools/clients/BlurFaceClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["blur-face"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <BlurFaceClient />
    </ToolPageShell>
  );
}
