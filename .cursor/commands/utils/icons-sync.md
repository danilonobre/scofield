# icons-sync

Read the Figma file linked in the relevant spec file and sync the corresponding spec artifacts.

## tokens-sync
- Read the Figma file URL from `spec/ui/_tokens.md`.
- Extract all design tokens: colors, typography, spacing, elevation, border-radius, z-index, shadows, animation.
- Update `spec/ui/_tokens.md` to reflect the current Figma values.
- Do not modify any other spec file.
- Report all changes made and stop for confirmation.

## icons-sync
- Read the Figma page or section URL from `spec/ui/icons/_map.md`.
- Extract the icon inventory from Figma.
- Update `spec/ui/icons/_map.md` to reflect the current icon set.
- For any custom icon file in `spec/ui/icons/`, update if the corresponding node has changed.
- Report all changes made and stop for confirmation.

## fonts-sync
- Read the Figma file URL from `spec/ui/fonts/_map.md`.
- Extract font definitions from Figma.
- Update `spec/ui/fonts/_map.md` to reflect the current fonts.
- Report all changes made and stop for confirmation.

## components-sync
- For each component file in `spec/ui/components/` that has a `figma_url:` field:
  - Read the Figma node at that URL.
  - Update the component spec to reflect the current Figma design.
- Do not modify `_map.md` unless a component was added or removed.
- Report all changes made and stop for confirmation.

## screens-sync
- For each screen file in `spec/ui/screens/` that has a `figma_url:` field:
  - Read the Figma node at that URL.
  - Update the screen spec to reflect the current Figma design.
- Do not modify `_map.md` unless a screen was added or removed.
- Report all changes made and stop for confirmation.

$ARGUMENTS
