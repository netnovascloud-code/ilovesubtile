// Paddle Billing — client-side checkout (overlay). Everything here is dormant
// until BILLING_ENABLED (lib/flags.ts) is turned on AND the env vars below are
// set. Sandbox by default.
//
// Vercel env (client-side, NEXT_PUBLIC_*):
//   NEXT_PUBLIC_PADDLE_ENV=sandbox            ("sandbox" | "production")
//   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=live_...  (Paddle → Developer tools → Authentication → client-side token)
//   NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTHLY=pri_...
//   NEXT_PUBLIC_PADDLE_PRICE_PRO_ANNUAL=pri_...
//   NEXT_PUBLIC_PADDLE_PRICE_BUSINESS_MONTHLY=pri_...
//   NEXT_PUBLIC_PADDLE_PRICE_BUSINESS_ANNUAL=pri_...

export const PADDLE_ENV = (process.env.NEXT_PUBLIC_PADDLE_ENV as "sandbox" | "production") ?? "sandbox";
export const PADDLE_CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";

export function paddlePriceId(plan: "pro" | "business", interval: "monthly" | "annual"): string | undefined {
  const map: Record<string, string | undefined> = {
    "pro:monthly": process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTHLY,
    "pro:annual": process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO_ANNUAL,
    "business:monthly": process.env.NEXT_PUBLIC_PADDLE_PRICE_BUSINESS_MONTHLY,
    "business:annual": process.env.NEXT_PUBLIC_PADDLE_PRICE_BUSINESS_ANNUAL,
  };
  return map[`${plan}:${interval}`];
}

declare global { interface Window { Paddle?: unknown } }

let loading: Promise<unknown> | null = null;
/** Load + initialise Paddle.js v2 once. */
export function loadPaddle(): Promise<unknown> {
  if (typeof window === "undefined") return Promise.reject(new Error("no_window"));
  if (window.Paddle) return Promise.resolve(window.Paddle);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    s.async = true;
    s.onload = () => {
      try {
        const P = window.Paddle as {
          Environment: { set: (env: string) => void };
          Initialize: (opts: { token: string }) => void;
        };
        P.Environment.set(PADDLE_ENV);
        P.Initialize({ token: PADDLE_CLIENT_TOKEN });
        resolve(window.Paddle);
      } catch (e) { reject(e); }
    };
    s.onerror = () => reject(new Error("paddle_load_failed"));
    document.head.appendChild(s);
  });
  return loading;
}

/** Open the Paddle overlay checkout for a plan/interval. */
export async function openPaddleCheckout(opts: {
  plan: "pro" | "business";
  interval: "monthly" | "annual";
  email?: string;
  userId?: string;
  successUrl?: string;
}): Promise<void> {
  const priceId = paddlePriceId(opts.plan, opts.interval);
  if (!priceId || !PADDLE_CLIENT_TOKEN) throw new Error("paddle_not_configured");
  const Paddle = (await loadPaddle()) as {
    Checkout: { open: (o: Record<string, unknown>) => void };
  };
  Paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    ...(opts.email ? { customer: { email: opts.email } } : {}),
    ...(opts.userId ? { customData: { user_id: opts.userId } } : {}),
    settings: opts.successUrl ? { successUrl: opts.successUrl } : undefined,
  });
}
