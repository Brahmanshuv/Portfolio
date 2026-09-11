# Typography System & Hierarchy Reference Guide

## 1. Core Typographic Philosophy
Typography is not decoration. Typography is hierarchy, rhythm, structure, tone, polish, clarity, and emotion. In high-craft product design, typography is the backbone of the entire visual experience.

> "A great designer can build a stunning, authoritative website using only typography, spacing, and proportion—no gradients, no 3D objects, no glassmorphism."

---

## 2. Typographic Hierarchy & Semantic Roles

| Role | Semantic HTML | Purpose | Desktop Target | Mobile Target | Line Height | Tracking / Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | `<h1>` | Emotional anchor / core positioning | 48px – 72px (Fluid clamp) | 32px – 40px | 1.05 – 1.15 | -0.02em to -0.03em |
| **Section Heading** | `<h2>` | Major content chaptering | 32px – 44px | 24px – 28px | 1.15 – 1.25 | -0.015em to -0.02em |
| **Subheading / Card Title** | `<h3>` | Component grouping / card titles | 20px – 26px | 18px – 20px | 1.25 – 1.35 | -0.01em |
| **Body Large** | `<p>` | Editorial intros / deck statements | 18px – 22px | 16px – 18px | 1.5 – 1.6 | normal |
| **Body Default** | `<p>` | Core explanatory copy & case study text | 15px – 16px | 14px – 15px | 1.55 – 1.65 | normal |
| **Caption / Metadata** | `<span>`, `<small>` | Labels, tags, timestamps, secondary notes | 12px – 13px | 11px – 12px | 1.4 – 1.5 | +0.01em to +0.02em |
| **Microcopy / Eyebrow** | `<span>` | Section badges, kicker text, categories | 11px – 12px (All Caps) | 10px – 11px | 1.2 – 1.3 | +0.05em to +0.08em |

---

## 3. Typographic Pacing & Line Geometry
1. **Optimal Line Length (Measure):**
   - Ideal body line length: **50 to 75 characters per line** (including spaces).
   - Lines under 45 characters cause jagged, restless reading rhythm.
   - Lines over 85 characters cause eye fatigue and line-skip errors upon return.
   - In CSS: Enforce `max-width: 65ch;` on long-form text containers.

2. **Vertical Rhythm:**
   - Heading-to-body spacing: Place headings closer to the content they introduce than the preceding section (`margin-top: 2.5rem; margin-bottom: 0.75rem;`).
   - Paragraph-to-paragraph spacing: Standardize on `1em` to `1.25em` margin between paragraphs; never double-return empty `<p>` tags.

3. **Fluid Typography Formula:**
   - Use CSS `clamp()` to scale typography proportionally between viewports:
     ```css
     font-size: clamp(2rem, 1.5rem + 2.5vw, 4rem);
     ```

---

## 4. Pairing & Contrast Rules
- **Pairing Discipline:** Never use more than two typeface families in a single project (e.g., one expressive editorial serif or geometric display sans paired with a neutral, highly legible neo-grotesque UI sans).
- **Weight Contrast:** Ensure at least two weight steps between hierarchy levels (e.g., Bold 700 paired with Regular 400; avoid 600 SemiBold next to 500 Medium where difference is ambiguous).
- **Contrast Ratios (WCAG):**
  - Normal body text (<18px): Minimum **4.5:1** against background.
  - Large text (>=18px bold or >=24px regular): Minimum **3.0:1** against background.
