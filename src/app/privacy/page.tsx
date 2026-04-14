import { BrandMarketingShell } from "@/components/marketing/brand-marketing-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  {
    title: "Information we collect",
    body: `When you use ${SITE_CONFIG.name}, we may collect account details (such as name, email, and profile information you choose to provide), content you submit (including listings, photos, and messages), device and usage data (such as pages viewed and approximate region based on IP), and communications you send to our support team.`,
  },
  {
    title: "How we use information",
    body: "We use this information to operate and improve the directory, personalize search and recommendations, process listing submissions, prevent fraud and abuse, send service-related notices, and respond to your requests. Where required, we rely on your consent or our legitimate interests in running a safe, high-quality platform.",
  },
  {
    title: "Sharing",
    body: "We do not sell your personal information. We may share data with service providers who assist us with hosting, analytics, email delivery, and security—under strict confidentiality terms. We may disclose information if required by law or to protect the rights and safety of our users and the public.",
  },
  {
    title: "Cookies & analytics",
    body: "We may use cookies and similar technologies to remember preferences, measure traffic, and understand how features are used. You can control cookies through your browser settings; disabling some cookies may limit certain functionality.",
  },
  {
    title: "Data retention",
    body: "We retain information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. Listing content may remain visible according to your settings until you delete it or close your account.",
  },
  {
    title: "Your choices & rights",
    body: "Depending on where you live, you may have rights to access, correct, delete, or export your personal data, or to object to certain processing. Contact us to exercise these rights. You may opt out of marketing emails using the link in any message we send.",
  },
  {
    title: "Children",
    body: `${SITE_CONFIG.name} is not directed to children under 16, and we do not knowingly collect their personal information. If you believe we have done so, please contact us so we can delete it promptly.`,
  },
  {
    title: "Updates",
    body: "We may update this policy from time to time. We will post the revised version on this page with a new “Last updated” date. Continued use of the site after changes constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  return (
    <BrandMarketingShell
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle={`This policy explains how ${SITE_CONFIG.name} collects, uses, and safeguards information when you browse listings, create an account, or contact us.`}
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
          <p className="text-sm text-[#6b534c]">
            Questions about privacy? Reach us through the{" "}
            <a href="/contact" className="font-semibold text-[#b76e79] underline-offset-4 hover:underline">
              contact page
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </BrandMarketingShell>
  );
}
