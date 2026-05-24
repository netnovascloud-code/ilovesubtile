import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { SrtVttConvertClient } from "@/components/tools/clients/SrtVttConvertClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["srt-to-vtt"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <SrtVttConvertClient mode="srt-to-vtt" />
    </ToolPageShell>
  );
}
