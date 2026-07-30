"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import LineReveal from "@/components/motion/LineReveal";
import Magnetic from "@/components/motion/Magnetic";
import ScrambleText, {
  type ScrambleTextHandle,
} from "@/components/motion/ScrambleText";
import TransitionLink from "@/components/site/TransitionLink";
import { useIntro } from "@/components/providers/IntroContext";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Lucas-style asymmetric hero — plate left, CTAs + deck right,
 * oversized WESTBRIDGE wordmark along the bottom.
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
      tl.from("[data-hero-media]", { scale: 1.06, opacity: 0, duration: 1.5 }, 0)
        .from(
          "[data-hero-deck]",
          { y: 18, opacity: 0, duration: 0.9 },
          0.45,
        )
        .from(
          "[data-hero-cta] > *",
          { y: 16, opacity: 0, duration: 0.85, stagger: 0.1 },
          0.55,
        );
    },
    { scope: ref, dependencies: [introReady] },
  );

  return (
    <section
      id="intro"
      ref={ref}
      className="relative flex h-svh min-h-[640px] flex-col overflow-hidden bg-paper text-ink"
    >
      <div className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col px-6 pt-24 md:px-10 md:pt-28">
        <div className="grid min-h-0 flex-1 grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-6">
          {/* Left plate — fills the band above the wordmark */}
          <div
            data-hero-media
            className={cn(
              "relative aspect-[4/5] w-full overflow-hidden bg-paper-deep md:col-span-6 md:aspect-auto md:h-full md:min-h-0",
              introActive && "invisible",
            )}
          >
            <Image
              src="/hero.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 48vw, 100vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-paper/30 via-transparent to-transparent"
            />
          </div>

          {/* Right: CTAs + deck — top-aligned, sitting next to the plate */}
          <div
            className={cn(
              "flex flex-col gap-6 md:col-span-5 md:col-start-8 md:pt-1",
              introActive && "invisible",
            )}
          >
            <div data-hero-cta className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <TransitionLink
                  href="/work"
                  onMouseEnter={() => workScrambleRef.current?.play()}
                  onFocus={() => workScrambleRef.current?.play()}
                  className="group inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-sm font-medium tracking-tight text-paper transition-opacity duration-500 hover:opacity-90"
                >
                  <ScrambleText ref={workScrambleRef} text="See the work" />
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    →
                  </span>
                </TransitionLink>
              </Magnetic>
              <Magnetic>
                <TransitionLink
                  href="/contact"
                  onMouseEnter={() => contactScrambleRef.current?.play()}
                  onFocus={() => contactScrambleRef.current?.play()}
                  className="group inline-flex items-center gap-3 border border-ink/35 px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500 hover:border-ink/70"
                >
                  <ScrambleText ref={contactScrambleRef} text="Contact" />
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    ↗
                  </span>
                </TransitionLink>
              </Magnetic>
            </div>

            <p
              data-hero-deck
              className="max-w-xs text-base leading-relaxed text-ink-soft md:text-lg"
            >
              {SITE.tagline}
            </p>
          </div>
        </div>

        {/* Bottom wordmark */}
        <div className="shrink-0 pb-5 pt-6 md:pb-6 md:pt-8">
          <p
            className={cn(
              "mb-2 font-serif text-sm italic text-ink-muted",
              introActive && "invisible",
            )}
          >
            Creative studio
          </p>
          <LineReveal
            as="h1"
            delay={0.25}
            stagger={0}
            seamlessIntroHandoff
            data-hero-wordmark
            className={cn(
              "text-display w-full max-w-full whitespace-nowrap font-bold leading-[0.82] tracking-[-0.045em] text-ink",
              "text-[clamp(2.75rem,calc((min(100vw,90rem)-5rem)/5.65),11rem)]",
              introActive && "invisible",
            )}
            lines={[<span key="wb">WESTBRIDGE</span>]}
          />
        </div>
      </div>
    </section>
  );
}
