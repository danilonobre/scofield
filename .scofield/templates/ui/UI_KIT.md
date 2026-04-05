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

## HTML artifact

The UI Kit is visualized as `specs/ui/UI_KIT.html`. This file uses a **marker-based architecture** — zones are edited surgically rather than regenerated from scratch each time.

### Generation rules

- **Never generate silently.** After any change to `UI_KIT.md`, ask the user: "Deseja que eu atualize o `UI_KIT.html`?" Only generate or edit after explicit confirmation.
- **First generation:** write the complete file (shell + all zones). Read `specs/ui/_tokens.md` first and use the project's real tokens — not neutral placeholders.
- **Subsequent edits:** use the Edit tool to modify only the relevant zone. Never rewrite the complete file after the first generation.

### Zone markers

The file is divided into 4 zones with HTML comment markers:

```
<!-- kit:shell:start -->
  <style>complete CSS</style>
  <script>JS: go(), toggleSection(), toggleAnn()</script>
  layout: sidebar (4 groups) + hero banner + #agent-rules section
<!-- kit:shell:end -->

<!-- kit:items:start -->
  <!-- kit:item:ComponentName:start -->
    <section id="component-name">...</section>
  <!-- kit:item:ComponentName:end -->
<!-- kit:items:end -->

<!-- kit:fundamentals:start -->
  tokens, typography, spacing, motion sections
<!-- kit:fundamentals:end -->
```

### Operations table

| Situation | What to edit |
|---|---|
| First generation | Write the complete file |
| Add a component | Edit: insert `kit:item:[name]` block before `<!-- kit:items:end -->` |
| Update a component | Edit: replace between `kit:item:[name]:start` and `kit:item:[name]:end` |
| Update fundamentals | Edit: replace `kit:fundamentals` zone |
| Update global CSS/JS | Edit: replace `kit:shell` zone |

### Shell contents (kit:shell)

The shell is generated once and contains:

**CSS classes required:**
- Layout: `.layout`, `.sidebar`, `.sb-logo`, `.sb-wordmark`, `.sb-version`, `.sb-group`, `.sb-section-toggle`, `.sb-section-toggle.open`, `.sb-section-children`, `.sb-section-children.open`, `.sb-link`, `.sb-link.sub`, `.sb-link.active`, `.main`
- Hero: `.hero`, `.hero-tag`, `.hero-title`, `.hero-sub`, `.hero-chips`, `.hero-chip`
- Sections: `.section`, `.eyebrow`, `.stitle`, `.sdesc`, `.state-lbl`, `.hint`
- Rule blocks: `.rule-block`, `.rule-block.must`, `.rule-block.never`, `.rule-block.ctx`, `.rb-title`, `.ri`, `.rd`
- Component demo: `.comp-demo`, `.comp-grid`
- Annotation box: `.ann-box`, `.ann-toggle`, `.ann-title`, `.ann-arr`, `.ann-body`, `.ann-inner`, `.ar`, `.ae`, `.at`
- Status: `.badge-approved`, `.badge-pending`

**JavaScript functions:**
- `go(id, el)` — smooth scroll to section, marks link as `.active`
- `toggleSection(btn)` — toggles `.open` on sidebar group button and its `.sb-section-children`
- `toggleAnn(btn)` — toggles `.open` on `.ann-body`, rotates `.ann-arr`

**HTML structure inside shell:**
- Sidebar with 4 groups: "Para Agentes" (link: Regras), "Componentes" (expandable sections by domain), "Layouts", "Fundamentos"
- Hero banner: project name, stack, version
- Section `#agent-rules` (always first in main): 3 rule-blocks — `.must` (green, always-do rules), `.never` (red, never-do rules), `.ctx` (amber, project technical context). Content populated from project specs.

### Component section template

Every component entry inside `kit:items` follows this shape:

```html
<!-- kit:item:ComponentName:start -->
<section class="section" id="component-name">
  <div class="eyebrow">Domain Group</div>
  <h2 class="stitle">ComponentName</h2>
  <p class="sdesc">What this component is and when to use it.</p>

  <div class="comp-demo">
    <div class="state-lbl">Default</div>
    <!-- render default state here, fully interactive -->

    <div class="state-lbl" style="margin-top:20px">Hover / Active</div>
    <!-- render hover/active state here -->

    <div class="state-lbl" style="margin-top:20px">Disabled</div>
    <!-- render disabled state here -->

    <!-- add more states as needed: focused, selected, error, loading... -->

    <div class="hint">↑ Clique para testar</div>
  </div>

  <div class="ann-box">
    <button class="ann-toggle" onclick="toggleAnn(this)">
      <span class="ann-title">Tokens</span>
      <span class="ann-arr">▼</span>
    </button>
    <div class="ann-body">
      <div class="ann-inner">
        <div class="ar"><span class="ae">property</span><span class="at">token or value</span></div>
        <!-- one .ar row per token used by this component -->
      </div>
    </div>
  </div>
</section>
<!-- kit:item:ComponentName:end -->
```

**Component implementation rules:**
- All documented states must be interactive in the artifact — not static screenshots
- Hover states: use CSS `:hover` or JS `onmouseenter`/`onmouseleave`
- Toggle/switch states: implement with JS click handlers
- Transitions: use CSS `transition` — never hardcoded delays
- Each state must have a `state-lbl` label above it
- End the demo with a `hint` describing how to interact

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
