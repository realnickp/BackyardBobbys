import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for the ${SITE.name} website. Please read these terms carefully before using our site.`,
  alternates: { canonical: `${SITE.url}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          <p className="text-primary-foreground/70 mt-2">Last updated: February 2026</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the {SITE.name} website ({SITE.domain}), you agree to be bound
              by these Terms of Service. If you do not agree with any part of these terms, please do
              not use our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              {SITE.name} provides outdoor construction and renovation services in {SITE.address.region},{" "}
              {SITE.address.state} and surrounding areas. Service descriptions on our website are for
              informational purposes. Actual project scope, timelines, materials, and pricing are
              determined through individual consultations and documented in separate project agreements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Estimates and Pricing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estimates provided through our website, phone, or on-site consultations are non-binding
              until a formal written agreement is signed by both parties. Project costs may vary based on
              site conditions, material availability, permits, and scope changes. All pricing details will
              be clearly outlined in your project contract.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website — including text, images, logos, and design elements — is the
              property of {SITE.name} or its content suppliers and is protected by applicable intellectual
              property laws. You may not reproduce, distribute, or create derivative works from our content
              without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">User Submissions</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you submit information through our contact forms, estimate requests, or other
              communication channels, you grant {SITE.name} the right to use that information to
              provide services, communicate with you, and improve our business operations. We will
              handle your information in accordance with our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              {SITE.name} provides this website on an &ldquo;as is&rdquo; basis. We make no warranties
              or representations about the accuracy or completeness of the content on this site. To the
              fullest extent permitted by law, {SITE.name} shall not be liable for any indirect,
              incidental, or consequential damages arising from your use of this website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">External Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites or services. We are not responsible
              for the content, privacy practices, or availability of those external sites. Linking does
              not imply endorsement.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by the laws of the State of Maryland. Any disputes arising from
              these terms or your use of our website shall be resolved in the courts of{" "}
              {SITE.address.region}, Maryland.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to update these terms at any time. Changes will be posted on this
              page with an updated revision date. Continued use of the website after changes are posted
              constitutes acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these terms, contact us:
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
