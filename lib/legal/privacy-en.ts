import type { LegalDoc } from "@/lib/legal/types";

// Canonical English source for the Privacy Policy. Translations are derived
// from this file by scripts/translate-legal.mjs and written to
// lib/legal/privacy-translations.generated.ts.
//
// Keep section ids stable across edits so deep links survive.

export const PRIVACY_EN: LegalDoc = {
  h1: "Privacy Policy",
  lastUpdated: "2026-06-02",
  lastUpdatedLabel: "Last updated: %DATE% · Effective immediately for all visitors and account holders.",
  sections: [
    {
      id: "principle",
      title: "1. Our core principle: we don't keep your files",
      blocks: [
        { kind: "p", text: "Konvertools (the \"Service\") is operated as a privacy-first toolkit. The single most important commitment we make is this:" },
        { kind: "ul", items: [
          "**Browser-only tools** (image converters, PDF tools that use pdf-lib, audio and video conversions powered by FFmpeg.wasm, code tools, calculators, QR generators, the password breach checker, most utilities) execute **entirely inside your web browser via WebAssembly**. Your file or input is never transmitted to our servers. We have no technical means to read it.",
          "**Server-assisted tools** (AI transcription, AI translation, AI text tasks, burn-in video subtitles, the URL scanner, the phishing detector, the SSL certificate checker and a small number of others) need to send something to a backend. In every case the file or text is processed in real time and deleted from temporary storage within thirty (30) minutes.",
          "We never store the content of any uploaded file in any persistent location, we never use your uploads to train AI models, and we never sell, rent or share them with third parties for any purpose other than delivering the result you requested.",
        ] },
      ],
    },
    {
      id: "controller",
      title: "2. Data controller",
      blocks: [
        { kind: "p", text: "For the purposes of the EU General Data Protection Regulation (Regulation (EU) 2016/679, \"GDPR\"), the data controller is the publisher of the Service. Contact for any privacy enquiry: [support@konvertools.com](mailto:support@konvertools.com)." },
      ],
    },
    {
      id: "what-we-collect",
      title: "3. What we collect",
      blocks: [
        { kind: "p", text: "The only personal data we persist in our database is:" },
        { kind: "ul", items: [
          "**Account credentials**: your email address; a salted, hashed copy of your password (managed by Supabase Auth — we never see or store the plaintext); optional display name and avatar URL if you sign in with Google.",
          "**Subscription state**: current plan (free / Pro / Business), Stripe customer identifier, current credit balance, and the dates of your most recent renewals.",
          "**Usage counters**: aggregated quota counters (e.g. \"3 AI runs used today\", \"420 monthly AI runs used\") updated in place on your profile row. We do **not** log per-run records.",
          "**Job metadata (transient)**: when a server-assisted tool produces an output (e.g. an .srt file from transcription), we record the tool name, the result download URL, the source language, and a completion timestamp. These rows are purged automatically after **two (2) hours**. They never contain your file's contents.",
          "**Consent records**: the date and time at which you accepted these Terms and our Privacy Policy, and whether you opted in to marketing emails. Kept for the duration of your account plus a legal-evidence period of five (5) years after deletion.",
          "**API keys**: if you generate keys for the public REST API, we store only the SHA-256 hash and a 12-character display prefix. The raw key is shown to you exactly once at creation and is irrecoverable thereafter.",
        ] },
        { kind: "p", text: "We do **not** collect: your IP address (beyond the temporary use Supabase and our hosting provider make of it for rate-limiting and security logging), your browser fingerprint, behavioural tracking events, your screen recordings, or any biometric data." },
      ],
    },
    {
      id: "files",
      title: "4. Files you process",
      blocks: [
        { kind: "p", text: "As stated in section 1, the contents of files you process are never persisted by us. The precise lifecycle is:" },
        { kind: "ul", items: [
          "**Browser-only tools**: zero transmission. The file is read into memory by your browser, the result is produced locally, and you download it directly. We log nothing about the file itself.",
          "**AI transcription / translation / OCR / phishing analysis**: the file or text is streamed to our Supabase Edge Function, which immediately forwards it to the relevant AI provider (see section 7) for inference. The result is returned to you and the temporary upload buffer is discarded. Result files written to our private storage bucket are signed-URL accessible to you for sixty (60) minutes and physically purged within thirty (30) minutes of generation.",
          "**Password breach checker**: your password never leaves your browser. We hash it locally with SHA-1 and query HaveIBeenPwned using k-anonymity — only the first 5 characters of the hash are sent. The password and full hash are never transmitted.",
          "**URL scanner / SSL checker**: only the URL or hostname you type is transmitted (to Google Safe Browsing for the URL scanner, or used to open a live TLS connection for the SSL checker). No surrounding page contents.",
        ] },
      ],
    },
    {
      id: "legal-bases",
      title: "5. Legal bases for processing (GDPR Art. 6)",
      blocks: [
        { kind: "ul", items: [
          "**Performance of a contract** (Art. 6(1)(b)) — when you create an account and use paid features, processing is necessary to deliver the Service.",
          "**Legitimate interests** (Art. 6(1)(f)) — fraud prevention, abuse mitigation, basic security logging, and improving the Service.",
          "**Consent** (Art. 6(1)(a)) — marketing emails, optional analytics or advertising cookies (if and when enabled), and any future optional integration.",
          "**Legal obligation** (Art. 6(1)(c)) — retention of billing records as required by French tax law (typically ten years).",
        ] },
      ],
    },
    {
      id: "rights",
      title: "6. Your rights under the GDPR",
      blocks: [
        { kind: "p", text: "As a data subject under Regulation (EU) 2016/679 of 27 April 2016 (the \"GDPR\"), you enjoy the following rights, exercisable at any time and free of charge from the email address registered on your account:" },
        { kind: "ul", items: [
          "**Right of access** (GDPR Art. 15) — obtain confirmation that we process your data and a copy of it.",
          "**Right of rectification** (GDPR Art. 16) — have inaccurate or incomplete data corrected.",
          "**Right of erasure / right to be forgotten** (GDPR Art. 17) — have your data deleted when the legal grounds for processing no longer apply.",
          "**Right to restriction of processing** (GDPR Art. 18) — temporarily freeze processing while a dispute is resolved.",
          "**Right to data portability** (GDPR Art. 20) — receive your data in a structured, machine-readable format.",
          "**Right to object** (GDPR Art. 21) — object at any time, on grounds relating to your particular situation, to processing based on our legitimate interests.",
          "**Right to withdraw consent** (GDPR Art. 7(3)) — for processing based on consent, withdraw it at any time without affecting the lawfulness of prior processing.",
          "**Right not to be subject to automated decision-making** (GDPR Art. 22) — none of our processing involves solely-automated decisions producing legal effects on you.",
        ] },
        { kind: "p", text: "To exercise any of these rights, write to [support@konvertools.com](mailto:support@konvertools.com) from the address registered on your account. We will respond within one (1) month, as required by GDPR Art. 12(3); the period may be extended by two further months for particularly complex requests, in which case we will inform you within the first month." },
        { kind: "p", text: "You also have the **right to lodge a complaint with a supervisory authority** (GDPR Art. 77). For users in France, this is the **Commission Nationale de l'Informatique et des Libertés (CNIL)** — 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07, France — telephone +33 (0)1 53 73 22 22 — online complaints at [www.cnil.fr/en/plaintes](https://www.cnil.fr/en/plaintes). For users in other EU/EEA Member States, you may lodge a complaint with your **national supervisory authority** (the list is maintained by the European Data Protection Board at [edpb.europa.eu](https://edpb.europa.eu/about-edpb/about-edpb/members_en)). You may also seek a judicial remedy under GDPR Art. 79." },
      ],
    },
    {
      id: "third-parties",
      title: "7. Third-party processors",
      blocks: [
        { kind: "p", text: "Delivering the Service requires us to share strictly limited data with the following processors. Each has its own privacy policy that governs how they handle data they receive from us." },
        { kind: "ul", items: [
          "**Supabase** (Singapore-incorporated, hosted in the EU for our project) — authentication, database, file storage, and Edge Functions. Receives your account credentials, profile data and (transiently) any file you upload for a server-assisted tool. Acts as our sub-processor.",
          "**Mistral AI** (France) — large-language-model inference for translation, rephrasing, summarisation, the AI humaniser, phishing-pattern analysis, and other text tasks; audio transcription (Voxtral); image OCR and Vision tasks (Pixtral). The text or image you submit is sent to Mistral for inference. Mistral has contractually committed to **not** using API inputs to train its models.",
          "**Google Safe Browsing** (Google LLC, USA) — only when you use the URL Scanner or the Phishing Detector. Only the URLs you submit (or links extracted from the email you paste) are transmitted. This is the only third-party security service we use.",
          "**HaveIBeenPwned** (Have I Been Pwned LLC) — only when you use the Password Breach Checker, and only ever the first 5 characters of your password's SHA-1 hash (k-anonymity). Queried directly from your browser, not through our servers.",
          "**Stripe** (USA / Ireland) — payment processing and subscription management. We **never see or store** your card details. Stripe receives your email, payment method, and the plan/credit-pack you bought.",
          "**Resend** (USA) — transactional email delivery (account confirmation, payment receipts, password reset). Receives your email address and the email body we send.",
          "**Vercel** (USA) — content delivery network for static pages. Receives standard web-traffic metadata (IP, user-agent, requested URL) for routing and abuse prevention. Kept in line with Vercel's log retention policy.",
        ] },
        { kind: "p", text: "Where any of these processors operates outside the European Economic Area, transfers are governed by the European Commission's Standard Contractual Clauses (SCCs) or an equivalent transfer mechanism." },
      ],
    },
    {
      id: "cookies",
      title: "8. Cookies and similar technologies",
      blocks: [
        { kind: "p", text: "We use only the following cookies and local-storage items:" },
        { kind: "ul", items: [
          "**Essential**: NEXT_LOCALE (remembers your chosen language), and Supabase session cookies (sb-*-auth-token) when you are signed in. These do not require consent under GDPR.",
          "**Optional advertising**: if and when we enable ad partners (currently Ezoic is referenced in our code but not yet activated for your traffic), we will display a clear consent banner and only set advertising cookies once you opt in.",
        ] },
        { kind: "p", text: "We do not currently run any analytics, tracking pixels or remarketing tags. If we add any, the cookie banner above will gate them." },
      ],
    },
    {
      id: "security",
      title: "9. Security of processing (GDPR Art. 32)",
      blocks: [
        { kind: "p", text: "In accordance with GDPR Art. 32, we implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk:" },
        { kind: "ul", items: [
          "**Encryption in transit** — all traffic to and from the Service is protected by TLS 1.2 or higher.",
          "**Encryption at rest** — Supabase encrypts the underlying database (including your account data) with AES-256.",
          "**Password handling** — your password is hashed by Supabase Auth and never stored in plaintext. We additionally check new passwords against the HaveIBeenPwned k-anonymity API client-side to refuse known-breached passwords.",
          "**API keys** — stored only as SHA-256 hashes with a 12-character display prefix. The raw key is shown to you exactly once at creation and is irrecoverable thereafter.",
          "**Payment data** — never seen or stored by us; the card payment flow is fully delegated to Stripe (PCI-DSS Level 1 certified).",
          "**Access control** — row-level security policies prevent one user from reading another user's data; service-role keys are restricted to Edge Functions.",
          "**File hygiene** — no uploaded file is ever retained: browser-only tools never transmit anything, and server-assisted tools delete temporary buffers within 30 minutes.",
          "**Vulnerability response** — security issues can be reported in confidence to [support@konvertools.com](mailto:support@konvertools.com).",
        ] },
        { kind: "p", text: "Despite these measures, no system is perfectly secure; you accept the residual risk inherent to any online service." },
      ],
    },
    {
      id: "minimisation",
      title: "10. Data minimisation and purpose limitation (GDPR Art. 5)",
      blocks: [
        { kind: "p", text: "In accordance with GDPR Art. 5(1)(c), we collect only the data strictly necessary for the purposes set out in this Policy. Concretely: we do not collect your IP address beyond ephemeral routing logs, we do not fingerprint your browser, we do not run behavioural analytics, and we never use any file you process to train AI models. We do not collect special-category data (Art. 9) or data relating to criminal offences (Art. 10). Data are kept accurate and up to date (Art. 5(1)(d)); you can correct any inaccuracy at any time via your dashboard or by contacting [support@konvertools.com](mailto:support@konvertools.com)." },
      ],
    },
    {
      id: "retention",
      title: "11. Retention",
      blocks: [
        { kind: "ul", items: [
          "Profile data: kept while your account exists, deleted within thirty (30) days of account closure.",
          "Job metadata: purged automatically after two (2) hours.",
          "Result files in the storage bucket: physically deleted within thirty (30) minutes of generation.",
          "Billing records: retained for ten (10) years to comply with French tax obligations.",
          "Consent records: kept for the duration of your account plus five (5) years thereafter as legal evidence.",
        ] },
      ],
    },
    {
      id: "minors",
      title: "12. Minors",
      blocks: [
        { kind: "p", text: "The Service is **not directed at children under sixteen (16)**. If you are under that age you must not create an account. We do not knowingly collect data from minors; if we become aware that we have, we will delete it." },
      ],
    },
    {
      id: "changes",
      title: "13. Changes to this policy",
      blocks: [
        { kind: "p", text: "We may amend this Privacy Policy from time to time. Substantive changes will be announced by email to account holders at least thirty (30) days before they take effect. The latest version is always available at [https://konvertools.com/privacy](https://konvertools.com/privacy)." },
      ],
    },
    {
      id: "contact",
      title: "14. Contact",
      blocks: [
        { kind: "p", text: "For any question about this policy or your data — including the exercise of any of your GDPR rights (see section 6) — write to [support@konvertools.com](mailto:support@konvertools.com). This single mailbox is our point of contact for privacy, security, billing and general support enquiries. You may also lodge a complaint with the French data-protection authority CNIL (3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — [www.cnil.fr](https://www.cnil.fr)) or with the supervisory authority of your country of residence." },
      ],
    },
  ],
};
