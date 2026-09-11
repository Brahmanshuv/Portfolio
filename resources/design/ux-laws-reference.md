# Foundational UX Laws & Cognitive Ergonomics Reference

## 1. Hick's Law (Choice & Decision Time)
- **Principle:** The time it takes to make a decision increases logarithmically with the number and complexity of choices.
- **Cognitive Impact:** When users are confronted with too many competing options, decision paralysis sets in.
- **Application in Design:**
  - Break down complex multi-step tasks into progressive disclosure flows.
  - Limit top-level navigation choices to 5–7 high-priority items.
  - In portfolios: Feature 2–4 standout projects rather than a massive 15-project card dump.
  - In product UI: Group related actions into menus or contextual flyouts rather than exposing 20 raw icon buttons simultaneously.

---

## 2. Fitts's Law (Target Acquisition & Motor Speed)
- **Principle:** The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target.
- **Cognitive Impact:** Small, distant buttons cause motor hesitation and high click error rates.
- **Application in Design:**
  - Make primary call-to-action (CTA) buttons large and visually prominent.
  - On mobile: Ensure touch targets are at least **44x44px** (Apple HIG) or **48x48px** (Material Design) with adequate padding.
  - Screen edges and corners act as "infinite targets" on desktop because the cursor cannot overshoot the edge.

---

## 3. Miller's Law (Working Memory Capacity)
- **Principle:** The average person can only keep 7 (plus or minus 2) chunks of information in their working memory at one time.
- **Cognitive Impact:** Long unstructured lists or complex dashboards overload working memory.
- **Application in Design:**
  - Chunk data into coherent semantic modules (e.g., grouping phone numbers, credit cards, or dashboard KPI clusters).
  - Use visual dividers, subtle surface elevations, or whitespace to establish clear conceptual boundaries.

---

## 4. Jakob's Law (Familiarity & Mental Models)
- **Principle:** Users spend most of their time on other sites. They expect your product or site to work the same way as all the other sites they already know.
- **Cognitive Impact:** Breaking established mental models for the sake of novelty forces users to relearn basic navigation.
- **Application in Design:**
  - Retain standard web conventions: logos in the top-left return home; shopping carts in top-right; search bars with magnifying glasses; standard form input behaviors.
  - Only introduce novel interaction paradigms when the novelty creates substantial, demonstrable user value.

---

## 5. Doherty Threshold (System Feedback & Flow)
- **Principle:** Productivity increases when a computer and its users interact at a pace that ensures neither has to wait on the other (<400 milliseconds response).
- **Cognitive Impact:** Delays over 400ms break flow, cause repeated clicks, and induce perception of system unreliability.
- **Application in Design:**
  - Provide immediate visual feedback (<100ms) on clicks (active button states, optimistic UI updates).
  - If operations take >400ms, display purposeful skeleton screens or progress indicators.
  - Prevent layout shifts (CLS) while assets load.

---

## 6. Von Restorff Effect (Isolation Effect)
- **Principle:** When multiple similar objects are present, the one that differs from the rest is most likely to be remembered.
- **Cognitive Impact:** Items with identical visual weight compete for attention, canceling each other out.
- **Application in Design:**
  - Use color and scale deliberately on the single primary action per viewport.
  - Avoid making every card or element "pop"—if everything is emphasized, nothing is emphasized.
