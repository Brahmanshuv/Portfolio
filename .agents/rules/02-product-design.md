# 02-PRODUCT-DESIGN

## Purpose
Directs and executes end-to-end product design, systems architecture, feature prioritization, UX critique, information architecture, and design system governance. Bridges business strategy, cognitive psychology, and production-grade interaction design into defensible, high-utility digital software.

## Use When
- Designing new SaaS applications, workflows, complex dashboards, or digital tools.
- Evaluating, auditing, or restructuring UX flows, information architecture, or navigation.
- Establishing or refactoring design systems, component tokens, and UI guidelines.
- Prioritizing features, defining MVP scopes, and eliminating unnecessary product bloat.
- Conducting deep UX audits, heuristic evaluations, or state-machine mapping.

## Do Not Use For
- Simple visual CSS styling tweaks that have no architectural or UX implications.
- Purely marketing copy or SEO keyword management.

---

## The Six Operational Modes
When tackling product design problems, explicitly engage one or more of these specialized modes:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  STRATEGY MODE  │ ──► │     UX MODE     │ ──► │  SYSTEMS MODE   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         ▲                                               │
         │              ┌─────────────────┐              ▼
         └───────────── │ VALIDATION MODE │ ◄── ┌─────────────────┐
                        └─────────────────┘     │ DESIGN SYS MODE │
                                                └─────────────────┘
```

---

### 1. STRATEGY MODE (Opportunity Framing & Scope)
Before wireframing or creating interfaces, define the commercial and user foundations:
- **Problem Statement:** Who experiences the friction, in what operational context, what blocks success, and what is the cost of inaction?
- **Core User Job (JTBD):** When [situation], I want to [motivation/action], so I can [expected outcome].
- **Business Alignment:** How does solving this problem drive retention, conversion, operational velocity, or revenue?
- **Explicit Non-Goals:** What will this feature deliberately NOT do in this release? Scope boundaries prevent feature creep.
- **Unit Economics of Attention:** Does the value provided by the feature justify the cognitive overhead it introduces?

#### Feature Prioritization Matrix
Evaluate proposed features across three dimensions before designing:
1. **User Impact:** Does this eliminate a critical workflow blocker for >60% of active users?
2. **Implementation Complexity:** Engineering feasibility, state complexity, and backend dependency burden.
3. **Adoption Friction:** Will users readily understand and adopt the feature without extensive training or onboarding?

*Rule: If a feature has low frequency of use (<5% of sessions), it must NEVER occupy primary screen real estate. Push to contextual secondary inspectors.*

---

### 2. UX MODE (Cognitive Ergonomics & Flow)
Architect frictionless pathways that respect human mental models:
- **Mental Model Alignment:** Map UI concepts to real-world domain objects users already understand (e.g., matching a document editor to pages, binders, and desks).
- **Progressive Disclosure:** Expose only the information and actions necessary for the current task stage. Hide secondary controls behind contextual menus or inspectors.
- **Cognitive Friction Audit:** Remove unnecessary clicks, form inputs, modal interruptions, and navigational backtracking.
- **Action Proximity:** Keep control actions spatially adjacent to the objects they modify (e.g., row-level table actions rather than distant top-level buttons).

#### Navigation Paradigm Guidelines
- **Hierarchical Tree:** Ideal for deep document trees and settings where users move from categories to specific records.
- **Hub-and-Spoke:** Ideal for task-based workflows where users depart from a central dashboard to execute a job, then return to base.
- **Split-View / Inspector:** Ideal for dense professional workspaces (e.g., email clients, code editors, media organizers) where selecting an item in the left pane immediately opens detail in the right pane without navigating away.
- **Modal vs. Inline Editing:** Use modals ONLY for self-contained, high-stakes, or disruptive interruptions (e.g., export settings, confirmation dialogs). Use inline editing for routine property tweaks.

#### Destructive Action Safeguards
- **Soft Deletion Over Modals:** Prefer non-destructive deletion with an immediate "Undo" toast (5-second buffer) over aggressive "Are you sure?" confirmation dialogs.
- **Explicit Typing for Catastrophic Actions:** For permanent, irreversible operations (e.g., deleting a database or closing an account), require the user to type the item's name to confirm intent.

---

### 3. SYSTEMS MODE (Information Architecture & State Completeness)
Design the underlying logic, data relationships, and complete state models:
- **Entity Relationship Modeling:** Define core data entities, their attributes, and their relationships (1-to-1, 1-to-many, many-to-many) before designing layouts.
- **Navigation Topology:** Structure views into clear hierarchical or hub-and-spoke models. Maintain visible breadcrumbs, persistent anchors, and unambiguous back buttons.

#### The 7 Mandatory States
Every single component, table, card, and workflow must explicitly define:
1. **Blank / Uninitiated State:** Pristine first-launch view before user has added any data.
2. **Loading / Skeleton State:** Contextual shapes matching incoming content; prevents layout shift (CLS).
3. **Populated / Normal State:** Standard operating baseline with typical data density.
4. **Empty State:** Instructive guidance, illustration or CTA explaining how to populate data.
5. **Partial State:** Validating incomplete records, partially loaded datasets, or pending syncs.
6. **Error / Recovery State:** Clear explanation of what failed with immediate path to resolve.
7. **Extreme / Stress Content State:** Strings with 200 characters, missing images, 0 values, and massive numbers.

#### Data Density & Complex Tables
- Provide clear visual hierarchy within dense data views.
- Truncate long strings with sensible tooltips; never break row heights unpredictably.
- Provide sticky table headers and sticky left columns for horizontal scrolling on wide datasets.

---

### 4. DESIGN SYSTEM MODE (Token Hierarchy & Governance)
Ensure modular scalability and strict visual consistency across the product surface:

#### The Three Token Tiers
1. **Primitive Tokens (Raw Palette & Scale):**
   - `--color-gray-900: #0F172A;`
   - `--color-blue-500: #3B82F6;`
   - `--space-4: 16px;`
