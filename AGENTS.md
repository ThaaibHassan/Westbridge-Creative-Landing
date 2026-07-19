# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 15 (App Router) + React 19 + TypeScript marketing/portfolio site
(Westbridge Creative Studio). Package manager is npm. There is no backend, database, or
external service — all content is static in `lib/content.ts`, and the contact form submits
via a client-side `mailto:` link. Standard commands live in `package.json`.

- Dev server: `npm run dev` (http://localhost:3000). Type-checking runs as part of `npm run build`.
- Lint: `npm run lint` is **not usable non-interactively**. `next lint` is deprecated in
  Next.js 15 and, because no ESLint config exists in the repo, it prompts to configure ESLint
  (Strict/Base/Cancel). Type safety is instead enforced by `npm run build`. Do not add an
  ESLint config unless the task specifically calls for it.
- No automated test framework is configured (no test script, no Jest/Vitest/Playwright).
  Verify changes manually in the browser or via `npm run build`.
