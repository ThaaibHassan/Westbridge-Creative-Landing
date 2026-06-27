"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";
import { cn } from "@/lib/cn";

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="border-t border-ink/10">
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={i} className="border-b border-ink/10">
            <button
              type="button"
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="text-lg tracking-tight md:text-xl">
                {item.question}
              </span>
              <span
                className={cn(
                  "relative h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open && "rotate-45",
                )}
                aria-hidden
              >
                <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-ink" />
                <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-ink" />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open
                  ? "grid-rows-[1fr] pb-6 opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl text-base leading-relaxed text-ink-soft">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
