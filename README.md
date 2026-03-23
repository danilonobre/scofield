# Scofield

**A Spec-Driven Development framework for solo builders who use AI coding tools.**

Michael Scofield didn't walk into Fox River and improvise. He tattooed the entire plan on his body before taking a single step. That's the idea here — spec first, then execute.

---

## What it is

Scofield is a framework that makes the spec the authority. Before any code is written, you define what the product is, how it works, what it looks like, and what the rules are. Every development session starts from that foundation. The AI reads the spec, not the conversation history.

The result: less correction, less drift, more execution.

---

## The two pillars

### 1. The Workflow

A 6-step development cycle run through IDE commands:

```
/1-spec-pack       → define what to build (bugs + features)
/2-plans-and-tasks → break it into atomic tasks
/3a-implement      → build it
/3b-test           → verify it
/4-spec-sync       → sync specs with what was actually built
/5-deploy          → merge to main
```

Each step has a confirmation checkpoint. The spec is always the source of truth.

### 2. The Mentor

An AI consultant invoked at any time via `/mentor`. It reads all spec files, identifies gaps and vague sections, asks targeted questions, and writes answers directly into your specs — with your approval.

The Mentor is not part of the numbered workflow. It runs independently, before or after any step, whenever the specs need attention.

---

## Getting started

```bash
npm install -g scofield-cli
cd your-project
scofield init
```

Then open Claude Code or Cursor and run `/mentor` to fill your specs.

---

## Updating

```bash
scofield update
```

Updates all framework files — commands, base config, new spec templates — without touching your specs or project-specific rules. Displays a summary of every change with context on the impact.

---

## Extensions

Extensions add capabilities on top of the core framework. Each extension contributes IDE commands (and optionally a runtime package) fetched directly from the extension's GitHub repo at install time.

```bash
scofield extension add <owner/repo>     # install
scofield extension update <name>        # update to latest
scofield extension list                 # list installed
```

`scofield update` also checks for extension updates automatically.

Installed extensions are tracked in `.scofield/extensions/_extensions.json`.

### Available extensions

| Extension | Install | What it adds |
|-----------|---------|--------------|
| **DocGuard** | `scofield extension add raccioly/docguard` | Canonical-Driven Development enforcement. 19 automated validators, semantic cross-document analysis, AI-driven doc repair, and a CDD maturity score. Adds `/docguard-guard`, `/docguard-review`, `/docguard-fix`, `/docguard-score`. |

---

## Repository structure

```
your-project/
├── CLAUDE.md                  ← framework base (in markers) + your project overrides
├── .cursorrules               ← same as CLAUDE.md, for Cursor
├── specs/                     ← your spec files (you own these)
│   ├── PRODUCT_CONTEXT.md     ← what the product is, who it's for, why it exists
│   ├── DECISIONS.md           ← architecture decision records
│   ├── GLOSSARY.md            ← canonical terms used across specs and code
│   ├── constitution.md        ← non-negotiables that can never be violated
│   ├── scope.md               ← what's in and out of the current phase
│   ├── domain/
│   │   ├── entities.md        ← data model and relationships
│   │   └── pipeline-rules.md  ← AI pipeline rules (optional)
│   ├── ui/
│   │   ├── _tokens.md         ← design tokens: colors, typography, spacing
│   │   ├── components/        ← component specs
│   │   ├── icons/             ← icon inventory
│   │   ├── fonts/             ← font definitions
│   │   └── screens/           ← screen specs
│   ├── ux/
│   │   ├── guidelines.md      ← interaction patterns and UX rules
│   │   └── flows/             ← one file per user flow
│   └── architecture/
│       ├── frontend.md
│       ├── backend.md
│       ├── ai.md
│       └── database.md
├── work/                      ← operational artifacts (plans, tasks, changelogs)
│   ├── changes/               ← spec changelogs, kept after deploy
│   ├── plans/                 ← implementation plans, deleted after deploy
│   └── tasks/                 ← atomic tasks, deleted after deploy
├── .scofield/                 ← framework-owned directory (do not edit manually)
│   ├── version                ← installed framework version
│   ├── templates/             ← empty spec file templates
│   ├── archived/              ← spec files removed in past updates
│   └── extensions/            ← extension registry and context files
├── .claude/
│   └── commands/              ← slash commands for Claude Code
└── .cursor/
    └── commands/              ← same commands for Cursor
```

**Framework files** (owned by Scofield, updated by `scofield update`): `.scofield/`, `CLAUDE.base.md`, `.claude/commands/`, `.cursor/commands/`

**Project files** (created by `scofield init`, owned by you, never touched by `scofield update`): `specs/`, `work/`, `CLAUDE.md` overrides section, `.cursorrules` overrides section

---

## The spec format

Every spec file uses `<!-- mentor -->` comment blocks to guide the Mentor:

```markdown
<!-- mentor:file
Description of this file's purpose.
priority: critical|high|medium|low
-->

# File Title

## Section Name

<!-- mentor
What should be in this section, and the quality signals that define a good answer.

quality signals:
- Specific, objective criterion
- Another criterion
-->

(your content here)
```

The `<!-- mentor -->` blocks are never removed after you fill in content — they remain as a permanent reference and are used by the Mentor to evaluate whether a section is empty, vague, or complete.

---

## Figma sync

If your design lives in Figma, Scofield provides sync utilities to keep your specs current as the design evolves:

| Command | What it syncs |
|---|---|
| `/tokens-sync` | Design tokens from the Figma file |
| `/icons-sync` | Icon inventory from a Figma page or section |
| `/fonts-sync` | Font definitions |
| `/components-sync` | Component specs from individual Figma node URLs |
| `/screens-sync` | Screen specs from individual Figma node URLs |

Components and screens each have a `figma_url:` field in their spec file. Fill it in, then run the corresponding sync.

---

## Why "Scofield"

Michael Scofield had a plan. You should too.

---

*Named after Michael Scofield from Prison Break.*
