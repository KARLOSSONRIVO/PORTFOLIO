# System Architecture

## Karlos Rivo — Developer Portfolio

This document describes the portfolio as it is currently implemented: its main routes, technology stack, source folders, data flow, and deployment path. The repository contains the Next.js frontend and its assets. The contact form's API is external to this repository.

## 1. High-Level Architecture

The site is built with the Next.js App Router and exported as static files. Cloudflare Pages serves the export; browser-side React components provide navigation, animation, scrolling, and form interactions.

```mermaid
flowchart LR
    source["Portfolio source<br/>Next.js App Router"] -->|"next build · output: export"| output["Static export<br/>out/"]
    output --> deploy["GitHub Actions"]
    deploy --> hosting["Cloudflare Pages"]
    hosting -->|"HTML, CSS, JavaScript, images"| browser["Visitor browser"]
    browser -->|"POST /contact<br/>NEXT_PUBLIC_API_URL"| api["External contact API"]
```

The generated site does not run a Next.js server on Cloudflare Pages. Contact submissions are sent by the browser to `${NEXT_PUBLIC_API_URL}/contact`; the API implementation is not present in this repository. There are no in-repository database, authentication, or API route directories.

## 2. Routes and Page Composition

| URL | Source | Purpose |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Portfolio home page: hero, featured projects, tech stack, and contact form |
| `/projects/carbonsense` | `src/app/projects/carbonsense/page.tsx` | CarbonSense project details |
| `/projects/finshield` | `src/app/projects/finshield/page.tsx` | FinShield project details |

`src/app/layout.tsx` is the shared root layout. It applies global styles and fonts, and wraps every route with the navigation, footer, and `LenisProvider`.

The home page composes the following components from `src/components/sections/`:

- `Hero` — the animated landing experience, using the hero UI component.
- `FeaturedProjects` — project cards and their local thumbnail images.
- `MoreProjects` — a separate secondary project index for U-Cash, PALDEX, and Send Notes, using `src/lib/moreProjects.ts` and the shared project card and animated modal.
- `TechStack` — the portfolio's technologies.
- `Contact` — a client-side form using the contact hook and schema.

`About.tsx` is also present as a section component. The current home route uses the About presentation inside the animated hero UI rather than importing that standalone component.

## 3. Technology Stack

Versions below are those recorded in `pnpm-lock.yaml`.

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js 16.2.1 App Router | Routing and static site generation |
| UI runtime | React 19.2.4 | Component rendering and browser interactions |
| Language | TypeScript 5.9.3 | Application source and type checking |
| Styling | Tailwind CSS 4.3.3, PostCSS | Utility styling and global CSS |
| Animation | Framer Motion 12.43.0 | Motion and scroll-reveal effects |
| Smooth scrolling | Lenis 1.3.27 | Smooth scroll behavior |
| Icons | Lucide React 1.66.0, React Icons 5.7.0 | Interface icons |
| Validation | Zod 4.6.7 | Contact form field validation |
| Hosting | Cloudflare Pages | Serves the static export |
| CI/CD | GitHub Actions | Builds the site and deploys on pushes to `main` |
| Version control | Git and GitHub | Source history and workflow triggers |

The TypeScript alias `@/*` resolves to `src/*`, as configured in `tsconfig.json`.

## 4. Folder Structure

```text
PORTFOLIO/
├── .github/
│   └── workflows/
│       ├── Portfolio_CI-CD.yml       # Build artifact and Cloudflare Pages deployment
│       └── Test_Portfolio.yml.disabled
├── assets/
│   ├── ME/                           # Personal image assets
│   └── PROJECTS-20261106T012336Z-1-001/
│       └── PROJECTS/                 # Project screenshot/reference archive
│           ├── ANCHORWATCH/
│           ├── CARBONSENSE/
│           ├── DAGUCONNEC/
│           ├── FINSHIELD/
│           ├── PALDEX/
│           ├── Send Notes/
│           └── UCASH/
├── public/                           # Public static files and starter icons
├── src/
│   ├── app/
│   │   ├── images/
│   │   │   ├── Projects/             # Project thumbnails used by the site
│   │   │   ├── KLOGO.png
│   │   │   └── KLOGO.svg
│   │   ├── projects/
│   │   │   ├── carbonsense/
│   │   │   │   └── page.tsx
│   │   │   └── finshield/
│   │   │       └── page.tsx
│   │   ├── globals.css                # Global styles and design tokens
│   │   ├── icon.png
│   │   ├── layout.tsx                 # Shared root layout and metadata
│   │   └── page.tsx                   # Home route composition
│   ├── components/
│   │   ├── layout/                    # Navbar, footer, scrolling helper
│   │   ├── providers/                 # App-level Lenis provider
│   │   ├── sections/                  # Hero, About, projects, stack, contact
│   │   └── ui/                        # Reusable UI, including landing hero
│   ├── hooks/                         # Active section, contact, reveal behavior
│   └── lib/                           # Shared utilities and contact schema
├── next.config.ts                     # Static export configuration
├── tsconfig.json                      # Strict TypeScript and @/* alias
├── eslint.config.mjs                  # ESLint configuration
├── postcss.config.mjs                 # Tailwind PostCSS plugin
├── pnpm-lock.yaml                     # Locked dependency versions
├── pnpm-workspace.yaml                # pnpm build configuration
├── README.md
├── AGENTS.md
└── CLAUDE.md
```

