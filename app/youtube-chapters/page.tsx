import type { Metadata } from "next";
import { TOOLS_BY_SLUG, toClientSpec } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ServerJobClient } from "@/components/tools/clients/ServerJobClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["youtube-chapters"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ServerJobClient
        tool={toClientSpec(tool)}
        crossLinks={[
          { href: "/srt-to-text", label: "Get the full transcript" },
          { href: "/translate-subtitles", label: "Translate the subtitles" },
        ]}
      />
    </ToolPageShell>
  );
}
