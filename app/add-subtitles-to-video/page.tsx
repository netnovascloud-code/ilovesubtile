import type { Metadata } from "next";
import { TOOLS_BY_SLUG, toClientSpec } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ServerJobClient } from "@/components/tools/clients/ServerJobClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["add-subtitles-to-video"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ServerJobClient
        tool={toClientSpec(tool)}
        crossLinks={[
          { href: "/style-subtitles", label: "Restyle the captions" },
          { href: "/subtitle-generator", label: "Generate subtitles first" },
        ]}
      />
    </ToolPageShell>
  );
}
