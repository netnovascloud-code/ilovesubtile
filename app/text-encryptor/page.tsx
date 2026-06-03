import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TextEncryptorClient } from "@/components/tools/clients/TextEncryptorClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["text-encryptor"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <TextEncryptorClient />
    </ToolPageShell>
  );
}
