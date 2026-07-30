"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type CopyEmailProps = {
  email: string;
  className?: string;
  labelClassName?: string;
};

/**
 * Click-to-copy email — Framer Uni pattern, quiet status swap.
 */
export default function CopyEmail({
  email,
  className,
  labelClassName,
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn("group inline-flex flex-col items-start gap-2 text-left", className)}
      aria-label={copied ? "Email copied" : `Copy ${email}`}
    >
      <span className={cn("label", labelClassName)}>
        {copied ? "Copied" : "Say hello — click to copy"}
      </span>
      <span className="text-display relative w-fit text-[clamp(1.5rem,4vw,2.75rem)]">
        {email}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      </span>
    </button>
  );
}
