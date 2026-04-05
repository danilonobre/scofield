# Changelog

All notable changes to Scofield are documented here.
Format: `+` added, `~` changed, `-` removed, `!` renamed or breaking.

---

## [1.2.0] — 2026-04-05

+ `specs/ui/UI_KIT.md` added — mandatory design system source of truth
  → Every Scofield project now ships with a UI Kit spec at specs/ui/UI_KIT.md.
    Items have status: pending or status: approved. No UI element may be
    implemented without an approved entry. Includes a full HTML artifact
    template for visual review directly in the IDE.

+ UI Kit approval gate added to `/3a-implement`
  → Before implementing any UI element, the agent checks UI_KIT.md.
    New items (CREATE) and changed items (ALTER) require explicit user
    approval before any project code is written. Missing items block
    implementation entirely until added via /mentor.

+ UI Kit setup step added to `/mentor` (step 11)
  → On first run, the Mentor proposes base UI Kit items from project context,
    writes them as pending, generates the HTML artifact, and runs an
    item-by-item approval loop. On subsequent runs, surfaces any pending items.

+ UI Kit delta added to `/2-plans-and-tasks` (step 1b)
  → Every implementation plan now includes a UI Kit delta section listing
    items to CREATE or ALTER before implementation begins. Delta items are
    blocker tasks.

~ `CLAUDE.base.md` updated — UI Kit hard rules
  → Two new hard rules added to the base: (1) no UI implementation without
    approved status in UI_KIT.md, (2) no alteration of approved items
    without explicit user approval.

~ Visual authority updated in `CLAUDE.base.md`
  → specs/ui/UI_KIT.md is now listed alongside _tokens.md and Figma as a
    visual authority source.

---

## [1.1.0] — 2026-03-20

+ DocGuard extension added to registry
  → First curated Scofield extension. Fetches 4 IDE commands directly from
    raccioly/docguard on install (/docguard-guard, /docguard-review,
    /docguard-fix, /docguard-score) and installs the docguard-cli runtime.
    Install with: scofield extension add raccioly/docguard

+ `scofield extension update <name>` added
  → Updates an installed extension by re-fetching its commands from the remote
    repo. Warns if any declared command file is not found (manifest may be
    outdated).

+ `scofield extension list` added
  → Lists all installed extensions with name, version, and source.

~ `scofield update` — now checks extension updates
  → After updating framework files, checks all installed extensions for newer
    versions and reports which ones can be updated.

~ `/4-spec-sync` updated — DocGuard quality gate suggestion
  → After syncing specs, suggests running /docguard-guard with a recommendation
    level based on sync scope. Only shown if DocGuard is installed.

~ `/mentor` updated — extension suggestion flow
  → When the Mentor detects an extensions: field and the extension is not
    installed, it reads the extension readme (or manifest description) and
    presents it with context before asking if the user wants to install it.

---

## [1.0.0] — 2026-03-19

This release transforms Scofield from a git template into an installable npm package with a CLI, an extension system, and The Mentor.

+ `scofield init` added
  → Run inside any new or existing project to distribute all framework files. Creates spec files from templates (skips existing), injects CLAUDE.base.md into CLAUDE.md and .cursorrules via markers, and sets up the .scofield/ directory. Replaces the manual clone-and-configure workflow.

+ `scofield update` added
  → Fetches the latest framework files and updates the project without touching project-owned files. Rewrites only the base block between scofield markers in CLAUDE.md and .cursorrules. New spec file templates are distributed as empty project files. Removed spec files are archived to .scofield/archived/ — never deleted.

+ `scofield extension add <owner/repo>` added
  → Installs a curated extension into the project. Extensions contribute IDE commands, runtime packages, and agent context. Registered in .scofield/extensions/_extensions.json.

+ `CLAUDE.base.md` added
  → Framework guidelines extracted from CLAUDE.md into a standalone file owned by Scofield. CLAUDE.md and .cursorrules now embed this content between <!-- scofield:base:start --> and <!-- scofield:base:end --> markers. Everything outside the markers is yours.

+ `/mentor` command added
  → The Mentor is a new independent pillar of Scofield. Invoke it at any time to analyze all spec files, identify gaps, and conduct a guided Q&A session to fill them. Writes answers directly into spec files with user confirmation. Replaces the linear bootstrap.md flow with an intelligent, spec-aware consultant.

+ `<!-- mentor -->` spec format added
  → All spec files now use the mentor comment format with file-level priority and per-section quality signals. The Mentor reads these to understand what belongs in each section and evaluates existing content against the quality signals.

+ `.scofield/templates/` added
  → Empty versions of all spec files, used by `scofield init` to create project files and by `scofield update` to detect new sections in future versions.

+ `.scofield/extensions/` added
  → Registry of installed extensions. _extensions.json tracks name, version, source, install date, and what was contributed.

~ `bootstrap.md` deprecated
  → The 5-session bootstrap flow is deprecated. Its questions now live inside the `<!-- mentor -->` blocks of each spec file, where the Mentor can ask them intelligently based on what's already filled in. The file is kept for historical reference.

---
