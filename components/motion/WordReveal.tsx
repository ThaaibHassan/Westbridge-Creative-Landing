"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

type WordRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  start?: string;
};

/**
 * Scroll-triggered, word-by-word rise. Each word lifts out of a clipped row
 * with a fine stagger for an editorial cadence.
 */
export default function WordReveal({
  text,
  as,
  className,
  delay = 0,
  start = "top 82%",
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "h2") as ElementType;
  const words = text.split(" ");

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const inner = root.querySelectorAll<HTMLElement>("[data-word-inner]");

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) {
        gsap.set(inner, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(inner, { yPercent: 110, opacity: 0 });
      gsap.to(inner, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: 0.055,
        scrollTrigger: {
          trigger: root,
          start,
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="reveal-line align-top"
          style={{ display: "inline-block" }}
        >
          <span
            data-word-inner
            className="inline-block will-change-transform"
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
