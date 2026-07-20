import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";

/**
 * Studio manifesto — Lucas-style restraint as craft, not decoration.
 */
export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-accent" />
              <span className="label">Philosophy</span>
            </div>
          </Reveal>

          <WordReveal
            as="h2"
            text="Restraint is the signal of work that knows what it’s for."
            className="text-display mt-8 max-w-md text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.05]"
          />
        </div>

        <div className="flex flex-col justify-end gap-8 md:col-span-6 md:col-start-7">
          <Reveal
            as="p"
            className="max-w-lg text-lg leading-relaxed text-ink-soft"
          >
            Less motion, more intention. Every line of type should carry the
            reading; every animation should carry the rhythm. Elegance comes
            from the precision of details, not the number of them.
          </Reveal>
          <Reveal
            as="p"
            className="max-w-lg text-base leading-relaxed text-ink-soft"
          >
            We take on a small number of projects each year and stay with each
            one from first sketch to final deploy. No borrowed systems. No
            decorative kits. Craft written for the brand in front of us.
          </Reveal>

          <Reveal>
            <ul className="mt-2 grid grid-cols-1 gap-5 border-t border-ink/10 pt-8 sm:grid-cols-2">
              {[
                {
                  marker: "A.01",
                  title: "Editorial first",
                  body: "Typography and hierarchy do the heavy lifting.",
                },
                {
                  marker: "A.02",
                  title: "Motion with purpose",
                  body: "GSAP and scroll serve pace — never spectacle.",
                },
                {
                  marker: "A.03",
                  title: "Quiet confidence",
                  body: "Brands that hold attention without raising their voice.",
                },
                {
                  marker: "A.04",
                  title: "Built to last",
                  body: "Performance, clarity, and systems that stay useful.",
                },
              ].map((item) => (
                <li key={item.marker} className="min-w-0">
                  <p className="font-serif text-xs text-ink-muted">
                    {item.marker}
                  </p>
                  <p className="mt-2 text-sm font-medium tracking-tight text-ink">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
