import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}. Learn how we collect, use, and protect your personal information.`,
  alternates: { canonical: `${SITE.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-primary-foreground/70 mt-2">Last updated: February 2026</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you use our website or contact us for an estimate, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Project details and service preferences you provide through our forms</li>
              <li>Photos you upload related to your project</li>
              <li>Usage data such as pages visited, time on site, and referring URLs through analytics tools</li>
              <li>Device information including browser type, operating system, and screen size</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To respond to your estimate requests and service inquiries</li>
              <li>To schedule consultations and manage ongoing projects</li>
              <li>To send project updates and follow-up communications</li>
              <li>To improve our website, services, and customer experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information with trusted service providers who assist us in operating our website and
              conducting business (such as email delivery services and analytics providers), as long as
              those parties agree to keep your information confidential.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Analytics</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use analytics tools to understand how visitors use our website. These tools may collect
              information such as pages visited, time spent on pages, and general geographic location. This
              data helps us improve our website and better serve our customers. Analytics data is aggregated
              and does not personally identify individual visitors.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may use cookies to enhance your browsing experience, remember your preferences,
              and provide analytics data. You can configure your browser to refuse cookies or alert you when
              cookies are being sent. Some features of our website may not function properly without cookies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement reasonable security measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction. However, no method of electronic
              transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may request to view, update, or delete the personal information we have on file for you.
              To make such a request, please contact us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand hover:underline">
                {SITE.email}
              </a>{" "}
              or call{" "}
              <a href={SITE.phoneTel} className="text-brand hover:underline">
                {SITE.phone}
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on this page
              with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this privacy policy or our data practices, please contact us:
            </p>
            <ul className="list-none mt-3 space-y-1 text-muted-foreground">
              <li><strong>{SITE.name}</strong></li>
              <li>Email: <a href={`mailto:${SITE.email}`} className="text-brand hover:underline">{SITE.email}</a></li>
              <li>Phone: <a href={SITE.phoneTel} className="text-brand hover:underline">{SITE.phone}</a></li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
