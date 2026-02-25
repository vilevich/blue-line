# Designer Guide: Building with Blue Line

This guide walks through the full workflow for designers building OPSWAT products with the Blue Line design system. Whether you are starting a new product from scratch or picking up an existing one, this document covers everything you need.

---

## 1. Starting a New Product

Every OPSWAT product UI is a single HTML file that loads Blue Line from GitHub Pages. Follow these steps to get started:

### Step 1 -- Create your HTML file

Create a new `index.html` in your product repo. This single file will contain all pages, navigation, and JavaScript.

### Step 2 -- Link the design system

Add these four tags to the `<head>` section, in this exact order:

```html
<!-- Google Font (body typeface) -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

<!-- Blue Line Design System -->
<link rel="stylesheet" href="https://vilevich.github.io/blue-line/tokens.css">
<link rel="stylesheet" href="https://vilevich.github.io/blue-line/components.css">
<link rel="stylesheet" href="https://vilevich.github.io/blue-line/icons.css">
```

**Why this order matters:**
- `tokens.css` defines all CSS custom properties (colors, spacing, typography, radii, shadows) plus `@font-face` for the Simplon Norm brand font and dark mode variable overrides.
- `components.css` references those token variables for every UI component.
- `icons.css` provides icon classes using inline SVG `mask-image`.

### Step 3 -- Add a product-specific style block

After the Blue Line links, add an inline `<style>` block for product-specific CSS:

```html
<style>
  /* Product-specific styles go here */
</style>
```

This block is where all styles unique to your product live. Always reference Blue Line tokens in your custom styles instead of hardcoding values.

### Step 4 -- Browse the docs

Open the Blue Line docs site to explore all available components, tokens, and patterns:

**https://vilevich.github.io/blue-line/**

The docs page is an interactive reference that shows every component in both light and dark mode.

---

## 2. Using AI to Build

Claude Code is the recommended tool for building OPSWAT product UIs with Blue Line. Here is an expanded prompt you can use when starting a new product:

```
I'm starting [Product Name], an OPSWAT product that uses the Blue Line design system.
OPSWAT is a critical infrastructure cybersecurity company.

Blue Line repo: https://github.com/vilevich/blue-line
Blue Line docs: https://vilevich.github.io/blue-line/

Read the Blue Line repo's CLAUDE.md and CONTRIBUTING.md for conventions, then read
tokens.css, components.css, and icons.css so you know every available component and token.

Here are the Figma designs: [paste Figma links here]

Build the UI as a single index.html file using Blue Line CSS classes. Load the DS
from GitHub Pages:
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://vilevich.github.io/blue-line/tokens.css">
  <link rel="stylesheet" href="https://vilevich.github.io/blue-line/components.css">
  <link rel="stylesheet" href="https://vilevich.github.io/blue-line/icons.css">

Rules:
- Use existing Blue Line classes wherever possible before writing custom CSS.
- Product-specific styles go in an inline <style> block after the DS links.
- Always use CSS custom properties (var(--token-name)), never hardcoded colors or spacing.
- Support dark mode: set data-theme="dark" on <html> and use semantic tokens that auto-adapt.
- If a component doesn't exist in Blue Line, build it product-specific first.
- Icons use 16x16 viewBox SVGs. Use the .icon class system from icons.css when possible.
- Follow the two-type table system: small (.data-table) vs big (.data-table.table-fixed).
- Test in both light and dark mode.
```

### Providing Figma links

When pasting Figma links, include links to:
- The full page/flow designs (each major screen)
- Any component specs that differ from Blue Line defaults
- The specific frames or sections you want built first

Claude Code can read Figma designs through its Figma integration. Provide the design URL and it will extract layout, spacing, colors, and component structure directly.

---

## 3. When a Component Doesn't Exist

If you need a UI element that Blue Line does not provide:

