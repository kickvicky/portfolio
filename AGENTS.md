# personal-portfolio

Next.js (App Router) + React 19 + Tailwind CSS v4 portfolio, deployed to Vercel in server mode.

## Commands

- `pnpm dev` — dev server on http://localhost:3000 (Turbopack, hot reload)
- `pnpm build` — production build into `.next/`
- `pnpm start` — serve the production build locally
- `pnpm typecheck` — `next typegen && tsc --noEmit`
- `pnpm lint` — ESLint (`eslint.config.mjs`: `eslint-config-next` Core Web Vitals + TypeScript rules)
- `pnpm format` — oxfmt

## Project structure

- `src/app/layout.tsx` — root layout: fonts (`next/font`), site-wide metadata, imports `globals.css`, Vercel `<Analytics />`
- `next.config.ts` — allowed remote image hosts + security headers for every route
- `src/app/page.tsx` — home page; composes the section components
- `src/app/projects/[slug]/page.tsx` — case study pages, statically generated via `generateStaticParams`
- `src/app/not-found.tsx`, `robots.ts`, `sitemap.ts`, `icon.svg` — 404 page, SEO files, favicon
- `src/app/opengraph-image.tsx`, `src/app/projects/[slug]/opengraph-image.tsx` — social preview PNGs generated at build time; shared pieces in `src/lib/og.tsx` (inline styles only, no Tailwind)
- `src/assets/fonts/*.woff` — font files for the OG images (Satori can't use `next/font` or woff2)
- `src/app/globals.css` — Tailwind import + all custom CSS classes
- `src/actions/contact.ts` — Server Action for the contact form (sends email via Resend; rate limited via Upstash)
- `src/app/api/views/route.ts` — POST endpoint behind the footer visitor counter (Redis `INCR`, deduped per visitor)
- `src/lib/redis.ts` — shared Upstash client (`null` when unconfigured), per-deployment `keyPrefix`, hashed `visitorId`. Server-only.
- `src/components/home/*` — home page sections
- `src/components/projects/*` — project card, art, architecture diagram, detail view
- Client Components (`"use client"`): `src/components/contact/ContactForm.tsx`, `src/components/home/VisitorCounter.tsx`
- `src/components/icons/*` — SVG icons
- `src/data/*` — site content (projects, roles, hobbies). Edit content here, not in components.
- `src/lib/site.ts` — site name, URL, socials, résumé path, headline `stack` (drives the ticker + home OG image), indexing flag
- `public/Vignesh_Annamalai_Resume.pdf` — public résumé (no phone/email), linked from the contact panel via `site.resume`
- `src/lib/theme.ts` — TS mirror of the `@theme` colours (for OG images / meta tags) + `Accent` type and `accentBg` class map

## Conventions

- Components are Server Components by default. Add `"use client"` only when a component needs state, effects, or browser APIs.
- Export components as default exports. Import via the `@/` alias (maps to `src/`).
- Adding a project = adding an entry to `src/data/projects.ts` with a unique `slug`; routes, sitemap and metadata update automatically.
- Use `next/link` for internal navigation and `next/image` for images (add remote hosts to `next.config.ts`).
- Styling: Tailwind utilities in JSX; shared/complex styles as classes in `globals.css`. No Tailwind config file — use `@theme` in `globals.css` for theme tokens.
- Colours: use the brand tokens (`ink`, `paper`, `charcoal`, `yellow`, `lime`, `pink`) — e.g. `bg-yellow`, `text-pink`, `var(--color-ink)` in CSS. No raw hex / `bg-[#…]` arbitrary values. Adding or changing a colour means updating both `@theme` in `globals.css` and `colors` in `src/lib/theme.ts`.
- Content entries pick colours by token name (`color: "lime"`, typed as `Accent`); components map it to a class with `accentBg[...]`. Never build class names dynamically (`bg-${x}`) — Tailwind can't detect them.
- Fonts are exposed as CSS variables `--font-space-grotesk` and `--font-space-mono`.
- On-screen `//` labels (e.g. `// THINGS I'VE BUILT`) must be string literals in JSX — `{"// LABEL"}` — or `react/jsx-no-comment-textnodes` flags them as comments.
- In JSX text, escape apostrophes as `&apos;`. In strings, use double quotes when the text contains an apostrophe.

## Environment variables

See `.env.example`. Secrets go in `.env.local` (git-ignored) locally and in Vercel project settings in production — never in `.env.example`, which is committed.

- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — contact form email. If unset in dev, messages are logged instead of sent.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — rate limiting + visitor counter. If unset, both switch off.
- `NEXT_PUBLIC_SITE_URL` — canonical URL; falls back to Vercel's production URL.

Redis keys are prefixed `portfolio:<VERCEL_ENV>` (`development` locally), so local and preview runs never touch production data.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
