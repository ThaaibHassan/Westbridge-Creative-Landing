"use client";

import {
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { useIntro } from "@/components/providers/IntroContext";

gsap.registerPlugin(ScrollTrigger);

type LineRevealProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Wait for the first-load intro before revealing (default true). */
  waitForIntro?: boolean;
  /**
   * After the cinematic intro, appear in place (no second rise).
   * Avoids the WESTBRIDGE double-flash on the homepage hero.
   */
  seamlessIntroHandoff?: boolean;
  /**
   * Reveal on scroll instead of on load.
   * Use for below-fold headings (e.g. homepage Contact).
   */
  scroll?: boolean;
  /** ScrollTrigger start when `scroll` is true. */
  start?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

/**
 * Line rise out of a clipped row — on load, or on scroll when `scroll` is set.
 */
export default function LineReveal({
  lines,
  as,
  className,
  lineClassName,
  delay = 0.15,
  stagger = 0.12,
  waitForIntro = true,
  seamlessIntroHandoff = false,
  scroll = false,
  start = "top 82%",
  ...rest
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "div") as ElementType;
  const { introReady, introCinematic } = useIntro();
  const canReveal = !waitForIntro || introReady;

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

      if (!canReveal) {
        if (seamlessIntroHandoff) {
          gsap.set(inner, { yPercent: 0, opacity: 1 });
        } else {
          gsap.set(inner, { yPercent: 115, opacity: 0 });
        }
        return;
      }

      if (seamlessIntroHandoff && introCinematic) {
        gsap.set(inner, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(inner, { yPercent: 115, opacity: 0 });

      const tween = gsap.to(inner, {
        yPercent: 0,
        opacity: 1,
        duration: 1.15,
        delay,
        ease: "power4.out",
        stagger,
        ...(scroll
          ? {
              scrollTrigger: {
                trigger: root,
                start,
                once: true,
                invalidateOnRefresh: true,
              },
            }
          : {}),
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === root) st.kill();
        });
      };
    },
    {
      scope: ref,
      dependencies: [
        canReveal,
        delay,
        stagger,
        seamlessIntroHandoff,
        introCinematic,
        scroll,
        start,
        lines.length,
      ],
    },
  );

  return (
    <Tag ref={ref} className={cn(className)} {...rest}>
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
