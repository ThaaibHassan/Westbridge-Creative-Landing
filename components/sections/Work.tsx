"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import TransitionLink from "@/components/site/TransitionLink";
import { PROJECTS, type Project } from "@/lib/content";

function PreviewFrame({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(project.cover) && !failed;

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!active}
    >
      <div
        data-parallax-inner
        className="absolute inset-[-10%] will-change-transform"
      >
        {showImage ? (
          <Image
            src={project.cover!}
            alt=""
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-paper-deep">
            <span className="text-display select-none text-[clamp(5rem,14vw,9rem)] font-extralight leading-none text-ink/[0.08]">
              {project.index}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Work() {
  const featured = PROJECTS.slice(0, 5);
  const [activeSlug, setActiveSlug] = useState(featured[0]?.slug ?? "");
  const stageRef = useRef<HTMLDivElement>(null);
  const active = featured.find((p) => p.slug === activeSlug) ?? featured[0];

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = stage.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    stage.querySelectorAll<HTMLElement>("[data-parallax-inner]").forEach((el) => {
      const isActive = el.parentElement?.classList.contains("opacity-100");
      if (!isActive) return;
      gsap.to(el, {
        x: px * -22,
        y: py * -16,
        scale: 1.06,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  };

  const onLeave = () => {
    const stage = stageRef.current;
    if (!stage) return;
    gsap.to(stage.querySelectorAll("[data-parallax-inner]"), {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.85,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

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

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="border-t border-ink/10 md:col-span-7">
            {featured.map((project) => {
              const isActive = project.slug === activeSlug;
              return (
                <Reveal key={project.slug}>
                  <TransitionLink
                    href={`/work/${project.slug}`}
                    onMouseEnter={() => setActiveSlug(project.slug)}
                    onFocus={() => setActiveSlug(project.slug)}
                    className="group grid grid-cols-1 items-baseline gap-3 border-b border-ink/10 py-8 md:grid-cols-12 md:gap-6 md:py-10"
                  >
                    <span
                      className={`font-serif text-sm transition-colors duration-500 md:col-span-1 ${
                        isActive ? "text-ink" : "text-ink-muted"
                      }`}
                    >
                      ({project.index})
                    </span>
                    <h3
                      className={`text-display text-[clamp(1.75rem,4vw,3rem)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:col-span-7 ${
                        isActive
                          ? "translate-x-0 text-ink md:translate-x-3"
                          : "text-ink/55 md:group-hover:translate-x-3 md:group-hover:text-ink"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between gap-4 md:col-span-4">
                      <span className="text-sm text-ink-soft">
                        {project.category}
                      </span>
                      <span className="font-serif text-sm text-ink-muted">
                        {project.year}
                      </span>
                    </div>
                  </TransitionLink>
                </Reveal>
              );
            })}
          </div>

          <div className="hidden md:col-span-5 md:block">
            <div className="sticky top-28">
              <TransitionLink
                href={active ? `/work/${active.slug}` : "/work"}
                className="group/preview block"
              >
                <div
                  ref={stageRef}
                  onMouseMove={onMove}
                  onMouseLeave={onLeave}
                  className="relative aspect-[4/5] w-full overflow-hidden bg-paper-deep transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/preview:scale-[1.015]"
                >
                  {featured.map((project) => (
                    <PreviewFrame
                      key={project.slug}
                      project={project}
                      active={project.slug === activeSlug}
                    />
                  ))}

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-5 pt-16">
                    <p className="label text-white/80">
                      See project
                      <span className="ml-2 inline-block transition-transform duration-500 group-hover/preview:translate-x-1">
                        ↗
                      </span>
                    </p>
                  </div>
                </div>
              </TransitionLink>

              {active && (
                <div className="mt-5 space-y-3 border-t border-ink/10 pt-5">
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {active.summary}
                  </p>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div>
                      <dt className="label text-ink/40">Client</dt>
                      <dd className="mt-1 text-ink-soft">
                        {active.detail.client}
                      </dd>
                    </div>
                    <div>
                      <dt className="label text-ink/40">Type</dt>
                      <dd className="mt-1 text-ink-soft">{active.category}</dd>
                    </div>
                    <div>
                      <dt className="label text-ink/40">Role</dt>
                      <dd className="mt-1 text-ink-soft">{active.role}</dd>
                    </div>
                    <div>
                      <dt className="label text-ink/40">Year</dt>
                      <dd className="mt-1 font-serif text-ink-soft">
                        {active.year}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