2. **Semantic Tokens (Functional Intent):**
   - `--surface-canvas: var(--color-gray-950);`
   - `--surface-card: var(--color-gray-900);`
   - `--text-primary: var(--color-gray-50);`
   - `--text-muted: var(--color-gray-400);`
   - `--interactive-accent: var(--color-blue-500);`
3. **Component-Scoped Tokens (Specific Overrides):**
   - `--btn-primary-bg: var(--interactive-accent);`
   - `--card-border-default: var(--border-subtle);`

#### Component Architecture Governance
- **Composition Over Boolean Clutter:** Avoid mega-components with 30 configuration flags. Compose smaller, single-responsibility sub-components (`<Card>`, `<CardHeader>`, `<CardBody>`, `<CardFooter>`).
- **Strict Spacing Scale:** Standardize on an 8px layout rhythm with 4px micro-increments (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`). Never introduce ad-hoc margins like `13px` or `27px`.

---

### 5. VALIDATION MODE (Heuristic & Usability Audit)
Subject designs to rigorous evaluation against industry standards:
- **Nielsen-Norman 10 Usability Heuristics:**
  1. Visibility of system status.
  2. Match between system and the real world.
  3. User control and freedom.
  4. Consistency and standards.
  5. Error prevention.
  6. Recognition rather than recall.
  7. Flexibility and efficiency of use.
  8. Aesthetic and minimalist design.
  9. Help users recognize, diagnose, and recover from errors.
  10. Help and documentation.

#### Accessibility Gate (WCAG 2.2 AA Standards)
- **Text Contrast:** Minimum **4.5:1** contrast ratio for standard copy (<18px); **3.0:1** for large text (>=18px bold or >=24px regular).
- **Non-Text Contrast:** Minimum **3.0:1** for interactive borders, form input outlines, and critical icons.
- **Keyboard Traversal:** Ensure every interactive element is reachable via `Tab`, activatable via `Enter` or `Space`, and dismissible via `Escape`.
- **Focus Indicator:** Visible, high-contrast focus rings (minimum 2px solid with 2px offset) on `:focus-visible`. Never remove focus outlines without providing an accessible replacement.
- **ARIA Discipline:** Use semantic HTML5 elements first (`<nav>`, `<main>`, `<article>`, `<button>`). Only add ARIA roles (`aria-expanded`, `aria-haspopup`, `role="dialog"`) when native HTML cannot convey state.

---

### 6. RESEARCH INTERPRETATION MODE (Evidence Integrity)
Synthesize customer feedback and telemetry without cognitive distortion:
- **Enforce the Truth Quadrant:**
  - `FACT:` Verified metrics, recorded user quotes, or documented system behavior.
  - `ASSUMPTION:` Working operational hypotheses that require future validation.
  - `INFERENCE:` Logical deductions based on observed usage patterns.
  - `PROPOSAL:` Unshipped feature concepts or future evaluation plans.
- **Purge Cognitive Biases:** Avoid confirmation bias (cherry-picking quotes that agree with your design), novelty bias (assuming modern UI trends are inherently better), and false consensus (assuming users think like designers).

---

## Anti-Feature Creep & Decision Discipline
Antigravity ruthlessly protects software from unnecessary complexity. Before adding any new feature, button, or workflow, ask:

1. **What is the second-order effect?** What new edge cases, maintenance burdens, documentation needs, and cognitive friction does this introduce?
2. **Can existing components solve this?** Can the user accomplish this goal by combining or refining existing tools rather than creating a new surface?
3. **What is the frequency of use?** Features used 1% of the time must never clutter the primary path used 99% of the time.
4. **Is it fashionable or functional?** Reject decorative dashboards, AI buzzword features, and unnecessary 3D elements that provide no measurable utility.

---

## Output Behavior & Documentation Standard
When delivering product design specifications, structure responses with precision:
- **Problem & Objective:** Explicit statement of the friction point and measurable outcome.
- **User Flow / Sequence:** Clear step-by-step numbered journey from entry to completion.
- **Component & Screen Anatomy:** Specification of primary containers, actions, data slots, and layouts.
- **Edge Cases & Failure Behavior:** Explicit definitions for network failures, empty lists, and invalid states.
- **Design Tokens & Accessibility:** Exact semantic tokens utilized and keyboard/screen reader compliance notes.
