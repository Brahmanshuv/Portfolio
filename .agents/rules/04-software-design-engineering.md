# 04-SOFTWARE-DESIGN-ENGINEERING

## Purpose
Directs and executes production-grade software engineering, frontend architecture, responsive geometry, CSS systems, component composition, state flow, debugging, deployment, and runtime performance. Unifies high-craft design engineering with rigorous, practical software engineering to build resilient, accessible, and scalable digital products.

## Use When
- Implementing, refactoring, or architecting React components, hooks, layouts, and page routing.
- Writing, auditing, and optimizing CSS, design tokens, responsive geometry, and fluid typography.
- Integrating interaction animations (GSAP, Framer Motion, CSS transitions) into component lifecycles.
- Diagnosing and systematically resolving runtime bugs, layout defects, state glitches, and console warnings.
- Managing Git workflows, branch synchronization, merge conflicts, and release state.
- Troubleshooting build discrepancies, environment variables, asset paths, and Vercel/Vite production deployments.
- Interfacing with REST APIs, handling asynchronous data flows, and defining client/server boundaries.

## Do Not Use For
- Autonomous deep infrastructure engineering (Kubernetes clusters, distributed backend microservices, low-level database engine tuning).
- Pure high-level business copywriting or strategic positioning devoid of technical implementation.

---

## Core Philosophy: The Design → Code Principle

The objective of engineering in Antigravity is never merely:
> *"Make the screenshot look the same."*

The non-negotiable objective is:
> **"Implement the intended design as a robust, responsive, accessible, and maintainable software system."**

Pixel fidelity is essential, but architecture, responsive integrity, code maintainability, accessibility, and runtime performance are equally critical. A visual clone that shatters on resize, leaks memory, drops frames, or violates HTML semantics is broken software.

---

## Tech Stack Context & Standards

For this portfolio repository and modern frontend applications:
- **Core Framework & Runtime:** React 18+, Vite 7+, Node/npm.
- **Styling Architecture:** Vanilla CSS with CSS custom properties (variables) for tokens; Tailwind CSS v4 / PostCSS where configured; styled-components where present. No ad-hoc utility clutter.
- **Animation & Motion:** GSAP (ScrollTrigger, timelines) with strict lifecycle cleanup; Framer Motion / Motion for layout and micro-transitions.
- **Smooth Scrolling:** Lenis smooth scroll engine.
- **Version Control & Hosting:** Git, GitHub, and Vercel.

---

## 1. Web Fundamentals & Browser Mechanics

Antigravity maintains master-level fluency in core browser primitives:

### Semantic HTML & Accessibility (WCAG 2.2 AA)
- **Document Outline:** Strictly one `<h1>` per page. Follow strict heading hierarchy (`h1` ➔ `h2` ➔ `h3`). Never skip heading levels for styling purposes.
- **Semantic Tags:** Use `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<aside>`, `<figure>`, and `<figcaption>`. Do not construct entire applications out of nested generic `<div>` elements.
- **Interactive Semantics:** Real `<button>` elements for actions; `<a>` elements for navigation. Never place `onClick` on a `<div>` or `<span>` without explicit `role`, `tabIndex`, and keyboard event handlers (`Enter` / `Space`).
- **Form Controls:** Every `<input>`, `<textarea>`, and `<select>` must have an associated `<label>` (via `htmlFor` / `id` or nesting). Provide clear validation states, `aria-invalid`, and `aria-describedby` for error text.
- **Accessible Names & Modals:** Provide `aria-label` or `aria-labelledby` for icon-only buttons. Trap focus within modal dialogues and restore focus on close.

### CSS Layout Engines & Stacking Contexts
- **Flexbox vs. Grid:** Use CSS Grid for two-dimensional layouts, macro-page structures, and fluid card systems. Use Flexbox for one-dimensional distribution, toolbars, row alignments, and micro-spacing.
- **Positioning & Flow:** Default to normal document flow. Reserve `position: absolute` strictly for decorative backdrops, floating overlays, or elements explicitly pinned inside an aspect-ratio-locked parent.
- **Stacking Contexts & Z-Index:** Never assign arbitrary `z-index: 99999`. Manage stacking contexts intentionally via `isolation: isolate` on component roots to encapsulate child z-indices.
- **Browser Rendering Pipeline:** Understand the pipeline: *Parse HTML/CSS ➔ Style ➔ Layout (Reflow) ➔ Paint ➔ Composite*. Animate only composite-safe properties (`transform`, `opacity`) to achieve continuous 60fps rendering without triggering layout reflow.

---

## 2. JavaScript & TypeScript Mastery

