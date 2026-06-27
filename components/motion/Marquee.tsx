"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type MarqueeProps = {
  items: string[];
  /** Seconds for one full loop. Higher = slower. */
  speed?: number;
};

export default function Marquee({ items, speed = 32 }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      // The track renders the list twice; animate by half to loop seamlessly.
      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: speed,
        repeat: -1,
      });
    },
    { scope: ref },
  );

  // Render the set twice; each item carries uniform trailing space so a
  // -50% shift lands exactly one full set over for a seamless loop.
  const loop = [...items, ...items];

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div data-track className="flex w-max items-center">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-16 pr-16 font-serif text-2xl font-light text-ink-muted md:text-3xl"
          >
            {item}
            <span className="inline-block h-1 w-1 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
