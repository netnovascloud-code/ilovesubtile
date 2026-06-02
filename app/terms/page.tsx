import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";

// Comprehensive Terms of Service — KONVER Part 5. Drafted to maximally
// protect the editor (broad disclaimers around the security tools in
// particular) while remaining honest about the Service.
// NOTE: this is a model — have it reviewed by a qualified lawyer before
// commercial launch (this notice is for the editor, not the public).

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The legal terms governing use of Konvertools — service description, limitation of liability, acceptable use, subscriptions, API, intellectual property and French jurisdiction.",
  alternates: { canonical: "/terms" },
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
      <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Terms of Service</h1>
      <p className="mt-3 text-sm text-ink-400">
        Last updated: {LAST_UPDATED} · By using Konvertools you agree to these terms.
      </p>

      <section className="prose prose-sm mt-8 max-w-none text-ink-700">
        <H id="acceptance">1. Acceptance</H>
        <p>
          These Terms of Service (the &ldquo;Terms&rdquo;) form a binding agreement between you (the
          &ldquo;User&rdquo;) and the publisher of Konvertools (the &ldquo;Publisher&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) regarding your use of the Konvertools website and all related
          tools, APIs and services (collectively the &ldquo;Service&rdquo;). By creating an account,
          ticking the acceptance checkbox at signup, or simply by using any tool on the Service,
          you confirm that you have read, understood and accepted these Terms in full, together with
          our Privacy Policy.
        </p>

        <H id="service">2. The Service</H>
        <p>
          Konvertools provides a catalogue of file-conversion utilities, document and image
          processing tools, AI-assisted text utilities, indicative security tools (virus scanner,
          email verifier, phishing detector, URL scanner) and developer utilities. Most tools execute
          entirely in your browser; some require server processing. The Service is offered{" "}
          <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> without any warranty of any kind, express or
          implied, including merchantability, fitness for a particular purpose, or non-infringement.
        </p>

        <H id="liability">3. Limitation of liability — read carefully</H>
        <p>
          <strong>
            To the maximum extent permitted by law, the Publisher disclaims any liability for damages
            of any kind arising from your use of, or inability to use, the Service.
          </strong>{" "}
          In particular, you acknowledge and agree that the Publisher shall not be liable for:
        </p>
        <ul>
          <li>loss of data, corrupted or incorrect files, or failed conversions;</li>
          <li>decisions, financial, business or otherwise, that you take based on the output of any tool;</li>
          <li>downtime, latency, or temporary unavailability of any feature;</li>
          <li>third-party service failures (Supabase, Mistral, VirusTotal, Google, Stripe, Resend, hosting providers);</li>
          <li>indirect, incidental, special, consequential or punitive damages of any kind;</li>
          <li>any aggregate amount in excess of the fees you actually paid to us in the twelve (12) months preceding the event giving rise to the claim, capped at one hundred (100) euros for free-tier users.</li>
        </ul>
        <p>
          <strong>Security tools</strong>: the Virus Scanner, the URL Scanner, the Phishing Detector
          and the Email Verifier are provided <strong>for informational and indicative purposes
          only</strong>. They aggregate third-party signals (VirusTotal&apos;s 70+ antivirus engines,
          Google Safe Browsing, public DNS) and large-language-model heuristics. They <strong>do not
          constitute a guarantee of safety, validity or absence of risk</strong>. New malware can
          evade detection until antivirus engines are updated; new phishing pages appear faster than
          reputation databases can catalogue them; an email that passes our checks may still be
          inactive or fraudulent. The Publisher expressly declines all liability for any harm
          resulting from a malicious file the Service did not flag, a phishing email the Service
          deemed safe, an unsafe link the Service failed to identify, or a transactional email sent
          to an address the Service marked as valid. The User assumes sole responsibility for
          security decisions taken on the basis of these tools.
        </p>

        <H id="acceptable-use">4. Acceptable use</H>
        <p>You agree <strong>not</strong> to use the Service to:</p>
        <ul>
          <li>upload, process or distribute content that is illegal in your jurisdiction or in France;</li>
          <li>process files for which you do not hold the necessary rights (copyrighted works without authorisation, personal data you are not entitled to process, classified information);</li>
          <li>commit or facilitate fraud, money laundering, the financing of terrorism or any criminal activity;</li>
          <li>use the AI humaniser, the AI text tools or any other feature to plagiarise, to deceive a third party, to manipulate evaluation systems (academic, recruitment, ad networks) in a manner that contravenes their rules, or to mislead in any way that breaches applicable law;</li>
          <li>upload malware to test our scanner if doing so would breach the law in your jurisdiction (use the EICAR test file instead);</li>
          <li>attempt to overload, reverse-engineer, scrape, abuse rate limits, or otherwise interfere with the operation or availability of the Service;</li>
          <li>circumvent quotas, payment requirements or any other restriction in place;</li>
          <li>create multiple accounts to multiply free-tier quotas, or share an account across more individuals than your plan allows.</li>
        </ul>
        <p>
          We may suspend or terminate your account immediately and without notice if we have
          reasonable grounds to believe you have breached this section, with no entitlement to a
          refund of any kind.
        </p>

        <H id="content">5. Your content</H>
        <p>
          You retain all rights, title and interest in the files and text you submit to the Service.
          You grant us a strictly limited, royalty-free, worldwide licence to process them solely to
          deliver the tool you requested. This licence terminates the instant the result is returned
          to you (server-assisted tools) or never comes into being at all (browser-only tools, since
          your file never reaches us). We do not, and will not, claim ownership of your content or
          use it to train AI models.
        </p>

        <H id="accounts">6. Accounts</H>
        <p>
          You must be at least sixteen (16) years old to create an account. You are responsible for
          keeping your credentials confidential and for any activity that occurs under your account.
          Notify us immediately at{" "}
          <a className="text-brand-600 underline" href="mailto:security@konvertools.com">security@konvertools.com</a>{" "}
          of any suspected unauthorised access.
        </p>

        <H id="subscriptions">7. Subscriptions, billing and refunds</H>
        <ul>
          <li>
            <strong>Plans</strong>: Free (€0), Pro (€12/month or €99/year), Business (€39/month or
            €349/year). Plan features and quotas are as described on our{" "}
            <a className="text-brand-600 underline" href="/pricing">Pricing page</a> at the time of
            purchase. We reserve the right to amend plan features with 30 days&apos; notice.
          </li>
          <li>
            <strong>Auto-renewal</strong>: monthly and annual subscriptions renew automatically at
            the same cadence until cancelled. You can cancel at any time from your dashboard;
            cancellation takes effect at the end of the current billing period. You retain access
            until that date.
          </li>
          <li>
            <strong>Right of withdrawal (EU)</strong>: under Article L. 221-28 of the French
            Consumer Code, when you actively use the Service during the initial 14-day withdrawal
            period you expressly consent to the immediate performance of the contract and waive your
            right of withdrawal. If you have not used any paid feature, you may withdraw within 14
            days by emailing{" "}
            <a className="text-brand-600 underline" href="mailto:billing@konvertools.com">billing@konvertools.com</a>{" "}
            and we will issue a full refund within 14 days.
          </li>
          <li>
            <strong>No partial refunds</strong>: outside the withdrawal scenario above, fees already
            paid for the current billing period are non-refundable.
          </li>
          <li>
            <strong>Credits</strong>: API credits purchased as one-time packs (&ldquo;Starter&rdquo;,
            &ldquo;Growth&rdquo;, &ldquo;Scale&rdquo;, &ldquo;Studio&rdquo;) <strong>never expire</strong>.
            The 300 credits automatically granted each month to Business subscribers expire at the
            end of the calendar month and are <strong>not refundable</strong>.
          </li>
          <li>
            <strong>Price changes</strong>: we may amend prices with 30 days&apos; notice. Existing
            subscribers retain their current price until their next renewal date.
          </li>
          <li>
            <strong>Tax</strong>: prices are shown excluding VAT where applicable. Stripe collects
            and remits any tax due in your jurisdiction.
          </li>
        </ul>

        <H id="api">8. Public REST API</H>
        <p>
          The Business plan exposes a public REST API authenticated by API keys you generate from
          your dashboard. Use of the API is governed additionally by:
        </p>
        <ul>
          <li>
            <strong>Rate limits</strong>: 60 requests per minute (Pro top-ups) or 120 requests per
            minute (Business). Sustained abuse may result in temporary throttling or permanent key
            revocation.
          </li>
          <li>
            <strong>Credit consumption</strong>: each API call deducts credits at the rates published
            in our <a className="text-brand-600 underline" href="/api">API documentation</a>.
            Failed calls (5xx responses) do not deduct credits.
          </li>
          <li>
            <strong>Key security</strong>: you are responsible for storing your API keys securely
            and rotating them if compromised. We may revoke any key at any time if we suspect abuse.
          </li>
          <li>
            <strong>Acceptable upstream use</strong>: applications built on our API must comply with
            these Terms, including the acceptable-use section. You must not expose our API keys to
            end users (sub-license your service instead).
          </li>
        </ul>

        <H id="ip">9. Intellectual property</H>
        <p>
          The name, logo, code, design, documentation, database structure and aggregated content of
          the Service are the exclusive property of the Publisher and are protected by French and
          international intellectual-property law. No licence is granted to you other than what is
          strictly necessary to use the Service as intended. You may not reproduce, modify, decompile
          or create derivative works of the Service or any portion of it, except as expressly
          permitted by applicable law.
        </p>

        <H id="indemnity">10. Indemnification</H>
        <p>
          You agree to indemnify and hold the Publisher harmless from any claim, loss, damage,
          liability, cost or expense (including reasonable legal fees) arising from (a) your breach
          of these Terms, (b) your violation of any law or third-party right, or (c) any content you
          submitted to the Service.
        </p>

        <H id="changes">11. Changes to the Terms</H>
        <p>
          We may amend these Terms from time to time. Substantive changes will be notified by email
          to account holders at least thirty (30) days before they take effect. By continuing to use
          the Service after that period you accept the amended Terms. The latest version is always
          available at{" "}
          <a className="text-brand-600 underline" href={`${SITE_URL}/terms`}>{SITE_URL}/terms</a>.
        </p>

        <H id="termination">12. Termination</H>
        <p>
          You may terminate your account at any time from your dashboard. We may terminate or
          suspend your account immediately and without notice if you breach these Terms, abuse the
          Service, or fail to pay a recurring subscription. Upon termination your data is deleted
          within thirty (30) days, except for billing records and consent records retained as
          described in our Privacy Policy.
        </p>

        <H id="law">13. Governing law and jurisdiction</H>
        <p>
          These Terms are governed by the laws of France. Any dispute arising out of or in
          connection with these Terms or the Service shall be submitted to the exclusive
          jurisdiction of the courts of Paris, France, except where a consumer&apos;s mandatory
          right of action in their country of residence prevails under European Union or applicable
          national law. Before commencing legal action, you agree to attempt to resolve the dispute
          amicably by writing to{" "}
          <a className="text-brand-600 underline" href="mailto:legal@konvertools.com">legal@konvertools.com</a>.
          EU consumers may also use the European Commission&apos;s Online Dispute Resolution
          platform at{" "}
          <a className="text-brand-600 underline" href="https://ec.europa.eu/consumers/odr" rel="noopener">
            ec.europa.eu/consumers/odr
          </a>.
        </p>

        <H id="misc">14. Miscellaneous</H>
        <p>
          If any provision of these Terms is held invalid or unenforceable, the remaining provisions
          remain in full effect. Our failure to enforce any right or provision is not a waiver of
          that right. These Terms (together with the Privacy Policy and any plan-specific terms
          referenced at purchase) constitute the entire agreement between you and the Publisher
          regarding the Service.
        </p>
      </section>
    </article>
  );
}
