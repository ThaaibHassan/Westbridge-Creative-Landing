import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import TransitionLink from "@/components/site/TransitionLink";
import {
  PROJECTS,
  getProject,
  getAdjacentProject,
} from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

function MediaPlate({
  index,
  cover,
}: {
  index: string;
  cover?: string;
}) {
  return (
    <span className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border border-ink/10 bg-paper-deep">
      {cover ? (
        <Image
          src={cover}
          alt=""
          fill
          sizes="(min-width: 768px) 1400px, 100vw"
          className="object-cover"
          priority
        />
      ) : (
        <span className="text-display select-none text-[clamp(6rem,18vw,16rem)] font-extralight leading-none text-ink/[0.06]">
          {index}
        </span>
      )}
    </span>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);

  return (
    <main id="top" className="px-6 pt-32 md:px-10 md:pt-40">
      {/* Back link */}
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <TransitionLink
            href="/work"
            className="group inline-flex items-center gap-2 text-sm tracking-tight text-ink-soft transition-colors hover:text-ink"
          >
            <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1">
              ←
            </span>
            All work
          </TransitionLink>
        </Reveal>
      </div>

      {/* Header */}
      <header className="mx-auto mt-10 max-w-[1400px] md:mt-14">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="label">{project.index}</span>
            <span className="text-ink-muted">·</span>
            <span className="label">{project.category}</span>
            <span className="text-ink-muted">·</span>
            <span className="label">{project.year}</span>
          </div>
        </Reveal>

        <LineReveal
          as="h1"
          waitForIntro={false}
          delay={0.15}
          className="text-display mt-8 text-[clamp(2.75rem,9vw,8rem)]"
          lines={[project.title]}
        />

        <Reveal
          as="p"
          className="mt-8 max-w-2xl text-balance text-xl leading-relaxed text-ink-soft md:text-2xl"
        >
          {project.detail.intro}
        </Reveal>
      </header>

      {/* Hero media */}
      <div className="mx-auto mt-16 max-w-[1400px] md:mt-24">
        <Reveal>
          <MediaPlate index={project.index} cover={project.cover} />
        </Reveal>
      </div>

      {/* Body: meta sidebar + overview */}
      <section className="mx-auto mt-20 max-w-[1400px] md:mt-28">
        <div className="grid grid-cols-1 gap-12 border-t border-ink/10 pt-12 md:grid-cols-12 md:gap-8">
          {/* Meta sidebar */}
          <Reveal stagger className="flex flex-col gap-8 md:col-span-4">
            <div className="flex flex-col gap-1.5">
              <span className="label">Client</span>
              <span className="text-lg text-ink">{project.detail.client}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="label">Sector</span>
              <span className="text-lg text-ink">{project.detail.sector}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="label">Role</span>
              <span className="text-lg text-ink">{project.role}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="label">Year</span>
              <span className="text-lg text-ink">{project.year}</span>
            </div>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                className="group mt-2 inline-flex w-fit items-center gap-2 text-sm tracking-tight"
              >
                <span className="relative">
                  Visit live site
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                <span aria-hidden>↗</span>
              </a>
            ) : null}
          </Reveal>

          {/* Overview */}
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <span className="label">Overview</span>
            </Reveal>
            <div className="mt-6 flex flex-col gap-6">
              {project.detail.overview.map((para, i) => (
                <Reveal
                  key={i}
                  as="p"
                  className="text-lg leading-relaxed text-ink-soft md:text-xl"
                >
                  {para}
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 sm:grid-cols-2">
              <Reveal className="flex flex-col gap-3">
                <span className="label">Services</span>
                <ul className="flex flex-col gap-2 text-ink">
                  {project.detail.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="flex flex-col gap-3">
                <span className="label">Deliverables</span>
                <ul className="flex flex-col gap-2 text-ink">
                  {project.detail.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary media */}
      <div className="mx-auto mt-20 grid max-w-[1400px] grid-cols-1 gap-6 md:mt-28 md:grid-cols-2">
        {(project.gallery ?? [project.cover, project.cover])
          .slice(0, 2)
          .map((src, i) => (
            <Reveal key={src ?? i} className={i === 1 ? "md:mt-16" : undefined}>
              <span className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border border-ink/10 bg-paper-deep">
                {src ? (
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 700px, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="label">
                    {i === 0 ? project.detail.client : project.category}
                  </span>
                )}
              </span>
            </Reveal>
          ))}
      </div>

      {/* Next project */}
      <section className="mx-auto mt-24 max-w-[1400px] border-t border-ink/10 py-16 md:mt-36">
        <Reveal>
          <TransitionLink href={`/work/${next.slug}`} className="group block">
            <span className="label">Next project</span>
            <div className="mt-6 flex items-baseline justify-between gap-6">
              <h2 className="text-display text-[clamp(2.25rem,7vw,6rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-3">
                {next.title}
              </h2>
              <span
                aria-hidden
                className="text-display text-[clamp(2rem,5vw,4rem)] text-accent transition-transform duration-500 group-hover:translate-x-2"
              >
                ↗
              </span>
            </div>
            <p className="mt-4 max-w-md text-ink-soft">{next.summary}</p>
          </TransitionLink>
        </Reveal>
      </section>
    </main>
  );
}