`assets/` is the larger source/reference image archive. `PROJECTS/` contains standalone reference applications and is excluded from the portfolio's TypeScript and ESLint checks. `src/app/images/` contains images imported by the website, while `public/` contains files addressable directly from the site root. `.next/` and `node_modules/` are generated/local dependency directories. The configured build output is `out/`.

### Source responsibilities

- `src/app/` owns URL routes, shared page layout, metadata, and global styles.
- `src/components/layout/` contains the persistent site frame and scrolling helpers.
- `src/components/providers/` initializes app-wide client behavior.
- `src/components/sections/` contains the main portfolio content blocks.
- `src/components/ui/` contains lower-level visual components.
- `src/hooks/` keeps reusable client-side state and browser interaction logic out of presentation components.
- `src/lib/` contains shared, non-visual helpers such as `cn()` and the Zod contact schema.

## 5. Data and Interaction Flow

### Portfolio content

Project card metadata and modal detail content for CarbonSense, FinShield, DaguConnect, and AnchorWatch are defined in `FeaturedProjects`, using the project experience in `public/file/Karlossonrivo_Resume.pdf`. Each card is a button that opens `ProjectPreview`, a client component portaled to the document body using a native modal dialog. The card center supplies its certificate-style animation origin. It locks background scrolling, suspends Lenis through `projectPreviewChange`, and guards hero gestures through `data-project-preview-open`. Closing restores focus and scrolling after the exit animation without changing the URL; quiet motion dismisses immediately. The content scroll region hides its scrollbar without disabling wheel, touch, or keyboard access. `ProjectLogo` presents compact local brand assets in card and modal headers using unoptimized images compatible with static export. `TechnologyLabel` centralizes the named technology-to-icon mapping for both card and modal lists, using existing react-icons and Lucide dependencies. The existing project detail routes remain available for direct links and retain their screenshots. There is no content database or CMS configured in this repository.

Logo assets are byte-for-byte copies from the standalone reference applications:

| Public asset | Original in `PROJECTS/` |
| --- | --- |
| `public/projects/logos/finshield.svg` | `FINSHIELD_MANAGEMENT_FRONTEND/public/Logo/FinShield.svg` |
| `public/projects/logos/daguconnect.png` | `DaguConnectAndroid/app/src/main/res/drawable/daguconnectlogonobg.png` |
| `public/projects/logos/carbonsense.png` | `CARBONSENSE/FRONTEND/public/CarbonLogo1.png` |
| `public/projects/logos/anchorwatch.png` | `AnchorWatch_Web_Frontend/public/NewLogo.png` |
| `public/projects/logos/paldex.png` | `PALDEX-WEBSITE/images/logo/PaldexLogo2.png` |
| `public/projects/logos/send-notes.png` | `Send-notes/app/src/main/res/drawable/logo.png` |

`MoreProjects` is placed between Featured Projects and Tech Stack in the continuous home-page section background. Both project sections render `ProjectCard` with the same grid and styling, and reuse `ProjectPreview` for modal scroll locking, animation origin, dismissal, and focus restoration. DaguConnect is a single featured entry combining Android and web companion information; its modal identifies the web charts/tables as sample-data previews. The secondary catalog contains U-Cash, PALDEX, and Send Notes and adds no inferred project dates, backend services, or runtime dependencies. U-Cash's compact branding uses the supplied `public/projects/logos/ucash.jpg` wordmark viewport; its dashboard sample follows the Java source and original graphics now supplied in `PROJECTS/UCASH/UCASH/`.

### Dashboard sample screens

`ProjectSampleViewer` reuses the certificate arrival/unseal/seam CSS keyframes. The iframe/native-frame loading signal starts a one-time screen reveal; an animation-end flag clears it, and format changes reset the flag. CSS honors the containing dialog's quiet state, global pause preference, and reduced-motion media query. No additional animation runtime or project startup is required.

