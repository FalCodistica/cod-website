# Codistica website architecture

This project uses React Router Framework Mode with Vite, React 19, and Tailwind CSS, built as a pure client-rendered SPA.

- `ssr: false` in `react-router.config.ts`, no `prerender` list — the build emits a single `build/client/index.html` shell. CloudFront falls back to it (200) for any path with no matching S3 object, and the client-side router (including the `*` not-found route) decides what to render.
- Per-route `<title>`/meta/OG tags are set client-side via `react-helmet-async` (`components/Seo.tsx`, rendered from each route). `app/root.tsx` only carries the site-wide static defaults (favicons, manifest, fallback title/description) - crawlers that don't execute JS only ever see those defaults, not per-page metadata. This is a deliberate tradeoff, not a bug.
- Preserve public slugs, canonical URLs, metadata, form field names and analytics behavior unless a change is explicitly requested.
- Route modules live in `app/routes/`; shared UI lives in `components/`.
- Run `npm run lint`, `npm run typecheck` and `npm run build` before shipping.
- Production assets are deployed from `build/client` to S3 and served through CloudFront.
