"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { useIntro } from "@/components/providers/IntroContext";

gsap.registerPlugin(ScrollTrigger);

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
  const { introReady } = useIntro();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || !introReady) return;

      const inner = root.querySelectorAll<HTMLElement>("[data-word-inner]");

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) {
        gsap.set(inner, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(inner, { yPercent: 115, opacity: 1 });

      const tween = gsap.to(inner, {
        yPercent: 0,
        duration: 1.05,
        delay,
        ease: "power4.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: root,
          start,
          once: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === root) st.kill();
        });
      };
    },
    { scope: ref, dependencies: [introReady, delay, start, text] },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="reveal-line align-top"
          style={{ display: "inline-block" }}
        >
          <span data-word-inner className="inline-block will-change-transform">
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
