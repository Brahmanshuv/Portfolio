# Staple - Document Editor Workspace
## Project Reference Context

**Project Label:** Staple - Document Editor  
**Role:** Product Designer  
**Scope:** Document manipulation workspace (Split, Merge, Reorganise, Preview, Export)  
**Format:** Take-home product-design assignment (4-day timeframe)  
**Status:** Conceptual prototype / assignment submission (unshipped)

---

## 1. Problem Framing & Core Tension
Document operations sound simple when listed as verbs: split, merge, reorganise, preview, export. The operational complexity appears when they have to work together under real-world pressure (finance/operations users).
- **Core User Friction:** A user needs to know what is selected, where each page belongs, what will change, and whether it is safe to continue.
- **Mental Model:** A page can be moved independently, yet its source and destination documents still matter. A page should be movable without becoming anonymous.
- **Design Stance:** Selection clarity must feel obvious before movement feels fast. "Speed is useful. Confidence is non-negotiable."

---

## 2. Key Decisions & Tradeoffs
1. **Object Hierarchy (Page vs. Document):**
   - Maintained visual anchor to the parent document container while enabling multi-page drag/selection.
   - Avoided abstract list views in favor of visual page cards with discernible page-level metadata.
2. **Commitment Gate (Preview Before Export):**
   - Designed a non-destructive preview step connecting active edits to the final compiled document before download/export.
3. **Four-Day Take-Home Prioritization:**
   - *Prioritized:* Core page-manipulation loop, selection states, destination targeting, output preview.
   - *De-prioritized / Scoped Out:* Complex OCR text editing, multi-user simultaneous collaboration, backend permissions matrix.

---

## 3. Evidence & Media Slots

| Slot ID | Asset Type | Aspect Ratio | Job / Description | Evidence Class |
| :--- | :--- | :--- | :--- | :--- |
| `STP-01` | Hero Workspace | 16:10 | Full document-editor overview showing document and page containers | Original Design |
| `STP-02` | Mental Model Diagram | 3:2 | Source doc ➔ Selected pages ➔ Destination doc flow | Explanatory Graphic |
| `STP-03` | Annotated Screen | 4:3 | Regions: Source, Page, Destination, Action controls | Original Design |
| `STP-04` | State Sequence | 16:9 | Normal, selected, multi-selected, and active dragging states | Original Design |
| `STP-05` | Flow Strip | 16:9 | Organise ➔ Preview ➔ Export sequence | Original Flow |
| `STP-06` | Interaction Clip/Detail | 16:10 | Split/merge/reorder interaction from prototype | Original Prototype |
| `STP-07` | Priority Matrix | 3:2 | Now / Next / Scoped-out (4-day constraint) | Explanatory Graphic |
| `STP-08` | Evaluation Framework | 3:2 | Proposed usability questions (selection error rate, task completion) | Proposed Plan |

---

## 4. Truth & Guardrails
- **Guardrail:** Retain "four-day take-home" constraint only while consistent with assignment brief.
- **Truth Rule:** Do not claim enterprise client adoption, live production metrics, or user interview quotes. Frame evaluation metrics as proposed validation tests.
