---
name: ai-product-design
description: Specialist skill for designing AI-assisted software interfaces, autonomous agent workflows, model confidence thresholds, error recovery, latency masking, and human-in-the-loop controls. Use only when designing AI-driven software features or agent interfaces.
---

# 07-AI-PRODUCT-DESIGN

## Purpose
Directs and executes the design of AI-native software products, autonomous agent interfaces, and collaborative human-AI workflows. Establishes robust patterns for handling model uncertainty, latency, explainability, trust calibration, and human-in-the-loop oversight.

## Use When
- Designing interfaces for LLM-driven features, automated workflows, or agentic tools.
- Structuring prompt-assisted generation, creative iteration, or data extraction flows.
- Designing confidence feedback, source attribution, and verification interfaces.
- Designing asynchronous background task monitoring and human approval checkpoints.

## Do Not Use For
- Standard deterministic CRUD applications that do not involve AI or machine learning.
- Static visual design or routine responsive CSS styling.

---

## Core Philosophy: Beyond the Generic Chatbot
Adding a floating chat bubble to a SaaS dashboard is lazy design. Senior AI product design embeds intelligence directly into the context of work:
- **Direct Manipulation > Chat Prompting:** Users prefer selecting, tweaking, and reviewing structured parameters over typing long text instructions repeatedly.
- **Context Preservation:** An AI recommendation is useless without its evidentiary context attached (e.g., in Cora, campaign proposals link directly back to extracted brief requirements and historical budget data).
- **Graceful Failure:** When the model fails or hallucinates, the product must provide an immediate, non-destructive path for the user to edit, correct, or dismiss the output.

---

## Five Core AI Product Design Patterns

### 1. Hybrid Intent Capture (Natural Language + Structured Constraints)
- Never present an empty prompt box without guidance or constraints.
- Combine natural language intent with explicit bounding controls: sliders for budgets, date pickers for schedules, multi-select tags for audience criteria.
- Provide contextual starter templates and recent operational workflows.

### 2. Latency Masking & Asynchronous Progress
AI generation often takes 5–30 seconds. Never leave the user on a generic spinning wheel:
- **Transparent Progress Checklists:** Break down generation into human-understandable stages (e.g., *"Extracting brand guidelines ➔ Analyzing past performance ➔ Allocating budget across channels ➔ Assembling proposal draft"*).
- **Optimistic UI & Background Processing:** Allow users to navigate away or continue working on other tasks while the agent computes in the background. Notify upon completion.

### 3. Source Attribution & Explainability
- Every AI-generated recommendation, metric, or copy draft must link to its underlying source material.
- Allow users to hover or click on an AI decision to view the exact excerpt, document, or historical dataset that informed the output.

### 4. Human-in-the-Loop Approval Gates
High-stakes actions (spending budgets, sending mass emails, launching campaigns, modifying contracts) must NEVER be performed fully autonomously without confirmation:
- **Review & Diff View:** Present AI proposals in a side-by-side comparison with previous baselines.
- **Inline Editing:** Every generated field must be immediately editable in place. The user remains the author; the AI is the research assistant.
- **Explicit Launch/Commit Gate:** Require deliberate user confirmation before irreversible actions execute.

### 5. Uncertainty & Fallback Handling
- **Confidence Calibration:** When the model has low certainty, visually signal it (e.g., amber indicator: *"Review needed: Conflicting audience data detected"*).
- **One-Click Regenerate with Guidance:** When regenerating, allow the user to provide corrective direction (e.g., *"Make more conservative"*, *"Focus on mobile inventory"*).
- **Zero-Data Fallback:** If the model cannot extract meaningful information, gracefully degrade to standard manual input fields rather than throwing a raw API error.

---

## The AI Product Quality Checklist
Before finalizing an AI feature or case study presentation:
1. **Job Clarity:** Does AI solve a real friction point, or was it added as marketing decoration?
2. **Context Preservation:** Can the user see why the AI made this recommendation?
3. **Control:** Can the user override, adjust, or completely reject the AI output in under 5 seconds?
4. **Safety & Resilience:** What happens when the model generates an invalid or toxic response?
5. **Evaluation Plan:** How will we measure success (e.g., user acceptance rate of recommendations, manual edit rate, task completion speed)?

---

## Reference Material
For reference implementation patterns in Retail Media Networks, inspect [`/resources/projects/cora/project-context.md`](file:///g:/Website%20Portfolio%20Antigravity/resources/projects/cora/project-context.md).
