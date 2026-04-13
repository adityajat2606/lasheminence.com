import Link from "next/link";
import { Sparkles, Heart, Shield } from "lucide-react";

import { BrandMarketingShell } from "@/components/marketing/brand-marketing-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const pillars = [
  {
    icon: Sparkles,
    title: "Artistry first",
    body: "We spotlight technicians and studios who treat lash design as craft—precision mapping, healthy isolation, and finishes that feel light and wearable.",
  },
  {
    icon: Heart,
    title: "Guest-centered care",
    body: "From consultation to aftercare, the listings we feature emphasize hygiene, honest timing, and styles tailored to your eye shape and lifestyle.",
  },
  {
    icon: Shield,
    title: "Trust & transparency",
    body: "Clear service menus, realistic imagery, and straightforward booking paths help you choose confidently—without noisy ads or misleading claims.",
  },
];

const experience = [
  {
    label: "Curated directory",
    value: "Studios & independents",
    detail: "Hand-tended profiles focused on lash and brow services.",
  },
  {
    label: "Search-friendly",
    value: "City & specialty",
    detail: "Filter by area, category, and the treatments you need.",
  },
  {
    label: "Built to grow",
    value: "New voices welcome",
    detail: "Professionals can submit listings for review and join the community.",
  },
];

export default function AboutPage() {
  return (
    <BrandMarketingShell
      eyebrow="About us"
      title={`The story behind ${SITE_CONFIG.name}`}
      subtitle={`${SITE_CONFIG.name} is a refined discovery layer for lash extensions, lifts, hybrid sets, and brow styling. We connect guests who expect elevated results with artists who deliver calm, meticulous service.`}
      headerAside={
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button
            asChild
            className="rounded-full bg-[#b76e79] px-6 text-white hover:bg-[#9e5e6a]"
          >
            <Link href="/contact">Book a conversation</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-[#e0cfc9] bg-white/80 text-[#1a1614] hover:bg-[#fff9f7]"
          >
            <Link href="/listings">Browse listings</Link>
          </Button>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <Card className="border-[#e8ddd4] bg-white/90 shadow-[0_20px_60px_rgba(183,110,121,0.06)]">
          <CardContent className="space-y-6 p-8 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b76e79]">
              Our philosophy
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1a1614] sm:text-3xl">
              Luxury is in the details—the taper of a fan, the angle of a map, the hush of a studio.
            </h2>
            <p className="text-sm leading-7 text-[#5c4a45] sm:text-base sm:leading-8">
              We built this platform for people who notice when lines are crisp, adhesives are fresh, and
              aftercare is explained with patience. Whether you are booking your first full set or
              maintaining a signature look, {SITE_CONFIG.name} is here to make discovery feel as polished
              as the service itself.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {experience.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#f0e4df] bg-[#fffdfb] p-5 text-center sm:text-left"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b76e79]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#1a1614]">{item.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#6b534c]">{item.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="border-[#e8ddd4] bg-white/80 transition-transform hover:-translate-y-0.5"
            >
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fdf5f3] text-[#b76e79]">
                  <pillar.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a1614]">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c4a45]">{pillar.body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-10 border-[#e8ddd4] bg-gradient-to-br from-[#fffdfb] to-[#faf5f1]">
        <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h3 className="text-xl font-semibold text-[#1a1614]">Ready to visit or collaborate?</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5c4a45]">
              Artists can share their studio story; guests can plan their next appointment. We are always
              listening for ways to make this directory more useful.
            </p>
          </div>
          <Button
            asChild
            className="shrink-0 rounded-full bg-[#1a1614] px-8 text-white hover:bg-[#2d2420]"
          >
            <Link href="/help">Explore the help center</Link>
          </Button>
        </CardContent>
      </Card>
    </BrandMarketingShell>
  );
}
