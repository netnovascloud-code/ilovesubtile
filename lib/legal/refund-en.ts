import type { LegalDoc } from "@/lib/legal/types";

// Canonical English source for the Refund Policy. Payments are processed by
// Paddle.com as Merchant of Record, so Paddle is the seller on the receipt and
// issues approved refunds. Mirrors the structure of the other legal docs and
// cross-links Terms / Privacy. NOTE for the owner: have this reviewed against
// your final pricing and local consumer law before relying on it.

export const REFUND_EN: LegalDoc = {
  h1: "Refund Policy",
  lastUpdated: "2026-06-29",
  lastUpdatedLabel: "Last updated: %DATE%",
  sections: [
    {
      id: "overview",
      title: "1. Overview",
      blocks: [
        { kind: "p", text: "This Refund Policy explains when and how you can obtain a refund for a purchase made on Konvertools. It forms part of, and should be read together with, our [Terms of Service](/terms) and [Privacy Policy](/privacy)." },
        { kind: "p", text: "Payments and refunds are processed by our payment provider **Paddle** (Paddle.com Market Ltd), which acts as the **Merchant of Record** (the authorised reseller) for our products. This means Paddle is the seller shown on your receipt, collects any applicable VAT/sales tax, and issues approved refunds to your original payment method." },
      ],
    },
    {
      id: "products",
      title: "2. What you can buy",
      blocks: [
        { kind: "p", text: "Konvertools offers:" },
        { kind: "ul", items: [
          "**Subscriptions** (Pro and Business) — recurring plans billed monthly or annually in advance.",
          "A **Free plan**, which involves no payment and therefore nothing to refund.",
        ] },
      ],
    },
    {
      id: "withdrawal",
      title: "3. Statutory right of withdrawal (EU / UK consumers)",
      blocks: [
        { kind: "p", text: "Under EU and UK consumer law, consumers normally have a 14-day right of withdrawal for distance purchases. However, our products are **digital content and digital services supplied immediately** after purchase." },
        { kind: "p", text: "By completing your purchase and starting to use the service, you expressly request immediate performance and **acknowledge that you lose your 14-day right of withdrawal** once the digital content has been delivered or the service has begun, to the extent it has already been supplied or consumed (art. L.221-28 of the French Consumer Code and equivalent EU/UK provisions). Your statutory rights for faulty or not-as-described services are unaffected." },
      ],
    },
    {
      id: "subscriptions",
      title: "4. Subscriptions (Pro & Business)",
      blocks: [
        { kind: "ul", items: [
          "Subscriptions are **billed in advance** for the chosen period (monthly or annual).",
          "You can **cancel at any time** from your [billing page](/billing); cancellation stops future renewals and you keep access until the end of the period already paid.",
          "The **current period is generally non-refundable** once it has started, because access and AI quota are made available immediately.",
          "As a goodwill gesture, we will consider a **full refund within 14 days of your first payment** if you have not substantially used the paid features (for example, only a few AI runs). This is assessed case by case and does not apply to renewals.",
          "**Annual plans**: if you cancel mid-term, no pro-rata refund is given for the remaining months unless required by law; you keep access until the paid year ends.",
        ] },
      ],
    },
    {
      id: "always",
      title: "5. When we always refund",
      blocks: [
        { kind: "p", text: "Regardless of the above, we will issue a full refund where:" },
        { kind: "ul", items: [
          "you were **charged twice** for the same purchase (duplicate charge);",
          "you were charged due to a **clear technical error** or an **unauthorised transaction**;",
          "we were **unable to deliver** the service you paid for (for example, a paid feature was unavailable through our fault and could not be provided).",
        ] },
      ],
    },
    {
      id: "how",
      title: "6. How to request a refund",
      blocks: [
        { kind: "p", text: "Email us at [contact@konvertools.com](mailto:contact@konvertools.com) with the email address used at purchase and your **order or receipt number** (shown on the receipt Paddle sent you). Tell us briefly what you would like refunded and why." },
        { kind: "p", text: "You can also contact Paddle's buyer support directly at [paddle.net](https://paddle.net) to look up your purchase, download your invoice, or request help with a payment." },
      ],
    },
    {
      id: "processing",
      title: "7. How refunds are processed",
      blocks: [
        { kind: "ul", items: [
          "Approved refunds are issued by **Paddle to your original payment method**.",
          "They typically appear within **5–10 business days**, depending on your bank or card issuer.",
          "Any **VAT/sales tax** collected on the original purchase is included in the refund where applicable.",
        ] },
      ],
    },
    {
      id: "chargebacks",
      title: "8. Chargebacks",
      blocks: [
        { kind: "p", text: "If you don't recognise a charge or have a billing problem, **please contact us first** — we can almost always resolve it faster than a bank dispute. Opening a chargeback without contacting us may lead to suspension of the related account while the dispute is investigated by Paddle." },
      ],
    },
    {
      id: "changes",
      title: "9. Changes to this policy",
      blocks: [
        { kind: "p", text: "We may update this Refund Policy from time to time. The version in force is the one published on this page, with the \"last updated\" date above. Material changes do not affect purchases already made before the change." },
      ],
    },
    {
      id: "law",
      title: "10. Governing law & contact",
      blocks: [
        { kind: "p", text: "This Refund Policy is governed by **French law**, without prejudice to the mandatory consumer-protection rules of your country of residence. For any question, contact [contact@konvertools.com](mailto:contact@konvertools.com)." },
      ],
    },
  ],
};
