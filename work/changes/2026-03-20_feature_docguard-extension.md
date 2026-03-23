# Feature: DocGuard Extension — Scofield Integration

**Date:** 2026-03-20
**Type:** feature

---

## Description

Two related changes shipped as a single pack:

1. **DocGuard added as the first curated Scofield extension** — extension manifest, readme, and spec annotations wired in.
2. **Real extension fetch/update logic implemented in the CLI** — replaces the v1.0.0 placeholder with actual GitHub raw fetch, `extension update`, `extension list`, and extension checking during `scofield update`.

---

## Expected behavior

### CLI — `extension.js`

- `scofield extension add <owner/repo>` reads the local manifest from `.scofield/extensions/<name>.json`, fetches each command file from `https://raw.githubusercontent.com/<owner>/<repo>/main/<path>`, copies them to `.claude/commands/` and `.cursor/commands/`, installs the npm runtime if declared, and registers in `_extensions.json`.
- `scofield extension update <name>` re-fetches all command files, compares versions, warns on any file not found at the remote URL.
- If a declared command file returns 404, warns the user that the manifest may be outdated and needs manual review — does not abort.
- `scofield extension list` lists all installed extensions with name, version, and source.
- No external dependencies — Node.js built-ins only (`https`, `fs`, `path`).
- The `loadManifest` function is keyed by `name` (repo name lowercased), not by `source`. Errors clearly if manifest not found.

### CLI — `bin/scofield.js`

Help text updated to v1.1.0, listing all five commands including `extension update` and `extension list`.

### CLI — `update.js`

After updating framework files and `.scofield/version`, fetches `package.json` from each installed extension's GitHub repo and reports whether updates are available. Warns if remote is unreachable. The `update` function becomes async.

### Extension registry

- `.scofield/extensions/docguard.json` — manifest for the DocGuard extension (4 commands, docguard-cli runtime).
- `.scofield/extensions/docguard-readme.md` — human-readable description of DocGuard, what it adds, and when the Mentor suggests it.

### Spec annotations

`extensions:` fields added inside `<!-- mentor -->` comments in:
- `specs/constitution.md` — Non-Negotiables section
- `specs/DECISIONS.md` — `<!-- mentor:file -->` block
- `specs/domain/entities.md` — Entity Map section
- `specs/architecture/frontend.md`, `backend.md`, `ai.md`, `database.md` — Rules section

### Command: `/4-spec-sync`

After listing all changes, checks whether DocGuard is installed and applies a tiered suggestion (Strongly recommended / Recommended / Optional / No suggestion) based on sync scope. If DocGuard is not installed, the section is skipped entirely.

### Command: `/mentor`

Step 9 updated: when an `extensions:` field is found and the extension is not installed, the Mentor reads the extension readme (or falls back to manifest description) and presents it with context before asking the user if they want to install it. The Mentor does not install it — the user runs the CLI command.

### Versioning

- `CHANGELOG.md` gets a `[1.1.0]` entry.
- `.scofield/version` changes from `1.0.0` to `1.1.0`.
- `package.json` version is NOT bumped here — that happens at npm publish time.

---

## Acceptance criteria

- [ ] `scofield extension add raccioly/docguard` fetches the 4 command files from GitHub raw and copies them to `.claude/commands/` and `.cursor/commands/`.
- [ ] If a declared command file returns 404, a warning is printed but execution continues for other files.
- [ ] `scofield extension update docguard` compares installed version against remote `package.json` version and re-fetches if different.
- [ ] `scofield extension list` prints installed extensions with name, version, source.
- [ ] `scofield update` reports extension update availability after updating framework files.
- [ ] `scofield extension add` for an already-installed extension prints a message and exits without error.
- [ ] `.scofield/extensions/docguard.json` exists and is valid JSON with the correct 4-command manifest.
- [ ] `.scofield/extensions/docguard-readme.md` exists and describes DocGuard accurately.
- [ ] `extensions:` fields added to all 8 spec files/sections listed above.
- [ ] `/4-spec-sync` command checks DocGuard install status and applies correct recommendation tier.
- [ ] `/mentor` step 9 reads readme or falls back to manifest description before presenting the extension.
- [ ] `CHANGELOG.md` has a `[1.1.0]` entry at the top.
- [ ] `.scofield/version` reads `1.1.0`.

---

## Rationale

The extension system was introduced in v1.0.0 as a placeholder. This pack makes it functional:

- Remote fetch replaces local file copy, enabling extensions to be maintained independently of the Scofield framework.
- DocGuard is a natural fit as the first curated extension — it directly strengthens the spec-driven workflow by validating the specs that Scofield produces.
- Mentor integration creates a discovery path: users encountering spec sections with enforcement potential are proactively offered the relevant extension.
- The `/4-spec-sync` quality gate adds a lightweight checkpoint at the most natural moment for doc quality review.

---

## Spec artifacts

| File | Action | Reason |
|------|--------|--------|
| `specs/constitution.md` | UPDATE | Add `extensions:` field to Non-Negotiables section |
| `specs/DECISIONS.md` | UPDATE | Add `extensions:` field to `<!-- mentor:file -->` block |
| `specs/domain/entities.md` | UPDATE | Add `extensions:` field to Entity Map section |
| `specs/architecture/frontend.md` | UPDATE | Add `extensions:` field to Rules section |
| `specs/architecture/backend.md` | UPDATE | Add `extensions:` field to Rules section |
| `specs/architecture/ai.md` | UPDATE | Add `extensions:` field to Rules section |
| `specs/architecture/database.md` | UPDATE | Add `extensions:` field to Rules section |
| `specs/DECISIONS.md` | UPDATE | Record CLI architecture decision (remote fetch over local bundle) |
| `specs/GLOSSARY.md` | UPDATE | Add terms: Extension, Extension manifest, Extension registry |
