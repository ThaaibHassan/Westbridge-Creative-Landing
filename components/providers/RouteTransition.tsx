"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

type RouteTransitionContextValue = {
  navigate: (href: string) => void;
};

const RouteTransitionContext =
  createContext<RouteTransitionContextValue | null>(null);

export function useRouteTransition(): RouteTransitionContextValue {
  const ctx = useContext(RouteTransitionContext);
  if (!ctx) {
    // Graceful fallback if used outside the provider.
    return {
      navigate: (href) => {
        window.location.href = href;
      },
    };
  }
  return ctx;
}

/** Approximate fill duration of the loading screen, in seconds. */
const FILL_DURATION = 2;

export default function RouteTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const animatingRef = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (animatingRef.current) return;

      // External, mail, tel, or empty — let the browser handle it.
      if (
        !href ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http")
      ) {
        window.location.href = href;
        return;
      }

      const url = new URL(href, window.location.origin);
      const samePath = url.pathname === window.location.pathname;

      // Same-page navigation (e.g. hash) — just scroll, no loader.
      if (samePath) {
        if (url.hash) {
          document
            .querySelector(url.hash)
            ?.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      const overlay = overlayRef.current;
      const line = lineRef.current;
      const track = trackRef.current;
      const counterEl = counterRef.current;

      if (!overlay || !line || !track || !counterEl) {
        router.push(href);
        return;
      }

      animatingRef.current = true;
      overlay.style.pointerEvents = "auto";

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const finish = () => {
        router.push(href);
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.6,
          delay: 0.15,
          ease: "power2.inOut",
          onComplete: () => {
            overlay.style.pointerEvents = "none";
            animatingRef.current = false;
          },
        });
      };

      if (prefersReduced) {
        gsap.set(overlay, { autoAlpha: 1 });
        counterEl.textContent = "100%";
        gsap.set(line, { scaleX: 1, transformOrigin: "left center" });
        gsap.delayedCall(0.25, finish);
        return;
      }

      const progress = { v: 0 };

      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      counterEl.textContent = "0%";

      const tl = gsap.timeline({ onComplete: finish });
      tl.to(line, { scaleX: 1, duration: FILL_DURATION, ease: "power1.inOut" }, 0).to(
        progress,
        {
          v: 100,
          duration: FILL_DURATION,
          ease: "power1.inOut",
          onUpdate: () => {
            counterEl.textContent = `${Math.round(progress.v)}%`;
          },
        },
        0,
      );
    },
    [router],
  );

  return (
    <RouteTransitionContext.Provider value={{ navigate }}>
      {children}

      {/* Loading screen overlay */}
      <div
        ref={overlayRef}
        aria-hidden
        className="invisible fixed inset-0 z-[100] flex items-center justify-center bg-black opacity-0"
        style={{ pointerEvents: "none" }}
      >
        <div ref={trackRef} className="relative w-[min(62vw,560px)]">
          <div ref={lineRef} className="h-px w-full origin-left bg-white" />
          <div className="absolute -top-9 right-0">
            <span
              ref={counterRef}
              className="block text-2xl font-light tabular-nums text-white"
            >
              0%
            </span>
          </div>
        </div>
      </div>
    </RouteTransitionContext.Provider>
  );
}