Antigravity operates with disciplined, modern JavaScript and TypeScript standards:

- **Language Modernity:** Clean ES6+ syntax, modern array/object methods (`map`, `filter`, `reduce`, `some`, `find`), object destructuring, nullish coalescing (`??`), and optional chaining (`?.`).
- **Pure Functions & Immutability:** Treat state and input data as immutable. Never mutate arrays or objects in-place (`items.push()` is forbidden in state flow; use `[...items, newItem]`).
- **Asynchronous Architecture:** Master `async`/`await`, Promises, `Promise.allSettled`, and Promise concurrency. Understand the JavaScript event loop, microtask queue (Promises), and macrotask queue (`setTimeout`, `requestAnimationFrame`).
- **Browser APIs:** Direct expertise in `IntersectionObserver` (viewport entry/lazy loading), `ResizeObserver` (element sizing), `matchMedia` (responsive listeners and `prefers-reduced-motion`), and `localStorage`/`sessionStorage` with safe JSON parsing and quota protection.
- **Error Handling & Defensive Coding:** Wrap risky operations (network requests, JSON parsing, storage reads) in structured `try...catch` blocks with actionable error fallbacks. Never let unhandled promise rejections crash the client.
- **TypeScript Literacy:** Strong command of interfaces, types, generics, union types, discriminated unions, and typing component props, events, and hooks.

---

## 3. React Architecture & State Engineering

- **Component Boundaries & Single Responsibility:** Components should do one job well. Separate data-fetching containers from presentational rendering components.
- **Props & State Flow:** Unidirectional data flow. Lift state up only when siblings require shared access; otherwise keep state local to where it is used. Avoid prop-drilling by leveraging composition (`children`) or lightweight context.
- **Hooks Discipline:**
  - `useState`: Use functional updates (`setCount(prev => prev + 1)`) when new state depends on previous state.
  - `useEffect`: Treat effects as synchronization mechanisms, not lifecycle dumps. Always specify exhaustive dependency arrays. Never omit dependencies to suppress linter warnings.
  - **Cleanup Mandate:** Every effect creating a subscription, timer (`setInterval`), event listener (`addEventListener`), observer (`IntersectionObserver`), or animation timeline (GSAP) **MUST** return a cleanup function.
  - `useMemo` & `useCallback`: Apply to stabilize references passed to memoized children or expensive mathematical recalculations. Avoid premature memoization on trivial expressions.
  - `useRef`: For direct DOM references, mutable values that do not trigger rerenders, and storing active animation instances.
- **Conditional Rendering:** Use explicit ternary operators or explicit boolean checks (`items.length > 0 ? ... : null`). Avoid `{count && <Component />}` when `count` can be `0` (which prints literal `0` into the DOM).
- **Error Boundaries:** Wrap critical subtrees in Error Boundaries to gracefully catch rendering exceptions without crashing the entire application.

---

## 4. Current Portfolio Stack Standards

### React 18+ & Vite 7+
- Fast HMR, clean ES module imports, dynamic code splitting with `React.lazy()` and `Suspense`.
- Manage asset imports cleanly using Vite's path resolution (`/assets/...` or `@/...` aliases).

### GSAP & Animation Integration
- Always scope GSAP selectors to a component ref using `gsap.context()` to ensure seamless cleanup on unmount:
```jsx
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedCard({ children }) {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.card-inner', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' });
    }, cardRef);

    return () => ctx.revert(); // Essential cleanup prevents ghost animations
  }, []);

  return <div ref={cardRef} className="card-container"><div className="card-inner">{children}</div></div>;
}
```

### Framer Motion / Motion
- Respect `prefers-reduced-motion` using `useReducedMotion()`.
- Avoid heavy layout animations (`layout` prop) across hundreds of simultaneous elements.

---

## 5. Frontend Architecture & Decoupled Content

Maintain the decoupled content architecture established across the portfolio (`src/projects/...`):

```
/src/projects/project-name/
  ├── metadata.js    // Decoupled facts: Title, category, tags, role, year, links
  ├── content.js     // Decoupled editorial narrative: Sections, headings, paragraphs, media descriptors
  ├── styles.js      // Visual accent overrides: Project-specific palette tokens
  └── page.jsx       // Stateless rendering shell loading CaseStudyTemplate
```

### Benefits of Decoupled Architecture
1. **Zero Layout Thrashing:** Editorial narrative can be proofed, translated, or restructured without modifying component JSX.
2. **Template Reuse:** `CaseStudyTemplate` governs responsive layout, grid systems, and typographic pacing globally.
3. **Isolate Changes:** Bug fixes to the template immediately benefit all project pages without regression risks.

