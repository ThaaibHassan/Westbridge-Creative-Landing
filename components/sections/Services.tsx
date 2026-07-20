import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import TransitionLink from "@/components/site/TransitionLink";
import { SERVICES } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <SectionHeading
            className="md:col-span-5"
            label="What we do"
            title="A focused practice, a few disciplines deep."
          />
          <Reveal
            as="p"
            className="self-end text-lg leading-relaxed text-ink-soft md:col-span-5 md:col-start-8"
          >
            We keep the studio small and the work close. Every engagement is led
            by the people who do it, no layers, no hand-offs, no diluted intent.
          </Reveal>
        </div>
      </div>

      {/* Atmosphere plate */}
      <Reveal className="mx-auto mt-16 max-w-[1400px] px-6 md:mt-20 md:px-10">
        <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
          <Image
            src="/studio/services.jpg"
            alt=""
            fill
            sizes="(min-width: 1400px) 1400px, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-paper/40 via-transparent to-transparent"
          />
          <span className="absolute bottom-5 left-5 label text-white/70 md:bottom-6 md:left-6">
            Studio practice
          </span>
        </div>
      </Reveal>

      <div className="mx-auto mt-16 max-w-[1400px] px-6 md:mt-20 md:px-10">
        <div className="border-t border-ink/10">
          {SERVICES.map((service) => (
            <Reveal key={service.index}>
              <TransitionLink
                href="/services"
                className="group grid grid-cols-1 gap-6 border-b border-ink/10 py-10 transition-colors duration-500 hover:bg-paper-deep md:grid-cols-12 md:items-baseline md:gap-8 md:py-14"
              >
                <div className="flex items-baseline gap-6 md:col-span-5">
                  <span className="font-serif text-sm text-ink-muted">
                    ({service.index})
                  </span>
                  <h3 className="text-display text-[clamp(1.75rem,3.5vw,2.75rem)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-3">
                    {service.title}
                  </h3>
                </div>

                <p className="max-w-md text-base leading-relaxed text-ink-soft md:col-span-4">
                  {service.description}
                </p>

                <ul className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-3 md:justify-end">
                  {service.disciplines.map((d) => (
                    <li key={d} className="text-xs tracking-tight text-ink-muted">
                      {d}
                    </li>
                  ))}
                </ul>
              </TransitionLink>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <TransitionLink
            href="/services"
            className="group inline-flex items-center gap-2 text-sm tracking-tight"
          >
            <span className="relative">
              View all services
              <span className="absolute -bottom-1 left-0 h-px w-full bg-ink" />
            </span>
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              ↗
            </span>
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  );
}
