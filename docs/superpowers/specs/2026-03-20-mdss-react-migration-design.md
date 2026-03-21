# MDSS React Migration — Design Spec

## Goal
Migrate the MDSS product UI from a monolithic `index.html` (12,413 lines) to React + Tailwind CSS v4 in the `opswat-ui` monorepo, achieving pixel-perfect fidelity with all behaviors, interactions, generated data, and responsive/dark mode support.

## Architecture

**Monorepo structure:** `packages/blue-line/` (design system, 34 components) + `apps/mdss/` (product app)

**Approach: CSS-First, Then Page-by-Page Rewrite**
1. Port all ~1,660 lines of product-specific CSS from `index.html`'s `<style>` block into `apps/mdss/src/app.css`
2. Rewrite each page component one at a time, matching every behavior from the original JS

## Tech Stack
- React 19 + TypeScript + Vite 6
- Tailwind CSS v4 (`@theme` directives, `@custom-variant dark`)
- `@opswat/blue-line` component library (34 components)
- pnpm workspaces

## What Exists (Done)
- App shell: Header, Sidebar, routing (App.tsx)
- All 34 BL components built and exported
- 8 page stubs: Dashboard, Reports, Inventory, Workflows, Jobs, Users, Settings, Audit
- Pages have basic structure but are missing all interactive behaviors, generated data, detail views, modals, slide panels, dirty tracking, column pinning, etc.

---

## Phase 1: Product CSS Port (~1,660 lines → app.css)

Port every product-specific CSS class from index.html lines 11-1668 into `app.css`. Organized by section:

### Layout & Shell (lines 14-111)
- `.app`, `.header`, `.header-left/right`, `.header-logo*`, `.sidebar-toggle`
- `.main`, `.sidebar`, `.sidebar.collapsed`, `.sidebar-nav`, `.nav-item`, `.nav-divider`, `.sidebar-footer`
- `.content`

### Settings (lines 129-313)
- `.settings-card`, `.settings-card.dirty`, `.btn-save`, `.btn-discard`
- `.card-content` (4-col grid)
- `.headers-table*` (key-value table with filter icons)
- `.headers-input-row`, `.btn-add-header`
- `.api-key-status`, `.btn-generate`
- `.btn-export`

### Scan Pools (lines 259-307)
- `.promo-banner`
- `.pool-card`, `.pool-card-header*`, `.pool-drag-handle`, `.pool-card.dragging`, `.pool-card.flip-animate`
- `.pool-instance-count`
- `.pool-table` column widths, `.api-dots`
- `.encryption-status`

### License (lines 324-371)
- `.license-badge`, `.license-badge.green/red`
- `.license-empty-state*`
- `.license-warning-banner`

### Users (lines 433-458)
- `.user-name-cell`, `.user-avatar`
- `.users-empty-state*`

### Jobs (lines 460-523)
- `.jobs-row-with-progress`, `.jobs-progress-fill`
- `.jobs-detections`, `.jobs-elapsed`, `.jobs-files-progress`, `.jobs-files-bar*`
- `.jobs-edit-btn`
- `.job-info-grid`, `.job-info-item/label/value`
- `.job-summary-row`, `.job-summary-stat*`
- `.job-completed-banner`, `.job-stopped-banner`

### Audit (lines 526-541)
- `.audit-expanded-row td`

### Workflows (lines 590-745)
- Full-height layout: `#workflowsPage.active`, `#workflowsListView`, `#workflowDetailView`
- `.wf-rem-tag` variants (keep, copy, move, delete, failed, none)
- `.wf-status`, `.wf-status-dot`
- `.wf-canvas` (dot grid background, draggable)
- `.wf-flow`, `.wf-step`, `.wf-node*`, `.wf-connector`, `.wf-diamond`
- `.wf-rem-stack`, `.wf-rem-col*`, `.wf-action-btn*`
- `.wf-tech-item*`
- `.wf-tag-group*`, `.wf-tag-check*`, `.wf-tag-fields*`, `.wf-show-verdicts`, `.wf-verdicts*`
- `.wf-rem-option*`, `.wf-rem-radio*`, `.wf-rem-content`, `.wf-storage-tags*`, `.wf-folder-check*`
- Dark mode overrides for all workflow classes

### Inventory (lines 747-776)
- `.inv-promo*`
- Dark mode: `.inv-promo-img`

