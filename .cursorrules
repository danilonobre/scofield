# CLAUDE.md — Project rules and workflow

## Project stack

- React 18 + TypeScript + Vite
- Zustand for state management
- Supabase for auth, database, and edge functions
- Anthropic Claude API (claude-sonnet-4-6) via Supabase Edge Functions
- Geist + Geist Mono fonts
- Phosphor Icons

## Key constraints (see spec/constitution.md for full list)

- Desktop-first layout. Sidebar fixed left, board area fills remaining space.
- All sections always visible simultaneously — no tabs, no navigation.
- All spacing must be multiples of 4px.
- No localStorage or sessionStorage. All data goes through Supabase.
- Claude API calls must go through Supabase Edge Functions only — never from the browser.
- Every item is created via AI pipeline. No manual item creation.

---

## Spec authority

- Behavioral authority: `spec/` markdown files in this repository.
- Visual authority: `spec/ui/design-tokens.md`.
- On conflict, behavioral specs win.
- Do not implement behavior that contradicts the specs without updating the specs first and confirming with the user.

---

## Spec-driven workflow

This project uses a 6-step spec-driven development workflow:

1. `/1-spec-pack` — create bug and feature specs
2. `/2-plans-and-tasks` — create implementation plans and atomic tasks
3a. `/3a-implement` — implement based on plans and tasks
3b. `/3b-test` — run and validate tests after implementation
4. `/4-spec-sync` — sync code and specs
5. `/5-deploy` — merge pack branch to main

Each step has a confirmation checkpoint. Never advance to the next step without explicit user confirmation.

Before any task involving bugs, features, or implementation, read:
- `spec/PRODUCT_CONTEXT.md`
- `spec/DECISIONS.md`
- `spec/GLOSSARY.md`

---

## Git pre-flight

Before starting any workflow step:
1. Run `git status`
2. If there are uncommitted changes, stop and report them to the user
3. Ask: "These files have uncommitted changes. Commit, stash, or abort?"
4. Only proceed after the working tree is clean

---

## Git workflow

- When starting a new pack, create a branch named `pack/YYYY-MM-DD` from main.
- Commit atomically — one commit per bug fix, one commit per feature.
- Use conventional commit prefixes: `fix:` for bugs, `feat:` for features.
- Never commit everything in a single lump commit at the end.
- Do not merge to main — that is handled by `/5-deploy` with explicit user confirmation.

---

## Step necessity evaluation

At the end of each step, before indicating the next one, evaluate whether the next step is actually necessary given the work done. Always inform the user of the recommendation and wait for explicit confirmation before proceeding — never skip automatically.

- `/1-spec-pack` → `/2-plans-and-tasks`: always required
- `/2-plans-and-tasks` → `/3a-implement`: always required
- `/3a-implement` → `/3b-test`: conditional — recommend skipping if changes are purely visual, copy, or trivial isolated logic with no business rules involved
- `/3b-test` → `/4-spec-sync`: always required if `/3b-test` was run
- `/3a-implement` → `/4-spec-sync`: conditional — recommend skipping if no deviations were recorded and all implemented behavior was already covered by existing specs
- `/4-spec-sync` → `/5-deploy`: always required

When recommending to skip a step, always explain why:
> "I recommend skipping /3b-test because [reason]. Proceed to /4-spec-sync?"

Wait for user confirmation before proceeding.

---

## Spec update rule

After any code change is confirmed working, always ask the user:

> "Should I update the specs?"

Wait for confirmation before modifying any file under `spec/`. Only update specs after the user explicitly says yes.

---

## Deviations and ambiguity

- Any deviation from spec during implementation must be documented immediately in an "Implementation Notes" block in the relevant task file.
- If a spec is ambiguous or incomplete, stop and ask before assuming. Never fill gaps with assumptions that could affect behavior.

---

## Step transitions

At the end of each step, always tell the user what the next step is and what command to run.

---

## Token efficiency

- Only read spec files that are directly relevant to the current task.
- Keep sessions focused on a single step of the workflow.
- If a bug fix fails after 2 attempts, stop. Summarize what was tried, ask for guidance.

---

## CSS preservation rule

The component CSS files were manually refined and represent the visual baseline of the product.
Do not modify any existing CSS rules unless the task explicitly requires a visual change.
If a task requires touching CSS, list which files will be affected and wait for confirmation before proceeding.

---

## CSS naming convention

CSS Module class names must be semantic and descriptive of the element's role or content.
Never use generic names like `root`, `content`, `wrapper`, `children`, or `container` alone.
Always combine with context: `sidebarHeader`, `boardArea`, `itemCardBody`, `sectionList`.
Good examples: `loginScreen`, `projectSelector`, `inputField`, `submitButton`, `itemCard`, `doneToast`.
