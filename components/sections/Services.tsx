import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import TransitionLink from "@/components/site/TransitionLink";
import { SERVICES } from "@/lib/content";

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36"
    >
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
          We keep the studio small and the work close. Every engagement is led by
          the people who do it—no layers, no hand-offs, no diluted intent.
        </Reveal>
      </div>

      <div className="mt-20 border-t border-ink/10 md:mt-28">
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
    </section>
  );
}
