"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "intro", label: "01" },
  { id: "philosophy", label: "02" },
  { id: "services", label: "03" },
  { id: "work", label: "04" },
  { id: "process", label: "05" },
  { id: "contact", label: "06" },
] as const;

/**
 * Quiet corner counter — Lucas-style chapter rhythm on the homepage.
 */
export default function SectionIndex() {
  const pathname = usePathname();
  const [active, setActive] = useState("01");
  const labelRef = useRef<HTMLSpanElement>(null);
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;

    const triggers: ScrollTrigger[] = [];

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(section.label),
        onEnterBack: () => setActive(section.label),
      });
      triggers.push(st);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [onHome]);

  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { y: 8, opacity: 0.35 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
    );
  }, [active]);

  if (!onHome) return null;

  return (
    <div
      className="section-index pointer-events-none fixed bottom-6 right-6 z-40 hidden md:block md:bottom-8 md:right-8"
      aria-hidden
    >
      <p className="font-serif text-sm tabular-nums tracking-tight text-ink/50">
        <span ref={labelRef} className="inline-block text-ink/80">
          {active}
        </span>
        <span className="mx-1.5 text-ink/30">/</span>
        <span>06</span>
      </p>
    </div>
  );
}
