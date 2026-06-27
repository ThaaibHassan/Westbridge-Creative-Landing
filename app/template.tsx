"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * App Router `template` remounts on every navigation, so this gives each page a
 * restrained enter animation—an understated fade and rise.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      );
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