### Account Detail (lines 778-846)
- `.acct-overview-row`, `.acct-overview-stat` with color variants (blue, green, red, yellow)
- `.acct-tab-panel`, `.grp-tab-panel`
- `.acct-donut-row`, `.acct-donut-item`, `.acct-donut-svg*`, `.acct-donut-labels*`
- `.acct-client-id*`, `.acct-copy-btn`
- `.acct-actions-wrap`, `.acct-actions-menu`
- `.acct-settings-link`

### Dashboard (lines 849-1614)
- Filter system: `.btn-menu`, `.filter-btn-wrap`, `.filter-menu*`
- `.dash-card`
- Info bar: `.info-bar*` overrides
- Page header overrides: `.page-header`, `.page-title-row`, `.breadcrumb-item`, `.skeleton-*`, `.btn-text`
- Checkbox override: `.cb`
- Reports pinning: `#reportsTable .rpt-pinned*`, `.col-dropdown-pin-*`
- Table padding overrides, thead compact on scroll
- Job summary: `.dash-job-summary-body`, `.dash-donut-*`
- Stat cards: uses BL
- Security trend: `.dash-trend-*` (legend, period tabs, chart, segments, y-axis, x-labels)
- Remediation actions: `.dash-rem-*` (ring SVGs, percentage, grid)
- File type distribution: `.dash-filetype-*`, `.dash-treemap*`, `.dash-tm-*` colors, `.dash-ftl-*` legend
- Job type tags: `.dash-job-type-tag`, `.dash-jt-*` variants
- `.dash-schedule-cell`
- All dark mode overrides
- Responsive: 1200px, 900px, 600px breakpoints

### Report Detail (lines 970-1086)
- `.rpt-tab-panel`
- Results grid: `.rpt-results*`
- Split layout: `.rpt-detail-split`
- File details KV: `.rpt-kv*`
- Remediations: `.rpt-rem-*`
- Category grid: `.rpt-cat-*`
- Scan stat header: `.rpt-scan-header*`
- Sandbox: `.rpt-sandbox-verdict`, `.rpt-sandbox-indicators*`
- Warning banner: `.rpt-warning-banner*`
- Scan chips: `.rpt-scan-chips/chip`
- Code block: `.rpt-code-block`
- Expand KV: `.rpt-expand-kv`
- MITRE: `.rpt-mitre-detail`
- Sandbox file: `.rpt-sbx-file-layout`, `.rpt-sbx-preview`
- Extended tabs: `.rpt-ext-panel`
- Section title: `.rpt-section-title`

### Sticky Headers & Scroll (lines 1087-1135)
- `.table-scroll thead th`, `.audit-table-scroll thead th` sticky
- Dual-axis sticky for pinned cells
- Constrained scroll containers for multi-table pages
- Job detail flex layout

### Filter Dropdown (lines 1616-1639)
- `.filter-dropdown*`
- Provider icon: `.inv-provider-icon.gcloud`

### Global Responsive (lines 377-431, 1598-1666)
- 1460px: content padding
- 1024px: sidebar collapse
- 768px: sidebar mobile overlay, page header stack, info bar stack, table scroll, full-width inputs
- 480px: tighter spacing, column layout

---

## Phase 2: Shared Infrastructure (React hooks + utilities)

### Data Generators
- `generateAccountsData()` → accounts with providers, units, jobs, donut chart data
- `generateAuditData()` → 50 audit log rows with random timestamps/users/actions
- Dashboard data scoped to `(clientId, periodDays)`
- Reports data with 1,256 total records

### Custom Hooks
- `useDirtyTracking(initialState)` → captures form state, tracks changes, returns `{isDirty, save, discard, captureState}`
- `useFilterDropdown(items, multiSelect?)` → open/close, selected items, apply/clear
- `useColumnPinning(columns, maxUserPins=2)` → pin/unpin, dynamic left offsets, edge border tracking
- `useExpandableRows()` → toggle expand, multi-expand support
- `useDragReorder(items)` → FLIP animation drag & drop for scan pool cards
- `useCompactHeader(scrollRef)` → add/remove `.compact` class on thead when scrolled

