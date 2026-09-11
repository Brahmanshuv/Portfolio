# Evidence Levels & Research Validation Guide

## 1. The Evidence Hierarchy (Order of Trust)

When documenting design decisions in case studies or product specifications, apply this strict 4-level hierarchy:

1. **Level 1 — Empirical Truth (Ground Truth):**
   - Actual production analytics, telemetry data, recorded user session videos, verbatim customer interview recordings, original assignment briefs, or verified technical constraints.
   - *Example:* "In the recorded usability test with 5 participants, 4 users failed to locate the export button because it was hidden behind an overflow menu."
2. **Level 2 — Artifact Truth (Direct Observation):**
   - Visible elements directly present in confirmed design mockups, prototype recordings, or repository code.
   - *Example:* "The supplied Figma prototype demonstrates a 3-tier campaign approval workflow with Ad Operations and Marketing Strategy roles."
3. **Level 3 — Inferred Truth (Educated Interpretation):**
   - Logical deductions based on standard industry workflows, technical architectures, or interface layout constraints. Must be clearly identified as an inference.
   - *Example:* "Given the document size constraints typical of finance exports, batch processing is inferred to be an asynchronous background operation."
4. **Level 4 — Hypothesis / Proposal (Future Vision):**
   - Proposed features, planned evaluation metrics, or unverified assumptions. Must NEVER be disguised as an achieved result or empirical finding.
   - *Example:* "Proposed evaluation metric: Task completion time for multi-page document splitting will be measured in future user testing."

---

## 2. Red Lines: Zero-Tolerance Fabrication
Under no circumstances should the following ever be invented or exaggerated:
- **Fake User Personas:** Do not invent fictitious research participants (e.g. "We interviewed 12 users who all said...") unless real research notes exist.
- **Fake Metrics & Percentages:** Do not generate synthetic conversion gains (e.g. "+34% increase in signups", "+18% retention"). If a project is unshipped or conceptual, say so honestly.
- **Fake Stakeholders:** Do not attribute quotes or mandates to imagined executives or clients.
- **Fake Production Status:** Do not label a prototype or take-home assignment as a "shipped enterprise system in daily use."
