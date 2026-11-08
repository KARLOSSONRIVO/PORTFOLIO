---
name: Karlos Rivo Portfolio
description: Dark developer portfolio with crimson accents, bold typography, and animated geometric surfaces.
colors:
  primary: "#dc143c"
  primary-container: "#7a0b21"
  background: "#000000"
  surface: "#131313"
  on-surface: "#ffffff"
  on-surface-variant: "#a1a1aa"
  surface-container-lowest: "#09090b"
  surface-container-low: "#18181b"
  surface-container-high: "#27272a"
  surface-container-highest: "#3f3f46"
  outline-variant: "#3f3f46"
  red-500: "#e50914"
  red-600: "#b9090b"
  red-900: "#4a0404"
  input-background: "#0e0e0e"
typography:
  display:
    fontSize: "clamp(1.75rem, 7.1vw + 0.3rem, 6rem)"
    fontWeight: 700
    letterSpacing: "-0.025em"
  headline:
    fontSize: "clamp(2rem, 5.7vw + 0.9rem, 4.5rem)"
    fontWeight: 900
    letterSpacing: "-0.05em"
  headline-small:
    fontSize: "clamp(1.75rem, 2.8vw + 1.2rem, 3rem)"
    fontWeight: 900
  title:
    fontSize: "1.5rem"
    fontWeight: 700
  body:
    fontSize: "1rem"
    fontWeight: 400
  label:
    fontSize: "0.625rem"
    letterSpacing: "0.1em"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  small: "8px"
  control-gap: "12px"
  field-gap: "16px"
  form-gap: "20px"
  card-padding: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    padding: "16px 40px"
  input:
    backgroundColor: "{colors.input-background}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "16px 20px"
  project-tag:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
---

# Design System: Karlos Rivo Portfolio

## Overview

This document captures the current design from the repository's CSS, layouts, and components. The reference screenshots inform the document structure; the portfolio source supplies its visual values. This is a source audit, not a confirmation of browser rendering or accessibility conformance.

The portfolio uses a dark, expressive presentation for software projects and professional identity. Black and zinc surfaces create depth, crimson identifies branding and interactive emphasis, and large headings establish hierarchy. The signature experience is a geometric hero that expands into an About presentation before releasing normal page scrolling.

### Design principles

| Principle | Application in the current interface |
| --- | --- |
| Clear hierarchy | Large headings introduce sections; muted descriptions and compact labels support them. |
| Consistent identity | Crimson branding and dark surfaces recur across navigation, projects, tools, and contact. |
| Project visibility | Wide screenshots lead project cards and detail pages. |
| Deliberate motion | Hero expansion, staggered reveals, and hover responses provide visual continuity. |
| Responsive composition | Desktop grids become stacked content, and navigation moves to a floating bottom bar on mobile. |

**Key characteristics:**

- Dark surfaces with white primary text and muted gray supporting copy.
- Crimson highlights, subtle borders, translucent panels, and localized glow.
- Bold, tightly tracked headings paired with small, widely tracked labels.
- Rounded cards and controls, with pill shapes for the main action and hero decoration.

The frontmatter records extracted token values. The guidance below explains their application; identified gaps describe the implementation rather than completed fixes.

## Colors

The palette combines a primary crimson accent with several dark neutral layers. Secondary brand colors are not defined as a shared system.

![Portfolio color swatches showing each token, hex value, and usage](.docs/design-palette.png)

### Primary

| Token | Visual role |
| --- | --- |
| `primary` | Crimson wordmark, heading emphasis, active navigation, project tags, contact action, and focus glow. |
| `primary-container` | Deep crimson used as a low-opacity hover tint on technology tiles. |
| `red-500`, `red-600`, `red-900` | Additional red shades used by hero gradients, glass-panel hover effects, and scrollbar treatment. These are separate from the main crimson token. |

### Neutral

