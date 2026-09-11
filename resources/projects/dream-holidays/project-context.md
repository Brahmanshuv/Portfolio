# Dream Holidays - Editorial Travel Companion
## Project Reference Context

**Project Label:** Dream Holidays  
**Role:** Product Designer / Design Engineer  
**Scope:** Brand digital presence, itinerary storytelling, digital-to-human inquiry flow  
**Format:** Client / concept redesign for a high-touch boutique travel agency  
**Status:** Design system and frontend implementation prototype

---

## 1. Problem Framing & Core Tension
Dream Holidays is a service-led luxury travel agency with decades of advisory experience. 
- **The False Assumption:** Standard travel websites default to high-friction self-serve booking engines with aggressive filter sidebars and hotel-rate comparison matrices.
- **The Core Tension:** A self-serve booking engine would commoditize the service and remove the very thing clients value—expert human curation.
- **The Strategic Shift:** Build an **editorial travel companion** that sparks possibility, structures itinerary details, and delivers rich context directly into the first advisory conversation.
- **Goal:** The advisor doesn't disappear; the first conversation becomes significantly higher quality.

---

## 2. Key Decisions & Tradeoffs
1. **Editorial Itinerary Narrative Over Grid Comparison:**
   - Day-by-day narrative pacing combining evocative imagery, pacing notes, and practical context.
   - Pacing: "Enough detail to picture the trip. Enough space to keep imagining it."
2. **Context-Preserving Inquiry Flow:**
   - Instead of a generic contact form, the inquiry captures user travel styles, preferences, and selected destinations to seed the advisor's consultation briefing.
3. **Decoupled Architecture:**
   - Built with a modular template system (`CaseStudyTemplate.jsx`, `metadata.js`, `content.js`, `styles.js`) allowing new itineraries to be added without rebuilding layouts.

---

## 3. Evidence & Media Slots

| Slot ID | Asset Type | Aspect Ratio | Job / Description | Evidence Class |
| :--- | :--- | :--- | :--- | :--- |
| `DH-01` | Hero Image / Video Poster | 16:10 | Destination hero establishing warmth and high-craft typography | Original Design |
| `DH-02` | Decision Comparison | 3:2 | Booking engine vs. Editorial companion strategic breakdown | Explanatory Graphic |
| `DH-03` | Journey Diagram | 3:2 | Discover ➔ Explore Itinerary ➔ Inquiry ➔ Advisor Consultation | Explanatory Graphic |
| `DH-04` | Destination Overview | 16:10 | Curated itinerary view with responsive typography | Original Design |
| `DH-05` | Itinerary Detail | 4:3 | Day-by-day cards showing spatial and temporal pacing | Original Design |
| `DH-06` | Inquiry Flow Strip | 16:9 | Stepwise inquiry questions leading to consultation confirmation | Original Flow |
| `DH-07` | Responsive Layout Plate | 3:2 | Desktop vs. Mobile layout parity demonstrating fluid hierarchy | Original Design |
| `DH-08` | Prototype / Metrics Graphic | 16:9 | Interaction clip or proposed inquiry qualification measurement plan | Prototype / Proposed Plan |

---

## 4. Truth & Guardrails
- **Guardrail:** Do not claim automated booking increases or quantitative conversion lifts without real analytics.
- **Truth Rule:** Retain the "over 25 years of service" heritage only if supported by the original agency background.
- **Status:** Transparently present this as an editorial design system and interactive prototype.