---

## 6. Systematic Debugging Protocol

When fixing bugs, follow this strict 8-step protocol:

```
1. INSPECT EXISTING IMPLEMENTATION
   └── Read the code, imports, parents, and DOM structure before modifying anything.
2. REPRODUCE THE FAILURE
   └── Identify exact conditions, viewport sizes, and user interactions triggering the error.
3. DETERMINE ROOT CAUSE
   └── Trace through state changes, styles cascade, and event cycles to find the origin.
4. DISTINGUISH SYMPTOM FROM CAUSE
   └── Never confuse a visible glitch for the architectural flaw causing it.
5. MAKE SMALLEST ROBUST CORRECTION
   └── Implement the cleanest surgical fix that permanently resolves the root cause.
6. CHECK AFFECTED BREAKPOINTS & COMPONENTS
   └── Confirm the change causes no unintended regressions across all 5 viewports.
7. AVOID UNRELATED CHANGES
   └── Do not restyle, reformat, or refactor adjacent components during a bug fix.
8. VALIDATE AFTER MODIFICATION
   └── Run build, check browser console, and verify interactive behavior.
```

### The Anti-Symptom Patching Rule
**Never continuously patch CSS symptoms when the actual problem is structural.**
- If an element overflows, fix the grid/flex constraints or parent container width—do not slap `overflow: hidden` on the `<body>`.
- If an element overlaps another, fix document flow and margins—do not apply arbitrary `position: absolute; top: -35px`.
- If flex children wrap unpredictably, set appropriate `min-width: 0` or flex-basis—do not use hacky negative margins.

---

## 7. Responsive Engineering & The 5-Viewport Truth

Never design or optimize an interface for a single screen size. Every layout must be mathematically resilient across 5 physical viewport tiers:

```
[ MOBILE: 375px – 430px ]
       │ Single column, min 44x44px touch targets, compact headers, 16px font baseline
[ TABLET: 768px – 1024px ]
       │ Fluid 2-column grids, hybrid navigation, adaptive touch/mouse ergonomics
[ LAPTOP: 1280px – 1512px ]
       │ Standard desktop baseline, 12-column grid, persistent editorial nav
[ DESKTOP: 1440px – 1920px ]
       │ Constrained max-width containers (1440px), balanced whitespace pacing
[ 2K / ULTRAWIDE: 2560px+ ]
       │ Strict max-width constraints, margin-inline auto, no stretched reading lines (>75ch)
```

### Fluid Geometry & Mathematical Scaling
- **Fluid Spacing & Typography:** Use `clamp()`, `min()`, and `max()` to transition continuously between mobile and desktop:
```css
/* Continuous responsive spacing without abrupt jumps */
--spacing-section: clamp(3rem, 6vw + 1rem, 7.5rem);
--container-padding: clamp(1rem, 3.5vw, 3.5rem);
--text-headline: clamp(2rem, 1.25rem + 3vw, 4rem);

.site-container {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

.editorial-measure {
  max-width: 65ch;
  margin-inline: auto;
}
```

### Prohibited Responsive Anti-Patterns
- **NO global page scale hacks:** Never fix a responsive failure by applying CSS `zoom: 0.8` or `transform: scale(...)` to the `body` or wrapper.
- **NO arbitrary absolute offsets:** Never use `top: 143px; left: 29px;` to position core UI.
- **NO transform compensation:** Never use `transform: translateY(-20px)` to mask broken layout flow.
- **NO viewport-specific patches:** Never create 12 distinct media queries for `375px`, `390px`, `414px`, `430px`. Use fluid constraints and intrinsic sizing.

---

## 8. Performance & Core Web Vitals

Visual ambition must never degrade user interaction. Antigravity targets 60fps animations and flawless Web Vitals:

- **Largest Contentful Paint (LCP < 2.5s):** Hero media must be optimized, compressed, and preloaded if above the fold. Avoid blocking scripts.
- **Interaction to Next Paint (INP < 200ms):** Keep event handlers lean. Do not perform expensive calculations or heavy DOM operations synchronously on click or scroll.
- **Cumulative Layout Shift (CLS < 0.1):** Reserve layout space in advance for every image, video, and dynamic widget using CSS `aspect-ratio`:
```css
.media-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background-color: var(--surface-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.media-wrapper img,
.media-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```
- **Asset Engineering:** Default to WebP or AVIF for photos/screenshots. Use SVG for vector icons. Set `loading="lazy"` and `decoding="async"` on all below-the-fold media.
- **Bundle Hygiene:** Regularly audit `package.json`. Avoid installing monolithic packages for single utility functions. Use Vite dynamic imports (`import()`) for routes and large standalone components.

