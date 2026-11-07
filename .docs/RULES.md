# Development Rules

## Karlos Rivo — Developer Portfolio

These rules apply to human contributors and AI coding assistants working in this repository. `AGENTS.md` points contributors here; follow both files before changing project code.

## 1. General Principles

- Read the relevant project instructions and existing implementation before editing.
- Keep changes focused, small, and easy to review. Avoid unrelated cleanup or broad rewrites.
- Prefer the simplest implementation that fits the current architecture.
- Reuse existing components, hooks, utilities, and styles instead of duplicating behavior.
- Keep names descriptive and code readable; do not compress code just to reduce line count.
- Preserve responsive behavior, semantic HTML, keyboard access, and useful image alternative text.
- Treat source code and configuration as the source of truth when comments or older documentation disagree.
- Update project documentation when a change affects routes, dependencies, environment variables, API behavior, static export, or deployment.
- Do not claim that a build, lint, or test passed unless that command was actually run and its result checked.

## 2. Technology and Coding Standards

| Area | Current project standard |
| --- | --- |
| Framework | Next.js 16 App Router |
| Language | TypeScript with strict checking |
| UI | React |
| Styling | Tailwind CSS 4 and `src/app/globals.css` |
| Motion | Framer Motion; Lenis is initialized by the app-level provider |
| Form validation | Zod schema in `src/lib/contactSchema.ts` |
| Import alias | `@/*` maps to `src/*` |
| Output | Static export (`output: 'export'`) |

The exact installed versions are recorded in `pnpm-lock.yaml`. Check the current lockfile before relying on a version number.

### Framework and React

- Use the App Router conventions already present under `src/app/`.
- This repository's `AGENTS.md` requires reading the relevant installed Next.js guide under `node_modules/next/dist/docs/` before writing or changing Next.js code. Follow that requirement and any deprecation guidance in the local docs.
- Keep components as Server Components by default. Add `"use client"` only when the component needs React state/effects, browser APIs, event handlers, or a client-only library.
- Use the `@/` alias for imports from `src/` and keep TypeScript types explicit. Avoid `any`; if an exception is necessary, keep it narrow and explain it in code.
- Follow the surrounding file's formatting and component conventions instead of reformatting unrelated files.

### Styling, motion, and accessibility

- Use Tailwind classes for component styling and `globals.css` for shared styles, fonts, and global tokens.
- Reuse the existing Framer Motion and Lenis setup. Do not initialize a second smooth-scroll engine or competing global animation loop.
- Keep layouts usable on mobile and desktop. Preserve reduced-motion and keyboard usability when adding interactions.
- Use semantic elements, visible focus states, labels for form controls, and descriptive `alt` text for meaningful images.

### Dependencies and package manager

- Avoid new dependencies when the existing stack can do the job.
- Before changing dependencies, inspect the root package files and CI workflow. Keep the package manifest, lockfile, and workflow commands aligned in the same change.
- **Current checkout note:** the root has `pnpm-lock.yaml` but no `package.json` or `package-lock.json`, while the active GitHub Actions workflow runs `npm ci` and `npm run build`. Resolve that mismatch before adding dependencies or relying on the automated build. Do not silently switch package managers or regenerate a lockfile without its matching manifest.

## 3. Project Structure

```text
src/
├── app/                         # App Router routes, root layout, metadata, global CSS
│   ├── projects/                # Project detail routes
│   └── images/                  # Brand assets and images imported by app code
├── components/
│   ├── layout/                  # Navbar, footer, and layout-level helpers
│   ├── providers/               # App-wide client providers (including Lenis)
│   ├── sections/                # Portfolio content sections
│   └── ui/                      # Reusable visual components
├── hooks/                       # Reusable client-side interaction/state logic
└── lib/                          # Shared utilities and schemas

assets/                          # Personal and project reference image archive
public/                          # Files served directly from the site root
.github/workflows/               # Build and deployment automation
```

Place new files by responsibility:

- Add URL pages and route-specific layouts under `src/app/`.
- Put reusable presentation in `src/components/`; keep page sections in `sections/`, shared shell elements in `layout/`, and smaller visual primitives in `ui/`.
- Put reusable browser interaction logic in `src/hooks/` and shared non-visual helpers or schemas in `src/lib/`.
- Put images imported by app code in `src/app/images/`. Use `public/` when a file needs a stable root-relative URL. Keep the large reference archive in `assets/` unless an image is intentionally added to the website.
- Do not add files to generated directories such as `.next/`, `node_modules/`, or the build output `out/`.

## 4. Data, API, and Security Boundaries

- The current portfolio has no in-repository database, authentication system, CMS, or Next.js API route. Do not assume Supabase or another backend is configured.
- Project cards and project detail content are currently authored in the frontend. Keep that pattern unless a task explicitly changes the content architecture.
- The contact form is client-rendered, validated with Zod, and posts JSON to `${NEXT_PUBLIC_API_URL}/contact`. The receiving API is outside this repository. Preserve the endpoint contract unless the task includes an API change.
- Client-side validation improves form feedback; it does not replace validation by the external API.
- Never place private keys or credentials in client code or a `NEXT_PUBLIC_` variable. Keep deployment credentials in GitHub Actions secrets and do not commit local `.env` files.
- If routes, API fields, environment variables, or deployment behavior change, update the relevant documentation and workflow in the same focused change.

## 5. Change Workflow

1. Read `AGENTS.md` and this file. Consult `ARCHITECTURE.md` when it exists; if it is missing or stale, inspect the source and configuration before making architecture assumptions.
2. Inspect the relevant route, component, hook, schema, styles, and workflow before editing.
3. For Next.js changes, read the applicable local guide in `node_modules/next/dist/docs/` before writing code.
4. Make the smallest change that satisfies the request and preserve unrelated user work.
5. Check the available project scripts and CI configuration before choosing a verification command. Report checks that were not run plainly.
6. Review the final diff for unrelated edits, secrets, stale comments, and documentation that no longer matches the implementation.

## 6. Current Architecture Constraints

- `next.config.ts` configures static export. New features must remain statically exportable unless the hosting/runtime architecture is intentionally changed.
- The active deployment workflow builds `out/` and deploys it to Cloudflare Pages.
- The contact endpoint is external; adding an in-repository server route or database is an architecture change and requires explicit task scope plus corresponding documentation and deployment changes.
- A comment in the contact hook mentions Resend and `/api/contact`, but the current implementation sends to `${NEXT_PUBLIC_API_URL}/contact`. Follow the implementation and reconcile that comment if editing the contact flow.
