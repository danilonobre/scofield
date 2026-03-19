# Changelog

All notable changes to Scofield are documented here.
Format: `+` added, `~` changed, `-` removed, `!` renamed or breaking.

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
