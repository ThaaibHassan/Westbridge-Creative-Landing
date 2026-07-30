import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Reveal from "@/components/motion/Reveal";
import TransitionLink from "@/components/site/TransitionLink";
import {
  formatJournalDateLong,
  getAllJournalPosts,
  getJournalPost,
  getJournalSlugs,
} from "@/lib/journal";

type Params = { slug: string };

export function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Entry not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="text-display mt-12 text-[clamp(1.5rem,3vw,2.25rem)]"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-10 text-xl font-medium tracking-tight" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="mt-6 text-lg leading-relaxed text-ink-soft first:mt-0 md:text-xl"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="mt-6 list-disc space-y-2 pl-5 text-lg leading-relaxed text-ink-soft"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mt-6 list-decimal space-y-2 pl-5 text-lg leading-relaxed text-ink-soft"
      {...props}
    />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="underline underline-offset-4 transition-opacity hover:opacity-70" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-medium text-ink" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-8 border-l border-ink/25 pl-6 text-xl leading-relaxed text-ink md:text-2xl"
      {...props}
    />
  ),
};

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const all = getAllJournalPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const next = all[(i + 1) % all.length];

  return (
    <main id="top" className="px-6 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <TransitionLink
            href="/journal"
            className="group inline-flex items-center gap-2 text-sm tracking-tight text-ink-soft transition-colors hover:text-ink"
          >
            <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1">
              ←
            </span>
            Journal
          </TransitionLink>
        </Reveal>
      </div>

      <header className="mx-auto mt-10 max-w-[720px] md:mt-14">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="label">{formatJournalDateLong(post.date)}</span>
            {post.category ? (
              <>
                <span className="text-ink-muted">·</span>
                <span className="label">{post.category}</span>
              </>
            ) : null}
          </div>
        </Reveal>

        <Reveal>
          <h1 className="text-display mt-8 text-[clamp(2.25rem,6vw,4.5rem)]">
            {post.title}
          </h1>
        </Reveal>

        {post.excerpt ? (
          <Reveal
            as="p"
            className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            {post.excerpt}
          </Reveal>
        ) : null}
      </header>

      <article className="mx-auto mt-14 max-w-[720px] border-t border-ink/10 pt-12 md:mt-20 md:pt-16">
        <MDXRemote source={post.content} components={mdxComponents} />
      </article>

      {next && next.slug !== post.slug ? (
        <div className="mx-auto mt-24 max-w-[1400px] border-t border-ink/10 py-16 md:mt-32 md:py-24">
          <Reveal>
            <span className="label">Next</span>
            <TransitionLink
              href={`/journal/${next.slug}`}
              className="group mt-4 block"
            >
              <h2 className="text-display text-[clamp(1.75rem,4vw,3rem)] transition-transform duration-500 md:group-hover:translate-x-3">
                {next.title}
              </h2>
              <span className="mt-4 inline-flex items-center gap-2 text-sm tracking-tight">
                Read
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                  ↗
                </span>
              </span>
            </TransitionLink>
          </Reveal>
        </div>
      ) : null}
    </main>
  );
}