| Token | Visual role |
| --- | --- |
| `background` | Root page background: black in dark mode and pale neutral in light mode. Projects, Skills, and Contact have transparent backdrops over one continuous `.portfolio-sections-background` wrapper. Its diagonal gradient uses only the existing `primary` crimson (`#dc143c`) at 8%/4% opacity in dark mode and 4%/2% in light mode, with a transparent midpoint. The gradient does not restart at section boundaries. |
| `surface` | Navigation gradient origin and raised UI surfaces. |
| `surface-container-lowest` | Footer and project tags. |
| `surface-container-low` | Raised card surfaces and reduced-motion glass-panel fallback. |
| `surface-container-high` | Translucent technology tiles. |
| `surface-container-highest`, `outline-variant` | Borders and higher neutral layers, commonly used with reduced opacity. |
| `on-surface` | Headings, primary labels, and control text. |
| `on-surface-variant` | Supporting paragraphs and secondary labels. |
| `input-background` | Dark contact input and textarea fill; currently a literal component value. |

### Feedback and project accents

Contact feedback uses Tailwind emerald for success and red for errors, paired with an icon and message. CarbonSense detail content uses green accents; FinShield uses blue accents. These are contextual exceptions, not global secondary brand colors.

**The Accent Rule.** Use the primary crimson for shared portfolio identity. Keep project-specific colors within their project context and feedback colors within their status context.

## Typography

### Current font configuration

`globals.css` assigns sans, headline, body, and label font roles to `var(--font-geist-sans)` with inline Tailwind theme resolution. The root layout loads Geist and Geist Mono as `--font-geist-sans` and `--font-geist-mono`.

The font binding now agrees with the loaded Geist family. Font size and weight roles remain recorded in frontmatter.

### Hierarchy

| Role | Current usage |
| --- | --- |
| Display | Portrait intro uses a fluid bold white name, tight tracking, and a large decorative name ticker. The foreground name is left aligned on desktop and centered on phones. |
| Headline | Major section headings use the fluid `text-heading` scale, weight 900, and tight tracking. Projects and About use uppercase text; Contact uses title case. |
| Smaller headline | Technology section uses the fluid `text-heading-sm` scale with weight 900 and uppercase text. |
| Card title | Project cards use 24px text, increasing to 30px at `sm`, with weight 700 and uppercase treatment. |
| Body | Most descriptions use 16px text, increasing to 18px or 20px in selected sections; longer copy uses relaxed line height. |
| Label | Tags and technology labels are typically 10px; desktop navigation and form labels use 12px; mobile navigation uses 9–10px. Labels commonly use uppercase and expanded tracking. |
| Technical metadata | Project technology lists use a monospace utility at 14px. |

**The Hierarchy Rule.** Keep expressive display type for the hero and section headings. Use readable body text for descriptions and reserve compact uppercase text for short labels.

## Layout

The home page flows through Hero/About, Featured Projects, Tech Stack, and Contact, followed by the shared footer. The About presentation is embedded in the animated hero UI; the separate `About.tsx` section is not directly mounted by the home route.

### Containers and spacing

- Main portfolio sections use centered containers up to 80rem wide (`max-w-7xl`).
- Project detail pages use a 56rem maximum width; the contact form uses 42rem.
- Main sections use vertical padding of 80px, 96px at `sm`, and 128px at `md`.
- The shared `.section-px` gutter is fluid between 16px and 32px below `md`, then becomes 96px per side.
- `.section-px-sm` uses a fluid 12–16px gutter below `md`, then 32px per side.
- Project cards use 20px, 24px, then 32px internal padding as the viewport grows.

### Responsive behavior

| Threshold | Observed change |
| --- | --- |
| `xs` / 375px | Custom small-phone adjustments for labels, navigation width, spacing, and selected titles. |
| `sm` / 640px | Increased spacing, card padding, and text sizes through Tailwind's standard breakpoint. |
| `md` / 768px | Desktop navigation appears; project cards become two columns; contact name/email fields share a row; About becomes a side-by-side composition. |
| `lg` / 1024px | Technology grid expands from four to six columns. |

The technology grid starts at two columns. Project images use a 16:9 crop with `object-cover`. The hero uses the dynamic viewport height (`100dvh`) and an expanding card whose dimensions follow interaction progress.

