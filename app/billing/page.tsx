import type { Metadata } from "next";
import { BillingView } from "@/components/account/BillingView";

export const metadata: Metadata = {
  title: "Billing",
  robots: { index: false, follow: false },
};

// Auth/cookie-driven page — must render per request.
export const dynamic = "force-dynamic";

export default function BillingPage() {
  return <BillingView locale="en" />;
}