1. **Build it product-specific first.** Add the styles to your inline `<style>` block inside the product HTML file.
2. **Use DS tokens.** Reference `var(--primary)`, `var(--border-200)`, `var(--space-sm)`, etc. instead of hardcoding values.
3. **Follow naming conventions.** Prefix with your product name to avoid collisions (e.g., `.mdss-workflow-node`).
4. **Include dark mode.** Add a `[data-theme="dark"]` override immediately after the light-mode rule.
5. **Promote to Blue Line later.** If the component is useful across products, open a PR to move it from your product's inline styles into `components.css`. See the [Contributing guide](../../CONTRIBUTING.md) for the full promotion workflow.

---

## 4. Naming Conventions

Blue Line uses consistent class prefixes for each component family. When building product-specific components, follow the same patterns.

| Prefix | Component | Examples |
|--------|-----------|----------|
| `.btn-*` | Buttons | `.btn-primary`, `.btn-outline`, `.btn-text`, `.btn-brand`, `.btn-icon`, `.btn-danger`, `.btn-save`, `.btn-discard`, `.btn-loading` |
| `.tag-*` | Status tags (filled bg) | `.tag-neutral`, `.tag-inactive`, `.tag-secure`, `.tag-success`, `.tag-accent`, `.tag-guide`, `.tag-alert`, `.tag-warn`, `.tag-caution`, `.tag-danger`, `.tag-info`, `.tag-warning` |
| `.tag-keyword` | Keyword tags (bordered) | `.tag-keyword` |
| `.chip-*` | Chips (24px, 2px radius) | `.chip-default`, `.chip-disabled`, `.chip-inactive`, `.chip-secure`, `.chip-success`, `.chip-accent`, `.chip-guide`, `.chip-alert`, `.chip-warn`, `.chip-caution`, `.chip-selected` |
| `.badge-dot-*` | Dot badges (8px circles) | `.badge-dot-neutral`, `.badge-dot-inactive`, `.badge-dot-secure`, `.badge-dot-success`, `.badge-dot-accent`, `.badge-dot-guide`, `.badge-dot-alert`, `.badge-dot-warn`, `.badge-dot-caution` |
| `.badge-number-*` | Number badges (count) | `.badge-number-neutral`, `.badge-number-inactive`, `.badge-number-secure`, `.badge-number-success`, `.badge-number-accent`, `.badge-number-guide`, `.badge-number-alert`, `.badge-number-warn`, `.badge-number-caution` |
| `.verdict-*` | Verdicts (dot + text) | `.verdict-neutral`, `.verdict-not-active`, `.verdict-detected`, `.verdict-progress`, `.verdict-completed`, `.verdict-failed`, `.verdict-secure`, `.verdict-warn`, `.verdict-accent`, `.verdict-guide`, `.verdict-caution` |
| `.severity-*` | Severity levels | `.severity-critical`, `.severity-high`, `.severity-medium`, `.severity-low`, `.severity-none` |
| `.af-*` | Advanced filters panel | `.af-header`, `.af-close`, `.af-body`, `.af-section`, `.af-section-title`, `.af-field`, `.af-field-label`, `.af-chips`, `.af-chip`, `.af-footer` |
| `.form-*` | Form layout | `.form-row`, `.form-row--top`, `.form-label`, `.form-value`, `.form-value--inline` |
| `.input-*` | Input fields | `.input-field`, `.input-clear`, `.input-eye`, `.input-with-suffix`, `.input-suffix` |
| `.select-field` | Select dropdowns | `.select-field` |
| `.toggle-*` | Toggle switches | `.toggle-row`, `.toggle-switch`, `.toggle-thumb`, `.toggle-label` |
| `.radio-*` | Radio buttons | `.radio-group`, `.radio-option`, `.radio-circle`, `.radio-label`, `.radio-inline` |
| `.cb` | Checkbox | `.cb`, `.cb.checked`, `.cb.semi`, `.cb.disabled` |
| `.modal-*` | Modal dialogs | `.modal-overlay`, `.modal`, `.modal-header`, `.modal-close`, `.modal-body`, `.modal-footer`, `.modal-field`, `.modal-divider` |
| `.slide-panel-*` | Slide-out panels | `.slide-panel-overlay`, `.slide-panel`, `.slide-panel-header`, `.slide-panel-body`, `.slide-panel-footer` |
| `.panel-*` | Panel internals | `.panel-field`, `.panel-field-label`, `.panel-banner` |
| `.toast` / `.top-toast` | Toast notifications | `.toast`, `.toast.show`, `.top-toast`, `.top-toast.visible`, `.top-toast.type-*` |
| `.audit-*` | Card and table patterns | `.audit-card`, `.audit-card-header`, `.audit-card-title`, `.audit-card-actions`, `.audit-search`, `.audit-pagination` |
| `.card-*` | Card components | `.card-header`, `.card-body`, `.card-header-with-desc`, `.card-header-actions`, `.card-filter-bar`, `.card-filter-chip`, `.card-bulk-actions` |
| `.data-table` | Tables | `.data-table`, `.data-table.table-fixed`, `.table-scroll`, `.col-pinned`, `.col-cb`, `.col-action` |
| `.level-badge` | Level badges | `.level-badge.warning`, `.level-badge.error`, `.level-badge.info`, `.level-badge.success` |
| `.category-badge` | Category badges | `.category-badge` |
| `.avd-*` | Avatar dropdown | `.avd-user`, `.avd-item`, `.avd-divider`, `.avd-submenu`, `.avd-back` |
| `.notif-*` | Notification dropdown | `.notif-dropdown`, `.notif-header`, `.notif-list`, `.notif-msg`, `.notif-empty` |
| `.col-dropdown-*` | Column dropdown | `.col-dropdown`, `.col-dropdown-item`, `.col-dropdown-section`, `.col-dropdown-divider` |
| `.row-action-*` | Row action menus | `.row-action-btn`, `.row-action-menu`, `.row-action-menu-item` |
| `.inv-provider-*` | Provider icons | `.inv-provider-icon.aws`, `.inv-provider-icon.box`, `.inv-provider-icon.azure`, etc. |
| `.col-vis-*` | Column visibility | `.col-vis-item`, `.col-vis-drag`, `.col-vis-label`, `.col-vis-section-title` |
| `.icon-*` | Icons | `.icon-chevron-down`, `.icon-chevron-up`, `.icon-sm`, `.icon-md`, `.icon-lg`, `.icon-xl` |

