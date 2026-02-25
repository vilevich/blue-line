# Blue Line Design System

Blue Line is OPSWAT's shared design system. It provides CSS tokens, components, and icons that any OPSWAT product can consume via GitHub Pages.

**Live docs:** https://vilevich.github.io/blue-line/
**CSS endpoint:** https://vilevich.github.io/blue-line/tokens.css (and components.css, icons.css)

## File Structure

```
tokens.css      — CSS custom properties, @font-face, dark mode overrides, body base styles
components.css  — All reusable component styles with colocated dark mode overrides
icons.css       — SVG icon classes (inline background-image)
tokens.json     — Structured design tokens (Style Dictionary / Figma Tokens format)
index.html      — Interactive documentation page (self-contained)
fonts/          — Simplon Norm woff2 (400, 500, 700)
```

## Architecture: tokens → components → icons

1. **tokens.css** loads first — defines all CSS custom properties (colors, spacing, typography, radii, shadows) plus `@font-face` declarations and dark mode overrides via `[data-theme="dark"]`
2. **components.css** loads second — references token variables for all UI components. Dark mode overrides are colocated with each component (not in a separate file)
3. **icons.css** loads last — icon classes using inline SVG `background-image`

Products load all three via `<link>` tags. Product-specific styles go in an inline `<style>` block after the DS links.

## How Products Consume Blue Line

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://vilevich.github.io/blue-line/tokens.css">
<link rel="stylesheet" href="https://vilevich.github.io/blue-line/components.css">
<link rel="stylesheet" href="https://vilevich.github.io/blue-line/icons.css">
```

## Key Conventions

### Two Table Types
- **Small tables** (`.data-table`): Auto layout, ≤5 columns, no horizontal scroll. Columns size naturally.
- **Big tables** (`.data-table.table-fixed`): Fixed layout, 6+ columns, horizontal scroll via `.table-scroll` wrapper. Supports pinned columns (`.col-pinned`, `.col-action`). Set `min-width` on the `<table>` to prevent column crushing.

### Table Column Pinning
- `.col-pinned` — sticky left (checkbox at `left: 0`, name at `left: 48px`)
- `.col-action` — sticky right (56px, action menu ⋮)
- Pinned columns need opaque backgrounds (`--surface-card`) so content doesn't show through

### Card Headers (Two Tiers)
- `.card-header` — simple cards (settings panels, job sections). 56px height, title + optional actions.
- `.audit-card-header` — data-table cards with bulk actions, column visibility, search, filters.

### Tag Variants (9 Semantic Colors)
`.tag-neutral`, `.tag-inactive`, `.tag-secure`, `.tag-success`, `.tag-accent`, `.tag-guide`, `.tag-alert`, `.tag-warn`, `.tag-caution` — all auto-adapt to dark mode via `--ds-*` tokens.

### Dark Mode
- Activated by `data-theme="dark"` on `<html>`
- All semantic tokens override in tokens.css
- Component-level dark overrides are colocated in components.css (not a separate file)
- Always test both themes when adding/changing components

### Padding & Spacing
- Card body padding: `var(--space-std)` (20px)
- Table first/last column outer padding: 20px
- Form row gaps: `var(--space-sm)` (12px)
- Standard gutter: `var(--space-gutter)` (12px)

### Typography
- Body font: `var(--font)` → Roboto
- Brand font: `var(--font-brand)` → Simplon Norm (sidebar footer, branding only)
- Buttons, labels, inputs: 14px, weight 500
- Body text: 14px, weight 400

## Adding New Components

1. Add styles to `components.css` following existing patterns
2. Include dark mode override colocated with the component (use `[data-theme="dark"]` selector)
3. Use existing token variables — never hardcode colors or spacing
4. Add an example to `index.html` docs page
5. Test in both light and dark mode

## Branch Workflow

- `main` = stable, deployed to GitHub Pages
- `feature/component-name` = work in progress
- PRs require reviewer approval before merge to main
