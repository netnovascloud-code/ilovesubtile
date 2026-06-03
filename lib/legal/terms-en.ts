import type { LegalDoc } from "@/lib/legal/types";

// Canonical English source for the Terms of Service. Translations are
// derived from this file by scripts/translate-legal.mjs and written to
// lib/legal/terms-translations.generated.ts.
//
// Keep section ids stable across edits so deep links survive.

export const TERMS_EN: LegalDoc = {
  h1: "Terms of Service",
  lastUpdated: "2026-06-02",
  lastUpdatedLabel: "Last updated: %DATE% · By using Konvertools you agree to these terms.",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance",
      blocks: [
        { kind: "p", text: "These Terms of Service (the \"Terms\") form a binding agreement between you (the \"User\") and the publisher of Konvertools (the \"Publisher\", \"we\", \"us\") regarding your use of the Konvertools website and all related tools, APIs and services (collectively the \"Service\"). By creating an account, ticking the acceptance checkbox at signup, or simply by using any tool on the Service, you confirm that you have read, understood and accepted these Terms in full, together with our Privacy Policy." },
      ],
    },
    {
      id: "service",
      title: "2. The Service",
      blocks: [
        { kind: "p", text: "Konvertools provides a catalogue of file-conversion utilities, document and image processing tools, AI-assisted text utilities, indicative security tools (email verifier, phishing detector, URL scanner, SSL certificate checker, password breach checker) and developer utilities. Most tools execute entirely in your browser; some require server processing. The Service is offered **\"as is\" and \"as available\"** without any warranty of any kind, express or implied, including merchantability, fitness for a particular purpose, or non-infringement." },
      ],
    },
    {
      id: "liability",
      title: "3. Limitation of liability — read carefully",
      blocks: [
        { kind: "p", text: "**To the maximum extent permitted by law, the Publisher disclaims any liability for damages of any kind arising from your use of, or inability to use, the Service.** In particular, you acknowledge and agree that the Publisher shall not be liable for:" },
        { kind: "ul", items: [
          "loss of data, corrupted or incorrect files, or failed conversions;",
          "decisions, financial, business or otherwise, that you take based on the output of any tool;",
          "downtime, latency, or temporary unavailability of any feature;",
          "third-party service failures (Supabase, Mistral, Google Safe Browsing, HaveIBeenPwned, Stripe, Resend, hosting providers);",
          "indirect, incidental, special, consequential or punitive damages of any kind;",
          "any aggregate amount in excess of the fees you actually paid to us in the twelve (12) months preceding the event giving rise to the claim, capped at one hundred (100) euros for free-tier users.",
        ] },
        { kind: "p", text: "**Security tools**: the URL Scanner, the Phishing Detector, the Email Verifier, the SSL Certificate Checker and the Password Breach Checker are provided **for informational and indicative purposes only**. They aggregate third-party signals (Google Safe Browsing, public DNS, HaveIBeenPwned, live TLS handshakes) and large-language-model heuristics. They **do not constitute a guarantee of safety, validity or absence of risk**. New phishing pages appear faster than reputation databases can catalogue them; an email that passes our checks may still be inactive or fraudulent; an SSL certificate being valid does not certify a site's content. The Publisher expressly declines all liability for any harm resulting from a phishing email the Service deemed safe, an unsafe link the Service failed to identify, a transactional email sent to an address the Service marked as valid, or any security decision taken on the basis of these tools. The User assumes sole responsibility for such decisions." },
      ],
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable use",
      blocks: [
        { kind: "p", text: "You agree **not** to use the Service to:" },
        { kind: "ul", items: [
          "upload, process or distribute content that is illegal in your jurisdiction or in France;",
          "process files for which you do not hold the necessary rights (copyrighted works without authorisation, personal data you are not entitled to process, classified information);",
          "commit or facilitate fraud, money laundering, the financing of terrorism or any criminal activity;",
          "use the AI humaniser, the AI text tools or any other feature to plagiarise, to deceive a third party, to manipulate evaluation systems (academic, recruitment, ad networks) in a manner that contravenes their rules, or to mislead in any way that breaches applicable law;",
          "attempt to overload, reverse-engineer, scrape, abuse rate limits, or otherwise interfere with the operation or availability of the Service;",
          "circumvent quotas, payment requirements or any other restriction in place;",
          "create multiple accounts to multiply free-tier quotas, or share an account across more individuals than your plan allows.",
        ] },
        { kind: "p", text: "We may suspend or terminate your account immediately and without notice if we have reasonable grounds to believe you have breached this section, with no entitlement to a refund of any kind." },
      ],
    },
    {
      id: "content",
      title: "5. Your content",
      blocks: [
        { kind: "p", text: "You retain all rights, title and interest in the files and text you submit to the Service. You grant us a strictly limited, royalty-free, worldwide licence to process them solely to deliver the tool you requested. This licence terminates the instant the result is returned to you (server-assisted tools) or never comes into being at all (browser-only tools, since your file never reaches us). We do not, and will not, claim ownership of your content or use it to train AI models." },
      ],
    },
    {
      id: "accounts",
      title: "6. Accounts",
      blocks: [
        { kind: "p", text: "You must be at least sixteen (16) years old to create an account. You are responsible for keeping your credentials confidential and for any activity that occurs under your account. Notify us immediately at [support@konvertools.com](mailto:support@konvertools.com) of any suspected unauthorised access." },
      ],
    },
    {
      id: "subscriptions",
      title: "7. Subscriptions, billing and refunds",
      blocks: [
        { kind: "ul", items: [
          "**Plans**: Free (€0), Pro (€12/month or €99/year), Business (€39/month or €349/year). Plan features and quotas are as described on our [Pricing page](/pricing) at the time of purchase. We reserve the right to amend plan features with 30 days' notice.",
          "**Auto-renewal**: monthly and annual subscriptions renew automatically at the same cadence until cancelled. You can cancel at any time from your dashboard; cancellation takes effect at the end of the current billing period. You retain access until that date.",
          "**Right of withdrawal (EU)**: under Article L. 221-28 of the French Consumer Code, when you actively use the Service during the initial 14-day withdrawal period you expressly consent to the immediate performance of the contract and waive your right of withdrawal. If you have not used any paid feature, you may withdraw within 14 days by emailing [support@konvertools.com](mailto:support@konvertools.com) and we will issue a full refund within 14 days.",
          "**No partial refunds**: outside the withdrawal scenario above, fees already paid for the current billing period are non-refundable.",
          "**Credits**: API credits purchased as one-time packs (\"Starter\", \"Growth\", \"Scale\", \"Studio\") **never expire**. The 300 credits automatically granted each month to Business subscribers expire at the end of the calendar month and are **not refundable**.",
          "**Price changes**: we may amend prices with 30 days' notice. Existing subscribers retain their current price until their next renewal date.",
          "**Tax**: prices are shown excluding VAT where applicable. Stripe collects and remits any tax due in your jurisdiction.",
        ] },
      ],
    },
    {
      id: "api",
      title: "8. Public REST API",
      blocks: [
        { kind: "p", text: "The Business plan exposes a public REST API authenticated by API keys you generate from your dashboard. Use of the API is governed additionally by:" },
        { kind: "ul", items: [
          "**Rate limits**: 60 requests per minute (Pro top-ups) or 120 requests per minute (Business). Sustained abuse may result in temporary throttling or permanent key revocation.",
          "**Credit consumption**: each API call deducts credits at the rates published in our [API documentation](/api). Failed calls (5xx responses) do not deduct credits.",
          "**Key security**: you are responsible for storing your API keys securely and rotating them if compromised. We may revoke any key at any time if we suspect abuse.",
          "**Acceptable upstream use**: applications built on our API must comply with these Terms, including the acceptable-use section. You must not expose our API keys to end users (sub-license your service instead).",
        ] },
      ],
    },
    {
      id: "ip",
      title: "9. Intellectual property",
      blocks: [
        { kind: "p", text: "The name, logo, code, design, documentation, database structure and aggregated content of the Service are the exclusive property of the Publisher and are protected by French and international intellectual-property law. No licence is granted to you other than what is strictly necessary to use the Service as intended. You may not reproduce, modify, decompile or create derivative works of the Service or any portion of it, except as expressly permitted by applicable law." },
      ],
    },
    {
      id: "indemnity",
      title: "10. Indemnification",
      blocks: [
        { kind: "p", text: "You agree to indemnify and hold the Publisher harmless from any claim, loss, damage, liability, cost or expense (including reasonable legal fees) arising from (a) your breach of these Terms, (b) your violation of any law or third-party right, or (c) any content you submitted to the Service." },
      ],
    },
    {
      id: "changes",
      title: "11. Changes to the Terms",
      blocks: [
        { kind: "p", text: "We may amend these Terms from time to time. Substantive changes will be notified by email to account holders at least thirty (30) days before they take effect. By continuing to use the Service after that period you accept the amended Terms. The latest version is always available at [https://konvertools.com/terms](https://konvertools.com/terms)." },
      ],
    },
    {
      id: "termination",
      title: "12. Termination",
      blocks: [
        { kind: "p", text: "You may terminate your account at any time from your dashboard. We may terminate or suspend your account immediately and without notice if you breach these Terms, abuse the Service, or fail to pay a recurring subscription. Upon termination your data is deleted within thirty (30) days, except for billing records and consent records retained as described in our Privacy Policy." },
      ],
    },
    {
      id: "law",
      title: "13. Governing law and jurisdiction",
      blocks: [
        { kind: "p", text: "These Terms are governed by the laws of France. Any dispute arising out of or in connection with these Terms or the Service shall be submitted to the exclusive jurisdiction of the courts of Paris, France, except where a consumer's mandatory right of action in their country of residence prevails under European Union or applicable national law. Before commencing legal action, you agree to attempt to resolve the dispute amicably by writing to [support@konvertools.com](mailto:support@konvertools.com). EU consumers may also use the European Commission's Online Dispute Resolution platform at [ec.europa.eu/consumers/odr](https://ec.europa.eu/consumers/odr)." },
      ],
    },
    {
      id: "misc",
      title: "14. Miscellaneous",
      blocks: [
        { kind: "p", text: "If any provision of these Terms is held invalid or unenforceable, the remaining provisions remain in full effect. Our failure to enforce any right or provision is not a waiver of that right. These Terms (together with the Privacy Policy and any plan-specific terms referenced at purchase) constitute the entire agreement between you and the Publisher regarding the Service." },
      ],
    },
  ],
};
