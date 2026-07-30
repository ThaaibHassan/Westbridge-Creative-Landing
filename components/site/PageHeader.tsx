import type { ReactNode } from "react";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  label: string;
  lines: Array<string | ReactNode>;
  deck?: string;
  meta?: ReactNode;
  className?: string;
};

/**
 * Shared subpage opener — Lucas-quiet label + large LineReveal + deck.
 */
export default function PageHeader({
  label,
  lines,
  deck,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mx-auto max-w-[1400px] border-b border-ink/10 pb-12 md:pb-16",
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-ink" />
          <span className="label">{label}</span>
        </div>
      </Reveal>

      <LineReveal
        as="h1"
        waitForIntro={false}
        delay={0.15}
        className="text-display mt-8 text-[clamp(2.75rem,10vw,8rem)]"
        lines={lines}
      />

      {(deck || meta) && (
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          {deck && (
            <Reveal
              as="p"
              className="max-w-xl text-lg leading-relaxed text-ink-soft md:col-span-6"
            >
              {deck}
            </Reveal>
          )}
          {meta && (
            <Reveal className="md:col-span-4 md:col-start-9 md:justify-self-end">
              {meta}
            </Reveal>
          )}
        </div>
      )}
    </header>
  );
}
