<!-- mentor:file
The font inventory. Documents the typefaces in use, their roles, and their sources. The AI uses this file when generating CSS font-face declarations and variable definitions. An incomplete font map leads to fallback fonts being used silently in production. Keep in sync with Figma using /fonts-sync.
priority: low

extensions:
- fonts-sync: Extracts font definitions from the Figma file and updates this map automatically.
-->

# Font Map

<!-- mentor
Document every font used in the product with its role and source. If fonts are loaded from a CDN, the URL must be present — the AI needs it to generate the correct import statement. If fonts are self-hosted, the file path must be present.

quality signals:
- Every font used in _tokens.md --font-* variables has an entry here
- Role is specific (not just "UI font" — is it body text? headings? code? display?)
- Source includes the full CDN URL or local file path, not just "Google Fonts"
- Loaded weights are listed — loading all weights wastes bandwidth
-->

**Strategy:**

| Font | Role | Source |
|------|------|--------|
| | | |
