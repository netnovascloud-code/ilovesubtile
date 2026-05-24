import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { SITE_URL } from "@/lib/utils";

export async function POST() {
  try {
    const supabase = getSupabaseServer();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return NextResponse.redirect(`${SITE_URL}/login`);

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", data.user.id)
      .maybeSingle();

    if (!profile?.stripe_customer_id) {
      return NextResponse.redirect(`${SITE_URL}/pricing`);
    }

    const stripe = getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${SITE_URL}/dashboard`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: "portal_unavailable", message: err instanceof Error ? err.message : "Unknown" },
      { status: 500 },
    );
  }
}
