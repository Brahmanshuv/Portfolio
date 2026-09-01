# Cora — case-study handoff grounded in the supplied designs

Prepared 1 September 2026 for Brahmanshu Verma.

## 1. The change to make

Cora has enough original material for a specific, visual story about an AI-assisted Retail Media Network campaign workflow: briefing, proposal generation, budget review, submission, reviewer comments, approval, launch, and monitoring. Build the case study around that sequence. The earlier emphasis on confidence scoring and recovery is not supported by these assets.

Keep the headline **“Campaign decisions, with the context still attached.”** Replace the vague decision-support narrative with the concrete story below. Use the supplied UI and recordings; do not create substitute dashboard imagery.

This handoff supplements the earlier Portfolio Project Page Playbook and supersedes its conditional Cora content and Cora media mapping where they conflict. It does not establish new facts about Staple, Dream Holidays, or 6s SEO Tool. The original website repository is not present here, so this is a reviewed asset and content handoff, not a claim that the website has been edited or tested.

### Review coverage

- Read the uploaded “Portfolio Project Page Playbook — Verified Implementation” report.
- Inspected all 10 supplied JPEGs at their native dimensions.
- Decoded all 5 supplied MP4s, inspected visual samples spanning each clip and checked key states at larger size. This was a visual review, not an audio transcription or a frame-by-frame audit of every video frame.
- Checked the existing playbook and Senior.md for continuity.
- The reported build, console, navigation, and 20 responsive screenshots were not independently verified: the report contains Windows-local image references, not accessible rendered-page images or the repository.

## 2. Corrections to the implementation report

| Priority | Finding | Required correction |
| --- | --- | --- |
| P0 | COR-01 is marked ready using /assets/spatial_3d_preview.png. That asset was not supplied for this review. | Connect the inspected Cora home screen listed below. File existence and a generic preview filename do not establish project identity. |
| P0 | The narrative includes low-confidence states and broad trust/recovery language. | Describe the visible source references, review controls, processing checklist, comments, approval and rework controls. No confidence scores, numeric thresholds, rollback or version history are evidenced. |
| P0 | Earlier advice described Ethan Walker and Simon Brooks as invented names. | Correct that advice: both names exist in the original persona slides. They are documented persona artifacts; their existence does not establish interviews, research participants or verbatim user quotes. |
| P0 | Prototype values could be mistaken for results. | Budgets, estimated KPIs, ROAS, conversion figures, audience counts and timing labels are demonstration content in design artifacts. Do not promote them into impact metrics. |
| P1 | The report calls all four heroes “Original Design / Ready.” | Verify image contents. The Staple enterprise-dashboard and 6s iOS-notifications preview filenames merit inspection, but filenames alone do not prove that their contents are wrong. Retain a neutral placeholder if the real project match cannot be established. |
| P1 | The report opens by claiming changes across the homepage as well as the four pages. | Check the actual diff against the earlier scope. Preserve homepage styling and behaviour; only repair a project route if necessary. Do not discard unrelated local work. |
| P1 | “Opportunity Matrix,” “Position 4–10 Zones,” and Staple “Split/Merge Drag Physics” are described as assets to supply. | A placeholder is not evidence that a feature exists. Keep those descriptions only when original project material supports them; otherwise simplify or omit them. |
| P1 | Staple is again presented as a four-day take-home. | The earlier context records that timeline, but the original assignment is not in these attachments. Use an original brief or direct user statement before displaying it as verified metadata. |
| P1 | Test results appear only as summary claims and file:///C:/... references. | Provide actual rendered screenshots and current command/browser evidence. Do not describe the report itself as independent verification. |

### Scope of what the originals establish

The supplied persona slides identify an **Ad Operations Specialist** and a **Marketing Strategy Manager**. Use those exact role labels when summarising them. An approver is a separate role visible in the prototype; Ethan's persona should not simply be renamed “Approver.”

The Accenture Song branding in the slides does not establish Brahmanshu's employer, client relationship, team size or ownership of every artifact. Use the already-established **Product Designer** role without adding those claims.

The current-state and proposed-workflow boards establish documented design thinking. They do not establish how the workflow was researched, whether the proposal was built, or whether it improved campaign performance.

## 3. Exact original-asset inventory

