"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { useIntro } from "@/components/providers/IntroContext";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in seconds before the reveal begins. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** When true, immediate children are revealed with a stagger. */
  stagger?: boolean;
  staggerAmount?: number;
};

/**
 * Scroll-triggered fade + rise. Honors reduced-motion by rendering visible.
 */
export default function Reveal({
  children,
  as,
  className,
  delay = 0,
  y = 28,
  stagger = false,
  staggerAmount = 0.09,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "div") as ElementType;
  const { introReady } = useIntro();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || !introReady) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const targets = stagger
        ? (Array.from(root.children) as HTMLElement[])
        : [root];

      if (prefersReduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, y });

      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        stagger: stagger ? staggerAmount : 0,
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
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
    { scope: ref, dependencies: [introReady, delay, y, stagger, staggerAmount] },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