**Rule:** Never use bare generic names like `.active`, `.open`, or `.selected` as standalone classes. Always scope them to a component (e.g., `.tab.active`, `.modal-overlay.open`, `.af-chip.selected`).

---

## 5. Design Tokens Quick Reference

These are the most commonly used tokens. For the full list, see `tokens.css`.

### Colors

| Token | Purpose | Light Value |
|-------|---------|-------------|
| `--primary` | Primary actions, links, focus rings | `#1d6bfc` (Blue 700) |
| `--primary-hover` | Primary button hover | `#1854c3` (Blue 800) |
| `--danger` | Destructive actions | `#d40031` (Red 800) |
| `--text-strong` | Headings, primary text | `#0c121d` (Neutral 1200) |
| `--text-subtle` | Secondary text, descriptions | `#344565` (Neutral 800) |
| `--text-muted` | Placeholders, disabled text | `#607497` (Neutral 600) |
| `--text-muted-accessible` | Placeholders (WCAG-compliant) | `#566479` |
| `--text-on-fill` | Text on filled backgrounds | `#ffffff` |
| `--text-link` | Hyperlinks | `#1854c3` (Blue 800) |
| `--surface-bg` | Page background | `#f8f9f9` (Neutral 100) |
| `--surface-card` | Card/panel backgrounds | `#ffffff` |
| `--surface-hover` | Hover state backgrounds | `#f8f9f9` (Neutral 100) |
| `--border-200` | Standard borders | `#dee0e4` (Neutral 300) |
| `--border-card` | Card borders | `#ebecee` (Neutral 200) |
| `--feedback-success` | Success indicators | `#34a853` |
| `--feedback-warning` | Warning indicators | `#e6a817` |
| `--feedback-error` | Error indicators | `#ea4335` |

### Spacing (Base 4)

| Token | Value | Use |
|-------|-------|-----|
| `--space-tiny` | 2px | Hairline gaps |
| `--space-tight` | 4px | Tight internal gaps |
| `--space-xs` | 8px | Small component gaps |
| `--space-sm` | 12px | Form row gaps, standard gutter |
| `--space-std` | 20px | Card body padding, section spacing |
| `--space-double` | 40px | Large section separation |
| `--space-gutter` | 12px | Grid gutter |
| `--space-gutter-compact` | 8px | Compact grid gutter |

