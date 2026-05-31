import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { VoiceToTextClient } from "@/components/tools/clients/VoiceToTextClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["voice-to-text"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <VoiceToTextClient maxMb={tool.freeMaxMb} />
    </ToolPageShell>
  );
}
