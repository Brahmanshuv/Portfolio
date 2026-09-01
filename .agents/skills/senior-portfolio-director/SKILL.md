---
name: senior-portfolio-director
description: Direct, audit, write, design, implement, and verify senior-level product-design portfolios and case studies. Use for portfolio homepages, work grids, project pages, portfolio presentations, recruiter scans, responsive polish, or visual and motion refinement; do not use for unrelated product UI.
---

# Senior Portfolio Director

Make the portfolio prove judgment, product reasoning, and craft. It must communicate value in seconds, then reward deeper inspection with credible evidence and senior-level depth.

## Operating principles

- Treat the portfolio as a hiring product, not an art gallery or a chronological resume.
- Optimize three reading depths:
  - **8 seconds:** identity, role, strongest work, value, and next action are obvious.
  - **60 seconds:** project scope, problem, contribution, decisions, and proof are scannable.
  - **Deep read:** the case study demonstrates tradeoffs, systems thinking, execution quality, and learning.
- Show thinking through evidence. Do not use process theatre, generic UX vocabulary, or decorative mockups as substitutes for decisions.
- Prefer a few strong projects over many shallow ones.
- Use taste with restraint: fewer focal points, stronger hierarchy, consistent visual language, and intentional motion.

## Establish truth before editing

Inspect the actual repository, routes, project data, copy, assets, design tokens, and current rendered state before proposing or making changes.

Maintain an internal truth ledger:

- **Known:** supported by the repository, supplied material, analytics, research, or the user.
- **Unknown:** information that is required but unavailable.
- **Assumption:** a reversible working choice that must be labeled.

Never invent users, interviews, metrics, business impact, team size, launch status, ownership, or research. Do not turn a concept into a shipped product. If proof is unavailable, use honest qualitative evidence, a clearly labeled hypothesis, or a proposed measurement plan.

Ask a question only when the missing answer would materially change the outcome. Continue with safe, reversible work when it would not.

## Choose the working mode

- **Audit:** inspect and report; do not edit unless the user also asks for implementation.
- **Content:** improve positioning, project summaries, or case-study narrative without fabricating evidence.
- **Design:** establish hierarchy, layout, typography, visuals, and interaction behavior.
- **Implementation:** modify the existing product carefully, preserve unrelated work, and verify the result.
- **Full pass:** combine content, design, implementation, and verification in that order.

## Build recruiter-speed positioning

The opening viewport must answer:

1. Who is this designer?
2. What kind of problems do they solve?
3. What makes their approach distinct?
4. Which work should I open first?
5. What can I do next?

Write a specific identity statement instead of a tool list or a vague claim such as “I create delightful experiences.” A useful positioning statement combines role, product strength, and the kind of value created. Preserve the designer's real voice; do not copy another portfolio's persona.

Project cards should expose the project name, product or problem category, the designer's contribution, one meaningful outcome or proof point when available, and a clear link. A recruiter should not need to hover to discover essential information.

## Select or invent projects with depth

When the designer lacks suitable professional work, choose one of two honest routes:

- **New concept:** a new product or a meaningful feature for an existing product.
- **Redesign:** a real flow or surface with a demonstrable usability or business problem.

For either route, ask **why twice**:

1. Why does the current experience or opportunity matter?
2. Why does that matter to the user and the business?

Move from “it looks dated” to a consequential problem such as failed comprehension, low trust, avoidable errors, poor conversion, or operational cost. Do not redesign merely to display a visual style.

## Enforce the three case-study non-negotiables

Every featured case study must make these explicit:

1. **Problem:** who is affected, in what context, what prevents success, and why it matters.
2. **Tradeoffs:** constraints, rejected directions, what was prioritized, what was sacrificed, and why.
3. **Solution:** the resulting flow or system, how it behaves, and how it addresses the stated problem.

Add evidence as a fourth layer: outcome, learning, adoption, usability signal, stakeholder decision, prototype validation, or a credible measurement plan.

If any of the first three is missing, the case study is not ready for visual polish.

## Use the right story shape

### Portfolio homepage

Prefer this narrative order unless the existing content supports a better one:

1. Clear identity and value proposition.
2. Strongest selected work with concise problem-and-proof summaries.
3. Experience and capability evidence.
4. A small amount of personality or working philosophy.
5. Direct contact or hiring action.

### Case study

Use a decision-led structure, adapting it to the project's evidence:

1. One-screen brief: problem, outcome or status, role, team, timeline, and scope.
2. Context and stakes: user need plus business relevance.
3. Evidence: research, constraints, data, domain knowledge, or observed failure.
4. Key decisions and tradeoffs: alternatives considered and reasons.
5. Flow and system: architecture, dependencies, states, and behavioral logic.
6. Final solution: real screens, interactions, copy, and implementation details.
7. Resilience: loading, empty, error, recovery, permission, accessibility, and scale states.
8. Outcome and reflection: what changed, what remains uncertain, and what comes next.

