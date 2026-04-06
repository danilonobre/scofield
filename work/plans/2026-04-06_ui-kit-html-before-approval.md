# Plan — UI Kit HTML-first Approval Gate

**Date:** 2026-04-06
**Pack branch:** pack/2026-04-06
**Spec:** work/changes/2026-04-06_feature_ui-kit-html-before-approval.md

---

## Summary

All changes in this pack are to markdown instruction files — no application code, no CSS, no HTML artifact itself. The pack enforces a behavioral rule: the agent must generate `UI_KIT.html` before asking for component approval, never after.

---

## Implementation phases

### Phase 1 — Canonical rule source (blocker for phases 2–3)

Update `specs/ui/UI_KIT.md` → "Generation rules" section.

The current rule says: *"After any change to UI_KIT.md, ask the user: 'Deseja que eu atualize o UI_KIT.html?'"* — this must be split into two cases:
- **Approval context** (any item being reviewed for `pending → approved`): HTML generation is mandatory and immediate, no question asked.
- **Non-approval context** (spec-reading, pure text sessions): the optional question remains.

This file is the design system source of truth and is referenced by both `mentor.md` and `3a-implement.md`. It must be updated first so the command files can cite it accurately.

### Phase 2 — Command files: mentor.md (parallel with Phase 3)

Update `.claude/commands/mentor.md` step 11 and `.cursor/commands/mentor.md` (mirror).

Current step 11b runs the approval loop (approve in UI_KIT.md), then asks about HTML. New order:
1. For each pending item: write to UI_KIT.md as `pending` (already done by the loop).
2. Generate/update UI_KIT.html immediately.
3. Present artifact to user with instruction to interact.
4. Then ask for approval.
5. On approval: set `status: approved` in UI_KIT.md.
6. On rejection: keep `pending`, ask what to change, iterate.

Remove the post-approval "Deseja que eu atualize o `UI_KIT.html`?" question from this flow.

### Phase 3 — Command files: 3a-implement.md (parallel with Phase 2)

Update `.claude/commands/3a-implement.md` approval gate steps 2 and 3, and `.cursor/commands/3a-implement.md` (mirror).

**Step 2 (CREATE):** Current: render isolated artifact → ask for approval → update UI_KIT.md → optionally update HTML. New: write item to UI_KIT.md as `pending` → generate/update UI_KIT.html → present to user → ask for approval → on approval set `approved`.

**Step 3 (ALTER):** Current: present change in text → ask for approval → update UI_KIT.md → optionally update HTML. New: write proposed change to UI_KIT.md (keeping `approved`, noting the pending revision) → update UI_KIT.html to reflect the proposed change → present to user → ask for approval → on approval confirm the change.

Remove the post-approval "Deseja que eu atualize o `UI_KIT.html`?" question from both steps.

### Phase 4 — Supporting specs (independent)

- `specs/DECISIONS.md` — append a clarification note to ADR-02.
- `specs/GLOSSARY.md` — add a sentence to the `pending` status definition.

---

## Files modified

| File | Phase |
|---|---|
| `specs/ui/UI_KIT.md` | 1 |
| `.claude/commands/mentor.md` | 2 |
| `.cursor/commands/mentor.md` | 2 |
| `.claude/commands/3a-implement.md` | 3 |
| `.cursor/commands/3a-implement.md` | 3 |
| `specs/DECISIONS.md` | 4 |
| `specs/GLOSSARY.md` | 4 |

---

## UI Kit delta

No UI Kit changes required for this pack.

---

## Technical risks

- **Mirror drift risk:** `.cursor/commands/` files must stay identical to `.claude/commands/`. If the mirror edits are not applied in the same commit, they can fall out of sync. Mitigated by pairing each command task with its mirror task.
- **ALTER gate ambiguity:** The new ALTER flow requires writing a "proposed change" to UI_KIT.md before the user approves it. This means the file temporarily holds an unconfirmed value. The task must specify clearly how to represent this (e.g. keep `approved` status while the rendered HTML shows the new value, or use a `pending` status during review). This is resolved in task T-04.

---

## Spec dependencies

- `specs/ui/UI_KIT.md` — primary source of truth for HTML generation rules (Phase 1 is a direct edit).
- `specs/DECISIONS.md` ADR-02 — describes the approval gate; clarification added (Phase 4).
- `specs/GLOSSARY.md` — status definitions updated (Phase 4).
