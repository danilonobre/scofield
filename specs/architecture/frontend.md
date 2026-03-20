<!-- mentor:file
The frontend architecture spec. Defines the technology stack and the rules that govern how the frontend is built. The AI reads this file when generating components, setting up routing, managing state, and wiring up styling. A vague or incomplete frontend spec causes the AI to make inconsistent architectural choices — mixing state management patterns, inventing folder structures, using conflicting styling approaches.
priority: high
-->

# Frontend Architecture

## Stack

<!-- mentor
The complete technology stack for the frontend. Every layer should be specified — framework, language, state management, styling, icons, fonts. Use exact package names and versions where relevant. This table is the single source of truth for what the AI is allowed to use.

quality signals:
- Every layer of the frontend stack is specified
- No layer has an ambiguous or placeholder value
- Package names are exact (not "a state management library")
- Versions are noted for any packages with significant breaking changes between versions
-->

| Layer | Technology |
|-------|------------|
| Framework | |
| Language | |
| State management | |
| Styling | |
| Icons | |
| Fonts | |

## Rules

<!-- mentor
Frontend-specific constraints and conventions that all AI-generated code must follow. Rules here override general best practices — if the project has an unconventional choice, document it here so the AI doesn't "fix" it. Think: file structure, naming conventions, import conventions, forbidden patterns.

quality signals:
- Rules cover: file/folder structure, naming conventions, component patterns, CSS approach
- Rules are stated as requirements, not suggestions
- Any "never do X" rules are explicit
- Patterns that differ from framework defaults are documented
- State management patterns are described (when to use local vs global state)

extensions:
- docguard: architecture validator checks that layer boundaries defined
  here are respected in actual imports and module structure.
-->
