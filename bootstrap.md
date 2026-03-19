# Scofield Bootstrap

> **Deprecated as of v1.0.0.** Use `scofield init` to set up a project and `/mentor`
> to fill the specs intelligently. This file is kept for historical reference only.

This file is your project setup prompt. Drag it into Claude Code or Cursor and the AI will guide you through the full bootstrap — session by session.

If you've filled in answers below before starting, the AI will confirm them in groups rather than asking one by one. Leave any field blank and the AI will ask you interactively.

---

## Instructions for the AI

Read this entire file before starting. For each session:
1. Scan all questions in order.
2. Where you find consecutive filled answers, present them as a group and ask the user to confirm or edit before proceeding.
3. Where you find a blank answer, ask the question interactively and wait for the user's response before moving on.
4. Never reorder questions. Never skip a question. Acceleration only applies to consecutive filled blocks.
5. At the end of each session, summarize what was defined and wait for explicit confirmation before starting the next session.
6. After all 5 sessions are complete, generate all spec files and the appropriate AI config files (CLAUDE.md, .cursorrules, or both — based on Session 2). Then proceed immediately to Session 6.

Do not create or modify any file before Session 5 is confirmed.

The spec folder is named `specs/` — never `spec/`. The work folder is named `work/` — never `works/`. Always use these exact names.

---

## Session 1 — Project Context

**1.1 Product name:**
<!-- your answer here -->

**1.2 One-line description:**
<!-- your answer here -->

**1.3 What problem does it solve?**
<!-- your answer here -->

**1.4 Who is the primary user?**
<!-- your answer here -->

**1.5 What is the core value proposition?**
<!-- your answer here -->

**1.6 What phase is this? (MVP / v1 / v2 / other)**
<!-- your answer here -->

**1.7 What are the main features of this phase?**
<!-- your answer here -->

**1.8 What is explicitly out of scope for this phase?**
<!-- your answer here -->

**1.9 Describe a typical usage session:**
<!-- your answer here -->

**1.10 Primary platform: (web / mobile / desktop / other)**
<!-- your answer here -->

**1.11 Expected scale: (personal / small team / public / other)**
<!-- your answer here -->

---

## Session 2 — Stack & Architecture

**2.1 Which AI tool will you use? (Claude Code / Cursor / both)**
<!-- your answer here -->

**2.2 Web or mobile?**
<!-- your answer here -->

**2.3 Frontend stack:**
<!-- your answer here -->

**2.4 Backend? (yes / no — if yes, describe)**
<!-- your answer here -->

**2.5 Database:**
<!-- your answer here -->

**2.6 AI features? (yes / no — if yes, describe)**
<!-- your answer here -->

**2.7 Authentication method:**
<!-- your answer here -->

**2.8 Hosting:**
<!-- your answer here -->

**2.9 Any technical constraints or non-negotiables?**
<!-- your answer here -->

---

## Session 3 — Domain

**3.1 What are the main entities in your product?**
<!-- your answer here -->

**3.2 What fields and relationships do they have?**
<!-- your answer here -->

**3.3 What actions can users perform on each entity?**
<!-- your answer here -->

**3.4 Are there any limits or quotas? (e.g. max items, rate limits)**
<!-- your answer here -->

**3.5 What are the core business rules?**
<!-- your answer here -->

**3.6 How are entities ordered or sorted?**
<!-- your answer here -->

**3.7 Does the product have an AI pipeline? (yes / no — if yes, describe input → output)**
<!-- your answer here -->

**3.8 How should failures be handled? (AI errors, network errors, empty states)**
<!-- your answer here -->

---

## Session 4 — UI/UX

**4.1 Do you have a Figma file? (yes / no — if yes, paste the file URL)**
<!-- your answer here -->

**4.2 Brand colors: (skip if Figma provided)**
<!-- your answer here -->

**4.3 Visual mood: (e.g. minimal, bold, playful, professional)**
<!-- your answer here -->

**4.4 Font strategy: (standard library / custom / both — skip if Figma provided)**
<!-- your answer here -->

**4.5 Icon strategy: (standard library / custom / both)**
<!-- your answer here -->

*After confirming 4.5: populate `specs/ui/icons/_map.md` with the icon inventory. If any icons are custom, create one `specs/ui/icons/[icon-name].md` file per custom icon using `_example.md` as the template.*

**4.6 UI framework or component library: (if any)**
<!-- your answer here -->

**4.7 Any components you know you'll need?**
<!-- your answer here -->

*After confirming 4.7: populate `specs/ui/components/_map.md` with the component list, then create one `specs/ui/components/[component-name].md` file per component using `_example.md` as the template. Fill each file with as much detail as the specs allow.*

**4.8 What are the main screens?**
<!-- your answer here -->

*After confirming 4.8: populate `specs/ui/screens/_map.md` with the screen list, then create one `specs/ui/screens/[screen-name].md` file per screen using `_example.md` as the template. Fill each file with as much detail as the specs allow.*

**4.9 Any specific UX flows to define upfront?**
<!-- your answer here -->

**4.10 Additional flows or edge cases: (error states, empty states, onboarding, etc.)**
<!-- your answer here -->

**4.11 Interaction patterns to use or avoid:**
<!-- your answer here -->

**4.12 Accessibility or responsiveness requirements:**
<!-- your answer here -->

---

## Session 5 — Decisions & Constitution

**5.1 Any non-negotiables that must never be violated during development?**
<!-- your answer here -->

**5.2 Any architecture or product decisions already made that should be recorded?**
<!-- your answer here -->

**5.3 Any terms that need a precise definition to avoid ambiguity?**
<!-- your answer here -->

**5.4 Is this a new project or an existing one?**
<!-- your answer here -->

---

## Session 6 — Kickoff

This session runs automatically after all spec files have been generated in Session 5. No questions are asked — this is a planning step.

Read the following files:
- `specs/PRODUCT_CONTEXT.md`
- `specs/scope.md`
- `specs/domain/entities.md`
- `specs/architecture/frontend.md`
- All files in `specs/ui/screens/`
- All files in `specs/ux/flows/`

Then produce an **initial implementation plan**:

1. Break the full scope into logical implementation milestones — ordered by dependency (foundations first, user-facing features after).
2. For each milestone, list the main files that will be created or modified.
3. Flag any technical risks or unknowns that should be resolved before building.
4. Suggest where to start — the smallest slice that results in something runnable.

Present the plan and stop for user confirmation.

After confirmation:
- Create `work/changes/YYYY-MM-DD_feature_kickoff.md` documenting every feature from `specs/scope.md` with: description, expected behavior, acceptance criteria, and rationale drawn from the specs.
- Populate the **Spec artifacts** list in that file, mapping each feature to its relevant spec files.
- Declare: "Kickoff pack created. Next step: `/2-plans-and-tasks`"