import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import PageHeader from "@/components/site/PageHeader";
import TransitionLink from "@/components/site/TransitionLink";
import {
  ABOUT_APPROACH,
  ABOUT_BACKGROUND,
  ABOUT_CAPABILITIES,
  ABOUT_COLLABORATORS,
  ABOUT_COLLAB_NOTE,
  STATS,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Westbridge is a small, senior creative studio. Our approach, background, collaborators, and core capabilities.",
};

function SectionShell({
  marker,
  title,
  children,
}: {
  marker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-ink/10 py-16 md:py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <span className="label">{marker}</span>
            <h2 className="text-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)]">
              {title}
            </h2>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main id="top" className="px-6 pt-32 md:px-10 md:pt-44">
      <PageHeader
        label="About"
        lines={["A studio", "made for", "fewer things."]}
        deck="We are a compact team of designers and developers who believe restraint is a discipline. Here is how we work, where we come from, and what we can do."
        className="border-b-0 pb-0 md:pb-0"
      />

      <div className="mx-auto max-w-[1400px]">
        <Reveal
          stagger
          className="mt-16 grid grid-cols-2 gap-y-10 border-t border-ink/10 pt-12 md:mt-20 md:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="text-display text-[clamp(2.5rem,5vw,4rem)]">
                {stat.value}
              </span>
              <span className="label">{stat.label}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <SectionShell marker="A.01" title="Our approach">
        <div className="flex flex-col gap-12">
          <Reveal>
            <h3 className="text-xl tracking-tight md:text-2xl">
              {ABOUT_APPROACH.method.title}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              {ABOUT_APPROACH.method.body}
            </p>
          </Reveal>
          <Reveal>
            <h3 className="text-xl tracking-tight md:text-2xl">
              {ABOUT_APPROACH.stack.title}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              {ABOUT_APPROACH.stack.body}
            </p>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell marker="A.02" title="Background">
        <div className="flex flex-col gap-6">
          {ABOUT_BACKGROUND.map((para, i) => (
            <Reveal
              key={i}
              as="p"
              className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
            >
              {para}
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell marker="A.03" title="Collaborations">
        <Reveal
          as="p"
          className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
        >
          {ABOUT_COLLAB_NOTE}
        </Reveal>
        <div className="mt-10 border-t border-ink/10">
          {ABOUT_COLLABORATORS.map((c) => (
            <Reveal key={c.name}>
              <div className="grid grid-cols-1 gap-2 border-b border-ink/10 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                <h3 className="text-lg tracking-tight md:col-span-4 md:text-xl">
                  {c.name}
                </h3>
                <span className="label md:col-span-3">{c.role}</span>
                <p className="text-base text-ink-soft md:col-span-5">{c.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell marker="A.04" title="Core capabilities">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {ABOUT_CAPABILITIES.map((group) => (
            <Reveal key={group.title} className="flex flex-col gap-4">
              <h3 className="text-lg tracking-tight">{group.title}</h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-ink/10 pt-2 text-base text-ink-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <section className="mx-auto max-w-[1400px] border-t border-ink/10 py-24 md:py-36">
        <Reveal className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="text-display max-w-2xl text-[clamp(2rem,5vw,4rem)]">
            Let&apos;s make something considered.
          </h2>
          <Magnetic>
            <TransitionLink
              href="/contact"
              className="group inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-sm font-medium text-paper"
            >
              Start a project
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                ↗
              </span>
            </TransitionLink>
          </Magnetic>
        </Reveal>
      </section>
    </main>
  );
}
