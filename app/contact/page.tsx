import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import ContactForm from "@/components/site/ContactForm";
import {
  CONTACT_DETAILS,
  CONTACT_HELP,
  CONTACT_STEPS,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Westbridge. Tell us what you're making and we'll reply within two working days.",
};

function NumberedSection({
  marker,
  title,
  children,
}: {
  marker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-ink/10 py-16 md:py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <span className="label">{marker}</span>
          <h2 className="text-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)]">
            {title}
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main id="top" className="px-6 pt-32 md:px-10 md:pt-44">
      {/* Header */}
      <header className="mx-auto max-w-[1400px] pb-12 md:pb-16">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-ink" />
            <span className="label">Contact</span>
          </div>
        </Reveal>
        <LineReveal
          as="h1"
          waitForIntro={false}
          delay={0.2}
          className="text-display mt-8 text-[clamp(2.5rem,9vw,8rem)]"
          lines={["Tell us what", "you're making."]}
        />
        <Reveal
          as="p"
          className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl"
        >
          A few lines is plenty to start. We read every message ourselves and
          reply within two working days.
        </Reveal>
      </header>

      {/* C.01 Details */}
      <NumberedSection marker="C.01" title="Details">
        <div className="grid grid-cols-1 gap-px border-t border-ink/10 sm:grid-cols-2">
          {CONTACT_DETAILS.map((d) => (
            <Reveal key={d.label}>
              <div className="flex flex-col gap-1.5 border-b border-ink/10 py-6">
                <span className="label">{d.label}</span>
                {d.href ? (
                  <a
                    href={d.href}
                    className="text-lg text-ink transition-colors hover:text-ink-soft"
                  >
                    {d.value}
                  </a>
                ) : (
                  <span className="text-lg text-ink">{d.value}</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </NumberedSection>

      {/* C.02 Inquiry */}
      <NumberedSection marker="C.02" title="Inquiry">
        <Reveal>
          <ContactForm />
        </Reveal>
      </NumberedSection>

      {/* C.03 What we help with */}
      <NumberedSection marker="C.03" title="What we help with">
        <ul className="grid grid-cols-1 gap-px border-t border-ink/10 sm:grid-cols-2">
          {CONTACT_HELP.map((item) => (
            <Reveal key={item}>
              <li className="border-b border-ink/10 py-5 text-lg text-ink-soft">
                {item}
              </li>
            </Reveal>
          ))}
        </ul>
      </NumberedSection>

      {/* C.04 How it works */}
      <NumberedSection marker="C.04" title="How it works">
        <div className="border-t border-ink/10">
          {CONTACT_STEPS.map((step) => (
            <Reveal key={step.index}>
              <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-ink/10 py-8 md:gap-10">
                <span className="text-display text-2xl text-ink-muted">
                  {step.index}
                </span>
                <div>
                  <h3 className="text-xl tracking-tight md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </NumberedSection>
    </main>
  );
}
