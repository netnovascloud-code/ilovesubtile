import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getStripe, PLANS } from "@/lib/stripe";
import { SITE_URL } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const plan = (searchParams.get("plan") ?? "pro") as keyof typeof PLANS;
    const interval = searchParams.get("interval") === "annual" ? "annual" : "monthly";

    const priceId =
      interval === "annual"
        ? PLANS[plan].stripeAnnualPriceId
        : PLANS[plan].stripeMonthlyPriceId;
    if (!priceId) {
      return NextResponse.json(
        { error: "no_price_configured", plan, interval },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServer();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      const url = new URL("/login", SITE_URL);
      url.searchParams.set("redirect", `/api/billing/checkout?plan=${plan}&interval=${interval}`);
      return NextResponse.redirect(url, 303);
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: data.user.email,
      success_url: `${SITE_URL}/dashboard?upgraded=1`,
      cancel_url: `${SITE_URL}/pricing`,
      metadata: { user_id: data.user.id, plan },
    });

    return NextResponse.redirect(session.url ?? `${SITE_URL}/pricing`, 303);
  } catch (err) {
    return NextResponse.json(
      { error: "checkout_failed", message: err instanceof Error ? err.message : "Unknown" },
      { status: 500 },
    );
  }
}