Mobile navigation floats above the bottom safe area. The footer uses `--mobile-nav-clearance` plus 16px for its bottom padding below `md` so trailing content is not covered; desktop vertical padding is 24px. Its brand/social row spans the available width inside `.section-px-sm` gutters, with vertically centered 44px links on desktop and a stacked layout on phones. GitHub and LinkedIn reuse the hero's brand icons; Email uses the Lucide Mail icon. All three icons are 16px, decorative, and followed by visible text labels.

## Elevation & Depth

Depth comes from tonal layers, transparent panels, blur, thin borders, and red glow. Project cards use `.glass-panel`: a zinc fill at 40% opacity, 12px backdrop blur, and a white border at 5% opacity. Hover increases the red border and adds a soft red shadow.

The contact action uses a crimson glow that strengthens on hover. Technology tiles combine a subtle black shadow with a red hover glow. The mobile navigation uses a blurred translucent background. The portrait introduction uses a flat black ground with subdued oversized name text. The expanded About panel restores the theme-aware 40px crimson grid and diagonal crimson tint, with open copy and restrained graphite cards.

**The Depth Rule.** Reuse the existing dark surface layers and localized glow for related UI. Borders and shadows support interactive surfaces; content hierarchy should remain legible without them.

## Shapes

The common radius vocabulary is recorded in frontmatter: compact rounded tags, rounded image frames, larger card/control corners, and fully rounded action buttons. Project cards, technology tiles, and contact fields generally use 12px corners. The mobile navigation and project-detail image frames use 16px corners.

The home portrait is an unframed transparent cutout in a charcoal shirt. The main hero background uses: a #0a0a0a ground, 40px crimson grid at 7% opacity, and a subtle diagonal crimson tint. The expanding About card interpolates its corner radius with the animation rather than using a single static radius. Borders elsewhere are normally thin and low opacity.

## Components

### Navigation

Desktop and mobile navigation include Home, About, Projects, Skills, and Contact. Skills targets the Tech Stack section at `/#skills`, supports direct hashes and hero expansion, and becomes active as that section crosses the viewport's 40% scroll marker. Tablet link spacing is tightened so the five tabs and preference controls fit beside the brand.

The shared footer has a compact brand/social row: the crimson Karlos Rivo logo at left and GitHub, LinkedIn, and Email links at right, stacking on phones. At `xl` (1280px) and above, the brand, centered 14px copyright/authorship credit, and social links share one vertically aligned row with equal-width outer columns. Below `xl`, the credit sits beneath the brand/social row with a 20px gap: “© [build year] Karlos Son Rivo. All rights reserved. Designed and built by Karlos Son Rivo.” The two phrases wrap naturally on smaller screens and use the theme's secondary text color.

The fixed top-left home link displays “KARLOS SON RIVO” in bold crimson uppercase text beside the Lucide Component symbol, matching the supplied logo reference. The identity line is removed from the hero copy. The centered desktop navigation moves to the right on tablets to leave room for the wordmark; on phones the compact wordmark sits opposite the theme and motion controls. The brand link collapses the hero on the home route and returns to `/` from project routes.

`src/components/layout/Navbar.tsx` defines the fixed top brand/header and responsive navigation. Desktop links use small uppercase labels; the active section is crimson with an animated 1px underline. Below `md`, navigation becomes a floating bottom bar with icons and labels; the active item gains a faint crimson fill.

Home and About links on the home route control hero collapse/expansion. Projects, Skills, and Contact navigate to page sections. Preserve these interaction semantics when reusing the visual navigation pattern.

When About is requested while the hero is already expanded, it returns the page to the hero, updates the hash to `#about`, and emits the About section signal. Fine-pointer devices use Lenis to animate the return to the top over 1.2 seconds, replacing its previous scroll target; touch-first devices use native smooth scrolling; reduced-motion or paused-motion preferences return immediately. Initial hero expansion retains its existing scroll-ready delay. Desktop and mobile navigation share this behavior. Once the hero is expanded, Projects, Skills, and Contact use the same device-appropriate scroll coordination, so a new navigation click replaces any running scroll animation.

