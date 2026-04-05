<!-- mentor:file
A record of deliberate decisions made during design and development. Each entry should explain the problem, the options considered, the choice made, and the rationale. The Mentor uses this file to avoid re-litigating settled questions and to ensure new decisions don't contradict existing ones. An empty decisions file almost always means important choices were made implicitly — and will be made differently by the AI every time.
priority: high

extensions:
- docguard: validates traceability between decisions and implementation.
  Detects when documented decisions are contradicted by the codebase.
-->

# Architecture and Design Decisions

A record of deliberate decisions made during the design and development of this product.
Each entry explains the problem, the options considered, the choice made, and the rationale.

---

## Product

<!-- mentor
Record product decisions that have non-obvious rationale — choices about what the product is, how it works, and why a different approach was rejected. Format: ADR-01 — Decision name, then: Problem / Options / Choice / Rationale.

quality signals:
- Each ADR has a clear problem statement, not just a solution
- Options considered are listed, even if only two
- Rationale explains why the chosen option wins, not just what it is
- Anyone reading this could defend the decision to a skeptic
-->

---

## UI / UX

<!-- mentor
Record design and interaction decisions with non-obvious rationale. Why did you choose this navigation pattern? Why this specific interaction? Why not modal dialogs? Decisions made here prevent the AI from undoing them during implementation.

quality signals:
- Decisions cover the most opinionated UX choices in the product
- Each entry explains what problem the design choice solves
- Trade-offs are acknowledged, not hidden
-->

---

## Technical

<!-- mentor
Record architectural and technical decisions: why this database, why this auth method, why this state management approach, why this deployment strategy. These decisions are load-bearing — the AI must not reverse them without explicit instruction.

quality signals:
- All major architectural choices are documented
- Security and data decisions have explicit rationale
- Dependencies on external services are noted with their implications
-->

### ADR-02 — UI Kit as mandatory design system source of truth, enforced via approval gate

**Problem:** Visual decisions (tokens, colors, typography, components) are made ad hoc during implementation. The agent has no canonical source to consult for visual matters and no enforcement mechanism to prevent visual drift between the spec layer and the actual project.

**Options considered:**
1. Trust the agent to follow `specs/ui/_tokens.md` and Figma without a formal approval mechanism.
2. Require all visual items to be declared in a dedicated `UI_KIT.md` with user-approved status, and block implementation until approval is granted.

**Choice:** Option 2 — mandatory `specs/ui/UI_KIT.md` with `pending`/`approved` status per item and an approval gate at `/3a-implement`.

**Rationale:** Option 1 relies on agent self-discipline, which degrades across sessions and is not auditable. Option 2 makes the visual source of truth explicit, versioned, and user-controlled. The approval gate at `/3a-implement` is the enforcement point — without it, the rules in `CLAUDE.md` would be advisory only. The HTML artifact (`UI_KIT.html`) is generated from the file using a marker-based architecture — see ADR-03.

---

### ADR-03 — UI_KIT.html uses marker-based zones, not full regeneration

**Problem:** The UI Kit HTML artifact needs to be updated whenever a component is added or changed. Full regeneration on every update is expensive: the agent must read the entire `UI_KIT.md`, rebuild the complete HTML (CSS + JS + all components), and write hundreds of lines even when only one component changed. Additionally, embedding the full CSS/JS in `UI_KIT.md` inflates its token cost on every read — even in sessions that never touch the HTML.

**Options considered:**
1. Full regeneration: always rewrite `UI_KIT.html` from scratch from `UI_KIT.md`. Simple to instruct; expensive to execute.
2. Marker-based zones: divide `UI_KIT.html` into 4 zones (`kit:shell`, `kit:items`, `kit:item:[name]`, `kit:fundamentals`) with HTML comment markers. After first generation, use the Edit tool to modify only the relevant zone.

**Choice:** Option 2 — marker-based zones. `UI_KIT.md` contains only the marker convention, the operations table, and a single component section template (~40 lines). The full CSS/JS lives in `UI_KIT.html` inside `kit:shell`, generated once.

**Rationale:** After first generation, adding a component costs ~40 lines (one Edit call). Updating a component costs the same. The CSS/JS shell is never touched unless the global design system changes. `UI_KIT.md` stays lightweight — no embedded CSS/JS — so reading it in any session is cheap. The trade-off is that the agent must use the Edit tool correctly and respect the markers; the instructions in `mentor.md` and `3a-implement.md` are explicit about this.

---

### ADR-01 — Extension commands fetched remotely, not bundled locally

**Problem:** Extensions contribute IDE commands (`.md` files for Claude and Cursor). These files need to reach the user's project. The question is: where do they live and how do they get there?

**Options considered:**
1. Bundle command files inside the Scofield npm package (`lib/extensions/<name>/commands/`)
2. Fetch command files at install/update time from the extension's GitHub repo via raw URL

**Choice:** Remote fetch from `https://raw.githubusercontent.com/<owner>/<repo>/main/<path>`.

**Rationale:** Bundling would mean every extension update requires a new Scofield npm release. Remote fetch decouples the extension release cycle from Scofield's. Extension authors can ship fixes and improvements to their commands without waiting for a Scofield release. The trade-off is a network dependency at install time, which is acceptable — installs are intentional user actions, not background operations.
