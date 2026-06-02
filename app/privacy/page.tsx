import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";
import { LOCALES, HREFLANG_PREFIX } from "@/lib/seo";

// Comprehensive Privacy Policy — KONVER Part 5. Drafted to maximally protect
// the editor while remaining honest about what the service does. Reviewed
// against the platform's actual data flow (Supabase Auth + Storage + Edge
// Functions, Mistral, VirusTotal, Google Safe Browsing, Stripe, Resend).
// NOTE: this is a model — have it reviewed by a qualified lawyer before
// commercial launch (this notice is for the editor, not the public).

const langAlts: Record<string, string> = {};
for (const l of LOCALES) langAlts[l] = `${SITE_URL}${HREFLANG_PREFIX[l]}/privacy`;
langAlts["x-default"] = `${SITE_URL}/privacy`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Konvertools handles your data: nothing is stored, browser-only tools never upload anything, server tools delete files immediately, GDPR-compliant rights.",
  alternates: { canonical: "/privacy", languages: langAlts },
};

const LAST_UPDATED = "2026-06-02";

function H({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mt-10 scroll-mt-24 text-lg font-semibold text-ink-900">
      {children}
    </h2>
  );
}

export default function Page() {
  return (
    <article className="container max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink-400">
        Last updated: {LAST_UPDATED} · Effective immediately for all visitors and account holders.
      </p>

      <section className="prose prose-sm mt-8 max-w-none text-ink-700">
        <H id="principle">1. Our core principle: we don&apos;t keep your files</H>
        <p>
          Konvertools (the &ldquo;Service&rdquo;) is operated as a privacy-first toolkit. The
          single most important commitment we make is this:
        </p>
        <ul>
          <li>
            <strong>Browser-only tools</strong> (image converters, PDF tools that use pdf-lib, audio
            and video conversions powered by FFmpeg.wasm, code tools, calculators, QR generators,
            most utilities) execute <strong>entirely inside your web browser via WebAssembly</strong>.
            Your file is never transmitted to our servers. We have no technical means to read it.
          </li>
          <li>
            <strong>Server-assisted tools</strong> (AI transcription, AI translation, AI text tasks,
            burn-in video subtitles, the virus scanner, the URL scanner, the phishing detector and a
            small number of others) need to send something to a backend. In every case the file or
            text is processed in real time and either (a) deleted from temporary storage within thirty
            (30) minutes, or (b) — for the virus scanner — never transmitted at all (only the file&apos;s
            SHA-256 hash leaves your device).
          </li>
          <li>
            We never store the <em>content</em> of any uploaded file in any persistent location, we
            never use your uploads to train AI models, and we never sell, rent or share them with
            third parties for any purpose other than delivering the result you requested.
          </li>
        </ul>

        <H id="controller">2. Data controller</H>
        <p>
          For the purposes of the EU General Data Protection Regulation (Regulation (EU) 2016/679,
          &ldquo;GDPR&rdquo;), the data controller is the publisher of the Service. Contact for any
          privacy enquiry:{" "}
          <a className="text-brand-600 underline" href="mailto:privacy@konvertools.com">
            privacy@konvertools.com
          </a>.
        </p>

        <H id="what-we-collect">3. What we collect</H>
        <p>The only personal data we persist in our database is:</p>
        <ul>
          <li>
            <strong>Account credentials</strong>: your email address; a salted, hashed copy of your
            password (managed by Supabase Auth — we never see or store the plaintext); optional
            display name and avatar URL if you sign in with Google.
          </li>
          <li>
            <strong>Subscription state</strong>: current plan (free / Pro / Business), Stripe
            customer identifier, current credit balance, and the dates of your most recent renewals.
          </li>
          <li>
            <strong>Usage counters</strong>: aggregated quota counters (e.g. &ldquo;3 AI runs used
            today&rdquo;, &ldquo;420 monthly AI runs used&rdquo;) updated in place on your profile
            row. We do <strong>not</strong> log per-run records.
          </li>
          <li>
            <strong>Job metadata (transient)</strong>: when a server-assisted tool produces an output
            (e.g. an .srt file from transcription), we record the tool name, the result download
            URL, the source language, and a completion timestamp. These rows are purged automatically
            after <strong>two (2) hours</strong>. They never contain your file&apos;s contents.
          </li>
          <li>
            <strong>Consent records</strong>: the date and time at which you accepted these Terms
            and our Privacy Policy, and whether you opted in to marketing emails. Kept for the
            duration of your account plus a legal-evidence period of five (5) years after deletion.
          </li>
          <li>
            <strong>API keys</strong>: if you generate keys for the public REST API, we store only
            the SHA-256 hash and a 12-character display prefix. The raw key is shown to you exactly
            once at creation and is irrecoverable thereafter.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> collect: your IP address (beyond the temporary use Supabase
          and our hosting provider make of it for rate-limiting and security logging), your browser
          fingerprint, behavioural tracking events, your screen recordings, or any biometric data.
        </p>

        <H id="files">4. Files you process</H>
        <p>
          As stated in section 1, the contents of files you process are never persisted by us. The
          precise lifecycle is:
        </p>
        <ul>
          <li>
            <strong>Browser-only tools</strong>: zero transmission. The file is read into memory by
            your browser, the result is produced locally, and you download it directly. We log
            nothing about the file itself.
          </li>
          <li>
            <strong>AI transcription / translation / OCR / phishing analysis</strong>: the file or
            text is streamed to our Supabase Edge Function, which immediately forwards it to the
            relevant AI provider (see section 7) for inference. The result is returned to you and the
            temporary upload buffer is discarded. Result files written to our private storage bucket
            are signed-URL accessible to you for sixty (60) minutes and physically purged within
            thirty (30) minutes of generation.
          </li>
          <li>
            <strong>Virus scanner</strong>: your file never leaves your browser. We compute its
            SHA-256 fingerprint locally and only send the resulting 64-character hash to VirusTotal.
            VirusTotal cannot reconstruct your file from its hash.
          </li>
          <li>
            <strong>URL scanner</strong>: only the URL string you type is transmitted to Google Safe
            Browsing. No surrounding page contents.
          </li>
        </ul>

        <H id="legal-bases">5. Legal bases for processing (GDPR Art. 6)</H>
        <ul>
          <li>
            <strong>Performance of a contract</strong> (Art. 6(1)(b)) — when you create an account
            and use paid features, processing is necessary to deliver the Service.
          </li>
          <li>
            <strong>Legitimate interests</strong> (Art. 6(1)(f)) — fraud prevention, abuse
            mitigation, basic security logging, and improving the Service.
          </li>
          <li>
            <strong>Consent</strong> (Art. 6(1)(a)) — marketing emails, optional analytics or
            advertising cookies (if and when enabled), and any future optional integration.
          </li>
          <li>
            <strong>Legal obligation</strong> (Art. 6(1)(c)) — retention of billing records as
            required by French tax law (typically ten years).
          </li>
        </ul>

        <H id="rights">6. Your rights</H>
        <p>
          You have the rights of access (Art. 15), rectification (Art. 16), erasure (Art. 17),
          restriction (Art. 18), portability (Art. 20), objection (Art. 21) and to withdraw consent
          at any time without affecting the lawfulness of prior processing. You also have the right
          to lodge a complaint with the CNIL (France) or your local supervisory authority. To
          exercise any right, email{" "}
          <a className="text-brand-600 underline" href="mailto:privacy@konvertools.com">
            privacy@konvertools.com
          </a>{" "}
          from the address registered on your account. We will respond within thirty (30) days, as
          required by GDPR Art. 12(3).
        </p>

        <H id="third-parties">7. Third-party processors</H>
        <p>
          Delivering the Service requires us to share strictly limited data with the following
          processors. Each has its own privacy policy that governs how they handle data they receive
          from us.
        </p>
        <ul>
          <li>
            <strong>Supabase</strong> (Singapore-incorporated, hosted in the EU for our project) —
            authentication, database, file storage, and Edge Functions. Receives your account
            credentials, profile data and (transiently) any file you upload for a server-assisted
            tool. Acts as our sub-processor.
          </li>
          <li>
            <strong>Mistral AI</strong> (France) — large-language-model inference for translation,
            rephrasing, summarisation, the AI humaniser, phishing-pattern analysis, and other text
            tasks; audio transcription (Voxtral); image OCR and Vision tasks (Pixtral). The text or
            image you submit is sent to Mistral for inference. Mistral has contractually committed
            to <strong>not</strong> using API inputs to train its models.
          </li>
          <li>
            <strong>VirusTotal</strong> (Google LLC, USA) — only when you use the Virus Scanner.
            Only the SHA-256 hash of your file is transmitted, never the file itself.
          </li>
          <li>
            <strong>Google Safe Browsing</strong> (Google LLC, USA) — only when you use the URL
            Scanner or the Phishing Detector. Only the URLs you submit (or links extracted from the
            email you paste) are transmitted.
          </li>
          <li>
            <strong>Stripe</strong> (USA / Ireland) — payment processing and subscription
            management. We <strong>never see or store</strong> your card details. Stripe receives
            your email, payment method, and the plan/credit-pack you bought.
          </li>
          <li>
            <strong>Resend</strong> (USA) — transactional email delivery (account confirmation,
            payment receipts, password reset). Receives your email address and the email body we
            send.
          </li>
          <li>
            <strong>Vercel</strong> (USA) — content delivery network for static pages. Receives
            standard web-traffic metadata (IP, user-agent, requested URL) for routing and abuse
            prevention. Kept in line with Vercel&apos;s log retention policy.
          </li>
        </ul>
        <p>
          Where any of these processors operates outside the European Economic Area, transfers are
          governed by the European Commission&apos;s Standard Contractual Clauses (SCCs) or an
          equivalent transfer mechanism.
        </p>

        <H id="cookies">8. Cookies and similar technologies</H>
        <p>We use only the following cookies and local-storage items:</p>
        <ul>
          <li>
            <strong>Essential</strong>: <code>NEXT_LOCALE</code> (remembers your chosen language),
            and Supabase session cookies (<code>sb-*-auth-token</code>) when you are signed in.
            These do not require consent under GDPR.
          </li>
          <li>
            <strong>Optional advertising</strong>: if and when we enable ad partners (currently
            Ezoic is referenced in our code but not yet activated for your traffic), we will display
            a clear consent banner and only set advertising cookies once you opt in.
          </li>
        </ul>
        <p>
          We do not currently run any analytics, tracking pixels or remarketing tags. If we add any,
          the cookie banner above will gate them.
        </p>

        <H id="security">9. Security</H>
        <p>
          All traffic to and from the Service is encrypted with TLS 1.2 or higher. Passwords are
          stored as Argon2 hashes by Supabase Auth. We check new passwords against the public
          HaveIBeenPwned k-anonymity API client-side, so a known-breached password cannot be used.
          API keys are stored only as SHA-256 hashes. Database rows are protected by row-level
          security policies that ensure one user cannot read another user&apos;s data. Despite these
          measures, no system is perfectly secure; you accept the residual risk inherent to any
          online service.
        </p>

        <H id="retention">10. Retention</H>
        <ul>
          <li>Profile data: kept while your account exists, deleted within thirty (30) days of account closure.</li>
          <li>Job metadata: purged automatically after two (2) hours.</li>
          <li>Result files in the storage bucket: physically deleted within thirty (30) minutes of generation.</li>
          <li>Billing records: retained for ten (10) years to comply with French tax obligations.</li>
          <li>Consent records: kept for the duration of your account plus five (5) years thereafter as legal evidence.</li>
        </ul>

        <H id="minors">11. Minors</H>
        <p>
          The Service is <strong>not directed at children under sixteen (16)</strong>. If you are
          under that age you must not create an account. We do not knowingly collect data from
          minors; if we become aware that we have, we will delete it.
        </p>

        <H id="changes">12. Changes to this policy</H>
        <p>
          We may amend this Privacy Policy from time to time. Substantive changes will be announced
          by email to account holders at least thirty (30) days before they take effect. The latest
          version is always available at{" "}
          <a className="text-brand-600 underline" href={`${SITE_URL}/privacy`}>{SITE_URL}/privacy</a>.
        </p>

        <H id="contact">13. Contact</H>
        <p>
          For any question about this policy or your data, write to{" "}
          <a className="text-brand-600 underline" href="mailto:privacy@konvertools.com">privacy@konvertools.com</a>.
          You may also lodge a complaint with the French data-protection authority (CNIL,{" "}
          <a className="text-brand-600 underline" href="https://www.cnil.fr/" rel="noopener">cnil.fr</a>)
          or with the supervisory authority of your country of residence.
        </p>
      </section>
    </article>
  );
}
