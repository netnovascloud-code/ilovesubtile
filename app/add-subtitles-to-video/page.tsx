import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { AddSubtitlesToVideoClient } from "@/components/tools/clients/AddSubtitlesToVideoClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["add-subtitles-to-video"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <AddSubtitlesToVideoClient
        crossLinks={[
          { href: "/style-subtitles", label: "Restyle the captions" },
          { href: "/subtitle-generator", label: "Generate subtitles first" },
        ]}
      />
    </ToolPageShell>
  );
}
