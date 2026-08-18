# Codistica website

The Codistica website is a prerendered React application built with React Router Framework Mode, Vite, Tailwind CSS and Motion.

Every public route is generated as static HTML during the build for search visibility and fast initial loads. Navigation after hydration is handled client-side by React Router. The form API remains an AWS Lambda served from the same domain under `/api/*`.

## Local development

```bash
npm ci
npm run dev
```

The development server is available at `http://localhost:5173`.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

The production site is written to `build/client`.

## Environment

Copy `.env.example` to `.env` when an override is needed. Client-visible variables use Vite's `VITE_` prefix.

## Deployment

The project is deployed to S3 and CloudFront. Infrastructure and deployment scripts live in `infra/`. The Lambda has its own dependencies and build under `lambda/`.