All seven project modals expose View sample through `src/lib/projectSamples.ts`. CarbonSense and FinShield use lazy React components copied from their original Next.js dashboards under `src/components/project-samples/`, with fixture adapters replacing authentication and services. Their original dashboard JSX, chart components, UI primitives, tokens, and local logo assets are retained. Recharts, class-variance-authority, and the Radix Slot primitive support those source components; the npm manifest and lockfile match the existing npm CI workflow. `NativeSampleFrame` mounts the components through a React portal into an isolated document with separately compiled source styles. The document permits same-origin access for the portal, but no scripts execute inside it; React executes in the portfolio. Source navigation is intercepted locally, and Escape reaches the existing project dialog. These native samples have no standalone HTML dashboard URL.

The other seven screens are standalone samples in `public/project-samples/`; DaguConnect has web/Android variants, AnchorWatch has web/Flutter variants, and Send Notes has an Android home. PALDEX copies the original home HTML, unchanged CSS, local artwork, and resized source video scenes. AnchorWatch mobile translates the supplied Flutter dashboard and copies its Inter fonts/navigation assets. Dashboard records use fictional fixtures without project services, authentication, or persistence. CSP blocks connections and form submissions. The parent modal retains scroll/focus/motion behavior while expanding for the sample viewer. Source mappings, media preparation, style compilation, regeneration, and verification boundaries are documented in `.docs/PROJECT_SAMPLES.md`.

### Contact form

1. `Contact.tsx` renders controlled name, email, and message fields.
2. `useContactForm.ts` manages field state, validation feedback, and submission status.
3. `contactSchema.ts` validates the submitted values with Zod.
4. On a valid submission, the browser sends JSON to `${NEXT_PUBLIC_API_URL}/contact`.
5. The external service response drives the success or error message shown by the form.

The API base URL must be available as `NEXT_PUBLIC_API_URL` during the frontend build. The repository does not contain the service that receives the contact request.

### Navigation and motion

The Tech Stack section exposes `id="skills"`. Desktop/mobile Skills links, hero navigation requests and pending targets, initial hash expansion, Lenis/native scrolling, and active-section tracking all recognize `skills` alongside `projects` and `contact`.

`TechStack.tsx` owns a typed 27-item technology catalog and six filter options: All, Databases, Tools, AI, Languages, and Frameworks. Dart belongs to Languages and the combined CAG/RAG record belongs to AI. Selected-category state derives the visible semantic list, counts, square desktop grid, cube elevations, and scene height. MatchMedia caps phone grids at three columns (two below 360px). Question-mark placeholders fill unused desktop square cells or the final phone row and reveal “Soon” using the existing stand interaction; they are excluded from technology counts. Native filter buttons expose pressed states and control the list; a polite status region announces counts. Switching categories clears hover/focus/pinned stand state and pointer tilt. FastAPI is deduplicated; HTML and CSS are separate records. Node.js and Blockchain are grouped under Tools; React and Flutter join the broader Frameworks category. No persistence or URL parameter is required for filters.

The catalog renders as six-face CSS 3D cubes. The existing viewport observer and document visibility event suspend CSS float animations offscreen or in background tabs; root motion preferences pause or disable them. Fine-pointer parallax writes local CSS variables from the stationary scene wrapper. It introduces no dependencies, external image assets, canvas, or global animation loop.

`src/lib/techStackUsage.ts` supplies descriptions for all 27 technologies and project associations established by local sources or direct user confirmation. Confirmed associations include Docker in FinShield/CarbonSense, Solidity in FinShield, Laravel in Send Notes, and Java in UCash. The Skills section renders the most recently explored technology's description with project-specific usage and compact `ProjectLogo` marks on the left of the desktop cube assembly; tablets/phones stack the description above it. MongoDB is the initial description. The description persists independently of stand dismissal; filters derive a valid fallback from their visible catalog. Placeholder cubes describe upcoming skills. A ResizeObserver measures the scene column and sets its local scale, with cleanup on filter changes/unmount. Additional local badge assets for Send Notes and PalDex are copied from their reference apps under `PROJECTS/`. UCash uses its original screenshot from `assets/PROJECTS/UCASH/`, with CSS framing its existing U mark. No network requests or dependencies are added.

Native cube buttons control decorative upright acrylic logo stands. Local hover, keyboard-focus, and pinned-selection state determine the single active technology; `useId` binds each button to its stand. A document pointer listener exists only while a stand is pinned and cleans up on dismissal/unmount. Escape and outside presses dismiss pinned stands. The stand is composed from existing SVG icons and CSS 3D planes, with immediate state changes for paused/reduced motion.