### Hero and About presentation

Certificates & seminars keeps its natural 40px gap after the About introduction (28px on phones), with no viewport-height spacer. Its heading and cards are initially transparent and fade in together once the page has scrolled more than 24px and the section enters the viewport with an 80px bottom inset. Returning to the page top hides it again. Keyboard focus reveals the section immediately; paused and reduced-motion preferences remove the fade. The root page scrollbar is hidden in Firefox and Chromium/WebKit without disabling wheel, touch, or keyboard scrolling; nested certificate previews keep their scrollbar.

The expanded About panel renders `AboutProfile.tsx`, matching the approved open-text preview. The left column places “What shapes my work.” and two descriptive paragraphs directly on the crimson grid. A single Education & experience card follows, with a résumé download beneath it. The unframed crossed-arm portrait on the right sits over subdued SYSTEMS. lettering, with small Web & mobile and Backend & AI callouts. The full-width learning area contains the Zuitt AWS Fundamentals course, eGovPH Hackathon, and Meta's Introduction to Android Mobile Application Development course. The three certificate cards share one horizontal desktop row and stack into one column below 1024px. The Zuitt course is not presented as an AWS-issued professional certification. The portrait at `/images/karlos-rivo-about-crossed-arms.png` is the approved original-pose clothing edit, with the charcoal crewneck used on Home.

The profile uses Geist, up to 50px desktop/36px phone title type, 16px descriptions, charcoal surfaces, 14px corners, and crimson-tinted metadata. It uses the existing theme tokens plus scoped light-theme surface overrides. Below 1024px the profile and learning records stack. The About region is keyboard focusable and grows with its content; it has no fixed viewport cap or inner scrollbar. The parent section expands to the measured content height, and wheel, touch, and keyboard scrolling move the page. The content retains its final responsive width throughout expansion, while the shell clips it; a static crimson shadow replaces per-frame shadow interpolation. Gesture listeners become passive once expanded, and touch positions do not trigger React renders. The existing hero expansion and Lenis navigation event contracts remain in place. Cards enter once on visibility with a 16px rise over 500ms and an 80ms stagger. Fine pointers lift and rotate only the visual surface by -4px/-0.6deg over 220ms; outer wrappers stay stationary. Reduced-motion and paused-motion preferences render all cards without animation. The three supplied certificate cards have stationary native button overlays and a View certificate cue. Code & Conquer is omitted for now at the user's request.

### Certificate preview

`CertificatePreview.tsx` opens the selected original artwork in a native modal dialog, portalled to the body. The graphite viewer has a 16px radius, a title/issuer header, an independent document viewport, and Fit/Zoom and Original controls. The SVG download action is omitted at the user's request. The entire underlying About section still uses page scrolling; only a zoomed document pans inside its modal viewport. Native dialog focus containment, Escape, backdrop click, a 44px close button, and focus restoration support keyboard and touch users. Lenis and hero gestures pause while the preview is open, preserving the page position through closing and restoring scrolling afterwards. Loading and failed-image states keep access to the original file.

The focal opening sequence is a paper unseal: the frame settles from a slight tilt and offset toward the selected card over 560ms, while the document reveals outwards from a horizontal centre seam over 680ms. A fine crimson seam fades as the paper opens. Exits take 180ms. Zoom and Fit do not replay the entrance. Paused and reduced-motion preferences use a short fade without the spatial reveal or seam.

Assets live in `public/certificates/`. PDF exports preserve vector artwork and outline text to avoid font substitutions; the original eGovPH PNG is embedded unchanged in SVG and retains its raster resolution. Original PDFs/PNG remain available under `public/certificates/original/`. `scripts/convert-certificates.py` reproduces the exports from the supplied archive; its invocation is documented in the script. The manifest records dimensions and conversion type. No certificate artwork, names, dates, signatures, or branding are recreated or restyled.

`src/components/ui/shape-landing-hero.tsx` coordinates the portrait introduction and expanding About panel. `PortraitIntro.tsx` owns the background PORTFOLIO marquee and cursor-driven gaze states. Expansion coordinates body-scroll locking and the Lenis provider through custom browser events. Wheel/touch interactions and navigation requests share that presentation state.

