# Scofield

**A spec-driven development template for solo product builders.**

Michael Scofield didn't walk into Fox River and improvise. He tattooed the entire plan on his body before taking a single step. That's the idea here — spec first, then execute.

---

## What it is

Scofield is a git repository template that gives you a complete spec-driven development framework out of the box. You clone it, run a bootstrap session with your AI tool, and end up with a fully structured project spec — ready to develop against.

It's built for solo builders who use AI coding tools (Claude Code or Cursor) and want their AI to work from a reliable source of truth instead of guessing from context.

---

## Philosophy

Most AI-assisted development fails not because the AI is bad at coding, but because it doesn't know enough about what you're building. It fills gaps with assumptions. It reinvents decisions you already made. It drifts.

Scofield solves this by making the spec the authority. Before any code is written, you define what the product is, how it works, what it looks like, and what the rules are. Every development session starts from that foundation. The AI reads the spec, not the conversation history.

The result: less correction, less drift, more execution.

---

## Features

- **5-session bootstrap** — guided setup that takes you from zero to a complete project spec, one question at a time
- **Figma MCP integration** — extract design tokens, components, icons, and screens directly from your Figma file during bootstrap
- **6-step development workflow** — spec → plan → implement → test → sync → deploy, with slash commands for Claude Code and Cursor
- **Sync utils** — `/tokens-sync`, `/icons-sync`, `/fonts-sync`, `/components-sync`, `/screens-sync` keep your specs in sync with Figma as the design evolves
- **Structured spec folder** — every aspect of the product has a home: domain entities, UI tokens, components, screens, UX flows, architecture rules, decisions, glossary
- **work/ separation** — operational artifacts (plans, tasks, changelogs) live outside `specs/`, keeping the spec clean as the source of truth
- **Git workflow built in** — branching, atomic commits, and deploy rules are part of the framework, not an afterthought
- **Claude Code + Cursor** — identical command sets for both tools; bootstrap generates the right config for whichever you use

---

## How it works

```
1. Clone Scofield
2. Open your project in Claude Code or Cursor
3. Paste the bootstrap prompt
4. Answer ~30 questions across 5 sessions
5. You now have a complete project spec
6. Run /1-spec-pack whenever you're ready to build
```

The bootstrap covers everything: what the product is, who it's for, the tech stack, domain entities, design tokens, components, screens, and user flows. By the end, your AI has everything it needs to work without asking.

During development, the 6-step workflow keeps specs and code in sync:

```
/1-spec-pack       → define what to build (bugs + features)
/2-plans-and-tasks → break it into atomic tasks
/3a-implement      → build it
/3b-test           → verify it
/4-spec-sync       → sync specs with what was actually built
/5-deploy          → merge to main
```

---

## Getting started

**1. Clone the template**

```bash
git clone https://github.com/your-username/scofield.git my-project
cd my-project
```

**2. Open in Claude Code or Cursor**

```bash
claude  # Claude Code
# or open in Cursor
```

**3. Paste the bootstrap prompt**

```
Read bootstrap.md and follow its instructions exactly.
Do not skip any session or checkpoint.
Do not create or modify any file before instructed.
Start with Session 1.
```

That's it. The AI takes it from there.

---

## Repository structure

```
scofield/
├── README.md
├── CLAUDE.md              ← rules for Claude Code
├── .cursorrules           ← rules for Cursor
├── bootstrap.md           ← paste this into your AI tool to set up the project
├── specs/
│   ├── PRODUCT_CONTEXT.md ← what the product is, who it's for, why it exists
│   ├── DECISIONS.md       ← architecture decision records (ADRs)
│   ├── GLOSSARY.md        ← canonical terms used across specs and code
│   ├── constitution.md    ← non-negotiables that can never be violated
│   ├── scope.md           ← what's in and out of the current phase
│   ├── domain/
│   │   ├── entities.md          ← data model and relationships
│   │   └── pipeline-rules.md    ← AI pipeline rules (optional)
│   ├── ui/
│   │   ├── _tokens.md           ← design tokens (colors, typography, spacing)
│   │   ├── components/
│   │   │   ├── _map.md          ← component inventory
│   │   │   ├── _example.md
│   │   │   └── [component].md
│   │   ├── icons/
│   │   │   ├── _map.md
│   │   │   ├── _example.md
│   │   │   └── [icon].md        ← only for custom icons
│   │   ├── fonts/
│   │   │   ├── _map.md
│   │   │   ├── _example.md
│   │   │   └── [font].md        ← only for custom fonts
│   │   └── screens/
│   │       ├── _map.md
│   │       ├── _example.md
│   │       └── [screen].md
│   ├── ux/
│   │   ├── guidelines.md        ← interaction patterns and UX rules
│   │   └── flows/
│   │       └── [flow].md        ← one file per user flow
│   └── architecture/
│       ├── frontend.md
│       ├── backend.md           ← optional
│       ├── ai.md                ← optional
│       └── database.md          ← optional
├── work/
│   ├── changes/           ← spec changelog, kept after deploy
│   ├── plans/             ← implementation plans, deleted after deploy
│   └── tasks/             ← atomic tasks, deleted after deploy
├── .claude/
│   └── commands/          ← slash commands for Claude Code
│       └── utils/         ← sync utilities
└── .cursor/
    └── commands/          ← same commands for Cursor
        └── utils/
```

---

## Sync utilities

If you connect a Figma file during bootstrap, Scofield provides sync utilities to keep your specs up to date as the design evolves. Run them whenever something changes in Figma:

| Command | What it syncs |
|---|---|
| `/tokens-sync` | Design tokens from the Figma file |
| `/icons-sync` | Icon inventory from a Figma page or section |
| `/fonts-sync` | Font definitions |
| `/components-sync` | Component specs from individual Figma node URLs |
| `/screens-sync` | Screen specs from individual Figma node URLs |

Components and screens each have a `figma_url:` field in their spec file. Fill it in, then run the corresponding sync.

---

## The spec is the source of truth

`specs/` contains only what the product *is* — not what's being worked on right now. Plans, tasks, and changelogs live in `work/` and are cleaned up after each deploy. This keeps the spec stable and readable at any point in the project's life.

---

*Named after Michael Scofield. He had a plan. You should too.*
