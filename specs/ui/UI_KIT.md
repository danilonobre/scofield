<!-- mentor:file
This file is the design system source of truth for this project. Every visual decision — tokens, typography, colors, components — is declared here before it can be used in implementation. The agent reads this file to know what is approved for use and what still needs user validation. An incomplete or out-of-date UI Kit causes visual drift and breaks the approval gate in /3a-implement.
priority: critical
-->

# UI Kit

---

## Status model

Each item in this file has a `status` field with one of two values:

- **`pending`** — proposed by the agent, not yet validated by the user. Cannot be used in project implementation.
- **`approved`** — explicitly validated by the user. Can be used in project implementation. Cannot be altered without explicit user approval in the current session.

---

## Hard rules (agent constraints)

1. No UI element may be implemented in the project unless it exists in this file with `status: approved`.
2. No item with `status: approved` may be altered without explicit user approval.

These rules are enforced via the approval gate in `/3a-implement` and mirrored in `CLAUDE.md`.

---

## HTML artifact template

When rendering this UI Kit as an HTML artifact, always use the following scaffold. Never maintain state in the artifact — always regenerate it fresh from this file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>UI Kit</title>
  <style>
    /* Base */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #0a0a0a; color: #e5e5e5; min-height: 100vh; display: flex; }

    /* Layout */
    nav { width: 200px; min-height: 100vh; background: #111; border-right: 1px solid #222; padding: 24px 16px; position: fixed; }
    nav h1 { font-size: 13px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 20px; }
    nav a { display: block; font-size: 13px; color: #aaa; text-decoration: none; padding: 6px 8px; border-radius: 4px; margin-bottom: 2px; }
    nav a:hover, nav a.active { background: #1e1e1e; color: #fff; }
    main { margin-left: 200px; padding: 40px 48px; flex: 1; max-width: 960px; }

    /* Section */
    .section { margin-bottom: 64px; }
    .section-title { font-size: 22px; font-weight: 600; color: #fff; margin-bottom: 8px; padding-bottom: 12px; border-bottom: 1px solid #222; }
    .section-subtitle { font-size: 13px; color: #666; margin-bottom: 32px; }

    /* Item */
    .item { background: #111; border: 1px solid #222; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
    .item-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .item-name { font-size: 14px; font-weight: 600; color: #fff; }
    .item-value { font-size: 12px; color: #666; font-family: monospace; }

    /* Status badges */
    .badge-approved { background: #14532d; color: #86efac; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; padding: 2px 8px; border-radius: 999px; }
    .badge-pending  { background: #713f12; color: #fde68a; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; padding: 2px 8px; border-radius: 999px; }

    /* Pending item highlight */
    .item.pending { border-color: #854d0e; background: #0f0a00; }
    .item.pending .item-name { color: #fde68a; }

    /* Preview areas */
    .preview { margin-top: 12px; padding: 16px; background: #0a0a0a; border-radius: 6px; border: 1px solid #1a1a1a; }
    .swatch { width: 48px; height: 48px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08); }
    .swatch-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
    .swatch-label { font-size: 11px; color: #666; margin-top: 6px; font-family: monospace; }
  </style>
</head>
<body>
  <nav>
    <h1>UI Kit</h1>
    <a href="#tokens">Tokens</a>
    <a href="#typography">Typography</a>
    <a href="#colors">Colors</a>
    <a href="#components">Components</a>
  </nav>
  <main>
    <!-- TOKENS SECTION -->
    <section class="section" id="tokens">
      <div class="section-title">Tokens</div>
      <div class="section-subtitle">Spacing, border-radius, shadows, and other design primitives.</div>
      <!-- inject token items here -->
    </section>

    <!-- TYPOGRAPHY SECTION -->
    <section class="section" id="typography">
      <div class="section-title">Typography</div>
      <div class="section-subtitle">Font families, sizes, weights, and line heights.</div>
      <!-- inject typography items here -->
    </section>

    <!-- COLORS SECTION -->
    <section class="section" id="colors">
      <div class="section-title">Colors</div>
      <div class="section-subtitle">Color palette with semantic roles.</div>
      <!-- inject color items here -->
    </section>

    <!-- COMPONENTS SECTION -->
    <section class="section" id="components">
      <div class="section-title">Components</div>
      <div class="section-subtitle">UI components with variants and usage rules.</div>
      <!-- inject component items here -->
    </section>
  </main>
</body>
</html>
```

Each item is rendered as a `.item` div (add class `pending` when `status: pending`). Include a `.badge-approved` or `.badge-pending` badge in the `.item-header`. For color items, include a `.swatch`. For typography items, render a live text sample in `.preview`. For components, render the component or a simplified representation in `.preview`.

---

## Tokens

<!--
Item shape:
  name: string           — token name (e.g. "spacing-4")
  value: string          — CSS value (e.g. "16px")
  description: string    — what it's used for
  status: pending | approved
-->

<!-- Add token items below. Example structure:

- name: spacing-base
  value: 4px
  description: Base spacing unit. All spacing values are multiples of this.
  status: pending

-->

---

## Typography

<!--
Item shape:
  name: string           — style name (e.g. "body", "heading-lg")
  font-family: string
  font-size: string
  font-weight: string
  line-height: string
  usage: string          — where this style is used
  status: pending | approved
-->

<!-- Add typography items below. -->

---

## Colors

<!--
Item shape:
  name: string           — semantic name (e.g. "surface-primary", "text-muted")
  value: string          — hex or CSS value
  role: string           — semantic role in the UI
  status: pending | approved
-->

<!-- Add color items below. -->

---

## Components

<!--
Item shape:
  name: string           — component name (e.g. "Button", "InputField")
  variants: string[]     — list of variants (e.g. ["primary", "ghost", "destructive"])
  usage: string          — when and where this component is used
  props: string          — key props/API (optional)
  status: pending | approved
-->

<!-- Add component items below. -->
