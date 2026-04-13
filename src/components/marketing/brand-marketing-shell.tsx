import type { ReactNode } from "react";
import { Playfair_Display } from "next/font/google";

import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function BrandMarketingShell({
  eyebrow,
  title,
  subtitle,
  headerAside,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  headerAside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf7f4] text-[#1a1614]">
      <NavbarShell />
      <main>
        <header className="relative overflow-hidden border-b border-[#e8ddd4] bg-gradient-to-b from-[#fffdfb] via-[#faf5f1] to-[#f7efe8]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,rgba(183,110,121,0.14),transparent_55%)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                {eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#b76e79]">
                    {eyebrow}
                  </p>
                ) : null}
                <h1
                  className={`${display.className} mt-4 text-4xl font-semibold tracking-[-0.02em] text-[#1a1614] sm:text-5xl`}
                >
                  {title}
                </h1>
                <span
                  className="mt-5 block h-px w-16 bg-gradient-to-r from-[#b76e79] to-transparent"
                  aria-hidden
                />
                {subtitle ? (
                  <p className="mt-6 text-sm leading-relaxed text-[#5c4a45] sm:text-base sm:leading-8">
                    {subtitle}
                  </p>
                ) : null}
              </div>
              {headerAside ? (
                <div className="w-full shrink-0 lg:max-w-xl lg:text-right">{headerAside}</div>
              ) : null}
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