### Typography

| Token | Value | Use |
|-------|-------|-----|
| `--font` | Roboto | Body font (all UI text) |
| `--font-brand` | Simplon Norm | Brand font (sidebar footer, branding only) |
| `--size-h1` | 32px | Page titles |
| `--size-h2` | 24px | Section headings |
| `--size-h3` | 20px | Sub-headings |
| `--size-h4` | 16px | Card headings |
| `--size-label` | 14px | Labels, buttons, body text |
| `--size-note` | 12px | Small text, badges |
| `--size-inset` | 10px | Smallest text |

### Other

| Token | Value | Use |
|-------|-------|-----|
| `--radius` | 4px | Buttons, cards, inputs |
| `--radius-graphics` | 8px | Images, illustrations |
| `--radius-modals` | 12px | Modal dialogs |
| `--radius-circular` | 9999px | Circles, pills |
| `--shadow-card` | see tokens.css | Card elevation |
| `--shadow-dropdown` | see tokens.css | Dropdown menus |
| `--shadow-modal` | see tokens.css | Modal overlays |
| `--shadow-panel` | see tokens.css | Slide panels |
| `--shadow-toast` | see tokens.css | Toast notifications |
| `--focus-ring` | `0 0 0 3px rgba(29,107,252,0.15)` | Focus indicator |

---

## 6. Dark Mode Checklist

Before submitting any component or page, verify these dark mode requirements:

- [ ] **All colors use CSS variables.** No hardcoded hex values (`#fff`, `#000`, etc.) for any color, background, or border. Use `var(--text-strong)`, `var(--surface-card)`, `var(--border-200)`, etc.
- [ ] **Colocated dark mode overrides.** Every `[data-theme="dark"]` rule is placed immediately after its corresponding light-mode rule in the CSS, not in a separate section or file.
- [ ] **Opaque backgrounds on sticky elements.** Pinned table columns (`.col-pinned`, `.col-cb`, `.col-action`), sticky headers, and any positioned element must use opaque backgrounds (e.g., `var(--surface-card)`) so content does not show through.
- [ ] **Semantic tokens auto-adapt.** Tags, badges, chips, and verdicts use `--ds-*` tokens that automatically switch between light and dark values. If you are using these components, the dark mode should work without additional overrides.
- [ ] **Test both themes.** Toggle between light and dark mode and verify every element is legible, has sufficient contrast, and looks intentional in both themes.
- [ ] **Overlay backgrounds update.** Modals use `--overlay-heavy`, panels use `--overlay-medium`. These tokens already adapt to dark mode.
- [ ] **Shadows deepen in dark mode.** Blue Line tokens automatically provide heavier shadows in dark mode. Do not hardcode `box-shadow` values.

---

## 7. Handoff Process

When your design is ready to become code:

### Step 1 -- Finalize in Figma

Ensure all designs are complete, with both light and dark variants specified. Use Blue Line Figma components wherever they exist.

### Step 2 -- Export SVGs

All icons must be exported as SVGs with a **16x16 viewBox**. This is the standard across all Blue Line and OPSWAT product icons. The `icons.css` system uses `mask-image` with `currentColor`, so icon SVGs should use `fill="currentColor"` or `fill="black"` (which gets masked).

### Step 3 -- Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

### Step 4 -- Implement CSS

- If building a Blue Line component, add styles to `components.css` following existing patterns.
- If building product-specific UI, add styles to the inline `<style>` block in your product's `index.html`.
- Always include `[data-theme="dark"]` overrides colocated with each component.

### Step 5 -- Add to the docs or product

- For Blue Line components: add an interactive example to `index.html` (the docs page).
- For product features: add the HTML to the appropriate page section in your product's `index.html`.

### Step 6 -- Open a PR with screenshots

Include screenshots in your Pull Request showing the component or page in **both light and dark mode**. The reviewer will use these to verify visual correctness. See the [Maintainer Guide](./maintainer-guide.md) for the full review checklist.
