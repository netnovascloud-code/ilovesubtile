import type { Metadata } from "next";
import { TOOLS_BY_SLUG } from "@/lib/tools-config";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { QrCodeReaderClient } from "@/components/tools/clients/QrCodeReaderClient";
import { buildToolMetadata } from "@/lib/seo";

const tool = TOOLS_BY_SLUG["qr-code-reader"];
export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <ToolPageShell tool={tool}>
      <QrCodeReaderClient />
    </ToolPageShell>
  );
}
