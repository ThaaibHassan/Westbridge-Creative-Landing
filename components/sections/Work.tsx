import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import TransitionLink from "@/components/site/TransitionLink";
import { PROJECTS } from "@/lib/content";

export default function Work() {
  const featured = PROJECTS.slice(0, 4);

  return (
    <section id="work" className="bg-paper-deep/60 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading label="Selected work" title="A few we’re proud of." />
          <Reveal className="md:pb-3">
            <TransitionLink
              href="/work"
              className="group inline-flex items-center gap-2 text-sm tracking-tight"
            >
              <span className="relative">
                All projects
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-ink" />
              </span>
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                ↗
              </span>
            </TransitionLink>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-ink/10 md:mt-24">
          {featured.map((project) => (
            <Reveal key={project.slug}>
              <TransitionLink
                href={`/work/${project.slug}`}
                className="group grid grid-cols-1 items-baseline gap-4 border-b border-ink/10 py-8 md:grid-cols-12 md:gap-8 md:py-10"
              >
                <span className="font-serif text-sm text-ink-muted md:col-span-1">
                  ({project.index})
                </span>
                <h3 className="text-display text-[clamp(1.75rem,4vw,3rem)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-6 md:group-hover:translate-x-3">
                  {project.title}
                </h3>
                <span className="text-sm text-ink-soft md:col-span-3">
                  {project.category}
                </span>
                <div className="flex items-center justify-between md:col-span-2">
                  <span className="font-serif text-sm text-ink-muted">
                    {project.year}
                  </span>
                  <span
                    aria-hidden
                    className="translate-x-[-6px] text-accent opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </div>
              </TransitionLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
