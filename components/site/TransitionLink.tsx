"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useRouteTransition } from "@/components/providers/RouteTransition";

type TransitionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  "data-menu-item"?: boolean;
  "aria-label"?: string;
};

/**
 * Internal link that plays the route-transition loading screen before
 * navigating. Falls back to default behaviour for modified clicks.
 */
export default function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = useRouteTransition();

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button === 1
        ) {
          return;
        }
        onClick?.(e);
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
