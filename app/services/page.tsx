import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import FaqAccordion from "@/components/site/FaqAccordion";
import TransitionLink from "@/components/site/TransitionLink";
import { SERVICES, SERVICE_FAQ } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What Westbridge offers — brand identity, digital experience, web design & build, and ongoing care. Scope, indicative pricing, and deliverables for each.",
};

export default function ServicesPage() {
  return (
    <main id="top" className="px-6 pt-32 md:px-10 md:pt-44">
      {/* Header */}
      <header className="mx-auto max-w-[1400px] border-b border-ink/10 pb-12 md:pb-16">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-ink" />
            <span className="label">Services</span>
          </div>
        </Reveal>
        <LineReveal
          as="h1"
          delay={0.2}
          className="text-display mt-8 text-[clamp(3rem,11vw,9rem)]"
          lines={["What we", "offer."]}
        />
        <Reveal
          as="p"
          className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl"
        >
          Four ways to work with the studio. Each engagement is fixed in scope and
          price before it begins, and led end to end by the people doing the work.
        </Reveal>
      </header>

      {/* Services list */}
      <section className="mx-auto max-w-[1400px]">
        {SERVICES.map((service) => (
          <Reveal key={service.index}>
            <article className="grid grid-cols-1 gap-10 border-b border-ink/10 py-16 md:grid-cols-12 md:gap-8 md:py-24">
              {/* Left: marker + title + intro */}
              <div className="md:col-span-5">
                <span className="label">{service.marker}</span>
                <h2 className="text-display mt-5 text-[clamp(2rem,5vw,3.5rem)]">
                  {service.title}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
                  {service.description}
                </p>

                {/* Pricing & timeline */}
                <div className="mt-10 flex gap-12 border-t border-ink/10 pt-8">
                  <div className="flex flex-col gap-1.5">
                    <span className="label">From</span>
                    <span className="text-display text-2xl">
                      {service.pricingFrom}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="label">Timeline</span>
                    <span className="text-display text-2xl">
                      {service.timeline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: scope + deliverables */}
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:col-span-6 md:col-start-7">
                <div className="flex flex-col gap-4">
                  <span className="label">Scope</span>
                  <ul className="flex flex-col gap-3">
                    {service.scope.map((s) => (
                      <li
                        key={s}
                        className="border-t border-ink/10 pt-3 text-base text-ink-soft"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="label">Deliverables</span>
                  <ul className="flex flex-col gap-3">
                    {service.deliverables.map((d) => (
                      <li
                        key={d}
                        className="border-t border-ink/10 pt-3 text-base text-ink-soft"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1400px] py-24 md:py-36">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-ink" />
                <span className="label">FAQ</span>
              </div>
            </Reveal>
            <LineReveal
              as="h2"
              delay={0.15}
              className="text-display mt-6 text-[clamp(2rem,4vw,3rem)]"
              lines={["Common", "questions."]}
            />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <FaqAccordion items={SERVICE_FAQ} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] border-t border-ink/10 py-24 md:py-36">
        <Reveal className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="text-display max-w-2xl text-[clamp(2rem,5vw,4rem)]">
            Not sure which fits? Let&apos;s talk it through.
          </h2>
          <TransitionLink
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper"
          >
            Start a project
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              ↗
            </span>
          </TransitionLink>
        </Reveal>
      </section>
    </main>
  );
}
