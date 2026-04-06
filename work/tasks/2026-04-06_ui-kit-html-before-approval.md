# Tasks — UI Kit HTML-first Approval Gate

**Date:** 2026-04-06
**Plan:** work/plans/2026-04-06_ui-kit-html-before-approval.md
**Spec:** work/changes/2026-04-06_feature_ui-kit-html-before-approval.md

---

## T-01 — Update UI_KIT.md generation rules

**Description:**
Rewrite the "Generation rules" section of `specs/ui/UI_KIT.md` to split HTML generation into two distinct contexts:
- **Approval context:** HTML generation is mandatory and immediate — no question asked.
- **Non-approval context (spec-reading session):** the optional question "Deseja que eu atualize o `UI_KIT.html`?" remains.

Replace the current single rule ("After any change to UI_KIT.md, ask the user...") with two clearly labeled sub-rules.

**Acceptance criteria:**
- [ ] The generation rules section clearly distinguishes approval context from non-approval context.
- [ ] In approval context: no optional question — generation is stated as mandatory.
- [ ] In non-approval context: the optional question is preserved.
- [ ] The operations table and zone markers are unchanged.

**Affected files:**
- `specs/ui/UI_KIT.md`

**Spec reference:**
Feature spec — Expected behavior, steps 3–5; Acceptance criteria items 1–4.

---

## T-02 — Update .claude/commands/mentor.md approval loop

**Description:**
Restructure step 11 of `.claude/commands/mentor.md` so that HTML generation happens before the approval question, not after.

New approval loop sequence for each pending item:
1. Write item to `UI_KIT.md` as `pending` (or confirm it is already there).
2. Generate or update `UI_KIT.html` immediately (no question — mandatory).
3. Tell the user: "Atualizei o `UI_KIT.html`. Abra o arquivo e interaja com o componente antes de aprovar."
4. Ask: "Aprovar este item? (sim / não / o que mudar)"
5. On approval: set `status: approved` in `UI_KIT.md`.
6. On rejection or change request: ask what to adjust, update `UI_KIT.md`, update `UI_KIT.html`, repeat from step 3.

Remove the post-change "Deseja que eu atualize o `UI_KIT.html`?" question from step 11b entirely.

**Acceptance criteria:**
- [ ] Step 11b no longer contains the optional HTML update question.
- [ ] The approval loop generates HTML before asking for approval.
- [ ] The agent instructs the user to open and interact with the HTML before answering.
- [ ] The rejection path iterates (update md → update html → ask again) without re-asking the HTML question.
- [ ] First generation (file does not exist) is triggered automatically, not conditionally.

**Affected files:**
- `.claude/commands/mentor.md`

**Spec reference:**
Feature spec — Expected behavior steps 2–7; Acceptance criteria items 1, 3, 4, 6, 7.

---

## T-03 — Mirror: update .cursor/commands/mentor.md

**Description:**
Apply the identical changes from T-02 to `.cursor/commands/mentor.md`. This file must remain byte-for-byte identical to `.claude/commands/mentor.md` in the affected sections.

**Acceptance criteria:**
- [ ] `.cursor/commands/mentor.md` matches `.claude/commands/mentor.md` in the step 11 section.

**Affected files:**
- `.cursor/commands/mentor.md`

**Spec reference:**
Feature spec — Spec artifacts table (mirror row).

---

## T-04 — Update .claude/commands/3a-implement.md approval gate

**Description:**
Rewrite approval gate steps 2 (CREATE) and 3 (ALTER) in `.claude/commands/3a-implement.md`.

**Step 2 — CREATE (new element):**
1. Write item to `UI_KIT.md` as `pending`.
2. Generate or update `UI_KIT.html` immediately (mandatory — no question).
3. Tell the user: "Atualizei o `UI_KIT.html` com o novo componente. Abra e interaja antes de aprovar."
4. Ask for approval.
5. On approval: set `status: approved` in `UI_KIT.md`. Proceed with project implementation.
6. On rejection: ask what to adjust, update both files, repeat from step 3.

