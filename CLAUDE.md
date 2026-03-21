# OPSWAT UI Monorepo

pnpm monorepo with React + Tailwind CSS v4. Node >= 20, pnpm >= 9.

## Packages

- **`packages/blue-line`** — Design system: React components + CSS tokens. No build step — exports source directly via `exports` in package.json.
- **`apps/mdss`** — MetaDefender Storage Security product UI (Vite + React).
- **`apps/bl-docs`** — Blue Line documentation site (Vite + React). Deploys to GitHub Pages.
- **`apps/_template`** — Starter template for new product apps. Copy and rename.

## Creating a New App

1. Copy `apps/_template` to `apps/your-app`
2. In `package.json`: replace `APP_NAME` with your app name (e.g. `@opswat/your-app`)
3. In `index.html`: replace `APP_NAME` in `<title>`
4. In `App.tsx`: replace placeholder content
5. Run `pnpm install` from monorepo root
6. Run `pnpm --filter @opswat/your-app dev`

### CSS Import Order (critical — in `app.css`)
```css
@import "tailwindcss";
@source "../../../packages/blue-line/src";
@import "@opswat/blue-line/theme.css";   /* 1. Color tokens, font tokens */
@import "@opswat/blue-line/base.css";    /* 2. Reset, semantic variables, dark mode vars */
@import "@opswat/blue-line/components.css"; /* 3. Component styles */
/* Product-specific styles go here */
```

## Blue Line Component Reference

### Layout
| Component | Key Props | Notes |
|-----------|-----------|-------|
| PageHeader | `title`, `breadcrumb?`, `actions?` | H2 title + breadcrumb + action buttons row |
| Breadcrumb | `items: {label, onChange?}[]` | Chevron-separated navigation |
| Card | `children` | Border + shadow container |
| CardHeader | `children` | 56px header with bottom border |
| CardTitle | `title`, `count?`, `countAccent?`, `actions?` | Title with optional count badge |
| FormRow | `label`, `help?`, `alignTop?`, `children` | 266px label column + flexible value |
| SectionTitle | `title`, `description?` | H3 section heading |
| Tabs | `tabs: {id, label}[]`, `activeTab?`, `onTabChange?` | Tab bar; use with TabPanel children |
| TabPanel | `id`, `activeTab`, `children` | Shows content when `id === activeTab` |

### Inputs
| Component | Key Props | Notes |
|-----------|-----------|-------|
| Button | `variant?` (primary/outline/text/menu/icon/brand/danger/save/discard), `icon?`, `loading?`, `danger?` | 32px height always |
| InputField | `type?` (text/email/password/number/date/search), `status?` (default/error/success), `clearable?` | 32px height, ref-forwarded |
| InputWithSuffix | `suffix` (required), `maxWidth?` | Input with fixed right text |
| SelectField | `status?`, `children` (option elements) | 32px height, ref-forwarded |
| TextArea | `status?` | Multi-line, ref-forwarded |
| Checkbox | `checked?`, `indeterminate?`, `label?`, `disabled?` | Three states |
| RadioGroup | `value?`, `onChange?`, `inline?` | Wrap RadioOption children |
| RadioOption | `value`, `label?`, `disabled?` | Must be inside RadioGroup |
| Toggle | `checked?`, `onChange?`, `disabled?`, `skeleton?` | Switch-style button |
| ToggleRow | `label?`, `children?` + all Toggle props | Toggle with label layout |
| FileUpload | `accept?`, `fileName?`, `placeholder?` | Upload button wrapper |

### Data Display
| Component | Key Props | Notes |
|-----------|-----------|-------|
| Tag | `variant?` (neutral/inactive/secure/success/accent/guide/alert/warn/caution), `keyword?`, `keywordColor?` | Status: filled bg. Keyword: bordered. `p-2` padding |
| TagGroup | `maxVisible?` | Flex row with +N overflow badge |
| Badge (BadgeDot) | `color?` (9 semantic colors), `skeleton?` | 8px colored dot |
| Badge (BadgeNumber) | `value`, `color?`, `skeleton?` | Numeric badge, 16px height |
| Chip | `color?` (10 colors), `removable?`, `onRemove?`, `icon?`, `skeleton?` | Inline chip with optional remove |
| ScanStatus | `variant` (allowed/blocked/complete/failed/skipped/pending), `children` (string) | Colored status label, `p-2` |
| Verdict | `variant` (9 semantic), `children` (string) | Dot + text verdict |
| Severity | `level` (critical/high/medium/low/none), `label?` | Signal icon + label |
| Icon | `name?`, `multiColor?`, `size?` (sm/md/lg/xl) | 16x16 default. CSS mask-based |
| Skeleton | `variant?` (text/block/button), `width?`, `height?` | Shimmer placeholder |
| StatCard | `label`, `value`, `trend?`, `trendText?`, `legend?`, `headerAction?` | Metric card |
| StatCardRow | `columns?` (default 3) | Grid for StatCards |
| DataTable | `columns: {key, header, render?}[]`, `data: T[]`, `onRowClick?`, `emptyMessage?` | Simple table |
| Pagination | `page`, `totalPages`, `pageSize`, `onPageChange`, `pageSizeOptions?`, `onPageSizeChange?` | Page navigation |

### Feedback
| Component | Key Props | Notes |
|-----------|-----------|-------|
| Toaster | `variant?` (info/success/error), `visible`, `title`, `description?`, `onClose?` | Top-right notification |
| Toast | `visible`, `children` | Simple bottom-right toast |
| Banner | `variant?` (info/alert/neutral/warn), `icon?`, `title?`, `description?`, `actions?` | Full-width banner |
| ValidationMessage | `type` (error/success), `children` (string) | Below-field message |
| Tooltip | `content`, `position?` (top/bottom/left/right), `maxWidth?` | Hover tooltip |

### Overlays
| Component | Key Props | Notes |
|-----------|-----------|-------|
| Modal | `open`, `onClose`, `title`, `footer?`, `width?` (default 480) | Centered dialog, ESC to close |
| SlidePanel | `open`, `onClose`, `title`, `footer?`, `width?` (default 400) | Right slide-out panel, ESC to close |

## Design System Rules

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

### Dark Mode
- Uses `[data-theme="dark"]` attribute on `<html>`, not Tailwind `dark:` media query
- CSS variables in `base.css` swap automatically via `[data-theme="dark"]` selector
- Tailwind `dark:` prefix works for component-level overrides
- Dark mode hover for btn-text: `--blue-400`; for btn-menu: border `--neutral-400`
- Always test both themes

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
- Forms: FormRow + InputField/SelectField/Toggle
- Overlays: Modal and SlidePanel
- Page title row: if 3 buttons and one is Refresh, make Refresh icon-only (btn-icon)

## BL Docs (`apps/bl-docs`)

- Deploys to `vilevich.github.io/blue-line/` with `base: '/blue-line/'`
- PrismJS for code highlighting, scroll-spy for sidebar

## Figma Reference
- **Blue Line 2.2.3:** https://www.figma.com/design/TkdLHVmqTZ9eAXbIBuuDul/Blue-Line-2.2.3

## OPSWAT Storybook Reference
- URL: `http://ds-react-storybook-opswat-ui.s3-website-us-west-2.amazonaws.com/?path=/`
- React + Tailwind CSS v4, pure utility classes
