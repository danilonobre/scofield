# Feature Spec — UI Kit HTML-first Approval Gate

**Date:** 2026-04-06
**Status:** draft

---

## Description

Today the UI Kit approval gate works in two inconsistent flows:

- In `/mentor`: the agent runs the approval loop on pending items *before* generating the HTML. The user approves items from a text description, then the HTML is offered as an optional follow-up.
- In `/3a-implement` (CREATE): the agent renders an isolated self-contained HTML artifact *before* asking for approval, which is closer to the intent — but after approval it again asks "Deseja que eu atualize o `UI_KIT.html`?" as if the HTML is optional.

Neither flow requires the user to see the item rendered inside `UI_KIT.html` before granting approval. Approval can happen without the user ever interacting with the live artifact.

This feature enforces a strict rule: **no component approval may be granted until the user has seen and interacted with it inside `UI_KIT.html`**. The HTML generation is a mandatory, non-optional step in the approval flow — not a follow-up question.

---

## Expected behavior

When any component (or token, typography entry, or color) is created or revised — whether through `/mentor` or `/3a-implement` — the flow must be:

1. Agent gathers all context and resolves all ambiguities (asks clarifying questions if needed).
2. Agent writes the proposed item(s) to `UI_KIT.md` with `status: pending`.
3. Agent generates or updates `UI_KIT.html` to include the item(s) — without asking for permission.
4. Agent presents the HTML artifact to the user with an instruction to interact with it.
5. Agent asks for approval only after the HTML has been generated.
6. On approval: `status` in `UI_KIT.md` is updated to `approved`.
7. On rejection: the item stays `pending`, the agent asks what should change, iterates from step 2.

The question "Deseja que eu atualize o `UI_KIT.html`?" must be removed from all flows. HTML generation is never optional when a component is being reviewed for approval.

---

## Acceptance criteria

- [ ] `/mentor` approval loop: HTML is generated (or updated) before asking for approval — never after.
- [ ] `/3a-implement` CREATE gate: after writing the item to `UI_KIT.md` as `pending`, the agent updates `UI_KIT.html` immediately, then asks for approval.
- [ ] `/3a-implement` ALTER gate: after writing the proposed change to `UI_KIT.md`, the agent updates `UI_KIT.html` immediately, then asks for approval.
- [ ] The prompt "Deseja que eu atualize o `UI_KIT.html`?" is removed from all approval contexts.
- [ ] HTML generation remains optional (follow-up question) only in sessions where no approval decision is being made (e.g. pure spec-reading sessions).
- [ ] If `UI_KIT.html` does not yet exist, a first-generation is triggered automatically as part of the approval flow.
- [ ] Rejection of an item does not revert `UI_KIT.md` automatically — agent must guide the user to describe the correction, then iterate.

---

## Rationale

The current flow allows the user to approve components they have never seen rendered. This defeats the purpose of the `UI_KIT.html` artifact, which exists precisely to give the user a visual, interactive reference before making decisions. The approval gate should be grounded in what the user has actually experienced, not in a textual description of a component. Making HTML generation mandatory enforces the principle that the visual source of truth must be seen before it is trusted.

---

## Spec artifacts

| File | Action | Reason |
|---|---|---|
| `specs/ui/UI_KIT.md` — "Generation rules" | UPDATE | Remove "ask before generating" rule from approval contexts; generation is now mandatory before approval. |
| `.claude/commands/mentor.md` — Step 11b | UPDATE | Restructure approval loop: write pending → generate HTML → ask for approval. Remove optional HTML question from post-approval step. |
| `.cursor/commands/mentor.md` | UPDATE | Mirror of mentor.md — same changes. |
| `.claude/commands/3a-implement.md` — UI Kit approval gate steps 2 and 3 | UPDATE | Both CREATE and ALTER gates: generate HTML before asking for approval. Remove post-approval HTML question. |
| `.cursor/commands/3a-implement.md` | UPDATE | Mirror of 3a-implement.md — same changes. |
| `specs/DECISIONS.md` — ADR-02 | UPDATE | Note the HTML-first enforcement as a clarification of the approval gate. |
| `specs/GLOSSARY.md` — UI Kit item statuses | UPDATE | Clarify `pending` → `approved` transition: only valid after HTML has been presented. |
