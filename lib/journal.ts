import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type JournalPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** Optional display category, e.g. "Process" */
  category?: string;
  /** Optional listing thumbnail under /public */
  cover?: string;
};

export type JournalPost = JournalPostMeta & {
  content: string;
};

const JOURNAL_DIR = path.join(process.cwd(), "content/journal");

function ensureDir() {
  if (!fs.existsSync(JOURNAL_DIR)) {
    fs.mkdirSync(JOURNAL_DIR, { recursive: true });
  }
}

function fileToSlug(filename: string) {
  return filename.replace(/\.mdx?$/, "");
}

export function getJournalSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(fileToSlug);
}

export function getJournalPost(slug: string): JournalPost | null {
  ensureDir();
  const mdxPath = path.join(JOURNAL_DIR, `${slug}.mdx`);
  const mdPath = path.join(JOURNAL_DIR, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;
  if (!fullPath) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    category: data.category ? String(data.category) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    content,
  };
}

export function getAllJournalPosts(): JournalPostMeta[] {
  return getJournalSlugs()
    .map((slug) => {
      const post = getJournalPost(slug);
      if (!post) return null;
      const { content: _c, ...meta } = post;
      return meta;
    })
    .filter((p): p is JournalPostMeta => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatJournalDate(date: string) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  // Manual-style compact date: MM/DD/YY
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

export function formatJournalDateLong(date: string) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
