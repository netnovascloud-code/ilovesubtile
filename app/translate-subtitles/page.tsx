import type { Metadata } from "next";
import { TOOLS_BY_SLUG, toClientSpec } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ServerJobClient } from "@/components/tools/clients/ServerJobClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["translate-subtitles"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <ServerJobClient
        tool={toClientSpec(tool)}
        crossLinks={[
          { href: "/sync-subtitles", label: "Fix the timing" },
          { href: "/add-subtitles-to-video", label: "Burn into a video" },
          { href: "/batch-translate", label: "Translate to many languages (Pro)" },
        ]}
      />
    </ToolPageShell>
  );
}
