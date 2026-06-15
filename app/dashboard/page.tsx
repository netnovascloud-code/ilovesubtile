import type { Metadata } from "next";
import { DashboardView } from "@/components/account/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

// Auth/cookie-driven page — must render per request.
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return <DashboardView locale="en" />;
}