### Shared Components (product-level, not BL)
- `FilterMenu` — dropdown with checkbox items, Apply/Clear footer
- `ColumnDropdown` — sort + pin actions per column header
- `RowActionMenu` — three-dot menu with action items
- `DetailBreadcrumb` — multi-level breadcrumb for detail views
- `ProgressBarCell` — inline progress bar for job table rows
- `DonutChart` — SVG donut with center text and legend
- `TreemapChart` — CSS-based treemap for file type distribution
- `TrendChart` — stacked bar chart for security trends
- `RingProgress` — SVG ring with percentage for remediation actions

---

## Phase 3: Page-by-Page Rewrite

### Page Priority Order
1. **Settings** — dirty tracking, scan pool drag/drop, license flow, SMTP test, API key generation, unsaved changes modal
2. **Audit** — expandable rows, advanced filters, date range, export, generated data (50 rows)
3. **Users** — CRUD modal, role management, avatar colors, empty states, bulk actions
4. **Jobs** — 3 tabs + detail view, progress bars, edit job panel, checkbox actions, generated data from accounts
5. **Inventory** — account detail (overview stats, donut charts, units/jobs sub-tabs), group detail, all units with filter dropdowns, settings panel, generated data
6. **Workflows** — list + detail with flow diagram, config slide panels (6 step types), canvas drag/pan
7. **Reports** — column pinning (max 2 user pins), report detail view (4 tabs), sandbox detail (5 tabs), full rule modal
8. **Dashboard** — info bar, stat cards, trend chart, remediation rings, treemap, job/threat tables, skeleton loading, filter by account + period

### Per-Page Scope

Each page rewrite must include:
- All interactive behaviors from original JS
- All modals, slide panels, context menus
- Generated fake data matching original
- Table features: sorting, expandable rows, pagination, column pinning (where applicable)
- Form behaviors: dirty tracking, save/discard with toast, validation
- Dark mode parity (using `dark:` variant or `[data-theme="dark"]` selectors)
- Mobile responsive behavior at all breakpoints
- Empty states where applicable

---

## Key Behavioral Details (from original JS)

### Dirty Tracking (Settings)
- `captureCardState(card)` snapshots all inputs/selects/toggles/textareas
- `checkDirty(card)` compares current state to snapshot
- When dirty: Save button enables (blue), Discard button appears
- `switchTabWithDirtyCheck()` shows "Unsaved Changes" modal if current tab is dirty
- Discard restores original values

### Scan Pool Drag & Drop
- Uses FLIP animation pattern
- `pool-drag-handle` cursor changes grab→grabbing
- Cards get `.dragging` (opacity: 0.4) while moving
- `.flip-animate` transition for reorder animation

### Column Pinning (Reports)
- Checkbox and action columns always fixed (not user-controllable)
- First content column always pinned (cannot unpin)
- User can pin up to 2 additional columns
- Dynamic `left` offset: `48px + sum of preceding pinned column widths`
- `.rpt-pin-edge` border on last pinned column
- Column dropdown shows "Pin Column (0/2)" counter
- Disabled state when 2 user pins are used

### Dashboard Data Generation
- `populateDashboard(clientId, periodDays)` generates all dashboard widgets
- Scoped to selected account + time period (7d, 30d, 90d)
- Skeleton loading states during "data fetch"
- Account selector dropdown in header

### Account Data Generation
- `generateAccountsData()` creates full account tree:
  - Accounts → each has provider, status, storage units count
  - Each account has units with scan stats, last scan dates
  - Each account has jobs (active/completed)
  - Donut chart data per account (file types, scan results)

### Filter System
- Multiple filter types: checkbox dropdown, date range, search
- Filter state persists per-page
- Active filters shown as chips/tags
- Clear All button

### Workflow Flow Diagram
- Canvas with dot grid background (radial-gradient)
- Canvas is draggable/pannable (cursor: grab/grabbing)
- Steps: Source → MetaScan → Sandbox → DLP → CDR → Remediations
- Each step clickable → opens config slide panel
- 6 different slide panel configurations (one per step type)

---

## Verification Criteria
1. Every page matches original pixel-for-pixel in both light and dark mode
2. All interactive behaviors work: modals, slide panels, drag/drop, dirty tracking, column pinning
3. All generated fake data present with correct counts and formats
4. Responsive breakpoints at 1460px, 1024px, 768px, 480px all work correctly
5. Table features: sticky headers, compact on scroll, expandable rows, pagination
6. Filter dropdowns, context menus, and action menus all functional
7. Toast notifications on save/discard/delete actions
8. Keyboard accessibility maintained (focus-visible, tab order)
