# Scofield — Backlog

Items deferred from v1 due to complexity or dependency on validation. Candidates for future versions.

---

## Subagents in `/1-spec-pack`

**Idea:** Refactor `/1-spec-pack` to spawn two specialized subagents in parallel — `bug-spec-writer` and `feature-spec-writer` — when the pack contains both types.

**Rationale:**
- Each subagent has a focused system prompt for its domain (bug spec vs. feature spec)
- Natural parallelism when the pack has both bugs and features; if only one type is present, only the corresponding agent is spawned — zero waste
- Output files are disjoint (`work/changes/YYYY-MM-DD_bug_*.md` vs `work/changes/YYYY-MM-DD_feature_*.md`), no conflict risk
- Updates to canonical spec files (e.g. `domain/entities.md`) stay with the main orchestrator, sequentially, after both subagents finish

**What needs to be defined before implementing:**
- `.claude/agents/bug-spec-writer.md` and `.claude/agents/feature-spec-writer.md` — system prompt, allowed tools, received context
- Instruction in `/1-spec-pack` for how the orchestrator detects what the pack contains and decides to spawn one, both, or neither
- Cost validation: compare the same pack running sequentially vs. with subagents (use `/cost` before and after each approach)
- Evaluate whether running subagents on Haiku reduces cost without sacrificing quality in `/1-spec-pack`

**Prerequisite:** study subagents in practice in Claude Code before implementing.

---
