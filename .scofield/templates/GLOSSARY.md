<!-- mentor:file
Canonical terms used across specs, code, and design discussions. The Mentor uses this file to ensure consistent language — both in conversations and in generated code. An incomplete glossary causes the AI to invent its own terminology, which drifts from the product's actual model over time. Every domain entity, every status value, and every UI concept with a specific meaning belongs here.
priority: high
-->

# Glossary

All terms used in specs, code, and design discussions for this product.
Terms are listed alphabetically within each section.

---

## Domain Entities

<!-- mentor
Define every entity the product works with — the nouns of the domain. Each definition should be precise enough that a developer could name variables correctly. If a term means something different in this product than in general usage, the definition must make that explicit.

quality signals:
- Every entity mentioned in other spec files has an entry here
- Definitions are unambiguous — no "it's basically a..." hedging
- Relationships between entities are hinted at in definitions where relevant
- Status values for each entity are listed or cross-referenced
-->

---

## UI Terms

<!-- mentor
Define terms that describe specific UI elements, patterns, or concepts in this product. If the product has a "card", a "panel", a "flow", or any other UI construct that has a specific meaning, define it here so the AI uses the correct term when reading and generating code.

quality signals:
- Every UI element referenced in screen specs is defined here
- Definitions include enough context to distinguish similar elements (e.g. "card" vs "tile")
- Terms match the actual CSS class names and component names used in code
-->

---

## Status Values

<!-- mentor
List every status value for every entity in the product. Statuses are critical — incorrect status handling is one of the most common sources of bugs in AI-generated code. Each status should have a precise description of what it means and what state the entity is in.

quality signals:
- All possible statuses for each entity are listed, not just the happy path
- Each status description explains what it means, not just what it's called
- Terminal statuses (can't transition out) are marked as such
-->

| Status | Description |
|--------|-------------|
| | |
