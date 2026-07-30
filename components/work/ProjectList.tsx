"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import TransitionLink from "@/components/site/TransitionLink";
import { PROJECTS, type Project } from "@/lib/content";

type ProjectListProps = {
  projects?: Project[];
  title?: string;
  deck?: string;
};

/**
 * Linear editorial project list — Lucas “Tous les projets” reading.
 */
export default function ProjectList({
  projects = PROJECTS,
  title = "All projects",
  deck = "A linear reading of the work shown above — identities, digital experiences, and sites led end to end by the studio.",
}: ProjectListProps) {
  return (
    <section
      aria-label={title}
      className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36"
    >
      <div className="border-b border-ink/10 pb-10 md:pb-14">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-ink" />
            <span className="label">Detailed view</span>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="text-display mt-6 text-[clamp(2rem,5vw,3.75rem)]">
            {title}
          </h2>
        </Reveal>
        <Reveal
          as="p"
          className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
        >
          {deck}
        </Reveal>
      </div>

      <ul className="divide-y divide-ink/10">
        {projects.map((project) => (
          <li key={project.slug}>
            <Reveal>
              <TransitionLink
                href={`/work/${project.slug}`}
                className="group grid grid-cols-1 gap-8 py-12 md:grid-cols-12 md:gap-8 md:py-16"
              >
                <div className="md:col-span-7">
                  <p className="label text-ink-muted">
                    {project.index} · {project.category} · {project.year}
                  </p>
                  <h3 className="text-display mt-4 text-[clamp(1.75rem,4vw,3.25rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-3">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft md:text-base">
                    {project.role}
                  </p>
                  {project.cover && (
                    <div className="relative mt-8 aspect-[16/10] w-full max-w-lg overflow-hidden bg-paper-deep md:mt-10">
                      <Image
                        src={project.cover}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-end md:col-span-4 md:col-start-9">
                  <p className="max-w-md text-base leading-relaxed text-ink-soft">
                    {project.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="text-xs tracking-tight text-ink-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm tracking-tight">
                    View project
                    <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>
                </div>
              </TransitionLink>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