The introduction leads with the two-line headline “Built to work. Made to matter.”, followed by the role and personal description. The crimson “Explore my work” action sits beside a quieter surface-colored Resume download linking to `/file/Karlossonrivo_Resume.pdf`. GitHub and LinkedIn brand icons and an envelope identify the social links. All three social labels have a persistent 1px underline with a 4px offset. The separate person-behind-the-code action is removed. The About card uses a stationary native button over its untransformed shell, extending 12px past the shell to cover the animated visual edges. The visual layers ignore pointer events; floating pauses on hover or keyboard focus. The full card opens About with one keyboard stop, a full-card focus ring, and hover/pressed feedback. Its summary omits the name and describes web/mobile applications, secure scalable backends, and AI-driven features. Decorative icons are hidden from assistive technology and every action retains a visible text label and keyboard focus ring. The interests appear as unboxed text below the social links, replacing the floating focus card. Copy stays left aligned on desktop and centered in the stacked layout, with wrapping social links and interests on narrow screens. Portrait motion, the right-side cards, and the existing navigation events retain their behavior.

### Project card

`FeaturedProjects.tsx` uses a clickable glass panel with a 16:9 image, title, description, tags, and a separated technology list. On hover, the image scales to 1.05 and becomes fully opaque, the title turns crimson, and the directional arrow appears. Cards stretch their content to keep metadata near the bottom.

### Technology tile

Technology marks use individual colors: TypeScript blue, React/Flutter cyan, Node.js/MongoDB green, Python/Express yellow, FastAPI teal, Kotlin/Blockchain purple, and Java orange; Next.js retains its monochrome mark. Main logos are 56px on desktop and 36px on phones, with 30px/20px full-opacity side logos. TypeScript's SVG uses a white backing for its letter cutouts. Light mode selects darker per-technology colors for contrast, while names retain the theme's text color.

Filled brand SVGs keep a zero-width stroke so their negative spaces and fine details remain visible. Only the outlined Blockchain link mark uses a 1.8px stroke.

`TechStack.tsx` implements the approved Stitch concept as live CSS 3D cubes with six connected faces each, accurate SVG marks, and real text. Its 25 unique records include the original technologies plus Redis, Docker, Git, MySQL, PostgreSQL, Ollama, Solidity, HTML, CSS, Laravel, PHP, Django, and JavaScript. FastAPI appears once; HTML and CSS have separate cubes.

A category filter group sits below the heading: All (25), Databases (4), Tools (4), AI (1), Languages (9), and Frameworks (7). Native buttons have category icons, visible counts, pressed states, focus outlines, and 44px minimum heights. The active filter uses a crimson border and tint. A polite status line announces the current count. Controls wrap on tablets and form a two-column, three-row grid on phones. All restores every technology; changing categories closes any current stand and resets pointer tilt without changing the section hash or moving keyboard focus.

All uses a five-by-five desktop assembly of 112px/70px cubes with 56px gaps, 50px logos, and 12px names. Filtered groups use up to four columns of 128px/80px cubes with 68px gaps, 56px logos, and 14px names. The scene height adapts to the number of rows; the one-item AI view is centered. Both use a 54.7356-degree X / -45-degree Z camera and 2000px perspective. Charcoal top faces, shaded walls, and a 2px rose rim create solid depth. Elevations are computed from each filtered position so the rear stays higher and labels remain visible. Fine-pointer hover raises a block by 16px; cursor position tilts the scene by at most 1.5 degrees, settling over 500ms. At 1024–1199px the assembly and scene height scale to .84; at 768–1023px they scale to .64. Phones use individually tilted 86px/48px cubes (76px/44px below 480px) in three columns, or two below 360px, with 11px labels. Light mode selects pale rose faces and darker per-technology icon colors.

