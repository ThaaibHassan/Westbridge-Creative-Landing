import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import TransitionLink from "@/components/site/TransitionLink";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Westbridge Creative Studio: brand identities, digital experiences, and premium web design.",
};

export default function WorkPage() {
  const years = PROJECTS.map((p) => Number(p.year));
  const range = `${Math.min(...years)}, ${Math.max(...years)}`;

  return (
    <main id="top" className="px-6 pt-32 md:px-10 md:pt-44">
      {/* Header */}
      <header className="mx-auto max-w-[1400px] border-b border-ink/10 pb-12 md:pb-16">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-ink" />
            <span className="label">Westbridge Projects</span>
          </div>
        </Reveal>

        <LineReveal
          as="h1"
          delay={0.2}
          className="text-display mt-8 text-[clamp(3rem,11vw,9rem)]"
          lines={["Selected", "work."]}
        />

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <Reveal
            as="p"
            className="max-w-xl text-lg leading-relaxed text-ink-soft md:col-span-6"
          >
            A small body of work, made for clients who value restraint. Each project
            is led end to end by the people who design and build it.
          </Reveal>
          <Reveal className="flex gap-12 md:col-span-4 md:col-start-9 md:justify-end">
            <div className="flex flex-col gap-1">
              <span className="text-display text-3xl">
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <span className="label">Projects</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-display text-3xl">{range}</span>
              <span className="label">Span</span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Project list */}
      <section className="mx-auto max-w-[1400px]">
        {PROJECTS.map((project) => (
          <Reveal key={project.slug}>
            <TransitionLink
              href={`/work/${project.slug}`}
              className="group block border-b border-ink/10 py-12 md:py-16"
            >
              {/* Meta line, index · category · year */}
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="label">{project.index}</span>
                <span className="text-ink-muted">·</span>
                <span className="label">{project.category}</span>
                <span className="text-ink-muted">·</span>
                <span className="label">{project.year}</span>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
                <div className="md:col-span-7">
                  <h2 className="text-display flex items-baseline gap-4 text-[clamp(2.25rem,6vw,5rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-3">
                    {project.title}
                    <span
                      aria-hidden
                      className="translate-x-[-8px] text-[0.35em] text-accent opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </h2>
                  <p className="mt-4 text-base text-ink-soft md:text-lg">
                    {project.role}
                  </p>
                </div>

                <div className="md:col-span-4 md:col-start-9">
                  <p className="max-w-md text-base leading-relaxed text-ink-soft">
                    {project.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-ink/15 px-3 py-1 text-xs tracking-tight text-ink-soft"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm tracking-tight">
                    View project
                    <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>
                </div>
              </div>
            </TransitionLink>
          </Reveal>
        ))}
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-[1400px] py-24 md:py-36">
        <Reveal className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="text-display max-w-2xl text-[clamp(2rem,5vw,4rem)]">
            Have something worth making?
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
