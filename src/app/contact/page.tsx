import { Mail, MapPin, Sparkles, Building2 } from "lucide-react";

import { BrandMarketingShell } from "@/components/marketing/brand-marketing-shell";
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from "@/overrides/contact-page";
import { SITE_CONFIG } from "@/lib/site-config";

const lanes = [
  {
    icon: Sparkles,
    title: "Guest concierge",
    body: "Questions about finding a lash artist, interpreting a service menu, or preparing for your first appointment—we will point you in the right direction.",
  },
  {
    icon: Building2,
    title: "Studio & artist support",
    body: "Onboarding a new listing, updating photos and hours, or understanding how submissions are reviewed—we are here for working professionals.",
  },
  {
    icon: MapPin,
    title: "Partnerships & press",
    body: "Editorial features, local collaborations, and brand-aligned campaigns that celebrate craftsmanship in the lash community.",
  },
];

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />;
  }

  return (
    <BrandMarketingShell
      eyebrow={`Contact ${SITE_CONFIG.name}`}
      title="Let’s talk—beautifully simple support"
      subtitle="Share what you need: a booking question, a listing update, or a partnership idea. We read every message and route it to the right person on our team."
    >
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-5">
          {lanes.map((lane) => (
            <div
              key={lane.title}
              className="rounded-2xl border border-[#e8ddd4] bg-white/85 p-6 shadow-[0_14px_40px_rgba(183,110,121,0.06)]"
            >
              <lane.icon className="h-5 w-5 text-[#b76e79]" strokeWidth={1.5} />
              <h2 className="mt-4 text-lg font-semibold text-[#1a1614]">{lane.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#5c4a45]">{lane.body}</p>
            </div>
          ))}
          <div className="flex items-start gap-3 rounded-2xl border border-dashed border-[#e0cfc9] bg-[#fffdfb] p-5">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#b76e79]" />
            <p className="text-sm leading-relaxed text-[#5c4a45]">
              Prefer email? Use the form—your message lands in the same inbox we monitor daily. Typical
              replies within one to two business days.
            </p>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#e8ddd4] bg-white/95 p-7 shadow-[0_24px_70px_rgba(183,110,121,0.08)] sm:p-9">
          <h2 className="text-xl font-semibold text-[#1a1614]">Send a message</h2>
          <p className="mt-2 text-sm text-[#6b534c]">
            The more context you share—city, service type, or listing name—the faster we can help.
          </p>
          <form className="mt-8 grid gap-4">
            <input
              className="h-12 rounded-xl border border-[#e0cfc9] bg-[#fffdfb] px-4 text-sm text-[#1a1614] placeholder:text-[#a89890] focus:border-[#b76e79] focus:outline-none focus:ring-2 focus:ring-[#b76e79]/20"
              placeholder="Your name"
            />
            <input
              className="h-12 rounded-xl border border-[#e0cfc9] bg-[#fffdfb] px-4 text-sm text-[#1a1614] placeholder:text-[#a89890] focus:border-[#b76e79] focus:outline-none focus:ring-2 focus:ring-[#b76e79]/20"
              placeholder="Email address"
              type="email"
            />
            <input
              className="h-12 rounded-xl border border-[#e0cfc9] bg-[#fffdfb] px-4 text-sm text-[#1a1614] placeholder:text-[#a89890] focus:border-[#b76e79] focus:outline-none focus:ring-2 focus:ring-[#b76e79]/20"
              placeholder="Topic (e.g. listing update, booking help)"
            />
            <textarea
              className="min-h-[180px] rounded-xl border border-[#e0cfc9] bg-[#fffdfb] px-4 py-3 text-sm text-[#1a1614] placeholder:text-[#a89890] focus:border-[#b76e79] focus:outline-none focus:ring-2 focus:ring-[#b76e79]/20"
              placeholder="Tell us everything we should know."
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#b76e79] px-8 text-sm font-semibold text-white transition hover:bg-[#9e5e6a]"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </BrandMarketingShell>
  );
}