The blocks float 12px along their local depth axis over staggered 5.5–7.3-second cycles. Motion pauses outside the viewport, in background tabs, and with the existing navbar pause control. Reduced motion keeps the static 3D composition and disables pointer tilt and hover lift; touch layouts have no pointer tilt. The technologies remain a semantic list, with decorative side logos hidden from assistive technology. Each cube is now a native display-stand button with an action label, expanded state, controlled-element binding, and visible keyboard focus. The effect uses CSS transforms and the existing Framer Motion viewport observer, without a canvas or added dependencies. Pointer parallax writes two local CSS properties without React state changes or another animation loop. Skills navigation retains `/#skills`.

Hover or keyboard focus raises a transparent, brand-colored acrylic logo stand from a slot in the cube, matching the approved lamp-inspired preview. Its 174px desktop plane rotates upright in the existing 3D scene; the etched logo outline, glowing mark, and transparent support stem are decorative. It rises in 480ms and fades in over 200ms; pointer leave retracts an unpinned stand. Selecting a cube pins its stand; a second selection, outside press, or Escape dismisses it. Only one technology is previewed at a time; hover/focus temporarily takes priority over a pinned cube. The base's flat logo hides during the reveal while its name stays visible, and bobbing pauses on the active cube. Phones use 132px stands and tap-to-toggle. Additional scene spacing protects the heading and first row. Paused/reduced-motion modes show the requested state immediately, retaining usable controls without the rising animation. Light mode darkens the stand's brand color for contrast. The subtitle reads “Hover or tap a cube to raise its display.”

The All scene uses an 8px top margin from 1200px upward and 56px at 1024–1199px, removing excess space created by the centered projection. Its base-cube lift is 8px on desktop to preserve stand clearance with the tighter spacing. Filtered scenes use an 84px desktop top margin and 16px lift. At 1024–1199px multi-item filtered scenes use 108px; at 768–1023px they use 148px while All and AI use 108px. Phone scenes use 64px internal top padding, with a 52px margin and no base lift in All, or a 48px margin for other categories. This keeps the upper stand clear of the result summary in normal-motion layouts.

### Primary action

The contact submit button is a crimson pill with black, bold uppercase text, icons, and a glow. It scales to 1.05 on hover and 0.97 while pressed. During submission, it is disabled, dims to 70% opacity, and replaces the normal content with a spinner and “Sending...” label. A shared standalone Button component is not currently defined.

### Form fields and feedback

Contact fields have a dark fill, white text, subdued placeholders, 12px corners, and 16px by 20px padding. Labels sit above the fields; the message field also displays a character count.

- Default: faint white border; hover makes it more visible.
- Focus: crimson border and a soft crimson glow, driven by the form hook.
- Invalid: red border/glow and an inline icon with error text after the field is touched.
- Success/error: a tinted status panel with an icon and readable feedback text.

The form uses explicit labels. Its field wrapper is local to `Contact.tsx`; it is not a separate shared component library.

### Tags, icons, and imagery

Project tags use compact crimson uppercase labels on the darkest surface. Detail-page technology chips use a more neutral translucent fill and border. Lucide provides interface icons; React Icons supplies technology logos. Keep icon styles aligned within each group.

Portfolio project thumbnails are imported from `src/app/images/Projects/`. The About imagery uses grayscale and reduced opacity, returning toward full color on hover. Image cropping and hover treatments are part of the implemented visual pattern.

### Motion

| Pattern | Observed behavior |
| --- | --- |
| Section reveal | Opacity plus 40–60px upward travel, typically over 0.8 seconds. |
| Project stagger | 0.18-second item delay; Contact uses 0.12 seconds. |
| Technology stagger | 0.55-second reveal with 0.06-second item delay and scale from 0.95. |
| Shared reveal easing | Cubic bezier `[0.25, 0.4, 0.25, 1]`. |
| Hover response | Commonly 0.3 seconds; project-image zoom uses 0.7 seconds. |
| Active navigation | Spring with stiffness 300 and damping 30. |
| Ambient hero motion | PORTFOLIO ticker loops over 52 seconds; gaze images crossfade over 150ms. |
| Smooth scroll | Fine-pointer devices use demand-driven Lenis at 1.2 seconds; touch-first devices use native smooth scrolling and momentum. |

