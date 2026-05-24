import type { Metadata } from "next";
import { TOOLS_BY_SLUG, toClientSpec } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ServerJobClient } from "@/components/tools/clients/ServerJobClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["subtitle-generator"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ServerJobClient
        tool={toClientSpec(tool)}
        crossLinks={[
          { href: "/translate-subtitles", label: "Translate the result" },
          { href: "/add-subtitles-to-video", label: "Burn into a video" },
          { href: "/subtitle-editor", label: "Open in editor" },
        ]}
      />
    </ToolPageShell>
  );
}
