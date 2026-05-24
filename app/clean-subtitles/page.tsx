import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { CleanClient } from "@/components/tools/clients/CleanClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["clean-subtitles"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <CleanClient />
    </ToolPageShell>
  );
}
