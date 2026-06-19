import type { Metadata } from "next";

// /billing/checkout is a client component (it reads search params and redirects
// to the hosted payment page), so it can't export metadata itself. This segment
// layout supplies it — most importantly robots:noindex, since the root layout
// defaults to index:true and a transient checkout-redirect URL must never be
// crawled or surfaced in search results.
export const metadata: Metadata = {
  title: "Checkout — Konvertools",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
