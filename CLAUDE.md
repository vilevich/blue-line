# OPSWAT UI Monorepo

pnpm monorepo with React + Tailwind CSS v4. Node >= 20, pnpm >= 9.

## Packages

- **`packages/blue-line`** — Design system: React components + CSS tokens. No build step — exports source directly via `exports` in package.json.
- **`apps/mdss`** — MetaDefender Storage Security product UI (Vite + React).
- **`apps/bl-docs`** — Blue Line documentation site (Vite + React). Deploys to GitHub Pages via `.github/workflows/deploy-docs.yml`.

## Design System (Blue Line) Rules

### Typography
- H1: 28px/32px, H2: 24px/27px, H3: 20px/23px
- Body: 14px/16px, Note: 12px/14px
- Weights: 400 (regular) or 500 (medium) — never 600/bold
- No decimal font sizes — round Figma values (e.g. 15.96px → 16px)

### Spacing Scale
- `--space-tiny`: 2px, `--space-tight`: 4px, `--space-xs`: 8px
- `--space-sm`: 12px, `--space-std`: 20px, `--space-md`: 24px
- `--space-lg`: 32px, `--space-xl`: 40px, `--space-2xl`: 48px

### Components
- All buttons and inputs: 32px height, explicit `height: 32px` with `padding: 0 Xpx` and flexbox centering
- Button naming: `.btn-*` prefix (btn-primary, btn-outline, btn-text, btn-menu, btn-icon, btn-brand, btn-danger)
- All gaps between buttons: 8px. Internal button gaps (icon-text): 8px
- Icons are always 16x16, never scale
- Tags/ScanStatus use `p-2` (8px padding all around)

### Dark Mode
- Uses `[data-theme="dark"]` attribute on `<html>`, not Tailwind `dark:` media query
- CSS variables in `base.css` swap automatically via `[data-theme="dark"]` selector
- Tailwind `dark:` prefix works for component-level overrides

### Token Pitfalls
- `--text-link` = `--blue-800` (#1854c3) — use `--blue-900` for hover
- No `font-size: 13px` anywhere — if Figma outputs 13px, use 12px or 14px

## BL Docs (`apps/bl-docs`)

- Single-page React app with all component sections
- Uses `@opswat/blue-line` workspace dependency for live component previews
- PrismJS for code syntax highlighting
- Scroll-spy via IntersectionObserver for sidebar navigation
- Deploys to `vilevich.github.io/blue-line/` with `base: '/blue-line/'` in vite.config.ts

## Figma Reference
- **Blue Line 2.2.3:** https://www.figma.com/design/TkdLHVmqTZ9eAXbIBuuDul/Blue-Line-2.2.3
