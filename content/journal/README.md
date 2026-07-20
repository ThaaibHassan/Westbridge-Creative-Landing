# Journal

Write posts as `.mdx` files in this folder. They show up automatically on `/journal`.

## Add a post

1. Create a file: `my-post-title.mdx`
2. Add frontmatter at the top:

```mdx
---
title: My post title
date: 2026-07-20
category: Process
excerpt: One or two sentences for the listing page.
---

Your writing starts here. Use normal Markdown — paragraphs, lists, **bold**, links.

## Subheadings work too
```

3. Save. Visit `/journal` and `/journal/my-post-title`.

## Frontmatter

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Listing + article heading |
| `date` | yes | `YYYY-MM-DD` — newest first |
| `excerpt` | yes | Short summary (used on article) |
| `category` | no | e.g. Process, Studio, News, Interview |
| `cover` | no | Path under `/public`, e.g. `/journal/my-cover.jpg` |

The index page follows a Manual Studio-style layout: category, title, and date on the left; cover thumbnail on the right.
