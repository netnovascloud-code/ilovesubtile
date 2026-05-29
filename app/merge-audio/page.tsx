import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { MergeAudioClient } from "@/components/tools/clients/MergeAudioClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["merge-audio"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <MergeAudioClient />
    </ToolPageShell>
  );
}