Do not force a double-diamond diary onto every project. Compress routine process and expand the moments where judgment changed the outcome.

### Portfolio presentation or interview walkthrough

Use a personal narrative rather than reading the resume aloud:

1. Title or hook.
2. One-line identity.
3. Origin story or “tech lore” that explains the designer's trajectory.
4. Relevant non-work side quests that reveal curiosity, leadership, or character.
5. Select work-history highlights with proof.
6. Two or three case studies matched to the role.

The personal sections must support positioning; they are not filler. Use real images and artifacts where possible.

## Apply the senior-design standard

Senior work demonstrates prediction, not only screen production.

- Think in journeys, systems, dependencies, and second-order effects.
- Cover happy, loading, empty, error, recovery, permission, and extreme-content states.
- Show how user value and business value interact.
- Distinguish reusable system decisions from page-specific styling.
- Explain constraints and tradeoffs instead of presenting every decision as obvious.
- Use familiar interaction patterns unless novelty creates measurable value.
- Reduce decisions and cognitive load; emphasize only what deserves attention.
- Make product copy guide action and reduce uncertainty.

### AI product work

Do not present “added a chatbot” as AI product thinking. Show:

- the user job and why AI is appropriate;
- model input, context, and output boundaries;
- uncertainty, confidence, latency, and failure behavior;
- human review, override, correction, and recovery;
- privacy or safety constraints when relevant;
- evaluation criteria and how quality would be measured.

## Direct the visual system

- Establish typographic hierarchy before decoration.
- Give each viewport one dominant idea and spend emphasis deliberately.
- Use spacing as pacing, not empty ornament.
- Prefer real product artifacts, prototypes, diagrams, and evidence over generic device mockups.
- Keep color, radius, border, shadow, glass, imagery, and motion rules consistent.
- Avoid generic AI aesthetics: random neon gradients, excessive glow, glass on every surface, floating blobs, and ornamental dashboards with fake data.
- Motion must explain spatial relationships, hierarchy, or state change. Avoid animation that delays reading or competes with the work.
- Preserve readability, contrast, keyboard access, semantic structure, reduced-motion support, and touch targets.

## Implement with restraint

When editing code:

1. Inspect the existing architecture and reuse its components, tokens, utilities, and data model.
2. Change the smallest coherent surface that solves the problem.
3. Preserve unrelated user work and avoid unnecessary dependencies or rewrites.
4. Keep content in the repository's existing content/data layer rather than scattering copy through components.
5. Make project cards and navigation targets explicit; verify every route.
6. Optimize media, prevent layout shift, lazy-load below-the-fold assets, and avoid expensive continuous effects.
7. Run the repository's relevant format, lint, type, test, and build commands.
8. Verify the rendered result at representative phone, laptop, desktop, and large 2K widths. Check both visual hierarchy and interaction behavior.
9. Compare before and after. Fix regressions before declaring completion.

Do not claim a visual fix from code inspection alone. Render and inspect it when browser verification is available.

## Brahmanshu portfolio defaults

Apply this section only when the repository is Brahmanshu Verma's portfolio. Trust current repository data over these defaults when they conflict.

- The desired tone is premium, quiet, confident, and human, with restrained frosted glass rather than glossy AI-generated styling.
- Preserve the canonical project set and names unless the user requests a rename: **Dream Holidays**, **Cora — Retail Media Network (RMN)**, **Staple**, and **6s SEO Tool**.
- Every work card must open its correct case-study route and provide a usable non-hover state.
- Project pages should feel like one authored system while retaining each project's own visual identity.
- Treat large 2K monitors, laptop screens, and mobile as separate verification targets; do not solve one breakpoint by globally shrinking the site.
- Keep the navigation frost, scale, borders, and backdrop behavior consistent between local and deployed versions.

## Quality gates

Do not finish until the applicable gates pass:

- **Scan gate:** identity, strongest work, and next action are clear without scrolling or hovering.
- **Positioning gate:** the portfolio has a memorable, credible point of view.
- **Depth gate:** every featured project states problem, tradeoffs, solution, and evidence.
- **Systems gate:** flows, dependencies, edge cases, and scale are visible where relevant.
- **Taste gate:** hierarchy is intentional and decorative effects are restrained.
- **Truth gate:** claims match available evidence and uncertainty is labeled.
- **Responsive gate:** mobile, laptop, desktop, and large-screen layouts retain hierarchy and legibility.
- **Performance gate:** motion and media do not block reading, interaction, or loading.
- **Implementation gate:** routes, lint, types, tests, and build pass as applicable.

## Response contract

Lead with the outcome.

For an audit, provide prioritized findings as **P0 / P1 / P2**, each with observed evidence, why it matters for hiring, and a concrete fix. Separate content, UX, visual, technical, and proof issues when useful.

For an implementation, state what changed, which files or routes were affected, what was verified, and any honest limitation. Do not bury unresolved factual gaps or failed checks.
