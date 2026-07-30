"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { cn } from "@/lib/cn";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";

function randomGlyph(ch: string) {
  if (/[A-Z]/.test(ch)) return UPPER[(Math.random() * UPPER.length) | 0];
  if (/[a-z]/.test(ch)) return LOWER[(Math.random() * LOWER.length) | 0];
  if (/[0-9]/.test(ch)) return DIGIT[(Math.random() * DIGIT.length) | 0];
  return ch;
}

export type ScrambleTextHandle = {
  play: () => void;
};

type ScrambleTextProps = {
  text: string;
  className?: string;
};

/**
 * Portfolio scramble hover — letters thrash through matching-case glyphs then resolve.
 * Call `play()` from the parent link so the whole hit area triggers the effect.
 */
const ScrambleText = forwardRef<ScrambleTextHandle, ScrambleTextProps>(
  function ScrambleText({ text, className }, ref) {
    const elRef = useRef<HTMLSpanElement>(null);
    const frameRef = useRef(0);
    const targetRef = useRef(text);

    useEffect(() => {
      targetRef.current = text;
      if (elRef.current) elRef.current.textContent = text;
    }, [text]);

    useEffect(() => {
      return () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      };
    }, []);

    const play = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = elRef.current;
      if (!el) return;

      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      const target = targetRef.current;
      const chars = target.split("");
      let frame = 0;

      const tick = () => {
        frame += 1;
        let done = true;
        const next = chars.map((ch, i) => {
          if (ch === " " || !/[a-zA-Z0-9]/.test(ch)) return ch;
          if (frame > i * 1.2 + 5) return ch;
          done = false;
          return randomGlyph(ch);
        });
        el.textContent = next.join("");

        if (done || frame > 48) {
          el.textContent = target;
          frameRef.current = 0;
          return;
        }
        frameRef.current = requestAnimationFrame(tick);
      };

      frameRef.current = requestAnimationFrame(tick);
    };

    useImperativeHandle(ref, () => ({ play }), []);

    return (
      <span ref={elRef} className={cn("inline-block", className)}>
        {text}
      </span>
    );
  },
);

export default ScrambleText;
