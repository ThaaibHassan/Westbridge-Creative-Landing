"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { useIntro } from "@/components/providers/IntroContext";

gsap.registerPlugin(ScrollTrigger);

type BlindsRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  strips?: number;
};

/**
 * Horizontal blinds wipe — each band reveals a slice of the same headline.
 */
export default function BlindsReveal({
  text,
  as,
  className,
  delay = 0,
  strips = 7,
}: BlindsRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "h2") as ElementType;
  const { introReady } = useIntro();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || !introReady) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const bands = root.querySelectorAll<HTMLElement>("[data-blind]");

      if (prefersReduced) {
        gsap.set(bands, { yPercent: 0 });
        return;
      }

      gsap.fromTo(
        bands,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.07,
          delay,
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [introReady, delay] },
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Tag className="sr-only">{text}</Tag>
      <span aria-hidden className="relative block">
        {Array.from({ length: strips }).map((_, i) => {
          const top = (i / strips) * 100;
          const bottom = ((i + 1) / strips) * 100;
          return (
            <span
              key={i}
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `inset(${top}% 0 ${100 - bottom}% 0)`,
              }}
            >
              <span data-blind className="text-display block will-change-transform leading-[1.05]">
                {text}
              </span>
            </span>
          );
        })}
        <span className="text-display invisible block leading-[1.05]" aria-hidden>
          {text}
        </span>
      </span>
    </div>
  );
}
