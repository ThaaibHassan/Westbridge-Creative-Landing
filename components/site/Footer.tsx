import Image from "next/image";
import TransitionLink from "@/components/site/TransitionLink";
import { NAV_LINKS, SITE } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 md:px-10 md:pt-28">
        <div className="grid grid-cols-1 gap-12 border-b border-ink/15 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <TransitionLink href="/" aria-label="Westbridge | home">
              <Image
                src="/logo-white.png"
                alt="Westbridge Creative Studio"
                width={260}
                height={60}
                unoptimized
                className="h-9 w-auto object-contain md:h-10"
              />
            </TransitionLink>
            <p className="mt-6 max-w-sm text-ink/60">{SITE.tagline}</p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <span className="label text-ink/40">Index</span>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className="text-ink/70 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <span className="label text-ink/40">Contact</span>
            <ul className="mt-5 flex flex-col gap-3 text-ink/70">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-sm text-ink/50 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {SITE.fullName}. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <span>Designed &amp; built in-house</span>
            <a href="#top" className="group inline-flex items-center gap-2">
              Back to top
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark — full-width, flush to bottom */}
      <div aria-hidden className="pointer-events-none w-full select-none leading-none">
        <svg
          viewBox="0 0 1000 115"
          className="block h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="0"
            y="115"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-ink/[0.06]"
            style={{
              fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
              fontSize: 155,
              fontWeight: 700,
            }}
          >
            WESTBRIDGE
          </text>
        </svg>
      </div>
    </footer>
  );
}
