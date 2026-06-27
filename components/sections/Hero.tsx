"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import LineReveal from "@/components/motion/LineReveal";
import TransitionLink from "@/components/site/TransitionLink";
import { SITE } from "@/lib/content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-media]", { opacity: 0, duration: 1.2 }, 0.1)
        .from(
          "[data-hero-cta] > *",
          { y: 24, opacity: 0, duration: 1, stagger: 0.12 },
          0.5,
        )
        .from(
          "[data-hero-eyebrow]",
          { y: 16, opacity: 0, duration: 0.9 },
          0.8,
        );
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col overflow-x-clip bg-paper px-6 pb-8 pt-28 text-ink md:px-10 md:pb-10 md:pt-32"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        {/* Upper region: media + actions */}
        <div className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-12">
          {/* Left media panel — drop a real <Image> here later */}
          <div
            data-hero-media
            className="relative min-h-[38vh] overflow-hidden border border-white/10 bg-white/[0.03] md:col-span-5 md:min-h-0 lg:col-span-4"
          >
            {/*
              Placeholder media. Replace with:
              <Image src="/hero.jpg" alt="" fill priority sizes="(max-width:768px) 100vw, 40vw"
                     className="object-cover grayscale" />
            */}
            <span className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/logo-mark.png"
                alt=""
                width={180}
                height={180}
                unoptimized
                className="h-28 w-28 object-contain opacity-[0.12] brightness-0 invert md:h-40 md:w-40"
              />
            </span>
            <span className="absolute left-5 top-5 label text-ink/40">
              Westbridge — Studio
            </span>
            <span className="absolute bottom-5 left-5 label text-ink/40">
              Est. 2014
            </span>
          </div>

          {/* Right: actions + lead, bottom-aligned */}
          <div className="flex flex-col justify-end md:col-span-6 md:col-start-7">
            <div
              data-hero-cta
              className="flex flex-col items-start gap-8 md:items-end md:text-right"
            >
              <div className="flex flex-wrap items-center gap-3">
                <TransitionLink
                  href="/work"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500 hover:border-white/70"
                >
                  See the work
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    →
                  </span>
                </TransitionLink>
                <TransitionLink
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-medium tracking-tight text-paper transition-opacity duration-500 hover:opacity-90"
                >
                  Contact
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    ↗
                  </span>
                </TransitionLink>
              </div>
              <p className="max-w-sm text-base leading-relaxed text-ink/60 md:text-lg">
                {SITE.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: oversized wordmark — full section width so it never clips */}
        <div className="mt-10 w-full md:mt-8">
          <span
            data-hero-eyebrow
            className="mb-3 block text-base italic text-ink/45 md:mb-4 md:text-lg"
          >
            independent creative studio
          </span>
          <LineReveal
            as="h1"
            delay={0.35}
            stagger={0}
            className="text-display w-full max-w-full whitespace-nowrap font-bold leading-[0.85] tracking-[-0.045em] text-[clamp(2.75rem,calc((100vw-3rem)/5.65),12.5rem)] md:text-[clamp(3rem,calc((min(100vw,90rem)-5rem)/5.65),13.5rem)]"
            lines={[<span key="wb">WESTBRIDGE</span>]}
          />
          <span className="mt-6 block h-px w-full bg-white/15 md:mt-8" />
        </div>
      </div>
    </section>
  );
}
