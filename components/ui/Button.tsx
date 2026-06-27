import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

/**
 * Editorial CTA. Solid = ink fill that wipes on hover; outline = hairline pill.
 */
export default function Button({
  href,
  children,
  variant = "solid",
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        variant === "solid"
          ? "bg-ink text-paper"
          : "border border-ink/20 text-ink hover:border-ink/40",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0",
          variant === "outline" && "bg-ink",
        )}
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-500",
          variant === "outline" && "group-hover:text-paper",
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "relative z-10 inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1",
          variant === "outline" && "group-hover:text-paper",
        )}
      >
        ↗
      </span>
    </a>
  );
}
