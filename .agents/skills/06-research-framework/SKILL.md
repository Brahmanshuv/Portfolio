---
name: research-framework
description: Specialist skill for designing research protocols, executing usability evaluations, synthesizing qualitative interview signals, and framing evidence-based problem statements without fabricating data. Use only when research planning or synthesis is explicitly required.
---

# 06-RESEARCH-FRAMEWORK

## Purpose
Establishes rigorous, honest, and actionable user research methodologies for product designers. Guides research study planning, usability protocol design, qualitative synthesis, and heuristic auditing while strictly upholding the Anti-Hallucination Evidence Standard.

## Use When
- Designing a user research plan, interview guide, or usability test protocol.
- Synthesizing qualitative feedback, interview transcripts, or customer support tickets.
- Conducting formal heuristic reviews or cognitive walkthroughs of an existing product.
- Establishing verifiable success criteria and validation benchmarks for a feature.

## Do Not Use For
- Day-to-day visual design, typography adjustments, or CSS code edits.
- Fabricating synthetic user personas or inventing fake research outcomes for a portfolio.

---

## The Four Evidence Tiers (Integrity Ledger)
When conducting or reporting research, categorize all data into these strict tiers:

```
TIER 1: EMPIRICAL TRUTH  ──► Directly observed, recorded sessions, or telemetry.
TIER 2: ARTIFACT TRUTH   ──► Directly visible in verified prototypes or repository code.
TIER 3: INFERRED TRUTH   ──► Logical deductions based on standard domain workflows.
TIER 4: HYPOTHESIS       ──► Unverified assumptions, proposed features, or future tests.
```

- **Red Line:** Tiers 3 and 4 must NEVER be presented as Tier 1 or Tier 2. Never invent sample sizes, survey percentages, or fictional user quotes.

---

## Research Study Architecture
When designing a research plan or interview protocol, structure documents using this 5-part framework:

### 1. Research Objective & Primary Inquiries
- **Core Hypothesis:** What fundamental assumption are we testing?
- **Decision Boundary:** What design decision will change based on the outcome of this study? (If no decision will change, the research is useless).
- **Core Questions:** 3–5 targeted questions about user behavior, mental models, or operational blockers.

### 2. Participant Screener & Context
- Define behavioral criteria over demographics (e.g., *"Marketers who manage at least 3 active SEO client accounts"* rather than *"Age 25-40 with a college degree"*).
- Target sample size: 5–8 targeted participants per user segment (sufficient to uncover ~85% of major usability friction points).

### 3. Usability Test Protocol (Concurrent Think-Aloud)
Structure testing sessions around realistic task scenarios rather than guided feature tours:
- **Briefing:** *"We are testing the product, not you. There are no right or wrong answers. Please speak your thoughts aloud as you work."*
- **Scenario:** Present an authentic objective (e.g., *"You need to reassign pages 3–5 from this Q3 report into a new executive brief and export the result"*).
- **Observation Prompts:** Avoid leading questions. Ask: *"What are you looking for right now?"*, *"What did you expect to happen when you clicked that?"*

### 4. Qualitative Data Synthesis
Process raw observations without confirmation bias:
1. **Verbatim Observations:** Record exact user actions, hesitations, and statements.
2. **Affinity Clustering:** Group observations by workflow stage or failure mode.
3. **Pattern Identification:** Highlight recurring behavioral breakdowns experienced by multiple participants.
4. **Actionable Design Implication:** Translate each finding into a concrete product change (e.g., *"Finding: 4/5 users overlooked the filter button. Implication: Elevate filter controls from a collapsed dropdown into persistent inline chips"*).

### 5. Heuristic Evaluation Rubric
When auditing an interface without live participants, evaluate against Nielsen-Norman fundamentals:
- **Visibility of System Status:** Is the user immediately informed of progress?
- **Match Between System & Real World:** Does language reflect user jargon, not database terms?
- **User Control & Freedom:** Is there an obvious, non-destructive undo/cancel path?
- **Consistency & Standards:** Do interaction mechanics match web conventions?
- **Error Prevention:** Does the UI prevent dangerous actions before they occur?

---

## Reference Material
For detailed guidance on evidence tiers and validation protocols, refer to [`/resources/research/evidence-and-validation-guide.md`](file:///g:/Website%20Portfolio%20Antigravity/resources/research/evidence-and-validation-guide.md).
