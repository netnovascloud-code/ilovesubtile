import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { StyleSubtitlesClient } from "@/components/tools/clients/StyleSubtitlesClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["style-subtitles"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <StyleSubtitlesClient />
    </ToolPageShell>
  );
}
