import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TextToSpeechClient } from "@/components/tools/clients/TextToSpeechClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["text-to-speech"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TextToSpeechClient />
    </ToolPageShell>
  );
}
