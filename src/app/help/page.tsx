import Link from "next/link";
import { BookOpen, ClipboardList, MessageCircle, Search } from "lucide-react";

import { BrandMarketingShell } from "@/components/marketing/brand-marketing-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const howItWorks = [
  {
    step: "01",
    title: "Discover",
    body: "Browse curated listings or search by city, category, and keywords to find artists whose style fits you.",
    icon: Search,
  },
  {
    step: "02",
    title: "Compare",
    body: "Review services, imagery, and contact details side by side—no pressure, no noisy clutter.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Connect",
    body: "Reach out through the channels each studio prefers: phone, email, site, or social—on your terms.",
    icon: MessageCircle,
  },
  {
    step: "04",
    title: "Grow with us",
    body: "Professionals submit listings for review; guests save favorites as we expand tools over time.",
    icon: BookOpen,
  },
];

const topics = [
  {
    title: "For guests",
    description:
      "First-time fills, allergy considerations, aftercare, and how to read service menus with confidence.",
  },
  {
    title: "For artists & studios",
    description:
      "Listing requirements, photo tips, hours and policies, and what happens after you submit for review.",
  },
  {
    title: "Search & filters",
    description:
      "Combine location and category filters, refresh stale results, and troubleshoot when a listing seems missing.",
  },
];

const faqs = [
  {
    id: "faq-1",
    question: "How do I book an appointment?",
    answer:
      "Each listing includes contact options chosen by the studio. Use phone, email, or their booking link—whichever they list. We do not process payments or schedules on-site.",
  },
  {
    id: "faq-2",
    question: "How long does listing approval take?",
    answer:
      "Most submissions are reviewed within one to two business days. Complex edits or verification steps may take slightly longer—we will email you if we need more detail.",
  },
  {
    id: "faq-3",
    question: "Can I edit my listing after it goes live?",
    answer:
      "Yes. Sign in, open your dashboard, and update copy, photos, or hours. Major changes may be re-reviewed to keep the directory accurate for guests.",
  },
  {
    id: "faq-4",
    question: "Why can’t I find a studio I know?",
    answer:
      "They may not be listed yet, may use a different business name, or your filters may be too narrow. Try clearing category or city filters, or ask them to submit a profile.",
  },
  {
    id: "faq-5",
    question: "Is my data safe?",
    answer:
      "We follow industry-standard practices for hosting and access control. Read our Privacy Policy for details on what we collect and how you can exercise your rights.",
  },
];

export default function HelpPage() {
  return (
    <BrandMarketingShell
      eyebrow="Help center"
      title="How it works—and how we can help"
      subtitle="Whether you are planning your next set or publishing your studio for the first time, these guides walk you through the essentials."
      headerAside={
        <Button
          asChild
          className="rounded-full bg-[#b76e79] px-6 text-white hover:bg-[#9e5e6a]"
        >
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((item) => (
          <Card
            key={item.step}
            className="border-[#e8ddd4] bg-white/90 shadow-[0_12px_36px_rgba(183,110,121,0.05)]"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b76e79]">
                  {item.step}
                </span>
                <item.icon className="h-5 w-5 text-[#b76e79]" strokeWidth={1.5} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-[#1a1614]">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5c4a45]">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {topics.map((topic) => (
            <Card
              key={topic.title}
              className="border-[#e8ddd4] bg-[#fffdfb] transition-transform hover:-translate-y-0.5"
            >
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#1a1614]">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5c4a45]">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-[#e8ddd4] bg-white/95 shadow-[0_18px_50px_rgba(183,110,121,0.06)]">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-[#1a1614]">Frequently asked questions</h3>
            <Accordion type="single" collapsible className="mt-4">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[#f0e4df]">
                  <AccordionTrigger className="text-left text-sm font-medium text-[#1a1614] hover:text-[#b76e79]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#5c4a45]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </BrandMarketingShell>
  );
}