---

## 9. Git & Version Control Workflow

Antigravity operates with professional Git discipline:

- **Daily Working Commands:** `git status`, `git diff`, `git add`, `git commit -m "..."`, `git push`, `git pull`, `git fetch`, `git checkout -b <branch>`, `git switch <branch>`, `git stash`, `git stash pop`, `git merge`.
- **Destructive Operation Safety Mandate:**
  Before executing ANY destructive or state-resetting Git operation (`git reset --hard`, `git checkout .`, `git restore .`, `git clean -fd`):
  **You must know and verify the user's explicit source of truth.**
  - Does the user want local changes wiped to match `main`?
  - Does the user want local changes stashed for later recovery?
  - Does the user want to undo a single commit while retaining modified files?
  *Never guess or silently wipe working-tree modifications.*

---

## 10. Deployment Diagnostics & Environment Parity

When local and production deployments diverge, investigate systematically:

```
LOCAL VS. PRODUCTION DIVERGENCE CHECKLIST:
1. Branch / Version Mismatch: Is Vercel building the exact commit and branch you are testing locally?
2. Stale Build Cache: Did Vercel deploy a cached build? Trigger a redeploy with cleared cache.
3. Environment Variables: Are variables (e.g. `VITE_API_URL`) defined in Vercel project settings matching `.env.local`?
4. Static Asset Routing: Are paths written as root-relative (`/assets/...`) rather than relative (`../../assets/...`) causing subroute 404s?
5. CSS Build Order / Bundler Minification: Did Vite's production CSS minification expose missing vendor prefixes or cascading order differences?
6. Viewport / Device Emulation: Is the discrepancy a genuine build bug, or an untested mobile viewport aspect ratio?
```

**Rule: Never immediately rewrite or redesign working UI code when a deployment issue occurs. Troubleshoot the build and deployment pipeline first.**

---

## 11. API & Backend Literacy for Frontend Engineers

Maintain strong working literacy across client-server interaction:
- **HTTP & REST Standards:** Semantic methods (`GET` for reads, `POST` for creations, `PUT` for complete replacements, `PATCH` for partial updates, `DELETE` for removals).
- **Status Codes:** Handle `200 OK`, `201 Created`, `304 Not Modified`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, and `500 Server Error` gracefully in UI states.
- **Client/Server Boundary:** Know what runs in Node/serverless (secrets, private keys, database connections) versus what runs in the browser client (public keys, UI state). Never expose private API keys in client-side Vite code (`VITE_*` keys are publicly exposed in the bundle).
- **Data Fetching Patterns:** Implement loading skeletons, error fallbacks, and retry strategies. Debounce high-frequency search inputs.
- **Serverless & CMS:** Understand Vercel Serverless Functions (`/api/...`) and headless CMS integrations (Sanity, Contentful, Markdown-based file pipelines).
- **Scope Boundary:** Maintain strong baseline practical literacy for product/frontend development. Deep distributed systems or Kubernetes cluster architectures are loaded only on demand when explicitly requested.

---

## 12. Non-Destructive Code Modification Standard

When modifying existing codebase components:
1. **Inspect Architecture First:** Read the target file, imported stylesheets, and parent components before modifying code.
2. **Reuse Existing Design Tokens:** Check existing CSS variables (`var(--...)`) for colors, radii, shadows, and spacing. Never hardcode arbitrary hex values or random pixel margins.
3. **Minimize Diff Footprint:** Make surgical, targeted edits. Do not reformat hundreds of lines of working code to tweak a single component.
4. **Preserve Unrelated Work:** Maintain existing prop signatures, event handlers, and data structures. Never discard working features because they were not mentioned in the immediate prompt.
5. **Validate Responsive & Production Impact:** After every modification, verify behavior across breakpoints and confirm `npm run build` succeeds without errors.

---

## Production Parity & Verification Checklist
Before completing any engineering task:
- [ ] **Clean Build:** `npm run build` compiles without TypeScript, JSX, or bundling errors.
- [ ] **Console Hygiene:** Zero unhandled errors, zero React duplicate key warnings, zero 404 network requests in browser console.
- [ ] **Responsive Validation:** Component verified on Mobile (375px), Tablet (768px), and Desktop (1440px+).
- [ ] **Animation Cleanup:** All GSAP ScrollTriggers or intervals revert cleanly on component unmount.
- [ ] **Asset Paths:** All media URLs are verified and resolve identically on `localhost` and production Vercel.
