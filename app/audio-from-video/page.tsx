import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { FfmpegToolClient } from "@/components/tools/clients/FfmpegToolClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["audio-from-video"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <FfmpegToolClient slug="audio-from-video" category={tool.category} />
    </ToolPageShell>
  );
}
