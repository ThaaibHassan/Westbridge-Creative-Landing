"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import LineReveal from "@/components/motion/LineReveal";
import ScrambleText, {
  type ScrambleTextHandle,
} from "@/components/motion/ScrambleText";
import TransitionLink from "@/components/site/TransitionLink";
import { useIntro } from "@/components/providers/IntroContext";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Magazine-cover hero — masthead brand, folio meta,
 * full-bleed plate, editorial deck + CTAs.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const workScrambleRef = useRef<ScrambleTextHandle>(null);
  const contactScrambleRef = useRef<ScrambleTextHandle>(null);
  const { introReady, introActive } = useIntro();

  useGSAP(
    () => {
      if (!introReady) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-media]", { scale: 1.06, opacity: 0, duration: 1.6 }, 0)
        .from(
          "[data-hero-folio]",
          { y: 12, opacity: 0, duration: 0.8 },
          0.35,
        )
        .from(
          "[data-hero-deck]",
          { y: 20, opacity: 0, duration: 1 },
          0.55,
        )
        .from(
          "[data-hero-cta] > *",
          { y: 18, opacity: 0, duration: 0.9, stagger: 0.1 },
          0.7,
        );
    },
    { scope: ref, dependencies: [introReady] },
  );

  return (
    <section
      id="intro"
      ref={ref}
      className="relative flex h-svh min-h-[640px] flex-col overflow-hidden bg-black text-ink"
    >
      {/* Full-bleed plate */}
      <div data-hero-media className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/85"
        />
      </div>

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col px-6 pt-28 md:px-10 md:pt-32">
        <div className="mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col">
          {/* Folio row */}
          <div
            data-hero-folio
            className={cn(
              "flex items-start justify-between gap-6 border-b border-white/20 pb-4",
              introActive && "invisible",
            )}
          >
            <p className="label text-white/55">Vol. 01 — Studio</p>
            <p className="label text-right text-white/55">{SITE.location}</p>
          </div>

          {/* Masthead — brand as cover title */}
          <div className="mt-6 md:mt-8">
            <LineReveal
              as="h1"
              delay={0.3}
              stagger={0}
              seamlessIntroHandoff
              data-hero-wordmark
              className={cn(
                "text-display w-full max-w-full whitespace-nowrap font-bold leading-[0.82] tracking-[-0.045em] text-white",
                "text-[clamp(2.75rem,calc((min(100vw,90rem)-5rem)/5.65),12rem)]",
                // Keep in layout for FLIP measure; hide until intro hands off.
                introActive && "invisible",
              )}
              lines={[<span key="wb">WESTBRIDGE</span>]}
            />
            <div
              className={cn(
                "mt-4 flex flex-wrap items-baseline justify-between gap-3 border-t border-white/20 pt-4",
                introActive && "invisible",
              )}
            >
              <p className="text-sm tracking-tight text-white/60">
                Creative Studio
              </p>
              <p className="font-serif text-sm text-white/45">Est. 2014</p>
            </div>
          </div>

          {/* Spacer — image breathing room */}
          <div className="min-h-0 flex-1" aria-hidden />

          {/* Editorial deck + CTAs */}
          <div className="shrink-0 pb-8 md:pb-10">
            <div className="grid grid-cols-1 gap-8 border-t border-white/20 pt-6 md:grid-cols-12 md:items-end md:gap-10">
              <p
                data-hero-deck
                className="max-w-md text-lg leading-relaxed text-white/75 md:col-span-5 md:text-xl"
              >
                {SITE.tagline}
              </p>

              <div
                data-hero-cta
                className="flex flex-wrap items-center gap-3 md:col-span-6 md:col-start-7 md:justify-end"
              >
                <TransitionLink
                  href="/work"
                  onMouseEnter={() => workScrambleRef.current?.play()}
                  onFocus={() => workScrambleRef.current?.play()}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/35 bg-white/5 px-7 py-3.5 text-sm font-medium tracking-tight backdrop-blur-sm transition-colors duration-500 hover:border-white/70"
                >
                  <ScrambleText ref={workScrambleRef} text="See the work" />
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    →
                  </span>
                </TransitionLink>
                <TransitionLink
                  href="/contact"
                  onMouseEnter={() => contactScrambleRef.current?.play()}
                  onFocus={() => contactScrambleRef.current?.play()}
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-medium tracking-tight text-paper transition-opacity duration-500 hover:opacity-90"
                >
                  <ScrambleText ref={contactScrambleRef} text="Contact" />
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    ↗
                  </span>
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
