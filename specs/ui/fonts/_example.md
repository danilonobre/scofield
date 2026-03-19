<!-- mentor:file
Template for individual custom font spec files. Only create individual font files for custom or self-hosted fonts that require detailed loading configuration. Standard web fonts tracked in _map.md typically do not need individual spec files unless they have complex loading requirements.
priority: low
-->

# [FontName]

<!-- mentor:file
Replace [FontName] with the actual font name. Use this template when a font requires detailed loading configuration — @font-face declarations, WOFF2 paths, or complex fallback chains.
priority: low
-->

**figma_url:**

## Role

<!-- mentor
What is this font used for? Every typographic role in the product should map to exactly one font. Multiple fonts for the same role create visual inconsistency.

quality signals:
- Role is specific (body text, headings, code, display, captions)
- The role maps to a token in _tokens.md (--font-sans, --font-mono, etc.)
-->

## Weights

<!-- mentor
Which font weights are loaded and used. Loading unused weights wastes bandwidth; missing weights cause browsers to synthesize them, resulting in poor rendering.

quality signals:
- Only weights that are actually used in the design are listed
- Weight names match the --font-* tokens in _tokens.md
-->

## Fallbacks

<!-- mentor
The fallback font stack. Fallbacks matter — they determine what users see before the font loads or if it fails to load. The fallback should be visually similar to the primary font.

quality signals:
- At least one system font fallback is listed
- Final fallback is a generic family (serif, sans-serif, monospace)
-->

## Loading strategy

<!-- mentor
How the font is loaded. CDN URL with preconnect? Local WOFF2 with @font-face? Variable font? The loading strategy affects performance and must be implemented exactly as specified.

quality signals:
- Complete loading implementation is described (URL, format, display strategy)
- font-display strategy is specified (swap, block, optional)
- Preconnect or preload hints are noted if required
-->
