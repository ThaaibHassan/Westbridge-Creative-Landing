import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Marquee from "@/components/motion/Marquee";
import TransitionLink from "@/components/site/TransitionLink";
import { CLIENTS, STATS } from "@/lib/content";

export default function About() {
  return (
    <section
      id="studio"
      className="border-y border-ink/10 bg-paper-deep/60 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-accent" />
          <span className="label">The studio</span>
        </div>

        <WordReveal
          as="p"
          text="We are a compact team of designers and developers who believe restraint is a discipline. We make fewer things, more carefully."
          className="text-display mt-10 max-w-5xl text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.05]"
        />

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12">
          <Reveal
            as="p"
            className="text-lg leading-relaxed text-ink-soft md:col-span-5"
          >
            Westbridge was founded on a simple conviction: the best work earns
            attention without demanding it. We partner with a handful of clients
            each year, giving each the focus it deserves.
          </Reveal>
          <Reveal
            as="p"
            className="text-base leading-relaxed text-ink-soft md:col-span-4 md:col-start-8"
          >
            From first sketch to final deploy, the same people stay close to the
            craft, so nothing is lost in translation between the idea and the
            artefact it becomes.
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <TransitionLink
            href="/about"
            className="group inline-flex items-center gap-2 text-sm tracking-tight"
          >
            <span className="relative">
              About the studio
              <span className="absolute -bottom-1 left-0 h-px w-full bg-ink" />
            </span>
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              ↗
            </span>
          </TransitionLink>
        </Reveal>

        {/* Stats */}
        <Reveal
          stagger
          className="mt-20 grid grid-cols-2 gap-y-10 border-t border-ink/10 pt-12 md:mt-28 md:grid-cols-4"
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

      {/* Clients marquee */}
      <div className="mt-20 border-t border-ink/10 pt-12 md:mt-28">
        <span className="label mb-8 block px-6 md:px-10">
          Trusted by
        </span>
        <Marquee items={CLIENTS} />
      </div>
    </section>
  );
}
