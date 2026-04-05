# Plans and Tasks

We have approved specs. Now create implementation plans and atomic tasks.
Do NOT implement yet.

Before starting, read the relevant spec files for this pack.

Step 1: Create an implementation plan at work/plans/YYYY-MM-DD_[pack-name].md
- Break the work into logical implementation phases.
- Identify dependencies between changes.
- Flag any technical risks or unknowns.
- List all files that will be created or modified.
- List all spec dependencies that could be affected by this change.

Step 1b: UI Kit delta — required in every plan that touches UI
Read `specs/ui/UI_KIT.md` and include an explicit **UI Kit delta** section in the plan:
- **CREATE** — list any new tokens, typography styles, colors, or components required by this
  feature that do not yet exist in `UI_KIT.md`. These must be approved before implementation.
- **ALTER** — list any items currently in `UI_KIT.md` with `status: approved` that this feature
  requires to change. Each must be flagged as requiring explicit user approval before alteration.
- If neither list has entries, state: "No UI Kit changes required for this pack."

UI Kit delta items are blockers for any implementation task that depends on them.
They must appear as dedicated tasks in Step 2, ordered before the tasks that depend on them.

Step 2: Create atomic tasks at work/tasks/YYYY-MM-DD_[pack-name].md
- One task per logical unit of work.
- Each task must have: title, description, acceptance criteria, affected files, and a reference to the canonical spec section it implements.
- Tasks must be ordered by dependency (blockers first).
- Tasks must be small enough to implement and verify independently.

$ARGUMENTS

After creating plans and tasks, summarize the work and stop for confirmation before proceeding.
