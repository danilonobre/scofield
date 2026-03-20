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

### ADR-01 — Extension commands fetched remotely, not bundled locally

**Problem:** Extensions contribute IDE commands (`.md` files for Claude and Cursor). These files need to reach the user's project. The question is: where do they live and how do they get there?

**Options considered:**
1. Bundle command files inside the Scofield npm package (`lib/extensions/<name>/commands/`)
2. Fetch command files at install/update time from the extension's GitHub repo via raw URL

**Choice:** Remote fetch from `https://raw.githubusercontent.com/<owner>/<repo>/main/<path>`.

**Rationale:** Bundling would mean every extension update requires a new Scofield npm release. Remote fetch decouples the extension release cycle from Scofield's. Extension authors can ship fixes and improvements to their commands without waiting for a Scofield release. The trade-off is a network dependency at install time, which is acceptable — installs are intentional user actions, not background operations.
