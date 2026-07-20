"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TransitionLink from "@/components/site/TransitionLink";
import ScrambleText, {
  type ScrambleTextHandle,
} from "@/components/motion/ScrambleText";
import { NAV_LINKS, SITE } from "@/lib/content";
import { cn } from "@/lib/cn";

function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const scrambleRef = useRef<ScrambleTextHandle>(null);

  return (
    <TransitionLink
      href={href}
      onMouseEnter={() => scrambleRef.current?.play()}
      onFocus={() => scrambleRef.current?.play()}
      className="group relative text-sm tracking-tight text-ink-soft transition-colors hover:text-ink"
    >
      <ScrambleText ref={scrambleRef} text={label} />
      <span
        className={cn(
          "absolute -bottom-1 left-0 h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          active ? "w-full" : "w-0 group-hover:w-full",
        )}
      />
    </TransitionLink>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ctaScrambleRef = useRef<ScrambleTextHandle>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const items = overlay.querySelectorAll<HTMLElement>("[data-menu-item]");

      if (open) {
        gsap.set(overlay, { display: "flex" });
        gsap.fromTo(
          overlay,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power4.out" },
        );
        gsap.fromTo(
          items,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15,
            ease: "power4.out",
            stagger: 0.07,
          },
        );
      }
    },
    { dependencies: [open] },
  );

  const closeMenu = () => {
    const overlay = overlayRef.current;
    if (!overlay) {
      setOpen(false);
      return;
    }
    gsap.to(overlay, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.5,
      ease: "power4.in",
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
        setOpen(false);
      },
    });
  };

  return (
    <header
      className={cn(
        "nav-shell fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "bg-paper/80 py-4 backdrop-blur-md" : "bg-transparent py-6",
        "text-ink",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
        <TransitionLink
          href="/"
          className="group flex items-center"
          aria-label="Westbridge | home"
        >
          <Image
            src="/logo-icon.png"
            alt="Westbridge Creative Studio"
            width={306}
            height={306}
            priority
            unoptimized
            data-nav-logo
            className="h-7 w-7 object-contain brightness-0 invert transition-[filter,transform] duration-500 group-hover:scale-[1.03] md:h-8 md:w-8"
          />
        </TransitionLink>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <NavItem
                key={link.href}
                href={link.href}
                label={link.label}
                active={active}
              />
            );
          })}
        </nav>

        <TransitionLink
          href="/contact"
          onMouseEnter={() => ctaScrambleRef.current?.play()}
          onFocus={() => ctaScrambleRef.current?.play()}
          className="hidden text-sm tracking-tight md:inline-flex md:items-center md:gap-2"
        >
          <span className="relative">
            <ScrambleText ref={ctaScrambleRef} text="Start a project" />
            <span className="absolute -bottom-1 left-0 h-px w-full bg-current" />
          </span>
        </TransitionLink>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => (open ? closeMenu() : setOpen(true))}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute left-0 block h-px w-6 transition-all duration-300",
                "bg-ink",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-6 transition-all duration-300",
                "bg-ink",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col justify-between bg-paper px-6 pb-12 pt-32 text-ink"
        style={{ display: "none" }}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <span key={link.href} className="reveal-line">
              <TransitionLink
                data-menu-item
                href={link.href}
                onClick={closeMenu}
                className="block py-2 text-5xl font-light tracking-tight"
              >
                {link.label}
              </TransitionLink>
            </span>
          ))}
        </nav>
        <div className="flex flex-col gap-2">
          <span className="reveal-line">
            <TransitionLink
              data-menu-item
              href="/contact"
              onClick={closeMenu}
              className="block text-3xl font-light"
            >
              Start a project
            </TransitionLink>
          </span>
          <span data-menu-item className="label mt-4 block">
            {SITE.email}
          </span>
        </div>
      </div>
    </header>
  );
}