Remove the block: "After approval: update `status: approved` in `UI_KIT.md`, then ask: 'Deseja que eu atualize o `UI_KIT.html`?'"

**Step 3 — ALTER (change to approved element):**
1. Present the proposed change in text: "**[item name]**: `[old value]` → `[new value]`"
2. Write the proposed new value to `UI_KIT.md` (keep `status: approved` — the item is still approved, under revision).
3. Update `UI_KIT.html` immediately to reflect the new value (mandatory — no question).
4. Tell the user: "Atualizei o `UI_KIT.html` com a alteração proposta. Abra e interaja antes de confirmar."
5. Ask for explicit approval of the change.
6. On approval: the item in `UI_KIT.md` retains `status: approved` with the new value. Proceed.
7. On rejection: revert `UI_KIT.md` to old value, revert `UI_KIT.html`, ask what to adjust, iterate.

Remove the block: "After approval: update the item value and keep `status: approved` in `UI_KIT.md`, then ask: 'Deseja que eu atualize o `UI_KIT.html`?'"

**Acceptance criteria:**
- [ ] Step 2 no longer contains the post-approval HTML question.
- [ ] Step 2 generates HTML before asking for approval.
- [ ] Step 3 no longer contains the post-approval HTML question.
- [ ] Step 3 generates HTML before asking for approval.
- [ ] ALTER rejection path reverts both UI_KIT.md and UI_KIT.html.
- [ ] First generation (file does not exist) is triggered automatically in step 2 if needed.

**Affected files:**
- `.claude/commands/3a-implement.md`

**Spec reference:**
Feature spec — Expected behavior steps 2–7; Acceptance criteria items 2, 3, 4, 6, 7.

---

## T-05 — Mirror: update .cursor/commands/3a-implement.md

**Description:**
Apply the identical changes from T-04 to `.cursor/commands/3a-implement.md`.

**Acceptance criteria:**
- [ ] `.cursor/commands/3a-implement.md` matches `.claude/commands/3a-implement.md` in the approval gate section.

**Affected files:**
- `.cursor/commands/3a-implement.md`

**Spec reference:**
Feature spec — Spec artifacts table (mirror row).

---

## T-06 — Update specs/DECISIONS.md — ADR-02 clarification

**Description:**
Append a clarification paragraph to ADR-02 in `specs/DECISIONS.md` noting that HTML-first enforcement is an explicit part of the approval gate design. The clarification should explain that the optional HTML question was removed from approval flows because it allowed approvals without visual verification.

**Acceptance criteria:**
- [ ] ADR-02 contains a clarification note referencing the HTML-first rule.
- [ ] The note explains why the optional question was a gap in the original design.

**Affected files:**
- `specs/DECISIONS.md`

**Spec reference:**
Feature spec — Spec artifacts table; Rationale section.

---

## T-07 — Update specs/GLOSSARY.md — pending status definition

**Description:**
Add a sentence to the `pending` status definition in `specs/GLOSSARY.md` clarifying that the transition from `pending` to `approved` is only valid after the item has been rendered in `UI_KIT.html` and the user has had the opportunity to interact with it.

**Acceptance criteria:**
- [ ] The `pending` row in the status table includes the HTML-interaction requirement for the transition.

**Affected files:**
- `specs/GLOSSARY.md`

**Spec reference:**
Feature spec — Acceptance criteria item 5; Spec artifacts table.

---

## Task order

```
T-01  (blocker: defines the rule cited in T-02–T-05)
  ├── T-02  (can run after T-01)
  │     └── T-03  (mirror, immediately after T-02)
  └── T-04  (can run after T-01, parallel with T-02)
        └── T-05  (mirror, immediately after T-04)
T-06  (independent)
T-07  (independent)
```

Commit map:
- `feat: UI_KIT.md — mandatory HTML generation in approval context` → T-01
- `feat: mentor.md — HTML-first approval loop` → T-02 + T-03
- `feat: 3a-implement.md — HTML-first approval gate` → T-04 + T-05
- `feat: DECISIONS.md — ADR-02 HTML-first clarification` → T-06
- `feat: GLOSSARY.md — pending status HTML requirement` → T-07