`useScrollReveal` defaults to `once: true`, so revisiting a section does not replay every card entrance. Paused or reduced-motion preferences keep the reveal state visible, and the shared MotionConfig removes spatial Framer Motion animation while preserving fades and navigation feedback. The portrait introduction explicitly disables its ticker for reduced-motion preferences and coarse touch pointers. Touch and reduced-motion layouts use opaque project/mobile-navigation surfaces instead of backdrop blur, plus a radial contact tint instead of a 120px blur. The same less expensive surfaces apply while motion is paused.

## Do's and Don'ts

### Do

- Reuse existing surface and crimson tokens for new portfolio sections.
- Preserve the heading/body/label hierarchy and current responsive grids.
- Use meaningful project screenshots with consistent cropping and alternative text.
- Pair form status colors with readable text and icons.
- Preserve mobile safe-area clearance and the hero/navigation/scroll coordination.
- Resolve the font-variable mismatch before asserting a canonical font family.

### Don't

- Copy the example StudentHub palette or its student-dashboard identity into this portfolio.
- Treat blue and green project accents as new global brand colors.
- Describe hover-only treatments as verified keyboard-focus behavior.
- Assume reduced-motion support, text contrast compliance, or browser font resolution has been verified by this source scan.
- Introduce competing scroll controllers when extending the existing interaction system.

### Follow-up findings

The portrait implementation fixes the font bindings and adds reduced-motion handling and visible focus styles for its controls and navigation links. Existing section reveal animations and text contrast outside this change still need a broader accessibility review. The root `--foreground` value also differs from the white foreground/theme assignments.

Primary references: `src/app/globals.css`, `src/app/layout.tsx`, `src/components/layout/`, `src/components/sections/`, `src/components/ui/shape-landing-hero.tsx`, `src/components/providers/LenisProvider.tsx`, and `src/hooks/useScrollReveal.ts`.

## Design Documentation Workflow

Use these skills as supporting workflows when designing or maintaining this document. The implemented source and rendered interface remain the evidence for the current design system; add recommendations only when they are relevant and adopted.

- **Impeccable:** Use its `document` workflow to audit the existing interface and `extract` workflow to identify design tokens and reusable components. Review the results and keep the maintained document at `.docs/DESIGN.md` rather than creating a competing design file.
- **UI/UX Pro Max:** Use focused searches for specific UX, accessibility, responsive, typography, or stack questions. Verify applicable guidance against this portfolio before adding it here.
- **Design Taste Frontend:** Use when a task calls for a new visual direction, page, or broader redesign. Document patterns after they are selected and reflected in the implementation.
- **MotionSites Web Builder:** Reserve for cinematic hero or landing-page work. Add its resulting patterns here only when they become part of the portfolio's adopted design system.

## Portrait hero (November 2026)

The collapsed home hero uses a PORTFOLIO marquee, the two-line “Built to work. Made to matter.” heading. The role and description lead into Explore my work and Resume actions, social links with icons, and unboxed interests. Gmail uses mailto:karlosrivo@gmail.com. Header branding is restored as the fixed crimson Karlos Son Rivo wordmark and Component symbol. Desktop navigation is a centered graphite island with a filled crimson active tab, 44px link targets, and icon-only pause/play and sun/moon controls. The foreground portrait is a transparent cutout positioned at the horizontal viewport center, without an arch or frame, wearing a generated charcoal shirt with subtle crimson collar trim. The background name uses ordinary HTML text instead of compressed SVG lettering: every tile spans one viewport, the entire line fits inside the tile, and vertical scaling provides the tall display treatment. The carousel pauses on each complete tile before moving to the next. The expanded About panel uses the dedicated crossed-arm portrait in a matching charcoal crewneck.

Five transparent 900px WebP states live in public/images/karlos-rivo-cutout-v2/. The neutral cutout and clothing edit are based on the supplied photo; four gaze edits derive from that cutout. Previous assets remain available in public/images/karlos-rivo-gaze/. A fine mouse pointer selects the dominant direction relative to the eyes, accounting for the contained, bottom-aligned image. A center dead zone and diagonal hysteresis limit rapid switches. All states decode before tracking becomes active; failures retain the neutral cutout. Opacity crossfades take 150ms; portrait tilt is capped at 3 degrees. Decorative duplicates are aria-hidden and the photo has one accessible name.

