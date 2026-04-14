import { BrandMarketingShell } from "@/components/marketing/brand-marketing-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  {
    title: "Agreement to terms",
    body: `By accessing or using ${SITE_CONFIG.name}, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use the site.`,
  },
  {
    title: "The service",
    body: `${SITE_CONFIG.name} provides an online directory and related tools to discover lash and beauty professionals, read listings, and submit your own listing where available. Features may change as we improve the product.`,
  },
  {
    title: "Accounts & eligibility",
    body: "You must provide accurate registration information and keep your credentials secure. You are responsible for activity under your account. You must be old enough to enter a binding contract in your jurisdiction to create an account.",
  },
  {
    title: "User content & license",
    body: "You retain ownership of content you submit. By posting listings, images, or text, you grant us a non-exclusive, worldwide license to host, display, distribute, and promote that content in connection with operating and marketing the platform. You represent that you have the rights to grant this license.",
  },
  {
    title: "Acceptable use",
    body: "You may not use the service for unlawful purposes, harassment, spam, malware, scraping that overloads our systems, false or misleading listings, impersonation, or infringement of others’ intellectual property. We may suspend or terminate accounts that violate these rules.",
  },
  {
    title: "Listings & third parties",
    body: "Directory listings are provided by users or partners. We do not guarantee the accuracy of every listing or endorse any professional. Appointments and payments arranged off-platform are solely between you and the provider.",
  },
  {
    title: "Disclaimers",
    body: `THE SERVICE IS PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT UNINTERRUPTED OR ERROR-FREE OPERATION.`,
  },
  {
    title: "Limitation of liability",
    body: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR DATA, ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF AMOUNTS YOU PAID US IN THE TWELVE MONTHS BEFORE THE CLAIM OR ONE HUNDRED DOLLARS.",
  },
  {
    title: "Indemnity",
    body: "You agree to indemnify and hold harmless our team and affiliates from claims, damages, and expenses (including reasonable attorneys’ fees) arising from your content, your use of the service, or your violation of these terms.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws applicable in your primary operating region as stated in our business records, without regard to conflict-of-law rules. Courts in that region shall have exclusive jurisdiction, unless mandatory consumer protections in your country say otherwise.",
  },
  {
    title: "Changes",
    body: "We may update these terms periodically. We will post the new version with an updated date. Material changes may be communicated by email or on-site notice where appropriate.",
  },
];

export default function TermsPage() {
  return (
    <BrandMarketingShell
      eyebrow="Legal"
      title="Terms of Service"
      subtitle={`These terms govern your use of ${SITE_CONFIG.name}, including browsing the directory, creating an account, and submitting listings.`}
    >
      <Card className="border-[#e8ddd4] bg-white/90 shadow-[0_18px_50px_rgba(183,110,121,0.05)]">
        <CardContent className="space-y-8 p-8 sm:p-10">
          <p className="text-xs font-medium text-[#b76e79]">Last updated: April 13, 2026</p>
          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-[#f0e4df] bg-[#fffdfb] p-6 sm:p-7"
              >
                <h2 className="text-base font-semibold text-[#1a1614]">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#5c4a45]">{section.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </BrandMarketingShell>
  );
}
