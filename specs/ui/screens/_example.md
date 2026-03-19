<!-- mentor:file
Template for individual screen spec files. Copy this file and rename it to [screen-name].md when adding a new screen. Screen specs define the full contract for a single view — layout, components used, states, and interactions. The AI uses these files during implementation to generate correct screen code and wire up interactions correctly.
priority: medium
-->

# [ScreenName]

<!-- mentor:file
Replace [ScreenName] with the actual screen name. This file documents a single screen. Fill every section before implementation — incomplete screen specs lead to layout guesswork and missing states.
priority: medium
-->

**figma_url:**
**route:**

## Purpose

<!-- mentor
What does this screen do? When does the user land here — from what action, what navigation path, what system event? What is the user's intent when they arrive? If you can't answer these questions, the screen may not have a clear purpose.

quality signals:
- Purpose is stated in one sentence
- Entry paths are explicit (how does the user get here?)
- The user's goal on this screen is stated
-->

## Layout

<!-- mentor
Describe the layout structure: what regions exist (header, sidebar, main area, footer), what they contain, and how they relate spatially. For desktop-first products, describe the desktop layout. For responsive products, describe breakpoint behavior.

quality signals:
- All layout regions are named and described
- The primary content area is identified
- Fixed vs scrollable areas are noted
- Layout constraints that affect implementation are explicit (e.g. "sidebar is fixed, board scrolls independently")
-->

## Components used

<!-- mentor
List which components from components/_map.md appear on this screen. This drives the implementation sequence — components must be built before the screens that use them.

quality signals:
- Every component on the screen is listed
- Components are referenced by their exact name from _map.md
- Components that appear conditionally are noted as such
-->

## States

<!-- mentor
Every state the screen can be in: empty, loading, populated, error, partial (some data loaded). Each state should describe what the user sees. Empty and error states are the most commonly forgotten and the most impactful for UX quality.

quality signals:
- Empty state is described — what does the user see when there's no data?
- Loading state is described — skeleton? spinner? immediate?
- Error state is described — what can the user do to recover?
- Populated state is described — what does a typical loaded screen look like?
-->

## Interactions

<!-- mentor
What can the user do on this screen? For each interaction, describe the trigger, the immediate feedback, and the outcome. Interactions that modify data must describe what happens on success and on failure.

quality signals:
- Every interactive element on the screen has a corresponding interaction described
- Success and failure paths are both described for data-modifying actions
- Navigation interactions specify the destination
- Interactions that trigger the AI pipeline are explicitly identified
-->

## Notes

<!-- mentor
Edge cases, responsive behavior, accessibility notes, or implementation constraints that don't fit elsewhere. Only present if there is something actionable to note.

quality signals:
- Notes are specific and actionable
- Accessibility requirements are stated as requirements, not wishes
- Known constraints are documented so future developers don't re-discover them
-->
