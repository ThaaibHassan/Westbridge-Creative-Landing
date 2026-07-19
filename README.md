# Westbridge Creative Studio

A premium, editorial-style portfolio site for a fictional creative studio. Near-monochrome
art direction, oversized serif typography, generous whitespace, and restrained,
motion-disciplined animation.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**, design tokens defined in `app/globals.css` via `@theme`
- **GSAP** + **@gsap/react**, scroll reveals, staggered text, parallax, menu motion
- **Lenis**, lightweight smooth scrolling, synced to GSAP's ticker + ScrollTrigger
- **next/font**, Inter (single typeface, used across display and UI)

Respects `prefers-reduced-motion`: all animations gracefully fall back to a fully
visible, static layout.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
app/
  layout.tsx          Root layout, fonts, metadata, smooth-scroll provider
  page.tsx            Homepage composition
  globals.css         Tailwind import + design tokens + base styles
components/
  providers/          SmoothScroll (Lenis + ScrollTrigger wiring)
  motion/             Reusable motion primitives (Reveal, LineReveal, WordReveal, Marquee)
  site/               Nav, Footer, SectionHeading
  sections/           Hero, Services, Work, Process, About, Contact
  ui/                 Button
lib/
  content.ts          All site copy and data
  cn.ts               className helper
```

## Design notes

- **Palette**, warm bone paper `#eae7e0`, ink `#17150f`, one muted clay accent `#9d5436`.
- **Type**, Inter throughout; large headings use a light weight with tight tracking,
  fluid `clamp()` scales for true responsive hierarchy.
- **Motion**, hero lines rise on load; sections fade-and-rise on scroll with fine
  stagger; the process section uses a sticky column rather than hard pinning for a
  calmer narrative. Hover states are subtle and intentional.

All content is placeholder copy and can be edited in `lib/content.ts`.
