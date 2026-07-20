import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import TransitionLink from "@/components/site/TransitionLink";
import { SITE } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44"
    >
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-accent" />
          <span className="label">Start a project</span>
        </div>
      </Reveal>

      <LineReveal
        as="h2"
        scroll
        waitForIntro={false}
        className="text-display mt-10 text-[clamp(2.5rem,9vw,8rem)]"
        lines={[
          "Let’s make",
          "something",
          <span key="l3">
            worth <em className="not-italic text-accent">keeping.</em>
          </span>,
        ]}
      />

      <div className="mt-16 grid grid-cols-1 gap-12 border-t border-ink/10 pt-12 md:mt-24 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <a
            href={`mailto:${SITE.email}`}
            className="group inline-flex flex-col gap-2"
          >
            <span className="label">Say hello</span>
            <span className="text-display relative w-fit text-[clamp(1.5rem,4vw,2.75rem)]">
              {SITE.email}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </span>
          </a>
        </Reveal>

        <Reveal className="flex flex-col gap-8 md:col-span-4 md:col-start-9">
          <div className="flex flex-col gap-2">
            <span className="label">Studios</span>
            <p className="text-lg text-ink-soft">{SITE.location}</p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="label">Elsewhere</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg text-ink-soft">
              <a href="#" className="transition-colors hover:text-ink">
                Instagram
              </a>
              <a href="#" className="transition-colors hover:text-ink">
                LinkedIn
              </a>
              <a href="#" className="transition-colors hover:text-ink">
                Are.na
              </a>
            </div>
          </div>
          <TransitionLink
            href="/contact"
            className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-opacity duration-500 hover:opacity-90"
          >
            Start a project
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              ↗
            </span>
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  );
}
