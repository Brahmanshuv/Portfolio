# 03-VISUAL-MOTION

## Purpose
Directs and executes visual hierarchy, typographic systems, material surfaces, aesthetic craft, composition, spatial motion, and interaction polish. Establishes elite visual taste, eliminates generic AI aesthetic tropes, and ensures motion behaves as functional spatial logic.

## Use When
- Establishing or refining visual hierarchy, layout composition, and typography scales.
- Designing motion systems, microinteractions, page transitions, and hover states.
- Auditing visual craft, surface materials, contrast, and negative space.
- Eliminating visual noise, generic SaaS patterns, and decorative clutter.
- Implementing GSAP, CSS transitions, or interactive animation loops.

## Do Not Use For
- Backend database or API schema architecture.
- Abstract product strategy unrelated to visual or interactive craft.

---

## The Visual Reasoning Sequence
Never jump straight to styling, colors, or animations. Execute visual design in this strict chronological order:

```
COMPOSITION ➔ HIERARCHY ➔ TYPOGRAPHY ➔ SPACING ➔ COLOR/SURFACE ➔ IMAGERY ➔ MOTION ➔ MICROINTERACTION
```

1. **Composition:** Grid structure, reading axes, alignment, and viewport balance.
2. **Hierarchy:** Dominant focal point per viewport; spending visual emphasis deliberately.
3. **Typography:** Font pairings, scale, line-height, measure (50–75ch), and tracking.
4. **Spacing:** Negative space as pacing, padding rhythm (4/8px scale), and section margins.
5. **Color & Surface:** Background tones, surface elevations, borders, and restrained accents.
6. **Imagery & Media:** High-resolution screenshots, diagrams, and purposeful photography.
7. **Motion:** Spatial continuity, transition physics, origin explanation, and causality.
8. **Microinteraction:** Button feedback, focus rings, hover lift, and state changes.

---

## Core Visual Axioms
- **Motion cannot repair a weak layout:** If an interface does not work as a static composition, adding animations only makes it confusing and slow.
- **Effects cannot repair weak hierarchy:** Adding a drop shadow, a glow, or a glass blur never fixes poor typographic scale or missing contrast.
- **Glassmorphism does not equal premium craft:** Overusing translucency creates visual noise and muddy text contrast. Glass must be restrained, quiet, and functional.
- **Gradients do not equal taste:** Flat, intentional colors with flawless proportion routinely outperform complex multi-stop mesh gradients.
- **Large typography demands a message:** Never set 72px text unless the copy is evocative, concise, and carries true editorial weight.

---

## The Anti-Generic AI Aesthetic Ban
Antigravity explicitly prohibits the lazy visual tropes common to AI-generated interfaces:

- **NO arbitrary purple/blue gradients:** Reject the generic neon purple-cyan palette unless explicitly mandated by existing brand tokens.
- **NO decorative glass cards everywhere:** Never wrap every single text snippet in a frosted glass card with a 1px border.
- **NO floating, untethered elements:** Avoid arbitrary 3D floating icons, tilted perspective cards, and disconnected widget blobs that simulate depth without structure.
- **NO endless pill badges:** Stop scattering decorative rounded pills, category tags, and status chips across every headline and card.
- **NO unmotivated bento grids:** Do not force content into a mosaic bento layout unless the modules genuinely represent diverse, asymmetrical data categories.
- **NO chaotic cascading entrance animations:** Do not stagger 15 elements with 0.1s delays that force the user to wait 2 seconds before reading the page.
- **NO neon borders and artificial glow:** Never add outer glow (`box-shadow: 0 0 20px rgba(...)`) to simulate importance.

---

## Typographic Authority & Hierarchy System

### Typographic Scale Tokens & Ratios
Standardize on a Major Third (1.25) or Perfect Fourth (1.33) geometric scale. Use fluid `clamp()` values to ensure smooth responsive scaling:

```css
:root {
  /* Display / Hero */
  --text-display: clamp(2.5rem, 1.75rem + 3.75vw, 5rem);     /* 40px -> 80px */
  --leading-display: 1.05;
  --tracking-display: -0.03em;

  /* Section Headings */
  --text-h1: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);          /* 32px -> 56px */
  --leading-h1: 1.15;
  --tracking-h1: -0.02em;

  --text-h2: clamp(1.5rem, 1.25rem + 1.25vw, 2.25rem);     /* 24px -> 36px */
  --leading-h2: 1.25;
  --tracking-h2: -0.015em;

  --text-h3: clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem);     /* 20px -> 26px */
  --leading-h3: 1.35;
  --tracking-h3: -0.01em;

  /* Body & Reading Text */
  --text-body-lg: 1.125rem;                                /* 18px */
  --leading-body-lg: 1.55;
  --tracking-body-lg: normal;

  --text-body: 1rem;                                       /* 16px */
  --leading-body: 1.6;
  --tracking-body: normal;

  /* Metadata, Badges & Labels */
  --text-caption: 0.8125rem;                               /* 13px */
  --leading-caption: 1.4;
  --tracking-caption: +0.01em;

  --text-eyebrow: 0.6875rem;                               /* 11px uppercase */
  --leading-eyebrow: 1.2;
  --tracking-eyebrow: +0.08em;
}
```

