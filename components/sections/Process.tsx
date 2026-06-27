import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { PROCESS } from "@/lib/content";

export default function Process() {
  return (
    <section
      id="process"
      className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <SectionHeading
              label="How we work"
              title="A method, not a machine."
            />
            <Reveal
              as="p"
              className="mt-8 max-w-sm text-lg leading-relaxed text-ink-soft"
            >
              Four movements, repeated with discipline. The rhythm stays the
              same; the work it produces never does.
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {PROCESS.map((step) => (
            <Reveal key={step.index}>
              <article className="grid grid-cols-[auto_1fr] gap-6 border-t border-ink/10 py-10 first:border-t-0 first:pt-0 md:gap-10 md:py-14">
                <span className="font-serif text-2xl font-light text-accent">
                  {step.index}
                </span>
                <div>
                  <h3 className="text-display text-[clamp(1.75rem,4vw,3rem)]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
