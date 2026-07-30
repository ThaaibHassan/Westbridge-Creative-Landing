import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import ProjectRotunda from "@/components/work/ProjectRotunda";
import ProjectList from "@/components/work/ProjectList";
import TransitionLink from "@/components/site/TransitionLink";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Westbridge Creative Studio: brand identities, digital experiences, and premium web design.",
};

export default function WorkPage() {
  return (
    <main id="top">
      <h1 className="sr-only">Projects — Westbridge Creative Studio</h1>

      <ProjectRotunda label="Selected work" />

      <ProjectList projects={PROJECTS} />

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
        <Reveal className="flex flex-col items-start gap-8 border-t border-ink/10 pt-16 md:flex-row md:items-end md:justify-between md:pt-24">
          <h2 className="text-display max-w-2xl text-[clamp(2rem,5vw,4rem)]">
            Have something worth making?
          </h2>
          <Magnetic>
            <TransitionLink
              href="/contact"
              className="group inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-sm font-medium text-paper"
            >
              Start a project
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                ↗
              </span>
            </TransitionLink>
          </Magnetic>
        </Reveal>
      </section>
    </main>
  );
}