All filenames in the package are descriptive copies. Original JPEG and MP4 bytes are unchanged. Public paths begin **/assets/projects/cora/**; the matching files sit under **public/assets/projects/cora/**.

### Still images

| Uploaded file | Packaged filename | What is visibly present | Best use |
| --- | --- | --- | --- |
| 16(1).jpeg | cora-home.jpeg | Welcome screen, Cora prompt entry, suggested tasks, campaign cards | COR-01 hero; establishes the actual product |
| 11(1).jpeg | cora-persona-ad-operations.jpeg | Simon Brooks; Ad Operations Specialist; needs, frustrations and goals | Supporting persona artifact; summarise the role in readable HTML |
| 12(1).jpeg | cora-persona-marketing-strategy.jpeg | Ethan Walker; Marketing Strategy Manager; needs, frustrations and goals | Supporting persona artifact; avoid claiming interview provenance |
| 15(1).jpeg | cora-current-workflow.jpeg | Manual budget division, campaign creation, feedback and approval loop, launch and iteration | COR-02 current-state map |
| 14(1).jpeg | cora-proposed-workflow.jpeg | Proposed assisted workflow with human go-ahead, feedback, approval, launch and iteration | COR-02 proposed workflow; label as a design proposal |
| 17(1).jpeg | cora-generation-progress.jpeg | Processing checklist for source extraction, analysis, audience, allocation and banner generation | COR-03 and COR-07; a real designed loading state |
| 19(1).jpeg | cora-budget-proposal.jpeg | Budget allocation, estimated KPIs, Sources row, Rationale control, submit/download actions | COR-04 primary review evidence |
| 21(1).jpeg | cora-audience-budget-review.jpeg | Audience-change message, Save, budget allocation and Review/Continue actions | COR-04 supporting screen; the preceding slider manipulation is not shown in the supplied clips |
| 20(1).jpeg | cora-budget-rationale.jpeg | Placement context, recommended allocation and continuation action | Optional COR-04 detail; see numeric inconsistencies below |
| 22(1).jpeg | cora-approver-review.jpeg | Campaign proposal and creative content with a prompt inviting comments | COR-06 supporting review screen |

### Videos

Times below are approximate viewing cues, not product performance measurements. Each source is a 1920 × 1080, 60 fps H.264 recording.

| Uploaded file | Packaged filename | Duration | Observed visual sequence | Placement |
| --- | --- | --- | --- | --- |
| 1(1).mp4 | cora-brief-to-proposal.mp4 | 20.88 s | Home → upload documents → reading/source row → initial proposal review → generation checklist → proposal and creative content | Main clip in COR-03 |
| 4(1).mp4 | cora-budget-review.mp4 | 31.96 s | Already-saved audience change → Review → expanded placement insights → recommended allocation → Continue to submit | Optional detail clip under COR-04 |
| 5(1).mp4 | cora-submit-for-approval.mp4 | 7.00 s | Continue to submit → two displayed approval levels → Submit for approval → confirmation | Supporting approval clip under COR-06 |
| 6(1).mp4 | cora-review-to-launch.mp4 | 21.28 s | Review content → add/save comment → Approve/Send for rework → notification → approved proposal → Launch/Rework → Campaign active | Main clip in COR-06 |
| 7(1).mp4 | cora-campaign-monitoring.mp4 | 26.29 s | Home → My Campaigns → performance summary and campaign table → performing well, improvement and growth-opportunity cards | Monitoring chapter; optional third clip |

Useful cues: clip 1 shows initial proposal review around 8–12 s and generation around 14–18 s; clip 4 reveals supporting insights around 4–10 s; clip 5 shows approval options around 2–4 s; clip 6 shows saved comments around 8 s and the active state around 20 s; clip 7 shows the campaign overview around 6 s and grouped insights around 16–22 s.

There are five clips in this upload. Do not refer to seven available clips or invent contents for missing clips 2 and 3.

### Extracted prototype stills

The package also includes exact, unretouched frame extractions for accessible posters and figures:

| Filename | Source and time | Purpose |
| --- | --- | --- |
| cora-proposal-confirmation-poster.jpg | Clip 1, 8.0 s | Review the extracted brief before generating |
| cora-approval-step-poster.jpg | Clip 5, 3.0 s | Approval-level overview |
| cora-comment-review-poster.jpg | Clip 6, 8.0 s | Saved comment with approval/rework controls |
| cora-launch-state-poster.jpg | Clip 6, 20.0 s | Prototype launch confirmation |
| cora-monitoring-poster.jpg | Clip 7, 6.0 s | Campaign summary and table |
| cora-monitoring-insights-poster.jpg | Clip 7, 16.0 s | Grouped performance insights |

Retain the recordings' native framing. Do not mistake these extracted prototype frames for newly designed screens or screenshots of the portfolio website.

## 4. Revised Cora page story

The following is proposed reader-facing copy grounded in the artifacts. The placement notes are production instructions and must not appear in the public article. Do not expand the draft with unverified research, rejected directions or measured benefits.

### Opening

**Cora — Retail Media Network**

**Campaign decisions, with the context still attached.**

An AI-assisted campaign concept connecting the brief, the proposal, the people reviewing it, and the next decision after launch.

**Role:** Product Designer  
**Format:** Product-design case study and prototype  
**Scope shown:** Campaign briefing, proposal review, approval, launch and monitoring

A campaign needs a budget, an audience, creative work and a go-ahead. Cora explores how those pieces can stay together as a proposal moves from its first brief to review and onward to monitoring. The work combines conversational entry with structured screens that people can inspect, question and act on.

Placement: COR-01, using the real home screen. Keep the role/status summary short and close to the hero. Do not add a delivery date or team count.

### Chapter 1 — Before the campaign, the coordination

The supplied workflow map follows a familiar sequence: gather the inputs, divide the budget, build the campaign, collect feedback and ask for approval. Feedback can send the work around the loop again. Launch then starts another cycle of analysis and adjustment.

Two perspectives shape the brief. Ad operations needs help with the daily work while retaining control. Marketing strategy needs a clearer connection between campaign activity and business goals. The proposed flow places assisted preparation alongside visible human checkpoints.

Placement: COR-02 as a readable current/proposed comparison. Use short HTML role summaries, with the original persona slides available as supporting material. Label the comparison “Documented workflow / Proposed workflow,” not “Before / Proven improvement.”

### Chapter 2 — Start with the brief. Keep it in sight

The prototype begins with source documents. Cora presents a starter proposal with the brand, product, campaign dates, budget and goal, alongside a visible Sources row. A person can review that summary and choose whether to modify it or continue.

Generation then becomes a sequence the interface explains: extracting information, analysing prior data, selecting an audience, allocating budget and preparing creative content. Those labels make the intended process visible. They are part of the prototype, rather than evidence of a working AI pipeline.

Placement: COR-03, clip 1 plus its proposal-confirmation poster. Use the original generation checklist as a detail figure where it adds information.

### Chapter 3 — Show the working behind the recommendation

The budget view places the allocation beside estimated KPIs. A Sources row and a Rationale control give the proposal more context, while review and continuation controls keep the next action visible.

Another state connects an audience change with a prompt to review the updated budget. The longer walkthrough opens placement insights before returning to a recommendation. The useful design question is whether someone can understand what is being suggested, inspect its basis and decide what to do next.

Placement: COR-04. Lead with the budget-proposal screen, then the audience-change screen. Use the rationale recording as optional detail. Include a brief caption where numerical prototype content could be mistaken for achieved results: **“Prototype data and estimates; not measured project outcomes.”**

### Chapter 4 — The proposal still needs a person

Submission introduces the people reviewing the work. The review screen supports comments organised around proposal details, target audience, content and budget. A saved comment stays visible beside the next decision: approve or send for rework.

The demonstrated path continues through a notification, an approved proposal and an explicit launch action. That sequence makes the review handoff tangible. The prototype also raises a question for the next iteration: the relationship between required approval and the visible option to skip it needs a clearer rule.

Placement: COR-06, led by clip 6 and the saved-comment poster. Clip 5 can be opened as supporting detail. Do not claim that the complete rework loop was demonstrated: the control is visible, but its downstream behaviour is not shown here.

### Chapter 5 — Launch starts the next conversation

My Campaigns brings a performance summary and campaign list into one view. Below it, insights are grouped into what is performing well, areas for improvement and growth opportunities.

That structure gives the monitoring screen a reading order: establish the picture, inspect a campaign, then look at a possible next action. The recording demonstrates this organisation. It does not establish that the displayed results came from a live campaign or that the suggested actions were implemented.

Placement: the monitoring poster and, optionally, clip 7. Show insight groups at a readable size. Do not turn their green numbers into case-study result cards.

### Closing — What the work shows, and what comes next

The artifacts show a connected interaction concept: inputs become a proposal, a proposal becomes a review, and a launched campaign becomes something to inspect again. The strongest evidence is the flow itself—its source references, review points, comments and visible next actions.

The next evaluation would test whether campaign teams understand the proposal, recognise what changed, know who must approve it and can identify a useful next step from the monitoring view. Those are questions for validation, not results already achieved.

Placement: a compact set of real state details, then the next-project link. Keep any future-state note short. A missing system sheet does not need a full-screen empty block at the end of the story.

## 5. Media slots: keep the IDs, correct the meaning

The accompanying JSON is a declarative integration manifest, not executable code. It records provenance, dimensions, public paths, captions, posters and slot status. Adapt it to the existing component schema.

| Slot | Status | Revised job | Connected evidence |
| --- | --- | --- | --- |
| COR-01 | Ready | Product hero | Home JPEG |
| COR-02 | Ready | Current and proposed campaign workflow | Current/proposed workflow JPEGs; persona slides are supporting material |
| COR-03 | Ready | Source briefing and proposal generation | Clip 1, initial proposal poster, generation-progress JPEG |
| COR-04 | Ready | Inspect and review the budget recommendation | Budget proposal and audience-change JPEGs; optional rationale JPEG and clip 4 |
| COR-05 | Not applicable | Alternative UI arrangements | No alternative layouts are supplied. Do not relabel workflow maps as rejected UI explorations. |
| COR-06 | Ready | Review, approval, launch and subsequent monitoring | Clip 6, saved-comment and launch posters; clips 5 and 7 as supporting sequences |
| COR-07 | Ready | Actual processing, comment-saved and launch-confirmation states | Generation JPEG; saved-comment and launch frames. These are states, not proof of error recovery. |
| COR-08 | Missing | Optional explanatory plate of repeated interface patterns | May be made later from visible prompt fields, proposal sections and action treatments. No original token sheet or component library was supplied. |

Six slots can use real evidence immediately. One unsupported optional slot stays omitted and one explanatory graphic remains optional. Do not render every supporting asset in the main reading path just to maximise asset coverage.

## 6. Source issues to preserve honestly

1. **Budget arithmetic:** 20(1).jpeg shows an Enhanced total of $125K, while its breakdown lists $60K plus $140K, totalling $200K. The correct intended values are unknown. Do not silently correct the screenshot or copy these numbers into the narrative. Use it as secondary interface evidence with the prototype-data caption; request a corrected source export only if it is to be a prominent financial example.
2. **Placement copy:** the same image shows Home page 32% and Checkout page 22% in bars, while nearby prose uses 38% and 52%. Treat this as sample-content inconsistency, not a measured comparison.
3. **Approval rule:** clip 5 displays both an approval-required note and “Skip approval.” The skip path is not demonstrated. The portfolio can show the submitted/approved path but cannot claim a fully enforced approval policy.
4. **Different estimate values:** 19(1).jpeg and 21(1).jpeg display different estimates. The assets do not establish a controlled before/after experiment or measured improvement. Do not construct one.
5. **Timing and launch:** “Deep Research Completed 45s,” the expected feedback time, and “Campaign active” are prototype content. They do not verify generation latency, an approval SLA, production integrations or a real launch.
6. **Missing states:** confidence levels, failed generation, retry behaviour, version history and rollback are not present in the inspected set. If mentioned, keep them as future questions; do not manufacture visuals to backfill a claim.

No source image has been retouched to hide these issues. Any later correction to the product design should be identified as a revision.

## 7. Paste this into Antigravity

~~~text
Use the senior-portfolio-director skill in Content, Design, Implementation, and Verification modes.

Read Cora_Case_Study_Handoff.md completely and inspect cora-media-manifest.json and the packaged assets. If the ZIP was extracted into a subfolder, locate those files first. The package contains the actual Cora JPEGs and five original prototype recordings, plus exact frame-extracted posters.

This is a focused Cora content and asset integration pass. Use the new handoff to replace the earlier conditional Cora narrative and media mapping. Preserve the shared editorial quality of the existing case-study system.

Before editing:
- Inspect the current git status and diff, project data, figure components, routes and rendered Cora page.
- Read this handoff as a specification; use the original assets as evidence.
- Visually inspect the mapped files and recordings. Do not decide what a file contains from its name.
- Preserve all unrelated and pre-existing local work. Do not reset the repository.

Implement:
1. Copy the packaged public/assets/projects/cora files into the corresponding repository directory if they are not already there. Do not overwrite a different existing file silently. Use the manifest to resolve conflicts by content and source identity.
2. Replace the Cora hero with cora-home.jpeg. Connect the six ready slots in the handoff; keep COR-05 omitted and COR-08 optional/missing until a clearly labelled explanatory graphic exists.
3. Use the revised story: coordination; source briefing and proposal generation; budget review; comments and approval; launch and monitoring; honest next evaluation.
4. Keep the Product Designer role. Do not add client/employer relationships, team size, research methods, dates, shipped status or measured impact without original evidence.
5. Correct the persona treatment: the names are present in the source slides, but they are not established interview participants. Summarise the actual roles—Ad Operations Specialist and Marketing Strategy Manager. Treat the approver as a separate prototype role.
6. Remove confidence scores, low/medium/high confidence states, rollback and version-history claims from the completed-work story. Describe the actual Sources, Rationale, processing, review and comment states.
7. Treat all in-screen budgets, performance numbers, estimates and timing labels as prototype content. Do not build achieved-result cards from them.
8. Preserve the exact source imagery. Do not generate replacement UI, retouch source metrics or use unrelated preview images. Record the source-content issues from section 6 in the walkthrough.
9. Lead with the strongest evidence. Use two main on-demand clips—brief to proposal and review to launch—with the remaining clips available as optional detail. Give the monitoring chapter a readable still even when its video is unopened.
10. Use the real workflow boards as evidence. If a more readable HTML/SVG diagram is needed, transcribe only documented stages and label the proposed workflow clearly. Keep an accessible text equivalent and access to the original boards.

Presentation:
- Preserve the portfolio shell, navigation styling and existing responsive scale.
- Place the original light Cora UI on quiet neutral figure surfaces with generous spacing and a restrained purple accent.
- Keep interface screenshots readable. Use width:100%, height:auto and contain behaviour for full screens; never crop controls just to satisfy a fixed ratio.
- At narrow widths, stack related figures. Give wide boards a keyboard-accessible expanded view and a readable text summary.
- Use semantic figures and useful captions, descriptive alt text, keyboard controls, visible focus and reduced-motion support.
- For videos use native controls or equally accessible controls, playsInline, a poster and preload=none. No autoplay or automatic loading of all five recordings. Include a concise text walkthrough.
- Show internal IDs, file paths and production notes only in authoring views or the report. Reader-facing placeholders should describe the missing visual simply. Omit optional missing visuals from a published reading path.
- Keep the article concise and lightly conversational. Do not turn it into a gallery of every uploaded asset.

Other projects:
- Preserve their layout and copy during this focused pass.
- Inspect the current hero images for actual project identity and flag mismatches. Do not reuse Cora screens for Staple, Dream Holidays or 6s SEO Tool.
- Do not treat SEO Opportunity Matrix, a ranking threshold, Staple drag physics or an assignment timeline as verified merely because the previous report includes them.

Verify the changed work:
- All referenced local assets exist and resolve over HTTP; real figures never fall back to placeholders unexpectedly.
- Videos open, play and have readable posters/captions.
- Cora renders without page-level horizontal overflow at 390x844, 1440x900, 1920x1080 and 2560x1440.
- Check the Cora page at the top, a media-heavy middle section and the end; include actual screenshots. Capture a full-page reference too where practical.
- Verify homepage-to-Cora navigation and the Cora → 6s SEO Tool → Staple → Dream Holidays → Cora loop.
- Check browser console and failed asset requests; distinguish existing unrelated problems from regressions.
- Run git diff --check and the existing applicable lint/type/build scripts. Run relevant existing tests when the changed behaviour is covered; do not invent superficial tests or claim an absent script passed.

Finish with the changed-file list, before/after media mapping, remaining content gaps, command results and actual screenshots accessible from the walkthrough. Windows-local image paths alone are not proof that a reviewer received the screenshots. Do not claim checks were completed unless they ran.

Do not commit or push.
~~~

## 8. Package use

Extract Cora_Antigravity_Handoff.zip into or beside the portfolio repository and let Antigravity read this brief. The archive contains this document, the JSON manifest, and the ready-to-copy public asset directory. It does not contain the portfolio source code or change any existing website by itself.

The package validation checks the archive, manifest references, source-copy hashes, image dimensions and video metadata. These are asset-handoff checks; responsive rendering and website build checks remain for the implementation environment.
