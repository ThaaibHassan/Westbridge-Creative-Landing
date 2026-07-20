"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useIntro } from "@/components/providers/IntroContext";

const WORD = "WESTBRIDGE";

/**
 * Initial load: logo + word → FLIP to masthead → dark/white panel wipe → reveal.
 */
export default function IntroLoader() {
  const pathname = usePathname();
  const { introActive, markIntroComplete } = useIntro();
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const darkPanelRef = useRef<HTMLDivElement>(null);
  const lightPanelRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [exiting, setExiting] = useState(false);

  const isHome = pathname === "/";
  const visible = isHome && (introActive || exiting);

  useLayoutEffect(() => {
    if (introActive && !isHome) {
      markIntroComplete();
    }
  }, [introActive, isHome, markIntroComplete]);

  useLayoutEffect(() => {
    if (!isHome || !introActive || startedRef.current) return;

    const root = rootRef.current;
    const logo = logoRef.current;
    const name = nameRef.current;
    const darkPanel = darkPanelRef.current;
    const lightPanel = lightPanelRef.current;
    if (!root || !logo || !name || !darkPanel || !lightPanel) return;

    startedRef.current = true;
    setExiting(true);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const teardown = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      tlRef.current = null;
      setExiting(false);
    };

    if (prefersReduced) {
      markIntroComplete({ cinematic: true });
      teardown();
      startedRef.current = false;
      return;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const getHeroTarget = () =>
      document.querySelector<HTMLElement>(
        "[data-hero-wordmark] [data-line-inner]",
      ) ?? document.querySelector<HTMLElement>("[data-hero-wordmark]");

    const readHero = () => {
      const hero = getHeroTarget();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let fontSize = Math.min((Math.min(vw, 1440) - 80) / 5.65, 192);
      if (hero) {
        const measured = parseFloat(getComputedStyle(hero).fontSize);
        if (Number.isFinite(measured) && measured > 8) fontSize = measured;
      }
      const rect = hero?.getBoundingClientRect();
      return {
        fontSize,
        left: rect?.left ?? vw * 0.055,
        top: rect?.top ?? vh * 0.22,
        width: rect?.width ?? fontSize * 5.65,
      };
    };

    const run = () => {
      const hero = readHero();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const logoSize = Math.min(vw * 0.13, 68);
      const gap = 18;
      const startScale = Math.min(0.42, 56 / hero.fontSize);

      gsap.set(name, {
        position: "fixed",
        left: 0,
        top: 0,
        x: 0,
        y: 0,
        fontSize: hero.fontSize,
        scale: startScale,
        transformOrigin: "0% 0%",
        autoAlpha: 1,
        color: "#ffffff",
        force3D: true,
      });

      const nameRect = name.getBoundingClientRect();
      const startX = (vw - nameRect.width) / 2;
      const stackH = logoSize + gap + nameRect.height;
      const stackTop = vh * 0.4 - stackH / 2;
      const logoX = (vw - logoSize) / 2;
      const logoY = stackTop;
      const startY = stackTop + logoSize + gap;

      gsap.set(logo, {
        position: "fixed",
        left: 0,
        top: 0,
        x: logoX,
        y: logoY + 36,
        width: logoSize,
        height: logoSize,
        autoAlpha: 0,
        force3D: true,
      });
      gsap.set(name, {
        x: startX,
        y: startY,
        clipPath: "inset(110% 0 -10% 0)",
      });
      gsap.set([darkPanel, lightPanel], { yPercent: 100, force3D: true });
      gsap.set(root, { autoAlpha: 1, backgroundColor: "#000000" });

      const travel = { x: startX, y: startY, scale: startScale };

      const tl = gsap.timeline({
        delay: 0.12,
        defaults: { force3D: true },
      });
      tlRef.current = tl;

      tl.to(logo, {
        autoAlpha: 1,
        y: logoY,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(
          name,
          {
            clipPath: "inset(-8% 0 -8% 0)",
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .to({}, { duration: 0.3 })
        .add(() => {
          const target = readHero();
          gsap.set(name, { fontSize: target.fontSize });

          const from = name.getBoundingClientRect();
          const curX = Number(gsap.getProperty(name, "x"));
          const curY = Number(gsap.getProperty(name, "y"));
          const curScale = Number(gsap.getProperty(name, "scale")) || 1;

          travel.x = curX + (target.left - from.left);
          travel.y = curY + (target.top - from.top);
          travel.scale =
            curScale * (target.width / Math.max(from.width, 1));
        })
        .add("travel")
        .to(
          logo,
          {
            autoAlpha: 0,
            y: logoY - 10,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "travel",
        )
        .to(
          name,
          {
            x: () => travel.x,
            y: () => travel.y,
            scale: () => travel.scale,
            duration: 1,
            ease: "power3.inOut",
          },
          "travel",
        )
        // Panel wipe — dark then white over the stage.
        .to(
          darkPanel,
          { yPercent: 0, duration: 0.55, ease: "power3.inOut" },
          "travel+=0.42",
        )
        .to(
          lightPanel,
          { yPercent: 0, duration: 0.55, ease: "power3.inOut" },
          "-=0.36",
        )
        .set(root, { backgroundColor: "transparent" })
        // White covers: hide intro type, reveal real masthead underneath.
        .add(() => {
          gsap.set(name, { autoAlpha: 0 });
          markIntroComplete({ cinematic: true });
        })
        .to(
          lightPanel,
          { yPercent: -100, duration: 0.65, ease: "power3.inOut" },
          "+=0.04",
        )
        .to(
          darkPanel,
          { yPercent: -100, duration: 0.65, ease: "power3.inOut" },
          "-=0.45",
        )
        .add(teardown);
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      requestAnimationFrame(() => requestAnimationFrame(run));
    });
  }, [introActive, isHome, markIntroComplete]);

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[200] bg-black"
      style={{ pointerEvents: introActive ? "auto" : "none" }}
    >
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div ref={darkPanelRef} className="absolute inset-0 bg-[#111111]" />
        <div ref={lightPanelRef} className="absolute inset-0 bg-white" />
      </div>

      <div
        ref={logoRef}
        className="z-[4]"
        style={{ willChange: "transform, opacity" }}
      >
        <Image
          src="/logo-icon.png"
          alt=""
          width={306}
          height={306}
          priority
          unoptimized
          className="pointer-events-none h-full w-full object-contain brightness-0 invert"
        />
      </div>

      <div
        ref={nameRef}
        className="text-display pointer-events-none z-[3] whitespace-nowrap font-bold leading-[0.82] tracking-[-0.045em] text-white"
        style={{ willChange: "transform, opacity, clip-path" }}
      >
        {WORD}
      </div>
    </div>
  );
}
