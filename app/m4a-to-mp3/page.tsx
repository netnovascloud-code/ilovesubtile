import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { FfmpegToolClient } from "@/components/tools/clients/FfmpegToolClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["m4a-to-mp3"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <FfmpegToolClient slug="m4a-to-mp3" category={tool.category} />
    </ToolPageShell>
  );
}
