<!-- mentor:file
Interaction patterns and UX rules that apply across the entire product. These guidelines are the behavioral complement to the visual tokens — they govern how the product feels and responds, not just how it looks. The AI uses these guidelines when implementing interactions to ensure consistency. Empty or vague guidelines result in inconsistent behavior across screens.
priority: high
-->

# UX Guidelines

## Interaction patterns to use

<!-- mentor
List the interaction patterns the product relies on and why. Be specific: "inline editing on double-click" is a pattern; "good UX" is not. Each pattern should reference a concrete interaction in the product.

quality signals:
- Each pattern is described at the level of a specific mechanism (not a general principle)
- Patterns are consistent with the components and screens defined in the UI specs
- The rationale is stated — why this pattern for this product?
- At least 3-5 patterns are listed for any non-trivial product
-->

## Interaction patterns to avoid

<!-- mentor
Patterns explicitly excluded from the product's interaction vocabulary. This section is as important as the allowed patterns — it prevents the AI from defaulting to common patterns that don't fit this product. Each item should include a reason.

quality signals:
- Items are specific patterns, not vague prohibitions ("no modals for inline actions" not "no unnecessary complexity")
- Reasons are given for each exclusion
- Alternatives are suggested where the exclusion might surprise a developer
-->

## Accessibility

<!-- mentor
Requirements and guidelines for accessibility. Be specific about what level of compliance is required (WCAG 2.1 AA?) and which specific requirements apply to this product's interaction patterns. Vague accessibility sections ("we care about a11y") produce zero actionable behavior.

quality signals:
- Compliance level is stated (WCAG 2.1 A / AA / AAA)
- Keyboard navigation requirements are described
- Screen reader behavior is addressed for the product's primary interactions
- Color contrast requirements reference the token system
- Focus management rules are stated for any custom interactive elements
-->

## Responsiveness

<!-- mentor
How the product behaves across viewport sizes. For desktop-first products, this section should state the minimum supported width and describe any degradation below it. For responsive products, document the breakpoints and what changes at each one.

quality signals:
- Primary platform and minimum supported viewport are stated
- Breakpoints are defined with pixel values if the product is responsive
- What changes at each breakpoint is described (layout changes, component changes, feature removal)
- Mobile behavior is explicitly addressed even for desktop-first products
-->
