"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { refreshScrollTriggers } from "@/lib/motion";

type IntroContextValue = {
  /** True while the cinematic intro overlay is active. */
  introActive: boolean;
  /** True after intro finishes (or is skipped). Safe to run entrances. */
  introReady: boolean;
  /** True if the full cinematic intro ran this session load. */
  introCinematic: boolean;
  markIntroComplete: (opts?: { cinematic?: boolean }) => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

/** Set when leaving home via client nav — skip intro on SPA return only. */
export const INTRO_SKIP_KEY = "wb-intro-skip";

export function useIntro(): IntroContextValue {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    return {
      introActive: false,
      introReady: true,
      introCinematic: false,
      markIntroComplete: () => {},
    };
  }
  return ctx;
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introActive, setIntroActive] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [introCinematic, setIntroCinematic] = useState(false);
  const initializedRef = useRef(false);

  // Run before paint so heading gates are stable before motion hooks fire.
  useLayoutEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    try {
      sessionStorage.removeItem("wb-intro-seen");
    } catch {
      /* ignore */
    }

    let skipReturn = false;
    try {
      skipReturn = sessionStorage.getItem(INTRO_SKIP_KEY) === "1";
      if (skipReturn) sessionStorage.removeItem(INTRO_SKIP_KEY);
    } catch {
      /* ignore */
    }

    if (prefersReduced || skipReturn) {
      setIntroActive(false);
      setIntroReady(true);
      setIntroCinematic(false);
      refreshScrollTriggers();
      return;
    }

    setIntroActive(true);
    setIntroReady(false);
  }, []);

  const markIntroComplete = useCallback((opts?: { cinematic?: boolean }) => {
    if (opts?.cinematic) setIntroCinematic(true);
    setIntroActive(false);
    setIntroReady(true);
    refreshScrollTriggers();
  }, []);

  const value = useMemo(
    () => ({
      introActive,
      introReady,
      introCinematic,
      markIntroComplete,
    }),
    [introActive, introReady, introCinematic, markIntroComplete],
  );

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}
