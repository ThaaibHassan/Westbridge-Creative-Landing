import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import TransitionLink from "@/components/site/TransitionLink";
import {
  formatJournalDate,
  getAllJournalPosts,
} from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from Westbridge Creative Studio on brand, craft, and building with restraint.",
};

/**
 * Index layout inspired by Manual Studio’s journal:
 * large title, then hairline rows — category / title / date left, thumbnail right.
 */
export default function JournalPage() {
  const posts = getAllJournalPosts();

  return (
    <main id="top" className="px-6 pt-28 md:px-10 md:pt-36">
      <header className="mx-auto max-w-[1400px] pb-10 md:pb-16">
        <LineReveal
          as="h1"
          waitForIntro={false}
          className="text-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.9] tracking-[-0.045em]"
          lines={["Journal"]}
        />
      </header>

      <section className="mx-auto max-w-[1400px] pb-20 md:pb-28">
        {posts.length === 0 ? (
          <Reveal>
            <div className="border-t border-ink/15 py-12">
              <span className="label">Coming soon</span>
              <p className="mt-4 max-w-md text-lg text-ink-soft">
                First entries are on the way.
              </p>
            </div>
          </Reveal>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Reveal>
                  <TransitionLink
                    href={`/journal/${post.slug}`}
                    className="group flex flex-col-reverse gap-5 border-t border-ink/15 py-5 md:grid md:grid-cols-12 md:items-stretch md:gap-6 md:py-6"
                  >
                    {/* Info — Manual: category, title, date */}
                    <div className="flex flex-col items-start justify-start md:col-span-7 lg:col-span-7">
                      {post.category ? (
                        <span className="label mb-1 text-ink/50 md:mb-2">
                          {post.category}
                        </span>
                      ) : null}
                      <h2 className="text-display text-[clamp(1.75rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.035em] text-pretty transition-opacity duration-500 group-hover:opacity-70">
                        {post.title}
                      </h2>
                      <time
                        dateTime={post.date}
                        className="mt-auto pt-4 text-sm tracking-tight text-ink/45 transition-opacity duration-500 group-hover:opacity-70"
                      >
                        {formatJournalDate(post.date)}
                      </time>
                    </div>

                    {/* Thumbnail — Manual: right columns, ~3:2 */}
                    <div className="relative aspect-[3/2] w-full overflow-hidden bg-paper-deep md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10">
                      {post.cover ? (
                        <Image
                          src={post.cover}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-display text-[clamp(3rem,8vw,5rem)] font-extralight text-ink/[0.06]">
                          {post.title.slice(0, 1)}
                        </span>
                      )}
                    </div>
                  </TransitionLink>
                </Reveal>
              </li>
            ))}
            {/* Closing rule like Manual’s continuous list edge */}
            <li aria-hidden className="border-t border-ink/15" />
          </ul>
        )}
      </section>
    </main>
  );
}