The neutral portrait remains fully visible for every gaze. Directional states are rendered through two feathered SVG eye masks aligned to the contained 900px square image. Only the eyes crossfade, so generated differences in hair, alpha edges, skin, or clothing cannot replace the base portrait outside the masks.

Two personal cards remain on the right: My approach (quote) and A little about me (bio and About action). The former Currently exploring card is replaced by the inline “Where my curiosity goes” interests below the social links. PersonalCard.tsx measures an untransformed shell and applies spring-smoothed tilt only to the inner surface, capped at 5 degrees X and 7 degrees Y, stiffness 120, damping 20, mass 0.6. Graphite surfaces use 18px corners, a 7px offset backing plate, shallow perspective and restrained crimson reflections. The cards float 7px over 8 and 9 seconds. Pause, inactive hero, reduced-motion and touch states stop float/tilt. No external 3D runtime or dependencies are added.

Below 1100px, or on viewports shorter than 700px, the portrait, copy and cards use normal document flow inside a scrollable intro. Phone cards stack in one column with 20px margins and footer clearance for the centered mobile bottom navigation. The intro has data-lenis-prevent so native inner scrolling works while global Lenis is stopped. Wheel/touch events scroll the intro until its boundary, then drive the existing About expansion. Home navigation resets the intro scroll position.

The ticker loops in 52 seconds and is controlled by the navbar pause/play button. Reduced-motion and touch layouts show the static centered portrait and stop the ticker. Intro controls become inert on expansion; About content is inert until revealed. The heroNavRequest and heroSectionChange events still coordinate navigation, scroll locking, and Lenis. Projects, Skills, and Contact requests from the collapsed hero expand it before navigating; direct section hashes initialize the expanded state. The global inline font tokens now reference the Geist font actually loaded by the layout.


### Theme and motion preferences

The desktop navigation replaces its contact CTA with two 44px icon buttons: Pause/Play controls hero motion, and Sun/Moon switches dark/light appearance. Buttons have action labels, native titles, visible focus rings, and pressed-state semantics. Phones show the same two controls in a compact fixed top-right toolbar, preserving the five-item bottom navigation. The old hero-footer pause button is removed.

useSitePreferences shares primitive snapshots through useSyncExternalStore and a portfolio-preferences event. The root beforeInteractive bootstrap restores portfolio-theme and portfolio-motion-paused from localStorage; storage failures retain working in-memory controls. Storage events synchronize other tabs. Dark is the default. Preferences survive reloads and project-route navigation. Pausing freezes the ticker, card float/tilt and portrait gaze; section navigation and form feedback remain usable.

Color utilities use theme variables; inline font aliases retain the loaded Geist family. Light mode supplies pale surfaces, dark readable text, a faint crimson grid, white raised personal cards, a white navigation island, and matching project/contact surfaces. It preserves photographic colors and the crimson primary actions. Root data attributes select the theme without a full-page color inversion.

Theme changes reveal the new palette through a 650ms circular wave from the center of the activated Sun/Moon button. The radius reaches the farthest viewport corner; the existing scene remains underneath until the reveal completes. Native View Transitions and Web Animations provide snapshots and clipping, without a new dependency. Rapid toggles skip the prior transition and retain the latest requested theme. Keyboard activation uses the button center as well. Paused motion, reduced motion, or unsupported browsers switch instantly. The decorative PORTFOLIO tiles remain hidden from assistive technology.

The hero headline uses the Caveat handwriting face at weight 500, loaded and self-hosted through next/font/google. It stays on two lines, with fluid 44-72px sizing, while the role, description, actions, and navigation retain Geist and the existing theme colors.

Direct #about links reset the page to its starting position after expansion, avoiding browser anchoring to the card while it is still collapsed. The entire About section participates in normal page scrolling, with no independent About scroll position.
