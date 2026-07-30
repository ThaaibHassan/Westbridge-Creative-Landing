"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TransitionLink from "@/components/site/TransitionLink";
import { useIntro } from "@/components/providers/IntroContext";
import { PROJECTS, type Project } from "@/lib/content";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

type ProjectRotundaProps = {
  projects?: Project[];
  label?: string;
  className?: string;
  showAllLink?: boolean;
};

/**
 * Vertical scroll → horizontal project scrub.
 * Uses CSS sticky (not ScrollTrigger pin) so it works with Lenis.
 */
export default function ProjectRotunda({
  projects = PROJECTS,
  label = "Selected work",
  className,
  showAllLink = false,
}: ProjectRotundaProps) {
  const total = projects.length;
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const indexRef = useRef(0);
  const { introReady } = useIntro();

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track || total < 1 || !introReady) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced || total === 1) {
        gsap.set(track, { x: 0 });
        return;
      }

      const getTravel = () => {
        const parent = track.parentElement;
        if (!parent) return 0;
        return Math.max(0, track.scrollWidth - parent.clientWidth);
      };

      gsap.set(track, { x: 0 });

      const tween = gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          invalidateOnRefresh: true,
          snap:
            total > 1
              ? {
                  snapTo: 1 / (total - 1),
                  duration: { min: 0.1, max: 0.35 },
                  ease: "power1.inOut",
                }
              : false,
          onUpdate: (self) => {
            const next = Math.round(self.progress * (total - 1));
            setIndex((prev) => (prev === next ? prev : next));
          },
        },
      });

      triggerRef.current = tween.scrollTrigger ?? null;
      ScrollTrigger.refresh();

      return () => {
        triggerRef.current = null;
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    {
      dependencies: [introReady, total],
      revertOnUpdate: true,
    },
  );

  const scrollToIndex = (i: number) => {
    const st = triggerRef.current;
    const container = containerRef.current;
    if (!container || total < 2) {
      setIndex(i);
      return;
    }

    const clamped = Math.max(0, Math.min(total - 1, i));
    let target: number;

    if (st) {
      target = st.start + ((st.end - st.start) * clamped) / (total - 1);
    } else {
      const top =
        container.getBoundingClientRect().top +
        (window.__lenis?.scroll ?? window.scrollY);
      const range = container.offsetHeight - window.innerHeight;
      target = top + (range * clamped) / (total - 1);
    }

    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container || total < 2) return;
      const sticky = container.querySelector<HTMLElement>("[data-sticky-stage]");
      if (!sticky) return;
      const rect = sticky.getBoundingClientRect();
      const active = rect.top <= 4 && rect.bottom >= window.innerHeight * 0.75;
      if (!active) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToIndex(indexRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToIndex(indexRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  if (total === 0) return null;

  const active = projects[index] ?? projects[0]!;
  const pad = (n: number) => String(n).padStart(2, "0");
  // Sticky stage (100vh) + ~28vh scrub per extra project
  const scrollHeight = `calc(100vh + ${(Math.max(total, 1) - 1) * 28}vh)`;

  return (
    <div
      ref={containerRef}
      className={cn("relative bg-paper", className)}
      style={{ height: scrollHeight }}
    >
      <div
        data-sticky-stage
        className="sticky top-0 flex h-svh min-h-[560px] flex-col overflow-hidden bg-paper text-ink"
        aria-roledescription="carousel"
        aria-label={label}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-6 pt-20 md:px-10 md:pt-24">
          <p className="label tabular-nums text-ink-soft">
            {pad(index + 1)} / {pad(total)}
          </p>
          <p className="label absolute left-1/2 -translate-x-1/2 text-ink-soft">
            {label}
          </p>
        </div>

        <div className="relative mx-auto min-h-0 w-full max-w-[1400px] flex-1 overflow-hidden px-6 md:px-10">
          <div
            ref={trackRef}
            className="flex h-full items-center will-change-transform"
            style={{ width: `${total * 100}%` }}
          >
            {projects.map((project, i) => (
              <div
                key={project.slug}
                className="relative flex h-full shrink-0 items-center justify-center"
                style={{
                  width: `${100 / total}%`,
                  flex: `0 0 ${100 / total}%`,
                }}
                aria-hidden={i !== index}
              >
                <ProjectPanel project={project} priority={i < 2} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 pb-5 md:px-10 md:pb-6">
          <div className="flex flex-col gap-3 border-t border-ink/10 pt-4 md:flex-row md:items-end md:justify-between md:gap-4">
            <div>
              <p className="label text-ink-muted">
                {active.index} · {active.category} · {active.year}
              </p>
              <TransitionLink
                href={`/work/${active.slug}`}
                className="group mt-2 inline-flex items-baseline gap-3"
              >
                <span className="text-display text-[clamp(1.75rem,4vw,3rem)]">
                  {active.title}
                </span>
                <span className="text-sm text-ink-soft transition-transform duration-500 group-hover:translate-x-1">
                  ↗
                </span>
              </TransitionLink>
              <p className="mt-2 max-w-md text-sm text-ink-soft md:text-base">
                {active.role}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <p className="label text-ink-muted">Scroll to browse</p>
              {showAllLink && (
                <TransitionLink
                  href="/work"
                  className="group text-sm tracking-tight text-ink-soft hover:text-ink"
                >
                  All projects
                  <span className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </TransitionLink>
              )}
            </div>
          </div>

          <div
            className="mt-5 flex items-center gap-1.5"
            role="tablist"
            aria-label="Project slides"
          >
            {projects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to ${project.title}`}
                onClick={() => scrollToIndex(i)}
                className="group relative flex h-8 flex-1 items-center"
              >
                <span
                  className={cn(
                    "block h-px w-full transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    i === index
                      ? "bg-ink"
                      : "bg-ink/20 group-hover:bg-ink/45",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectPanel({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <TransitionLink
      href={`/work/${project.slug}`}
      className="group relative block w-full max-w-5xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-deep">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-display select-none text-[clamp(5rem,14vw,9rem)] font-extralight text-ink/[0.08]">
              {project.index}
            </span>
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
        />
      </div>
    </TransitionLink>
  );
}
