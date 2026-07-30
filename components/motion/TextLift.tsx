"use client";

import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/cn";

type TextLiftProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Framer Uni–style text lift on hover: duplicate line rises into place.
 */
export default function TextLift({
  children,
  as,
  className,
}: TextLiftProps) {
  const Tag = (as ?? "span") as ElementType;

  return (
    <Tag
      className={cn(
        "group/lift relative inline-flex h-[1.15em] overflow-hidden align-bottom",
        className,
      )}
    >
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/lift:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/lift:translate-y-0"
      >
        {children}
      </span>
    </Tag>
  );
}
