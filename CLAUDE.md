# OPSWAT UI Monorepo

pnpm monorepo with React + Tailwind CSS v4. Node >= 20, pnpm >= 9.

## Packages

- **`packages/blue-line`** — Design system: React components + CSS tokens. No build step — exports source directly via `exports` in package.json.
- **`apps/mdss`** — MetaDefender Storage Security product UI (Vite + React).
- **`apps/bl-docs`** — Blue Line documentation site (Vite + React). Deploys to GitHub Pages via `.github/workflows/deploy-docs.yml`.

## Design System (Blue Line) Rules

### Typography
- H1: 28px/32px, H2: 24px/27px (round from 27.4), H3: 20px/23px (round from 22.8)
- Body: 14px/16px, Note: 12px/14px (round from 13.7)
- Weights: 400 (regular) or 500 (medium) — never 600/bold
- No decimal font sizes — round Figma values (e.g. 15.96px → 16px)
- No `font-size: 13px` anywhere — if Figma outputs 13px, use 12px or 14px

### Spacing Scale
- `--space-tiny`: 2px, `--space-tight`: 4px, `--space-xs`: 8px
- `--space-sm`: 12px, `--space-std`: 20px, `--space-md`: 24px
- `--space-lg`: 32px, `--space-xl`: 40px, `--space-2xl`: 48px

### Components
- All buttons and inputs: 32px height, explicit `height: 32px` with `padding: 0 Xpx` and flexbox centering. Never use vertical padding to derive height.
- Button naming: `.btn-*` prefix (btn-primary, btn-outline, btn-text, btn-menu, btn-icon, btn-brand, btn-danger)
- All gaps between buttons: 8px. Internal button gaps (icon-text): 8px
- Icons are always 16x16, never scale
- Tags/ScanStatus use `p-2` (8px padding all around)
- Tables: `.data-table` (simple/compact) vs `.data-table.table-fixed` (big/pinnable)
- Stat cards: `.stat-card-row` > `.stat-card` with `--threats`/`--dlp`/`--sanitized` modifiers
- Toast: `.toaster` with `.toaster-info`/`.toaster-success`/`.toaster-error` variants

### Dark Mode
- Uses `[data-theme="dark"]` attribute on `<html>`, not Tailwind `dark:` media query
- CSS variables in `base.css` swap automatically via `[data-theme="dark"]` selector
- Tailwind `dark:` prefix works for component-level overrides
- Dark mode hover for btn-text: `--blue-400`; for btn-menu: border `--neutral-400`

### Token Pitfalls
- `--text-link` = `--blue-800` (#1854c3) — don't use `--blue-800` for hover, use `--blue-900` (#123d8b)

### Big Table Column Pinning
- **Always fixed (structural):** checkbox, action, expand columns — `position: sticky` via CSS
- **First content column always pinned** by default, cannot be unpinned
- **User can pin up to 2 additional columns** — tracked in `rptPinnedCols` array
- **No shadows ever** — only `border-right: 1px solid var(--border-200)` on last pinned column
- **CSS requires:** `display: block` + `overflow: visible` on the table for horizontal sticky in Chrome
- **Dynamic left:** `left = 48px (checkbox width) + sum of preceding pinned column widths`

## MDSS (`apps/mdss`)

MetaDefender Storage Security — OPSWAT product for securing cloud storage.

### Pages
| Page | Description |
|------|-------------|
| Settings | 8 tabs: Profile, Scan Pools, Security, SMTP, Notifications, Licensing, SSO, Data |
| Audit | Audit log with filters, search, expandable rows |
| Users | User management with roles and permissions |
| Jobs | Active/upcoming/past scan jobs with detail views |
| Workflows | Workflow list + detail flow diagram with config panels |
| Inventory | Accounts, account detail (units/jobs tabs), settings panel |

### Key Patterns
- Left sidebar with collapsible sections, page routing via JS
- Forms: `.form-row`, `.input-field`, `.select-field`, `.toggle-switch`
- Overlays: Modals (`.modal-overlay`) and slide panels (`.slide-panel`)
- Page title row: if 3 buttons and one is Refresh, make Refresh an icon-only button (`.btn-icon`)

## BL Docs (`apps/bl-docs`)

- Single-page React app with all component sections
- Uses `@opswat/blue-line` workspace dependency for live component previews
- PrismJS for code syntax highlighting
- Scroll-spy via IntersectionObserver for sidebar navigation
- Deploys to `vilevich.github.io/blue-line/` with `base: '/blue-line/'` in vite.config.ts

## Figma Reference
- **Blue Line 2.2.3:** https://www.figma.com/design/TkdLHVmqTZ9eAXbIBuuDul/Blue-Line-2.2.3

## OPSWAT Storybook Reference
- URL: `http://ds-react-storybook-opswat-ui.s3-website-us-west-2.amazonaws.com/?path=/`
- React + Tailwind CSS v4, pure utility classes