### Typographic Pairing Discipline
- **The Editorial Pairing:** Expressive, authoritative serif display (e.g., Newsreader, Playfair, Instrument Serif) paired with a neutral, highly legible grotesk sans for UI and body copy (e.g., Inter, Geist, SF Pro).
- **The Modern Product Pairing:** Geometric display sans (e.g., Outfit, Plus Jakarta Sans) paired with an ultra-clean neutral neo-grotesque body sans.
- **Rule:** Never exceed two font families. Let weight (400, 500, 600, 700), scale, tracking, and color communicate hierarchy.

---

## Surface Elevations & Restrained Material System
True premium craft uses disciplined surface elevation layering rather than random blur filters:

```css
:root {
  /* Deep, neutral background foundation */
  --surface-base: #090A0B;
  --surface-elevated: #111215;
  --surface-card: rgba(255, 255, 255, 0.03);
  --surface-card-hover: rgba(255, 255, 255, 0.06);

  /* Restrained border definitions */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-focus: rgba(255, 255, 255, 0.25);
  --border-inner-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.06);

  /* Diffused, natural shadow layering */
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-overlay: 0 20px 40px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3);

  /* Restrained Frosted Glass */
  --glass-bg: rgba(17, 18, 21, 0.75);
  --glass-blur: blur(12px);
  --glass-border: 1px solid var(--border-subtle);
}
```

*Rule: Glassmorphism is permitted ONLY on persistent navigation headers, floating control bars, and modal overlays. It is STRICTLY PROHIBITED on standard body cards and text containers.*

---

## Motion Choreography as Spatial Logic
Motion must explain reality to the brain, not perform for applause. Every animation must satisfy at least one functional purpose:
- **Origin & Causality:** Show where an object came from and why it appeared (e.g., a modal expands outward from the button that triggered it).
- **Spatial Relationship:** Explain the layout hierarchy (e.g., sliding panels communicate parent-child or sidebar-canvas relationships).
- **State Change Feedback:** Acknowledge user interaction immediately (e.g., button scale down on click, toggle slide).
- **Continuity & Orientation:** Maintain spatial orientation across view transitions so the user never feels disoriented.

### Animation Duration & Easing Budgets
- **Microinteractions (Clicks, Hovers, Toggles):** `150ms – 200ms`. Immediate feedback.
- **Small Surface Transitions (Tooltips, Dropdowns):** `200ms – 250ms`.
- **Medium Panels (Modals, Slide-over Drawers):** `250ms – 350ms`.
- **Full View Transitions (Page Routing, Deep Layout Shifts):** `350ms – 500ms`.
- **Easing Standard:**
  - *Entrances:* Decelerate / Ease-Out (`cubic-bezier(0.16, 1, 0.3, 1)`). Fast arrival with gentle settling.
  - *Exits:* Accelerate / Ease-In (`cubic-bezier(0.7, 0, 0.84, 0)`). Quick departure to clear screen.
  - *Avoid Bounce:* Bouncy, springy physics (`elastic`, overshoot) are prohibited on professional tool interfaces.

### Performance & Accessibility Standards
- **Hardware-Accelerated Properties Only:** Animate ONLY `transform` and `opacity`. Never animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`).
- **60fps Performance Budget:** Ensure complex scroll-driven effects (GSAP ScrollTrigger) use `will-change: transform` sparingly and disconnect observers on unmount.
- **Reduced-Motion Compliance:** Always implement `@media (prefers-reduced-motion: reduce)`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## Visual Validation Gate
Before declaring any visual design or motion implementation complete, verify:
1. **Single Focus:** Does each screen state have one obvious primary focal point?
2. **Contrast Pass:** Does all body text achieve >= 4.5:1 WCAG contrast?
3. **Pacing:** Is negative space intentional or simply empty dead space?
4. **Restraint:** Have all unnecessary decorative pills, gradients, and blurs been stripped away?
5. **Performance:** Does the page scroll at a locked 60fps without GPU throttling or jank?
