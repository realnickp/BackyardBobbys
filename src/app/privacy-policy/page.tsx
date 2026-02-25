import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Backyard Bobby's",
  description: `Privacy Policy for Backyard Bobby's LLC. Learn how we collect, use, store, and protect your personal information.`,
  alternates: { canonical: `${SITE.url}/privacy-policy` },
  openGraph: {
    images: ["/og-image.png"],
  },
  twitter: {
    images: ["/og-image.png"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-primary-foreground/70 mt-2">Effective: January 21, 2026</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl space-y-10">

          <p className="text-muted-foreground leading-relaxed">
            Backyard Bobbys LLC (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
            a Maryland-licensed Home Improvement Contractor (MHIC # 05-163777), is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website (backyardbobbys.com), use our chatbot, submit forms, or otherwise engage
            with our services. By using our website or services, you consent to the practices described below.
          </p>

          <div>
            <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information you provide directly and information gathered automatically when you use our website.
            </p>

            <h3 className="text-lg font-semibold mb-2">Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Project details, service preferences, desired timeframe, and budget range</li>
              <li>City, zip code, or other location information</li>
              <li>Photos you upload related to your project</li>
              <li>Preferred stamped concrete style or material selections</li>
              <li>Chat conversations with our virtual assistant (&ldquo;Max&rdquo;)</li>
              <li>Financing pre-qualification information submitted through our third-party partner (Wisetack)</li>
              <li>Any other information you choose to provide via forms, email, phone, or text</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Device information: browser type, operating system, screen resolution</li>
              <li>Usage data: pages visited, time on site, click patterns, and referring URLs</li>
              <li>IP address and approximate geographic location</li>
              <li>UTM parameters and campaign tracking data from marketing links</li>
              <li>Cookies and similar tracking technologies (see Section 6 below)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To respond to your estimate requests and service inquiries</li>
              <li>To schedule consultations, on-site visits, and manage ongoing projects</li>
              <li>To provide personalized service recommendations based on your project details</li>
              <li>To send project updates, follow-up communications, and appointment reminders</li>
              <li>To process payments and manage contracts</li>
              <li>To score and prioritize leads so we can respond to urgent requests faster</li>
              <li>To improve our website, services, and overall customer experience</li>
              <li>To run marketing campaigns and measure their effectiveness</li>
              <li>To comply with Maryland Home Improvement Commission (MHIC) regulations and other legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">3. Information Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We do not sell, trade, or rent your personal information to third parties. We may share your
              information in the following limited circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Service providers:</strong> Trusted partners who help operate our business, such as
                email delivery services, cloud hosting (Vercel, Supabase), analytics platforms, and payment
                processors. These parties are contractually obligated to protect your data.
              </li>
              <li>
                <strong>Subcontractors:</strong> Licensed professionals we engage to complete portions of your
                project (e.g., stamped concrete specialists, permit expediters). Only project-relevant information
                is shared.
              </li>
              <li>
                <strong>Financing partners:</strong> If you apply for financing through Wisetack, your
                pre-qualification data is handled directly by Wisetack under their own privacy policy. We do not
                store your financial or credit information.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose information if required by law, court order,
                or government regulation, or to protect our rights, safety, or property.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">4. Chatbot and AI Assistant</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Our website features an AI-powered virtual assistant (&ldquo;Max&rdquo;) that helps answer your
                questions and qualify your project needs. When you interact with Max:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your conversation is processed by OpenAI&apos;s API to generate responses</li>
                <li>Chat transcripts may be saved to our database to help our team understand your project and follow up effectively</li>
                <li>We may extract project details (service type, size, timeline) from the conversation to pre-fill your lead record</li>
                <li>Conversations are not used to train AI models and are treated as confidential business communications</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">5. Data Storage and Security</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Your personal information is stored securely using industry-standard cloud infrastructure. We
                implement reasonable administrative, technical, and physical safeguards to protect your data against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                However, no method of electronic transmission or storage is 100% secure. While we strive to protect
                your data, we cannot guarantee absolute security.
              </p>
              <p>
                We retain your information for as long as necessary to fulfill the purposes described in this policy,
                comply with legal obligations, resolve disputes, and enforce our agreements. Lead and project data is
                typically retained for up to 3 years after your last interaction.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">6. Cookies and Tracking Technologies</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Our website uses cookies and similar technologies to enhance your experience, remember preferences,
                and collect analytics data. Types of cookies we use include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential cookies:</strong> Required for basic site functionality (e.g., session management, security)</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website so we can improve it</li>
                <li><strong>Marketing cookies:</strong> Used to track the effectiveness of our advertising campaigns</li>
              </ul>
              <p>
                You can configure your browser to refuse cookies or alert you when cookies are being sent. Some
                features of our website may not function properly without cookies.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">7. Third-Party Services</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Our website integrates with third-party services that have their own privacy policies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Wisetack:</strong> Financing pre-qualification — <a href="https://www.wisetack.com/privacy" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">wisetack.com/privacy</a></li>
                <li><strong>Google Maps:</strong> Embedded maps for service area display</li>
                <li><strong>Calendly:</strong> Appointment scheduling</li>
                <li><strong>OpenAI:</strong> Chatbot AI processing</li>
              </ul>
              <p>
                We are not responsible for the privacy practices of these third parties. We encourage you to
                review their policies.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">8. Your Rights</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request that we delete your personal information, subject to legal retention requirements</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:robert@backyardbobbys.com" className="text-brand hover:underline">
                  robert@backyardbobbys.com
                </a>{" "}
                or call{" "}
                <a href="tel:+14438758550" className="text-brand hover:underline">
                  443-875-8550
                </a>. We will respond within 30 days.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website and services are not directed to individuals under the age of 18. We do not knowingly
              collect personal information from children. If we become aware that we have collected information from
              a child, we will take steps to delete it promptly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
              or legal requirements. Any changes will be posted on this page with an updated effective date. We
              encourage you to review this policy periodically. Continued use of our website or services after
              changes are posted constitutes your acceptance of the updated policy.
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, contact Robert Burchell:
            </p>
            <ul className="list-none mt-3 space-y-1 text-muted-foreground">
              <li><strong>Backyard Bobby&apos;s LLC</strong></li>
              <li>Phone: <a href="tel:+14438758550" className="text-brand hover:underline">443-875-8550</a></li>
              <li>Email: <a href="mailto:robert@backyardbobbys.com" className="text-brand hover:underline">robert@backyardbobbys.com</a></li>
              <li>Website: <a href="https://backyardbobbys.com" className="text-brand hover:underline">backyardbobbys.com</a></li>
            </ul>
          </div>

        </div>
      </Section>
    </>
  );
}
