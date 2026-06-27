"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

type LineRevealProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
};

/**
 * On-load reveal where each line rises out of a clipped row.
 * Used for the hero headline.
 */
export default function LineReveal({
  lines,
  as,
  className,
  lineClassName,
  delay = 0.15,
  stagger = 0.12,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const inner = root.querySelectorAll<HTMLElement>("[data-line-inner]");

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) {
        gsap.set(inner, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(inner, { yPercent: 115, opacity: 0 });
      gsap.to(inner, {
        yPercent: 0,
        opacity: 1,
        duration: 1.15,
        delay,
        ease: "power4.out",
        stagger,
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span
            data-line-inner
            className={cn("block will-change-transform", lineClassName)}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