`AboutProfile.tsx` owns the expanded hero's open-text profile, combined education/work card, learning records, decorative systems lettering, and dedicated portrait asset. Its content remains authored in the frontend and statically exported. The `#about` region keeps the hero visibility/inert state and keyboard focus access, without a nested scrollbar or Lenis exclusion. A ResizeObserver measures its intrinsic content height so the expanding card and parent section grow to fit every record, including after responsive reflow. During expansion, the content keeps its final width behind the clipping shell, avoiding repeated paragraph reflow and height-observer feedback. AboutProfile and PortraitIntro are memoized so progress updates do not rerender their static subtrees. Hero touch positions live in refs; gesture listeners change policy only when crossing the Home/About boundary and are passive during ordinary page scrolling. About and the following sections share the page's scroll. Fine-pointer devices use one Lenis instance; touch-first devices use browser-native scrolling and smooth navigation without Lenis touch listeners. Only the collapsed responsive Home intro retains native inner scrolling.

`src/lib/certificates.ts` maps three supplied certificate documents to their SVG previews, original files, dimensions, and display metadata. `CertificatePreview.tsx` is a body portal using the browser's native modal dialog, with a zoomable document viewport, an original-document link, loading/error states, and focus restoration. The `certificatePreviewChange` event pauses/resumes the existing Lenis instance; a root data attribute excludes modal gestures from the hero expansion handlers. The preview locks body/root overflow only for its lifetime and restores the previous values and page position when dismissed. Only the three supplied certificate cards are displayed; the blockchain seminar and the preview's SVG download action are omitted at the user's request.

`scripts/convert-certificates.py` exports static assets into `public/certificates/`: PDF paths and outlined text remain vector where present; PNG artwork is embedded losslessly in SVG. It also copies the unmodified originals and writes a conversion manifest. PyMuPDF and Pillow are offline build-tool dependencies invoked through uv; they are not frontend dependencies or required by the normal Next.js build.

The root layout mounts `LenisProvider`. On fine-pointer devices, its requestAnimationFrame loop runs only during an active Lenis animation and stops while idle, stopped, or hidden; it resets the animation clock when waking. Touch-first devices skip the Lenis instance and use native momentum scrolling and native smooth navigation, preserving the same hero and modal event contracts. The provider also applies MotionConfig reduced-motion preferences. The navigation uses `useActiveSection` to track the active home section, while `useScrollReveal` supplies viewport state to Framer Motion animations. The landing hero also coordinates its Home/About presentation with browser events.

`PortraitIntro` includes three personal cards through `PersonalCard`, with client-side spring tilt and CSS float using the existing Framer Motion dependency. Responsive intro scrolling is native and isolated from Lenis with `data-lenis-prevent`; hero wheel/touch handlers defer to that inner scroll before expanding About. The centered navigation's contact and project actions retain the `heroNavRequest` event contract. All assets and components remain compatible with static export.

## 6. Build and Deployment

`next.config.ts` sets `output: 'export'`, so a production build is expected to produce static files in `out/`. The active GitHub Actions workflow is configured to:

1. Run on pull requests to `main` and pushes to `main`.
2. Set up Node.js 20 and install dependencies.
3. Build the static export with `NEXT_PUBLIC_API_URL` supplied from a GitHub secret.
4. Upload `out/` as a workflow artifact.
5. On pushes to `main`, deploy that artifact to Cloudflare Pages using Wrangler.

## 7. Repository Setup Note

The current repository root contains `pnpm-lock.yaml` but no root `package.json` or `package-lock.json`. The active CI workflow uses `npm ci` and `npm run build`, which expect npm project metadata. Reconcile the package manifest, lockfile, and CI package-manager commands before relying on the automated build and deployment path.


## Appearance and hero motion preferences

The client hook src/hooks/useSitePreferences.ts synchronizes navbar controls and PortraitIntro through useSyncExternalStore, root data-theme/data-motion-paused attributes, and a local preference event. RootLayout restores the two localStorage keys before hydration with a beforeInteractive script. No server state, API, provider dependency, or runtime service is required. PreferenceControls renders matching desktop and mobile icon buttons. Semantic Tailwind color variables switch the existing sections and project routes into light or dark palettes; font variables remain inline aliases.

Theme switching progressively enhances useSitePreferences with a native View Transition and a circular Web Animations clip originating at PreferenceControls. The hook commits DOM attributes and shared React snapshots together, skips superseded transitions, and clears transition state when finished. Reduced/paused motion and missing browser support use the direct preference update. Persistence and static-export behavior are unchanged.
