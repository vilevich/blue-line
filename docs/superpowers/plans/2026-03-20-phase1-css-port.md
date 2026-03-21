# Phase 1: Product CSS Port — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port all ~1,660 lines of product-specific CSS from `index.html`'s inline `<style>` block into `apps/mdss/src/app.css`, translating `[data-theme="dark"]` selectors to Tailwind v4's `dark:` variant.

**Architecture:** The CSS is appended after the existing BL imports in `app.css`. Dark mode selectors change from `[data-theme="dark"] .foo` to `.dark .foo` (matching the `@custom-variant dark (&:where(.dark, .dark *))` defined in BL's `base.css`). Variable references remain unchanged — they already use BL semantic tokens. The CSS is organized by page/feature section to match the original.

**Tech Stack:** Tailwind CSS v4, BL semantic tokens (theme.css + base.css)

**Reference files:**
- Source: `/Users/elvijsvilevics/Documents/Cloude/1/index.html` lines 11-1668
- Target: `/Users/elvijsvilevics/Documents/Cloude/opswat-ui/apps/mdss/src/app.css`
- BL tokens: `/Users/elvijsvilevics/Documents/Cloude/opswat-ui/packages/blue-line/src/base.css` (semantic token definitions)
- Spec: `/Users/elvijsvilevics/Documents/Cloude/opswat-ui/docs/superpowers/specs/2026-03-20-mdss-react-migration-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `apps/mdss/src/app.css` | Modify | Add all product-specific CSS after existing BL imports |
| `apps/mdss/src/App.tsx` | Modify | Update dark mode toggle to use `.dark` class on `<html>` |

---

## Important Context

### Dark Mode Translation
The original uses `[data-theme="dark"]`. The React app uses Tailwind v4's custom variant:
```css
@custom-variant dark (&:where(.dark, .dark *));
```

So translate like this:
- `[data-theme="dark"] .foo { ... }` → `.dark .foo { ... }`
- `[data-theme="dark"] body { ... }` → `.dark body { ... }`

### Variables
All CSS variables (`--surface-bg`, `--text-strong`, `--border-card`, etc.) are defined in BL's `base.css` with automatic dark mode overrides. No need to redefine them — just use them as-is.

### What NOT to Port
Lines that say "moved to DS components.css" in the original — these are already in BL. Skip them. Specifically:
- `.page-header`, `.page-title` — in BL
- `.card-header`, `.card-header-actions` — in BL
- `.pool-action-btn`, `.pool-action-menu` — in BL (now `.row-action-btn`/`.row-action-menu`)
- `.data-table` base styles — in BL
- `.toggle-switch`, `.radio-option` — in BL
- `.modal-overlay`, `.slide-panel` — in BL
- `.tab-bar`, `.tab` — in BL
- `.detail-breadcrumb` — in BL
- `.section-title`, `.section-desc` — in BL
- `.stat-card-*` — in BL
- `.audit-card`, `.audit-card-header`, `.audit-card-title` — in BL

### What the React App Shell Already Handles
The Header and Sidebar are already built as React components using Tailwind utility classes. The CSS for `.header`, `.sidebar`, `.nav-item` etc. (lines 17-103) is **still needed** because some pages reference these classes for responsive overrides and full-height layout calculations. Port them but note that the React components may override some of these with inline Tailwind.

---

## Chunk 1: Core Layout, Settings, Scan Pools, License

### Task 1: Core Layout & Shell CSS

**Files:**
- Modify: `apps/mdss/src/app.css`
- Modify: `apps/mdss/src/App.tsx`

- [ ] **Step 1: Update App.tsx dark mode toggle**

In `App.tsx`, the `toggleTheme` function currently does `document.documentElement.classList.toggle('dark')`. This is correct for Tailwind v4. Verify it works by checking the function:

```typescript
function toggleTheme() {
  setDark(!dark)
  document.documentElement.classList.toggle('dark')
}
```

This already matches what we need. No change required. Move on.

- [ ] **Step 2: Add layout CSS to app.css**

Append after the existing imports in `app.css`. Port lines 14-111 from index.html:

```css
/* ===================================================================
   MDSS Product-Specific Styles
   Source: index.html inline <style> block (lines 11-1668)
   Ported to React + Tailwind v4 dark mode (.dark class)
   =================================================================== */

/* ===== LAYOUT ===== */
.app { display: flex; flex-direction: column; height: 100vh; }

/* ===== MAIN ===== */
.main { display: flex; flex: 1; min-height: 0; }

/* ===== SIDEBAR ===== */
.sidebar {
  width: var(--sidebar-width);
  background: var(--surface-bg);
  border-right: 1px solid var(--border-bg);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.sidebar.collapsed { width: var(--sidebar-collapsed); }
.content { transition: flex 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.03s; }
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--radius);
  font-size: 14px;
  color: var(--text-subtle);
  cursor: pointer;
  text-decoration: none;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
}
.nav-item:hover { background: var(--hover-subtle); }
.nav-item.active { background: var(--color-blue-100); color: var(--text-strong); font-weight: 500; }
.nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }
.nav-text { opacity: 1; transition: opacity 0.12s ease; }
.sidebar.collapsed .nav-item { padding: 8px 12px; }
.sidebar.collapsed .nav-text { opacity: 0; pointer-events: none; }
.nav-divider { height: 1px; background: var(--color-neutral-200); margin: 2px 0; }
.sidebar-footer {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.12s ease;
  font-family: var(--font-brand);
}
.sidebar-footer-brand { height: 18px; width: auto; flex-shrink: 0; }
.sidebar-footer-tagline { font-size: 12px; font-weight: 400; color: var(--text-muted-accessible); }
.sidebar.collapsed .sidebar-footer { opacity: 0; pointer-events: none; }

/* ===== CONTENT ===== */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  min-width: 0;
}

/* ===== HEADER ===== */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 20px;
  background: var(--surface-bg);
  color: var(--text-strong);
  flex-shrink: 0;
  z-index: 10;
  border-bottom: 1px solid var(--border-bg);
}
.header-left { display: flex; align-items: center; gap: 12px; margin-left: -7px; }
.header-logo { display: flex; align-items: center; gap: 10px; }
.header-logo-icon {
  width: 28px; height: 28px;
  background: var(--header-bg);
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 12px; color: var(--text-on-fill);
}
.header-logo-text { display: flex; flex-direction: column; gap: 4px; font-family: var(--font-brand); }
.header-logo-text span:first-child { font-size: 10px; font-weight: 400; line-height: 10px; color: var(--text-strong); letter-spacing: 0.5px; text-transform: uppercase; }
.header-logo-text span:last-child { font-size: 16px; font-weight: 500; line-height: 16px; color: var(--text-strong); }
.sidebar-toggle {
  width: 32px; height: 32px; border-radius: var(--radius);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--text-subtle); background: none; border: none;
}
.sidebar-toggle:hover { color: var(--text-strong); background: var(--hover-default); }
.sidebar-toggle svg { width: 18px; height: 18px; }
.header-right { display: flex; align-items: center; gap: 8px; }
.nav-item:focus-visible { outline: 2px solid var(--primary); outline-offset: -2px; }
```

- [ ] **Step 3: Verify the dev server compiles**

Run: `cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui && pnpm --filter @opswat/mdss dev`
Expected: Dev server starts on port 5173 without CSS compilation errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui
git add apps/mdss/src/app.css
git commit -m "feat(mdss): port core layout CSS from index.html (shell, sidebar, header)"
```

---

### Task 2: Settings Card, Scan Pool, License CSS

**Files:**
- Modify: `apps/mdss/src/app.css`

- [ ] **Step 1: Add Settings card CSS**

Append to `app.css` — lines 129-257 from index.html:

```css
/* ===== SETTINGS CARDS ===== */
.settings-card {
  background: var(--surface-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  margin-bottom: 12px;
}
.settings-card:last-child { margin-bottom: 0; }
.settings-card.dirty .btn-discard { display: inline-flex; align-items: center; }
.btn-save {
  padding: 0 16px;
  background: var(--surface-bg);
  color: var(--text-muted);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  cursor: default;
  pointer-events: none;
  height: 32px;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.settings-card.dirty .btn-save {
  background: var(--primary);
  color: var(--text-on-fill);
  border-color: var(--primary);
  cursor: pointer;
  pointer-events: auto;
}
.settings-card.dirty .btn-save:hover { background: var(--primary-hover); }
.settings-card.dirty .btn-save:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
.card-content {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 12px;
  row-gap: 20px;
}
.card-content > * { grid-column: 1 / -1; }

/* Headers Table (key-value tables in settings) */
.headers-table { width: 100%; border: 1px solid var(--border-card); border-radius: var(--radius); overflow: hidden; }
.headers-table-head {
  display: flex; align-items: center; background: var(--surface-card);
  border-bottom: 1px solid var(--border-card); padding: 0 16px; height: 56px;
  font-size: 14px; font-weight: 500; color: var(--text-strong);
}
.headers-table-head .col-key { flex: 1; display: flex; align-items: center; position: relative; padding-right: 36px; }
.headers-table-head .col-value { flex: 1; display: flex; align-items: center; position: relative; padding-right: 36px; }
.headers-table-head .filter-icon { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); }
.headers-table-head .col-actions { width: 40px; }
.headers-table-row {
  display: flex; align-items: center; padding: 0 16px; height: 56px;
  border-bottom: 1px solid var(--border-card); font-size: 14px;
}
.headers-table-row:last-child { border-bottom: none; }
.headers-table-row .col-key { flex: 1; color: var(--text-strong); }
.headers-table-row .col-value { flex: 1; color: var(--text-subtle); }
.headers-table-row .col-actions { width: 40px; display: flex; align-items: center; justify-content: center; }
.edit-icon { width: 16px; height: 16px; color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
.edit-icon svg { width: 16px; height: 16px; }
.edit-icon:hover { color: var(--text-strong); }

/* Headers Input Row */
.headers-input-row { display: flex; gap: 8px; align-items: center; }
.headers-input-row .input-field { flex: 1; }
.btn-add-header {
  padding: 0 12px; background: transparent; color: var(--text-strong);
  border: 1px solid var(--color-neutral-200); border-radius: var(--radius);
  font-family: var(--font-sans); font-size: 14px; font-weight: 500;
  cursor: pointer; white-space: nowrap; height: 32px;
  display: inline-flex; align-items: center;
}
.btn-add-header:hover { background: var(--hover-subtle); }

/* API Key */
.api-key-status { font-size: 14px; color: var(--text-muted-accessible); }
.btn-generate {
  padding: 0 12px; background: transparent; color: var(--text-strong);
  border: 1px solid var(--color-neutral-200); border-radius: var(--radius);
  font-family: var(--font-sans); font-size: 14px; font-weight: 500;
  cursor: pointer; white-space: nowrap; height: 32px;
  display: inline-flex; align-items: center; align-self: flex-start; width: fit-content;
}
.btn-generate:hover { background: var(--hover-subtle); }

.btn-export {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 0 12px; height: 32px;
  background: var(--primary); color: var(--text-on-fill);
  border: none; border-radius: var(--radius);
  font-family: var(--font-sans); font-size: 14px; font-weight: 500; cursor: pointer;
}
.btn-export:hover { background: var(--primary-hover); }
```

- [ ] **Step 2: Add Scan Pool CSS**

Append — lines 259-313:

```css
/* ===== SCAN POOLS ===== */
.promo-banner {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--color-blue-100); border: 1px solid var(--color-blue-200);
  border-radius: var(--radius); padding: 12px 20px; margin-bottom: 12px;
}
.promo-banner-text { font-size: 14px; color: var(--text-strong); }
.promo-banner-text strong { font-weight: 500; }
.pool-card { margin-bottom: 12px; }
.pool-card-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; height: 56px; min-height: 56px;
  border-bottom: 1px solid var(--border-card);
}
.pool-card-header-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
.pool-drag-handle {
  display: flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; flex-shrink: 0;
  cursor: grab; color: var(--text-muted); margin-right: -4px;
}
.pool-drag-handle:active { cursor: grabbing; }
.pool-drag-handle svg { width: 16px; height: 16px; }
.pool-card.dragging { opacity: 0.4; }
.pool-card.flip-animate { transition: transform 0.15s cubic-bezier(0.2,0,0,1); }
.pool-card-header-left h2 { font-size: 14px; font-weight: 500; color: var(--text-strong); }
.pool-instance-count { font-size: 14px; color: var(--primary); font-weight: 400; }
.pool-card-header-right { display: flex; gap: 8px; }
.pool-table .col-url { width: 32%; }
.pool-table .col-av { width: 22%; }
.pool-table .col-api { width: 20%; }
.pool-table .col-timeout { width: 20%; }
.pool-table .col-actions { width: 48px; text-align: center; padding-right: 16px; overflow: visible; position: relative; }
.api-dots { letter-spacing: 2px; color: var(--text-muted); }
.encryption-status { font-size: 14px; color: var(--text-subtle); line-height: 1.5; }

/* Product-specific panel size overrides */
#addScanPoolPanel { width: 420px; right: -420px; }
#addScanPoolPanel.open { right: 0; }
#editJobPanel { width: 420px; right: -420px; }
#editJobPanel.open { right: 0; }
```

- [ ] **Step 3: Add License CSS**

Append — lines 324-371:

```css
/* ===== LICENSE ===== */
.license-badge {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 8px; font-size: 14px; font-family: var(--font-sans);
  font-weight: 400; line-height: 16px; white-space: nowrap;
}
.license-badge.green { background: var(--ds-success-100); color: var(--ds-success-text); }
.license-badge.red { background: var(--ds-alert-100); color: var(--ds-alert-text); }
.license-empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 60px 20px; text-align: center;
}
.license-empty-illustration { width: 120px; height: 120px; margin-bottom: 20px; opacity: 0.7; }
.license-empty-title { font-size: 16px; font-weight: 500; color: var(--text-strong); margin-bottom: 4px; }
.license-empty-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }
.license-warning-banner {
  display: flex; align-items: center; gap: 8px; padding: 10px 16px;
  background: var(--ds-alert-100); color: var(--ds-alert-text);
  font-size: 14px; border-bottom: 1px solid var(--color-red-200);
}
.license-warning-banner a { color: var(--ds-alert-text); font-weight: 500; }
.license-warning-banner svg { width: 16px; height: 16px; flex-shrink: 0; }
```

- [ ] **Step 4: Verify dev server compiles**

Run: `cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui && pnpm --filter @opswat/mdss dev`
Expected: No CSS compilation errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui
git add apps/mdss/src/app.css
git commit -m "feat(mdss): port settings, scan pool, license CSS"
```

---

### Task 3: Users, Jobs, Audit CSS

**Files:**
- Modify: `apps/mdss/src/app.css`

- [ ] **Step 1: Add Users CSS**

Append — lines 433-458:

```css
/* ===== USERS PAGE ===== */
.user-name-cell { display: flex; align-items: center; gap: 10px; }
.user-avatar {
  width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 500; color: var(--text-on-fill); flex-shrink: 0;
}
.users-empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 48px 20px; text-align: center;
}
.users-empty-icon {
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--tab-bg); display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
}
.users-empty-icon svg { width: 24px; height: 24px; color: var(--text-muted); }
.users-empty-title { font-size: 14px; font-weight: 500; color: var(--text-strong); margin: 0 0 4px; }
.users-empty-desc { font-size: 14px; color: var(--text-muted); margin: 0; }

/* Users table even columns */
#usersPage .data-table { display: table; table-layout: fixed; width: 100%; }
#usersPage .data-table th:not(:last-child) { width: 18%; }
```

- [ ] **Step 2: Add Jobs CSS**

Append — lines 460-523:

```css
/* ===== JOBS PAGE ===== */
.jobs-row-with-progress { position: relative; }
.jobs-row-with-progress::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 3px; background: var(--border-card); pointer-events: none;
}
.jobs-row-with-progress .jobs-progress-fill {
  position: absolute; bottom: 0; left: 0; height: 3px;
  background: var(--primary); border-radius: 0 2px 2px 0;
  pointer-events: none; z-index: 1;
}
.jobs-detections { color: var(--danger); font-weight: 500; }
.jobs-detections.none { color: var(--text-subtle); font-weight: 400; }
.jobs-elapsed { font-variant-numeric: tabular-nums; }
.jobs-files-progress { display: flex; align-items: center; gap: 8px; }
.jobs-files-bar { flex: 1; max-width: 80px; height: 4px; background: var(--border-card); border-radius: 2px; overflow: hidden; }
.jobs-files-bar-fill { height: 100%; background: var(--primary); border-radius: 2px; }
.jobs-edit-btn {
  width: 32px; height: 32px; border: 1px solid var(--color-neutral-200); border-radius: var(--radius);
  background: var(--surface-card); cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--text-muted);
}
.jobs-edit-btn:hover { color: var(--text-strong); border-color: var(--text-muted); }
.jobs-edit-btn svg { width: 14px; height: 14px; }

/* Job Detail Page */
.job-info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0; padding: 20px; }
.job-info-item { display: flex; flex-direction: column; gap: 4px; padding: 0 20px 0 0; }
.job-info-label { font-size: 12px; font-weight: 500; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.3px; }
.job-info-value { font-size: 14px; color: var(--text-strong); display: flex; align-items: center; gap: 6px; }

/* Job summary stats */
.job-summary-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 12px; }
.job-summary-stat {
  background: var(--surface-card); border: 1px solid var(--border-card); border-radius: var(--radius);
  box-shadow: var(--shadow-card); padding: 20px; display: flex; flex-direction: column; gap: 8px;
}
.job-summary-stat-label { font-size: 12px; font-weight: 500; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.3px; }
.job-summary-stat-value { font-size: 28px; font-weight: 500; color: var(--text-strong); }
.job-summary-stat-value.alert { color: var(--danger); }
.job-summary-stat-value.success { color: #0f8a56; }

/* Completed/stopped banners */
.job-completed-banner {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 20px; margin-bottom: 12px;
  border-radius: var(--radius); border: 1px solid #b6e3cc;
  background: var(--color-green-100); color: var(--text-strong);
  font-size: 14px; font-weight: 400;
}
.job-completed-banner svg { width: 16px; height: 16px; color: #0f8a56; flex-shrink: 0; }
.job-stopped-banner {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 20px; margin-bottom: 12px;
  border-radius: var(--radius); border: 1px solid #ffe0a3;
  background: var(--color-yellow-100); color: var(--text-strong);
  font-size: 14px; font-weight: 400;
}
.job-stopped-banner svg { width: 16px; height: 16px; color: var(--feedback-warning); flex-shrink: 0; }

/* Job Detail flex layout */
#jobDetailView { flex-direction: column; }
#jobDetailView .audit-card:last-of-type {
  flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden;
}
#jobDetailView .table-scroll { flex: 1; overflow: auto; min-height: 0; max-height: none; }
#jobDetailView .audit-pagination { flex-shrink: 0; }
```

- [ ] **Step 3: Add Audit CSS**

Append — lines 526-541:

```css
/* ===== AUDIT PAGE ===== */
.audit-expanded-row td {
  padding: 12px 16px 12px 60px !important;
  background: var(--surface-card);
  font-size: 14px; color: var(--text-subtle); line-height: 1.5;
  border-bottom: 1px solid var(--border-card);
}
```

- [ ] **Step 4: Commit**

```bash
cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui
git add apps/mdss/src/app.css
git commit -m "feat(mdss): port users, jobs, audit CSS"
```

---

## Chunk 2: Workflows, Inventory, Account Detail, Reports

### Task 4: Workflows CSS

**Files:**
- Modify: `apps/mdss/src/app.css`

- [ ] **Step 1: Add Workflows list & flow diagram CSS**

Append — lines 590-698:

```css
/* ===== WORKFLOWS PAGE ===== */

/* Full-height layout */
#workflowsPage.active { display: flex; flex-direction: column; height: calc(100vh - 56px - 40px); }
#workflowsListView, #workflowDetailView { flex: 1; flex-direction: column; min-height: 0; }
#workflowsListView .audit-card,
#workflowDetailView .audit-card { flex: 1; display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
#workflowsListView .table-scroll { flex: 1; overflow: auto; min-height: 0; }
#workflowsListView .audit-pagination { flex-shrink: 0; }
#workflowDetailView .wf-canvas { flex: 1; overflow: auto; min-height: 0; }

/* Remediation mini-tags in table */
.wf-rem-tag {
  display: inline-flex; align-items: center; height: 24px; padding: 0 8px;
  font-size: 12px; font-weight: 500; border-radius: var(--radius); white-space: nowrap;
}
.wf-rem-tag.keep { background: var(--color-neutral-100); color: var(--color-neutral-800); }
.wf-rem-tag.copy { background: var(--color-blue-100); color: var(--color-blue-900); }
.wf-rem-tag.move { background: var(--color-blue-100); color: var(--color-blue-900); }
.wf-rem-tag.delete { background: var(--color-red-100); color: var(--color-red-800); }
.wf-rem-tag.failed { background: var(--color-red-100); color: var(--color-red-800); }
.wf-rem-tag.none { background: transparent; color: var(--text-muted); font-weight: 400; padding: 0; }
.wf-rem-tags { display: flex; gap: 4px; flex-wrap: wrap; }

/* Status with dot */
.wf-status { display: flex; align-items: center; gap: 6px; font-size: 14px; color: var(--text-strong); }
.wf-status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-green-800); flex-shrink: 0; }

/* Reports table sticky col-cb/col-action from DS */
.rpt-verdict { display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
.rpt-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.rpt-verdict.detected .rpt-dot { background: var(--color-red-800); }
.rpt-verdict.clean { color: var(--color-green-800); }
.rpt-verdict.clean .rpt-dot { background: var(--color-green-800); }
.rpt-verdict.none { color: var(--text-muted); }
.rpt-verdict.none .rpt-dot { background: var(--text-disabled); }
.wf-default-icon { width: 16px; height: 16px; color: var(--text-strong); margin-right: 4px; vertical-align: middle; }

/* Flow Diagram */
.wf-canvas {
  background-color: var(--color-neutral-100);
  background-image: radial-gradient(circle at 1px 1px, rgba(169, 178, 196, 0.2) 1px, transparent 1px);
  background-size: 12px 12px;
  border-radius: var(--radius);
  padding: 48px; overflow: auto;
  position: relative; cursor: grab;
  flex: 1 0 0; align-self: stretch;
}
.wf-canvas.dragging { cursor: grabbing; user-select: none; }
.wf-flow { display: inline-flex; align-items: center; gap: 0; }
.wf-step { display: flex; align-items: center; gap: 0; cursor: pointer; }
.wf-node { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.wf-node-box {
  padding: 16px; border-radius: 4px; border: 1px solid var(--border-card);
  background: var(--surface-card);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 1px 3px 4px -2px rgba(12, 18, 29, 0.04), 2px 2px 4px 0 rgba(12, 18, 29, 0.04);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.wf-step:hover .wf-node-box { border-color: var(--primary); box-shadow: 0 0 0 2px rgba(29,107,252,0.15); }
.wf-node-box svg { width: 48px; height: 48px; color: var(--color-neutral-700); }
.wf-node-label { font-size: 12px; font-weight: 500; color: var(--text-strong); text-align: center; white-space: nowrap; }
.wf-node-sublabel { font-size: 11px; color: var(--text-muted); text-align: center; margin-top: -4px; }
.wf-connector { width: 40px; height: 0; border-top: 2px dashed var(--color-neutral-200); flex-shrink: 0; }
.wf-start-label { font-size: 12px; font-weight: 500; color: var(--text-muted); white-space: nowrap; }
.wf-diamond { display: flex; align-items: center; justify-content: center; }
.wf-diamond svg { width: 24px; height: 24px; }

/* Remediations stack */
.wf-rem-stack { display: flex; flex-direction: column; gap: 8px; }
.wf-rem-col {
  border: 1px solid var(--border-card); border-radius: 4px;
  background: var(--surface-card); padding: 12px; display: flex; flex-direction: column; gap: 8px;
  box-shadow: 1px 3px 4px -2px rgba(12, 18, 29, 0.04), 2px 2px 4px 0 rgba(12, 18, 29, 0.04);
}
.wf-rem-col-header { font-size: 13px; font-weight: 600; color: var(--text-strong); }
.wf-rem-row { display: flex; align-items: center; gap: 8px; }
.wf-rem-row-label { font-size: 11px; color: var(--text-muted); min-width: 52px; flex-shrink: 0; }
.wf-action-btns { display: flex; gap: 4px; }
.wf-action-btn {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 8px; border-radius: 2px;
  border: 1px solid transparent; background: var(--color-neutral-100);
  cursor: pointer; transition: background 0.15s;
  font-size: 12px; font-weight: 500; color: var(--text-muted); white-space: nowrap;
}
.wf-action-btn:hover { background: var(--color-neutral-200); }
.wf-action-btn svg { width: 16px; height: 16px; flex-shrink: 0; }
.wf-action-btn.active { border-color: var(--primary); background: var(--color-blue-100); color: var(--primary); }

/* Tech list */
.wf-tech-item { padding: 16px 0; border-bottom: 1px solid var(--border-card); }
.wf-tech-item:last-child { border-bottom: none; }
.wf-tech-name { font-size: 14px; font-weight: 500; color: var(--text-strong); }
.wf-tech-desc { font-size: 13px; color: var(--text-subtle); margin-top: 2px; }
.wf-tech-status { margin-top: 6px; }
```

- [ ] **Step 2: Add Workflow config panel CSS**

Append — lines 699-731:

```css
/* Workflow config panels */
.wf-tag-group { padding: 12px 0; border-bottom: 1px solid var(--border-card); }
.wf-tag-group:last-child { border-bottom: none; }
.wf-tag-check { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.wf-tag-check input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--primary); }
.wf-tag-check label { font-size: 14px; font-weight: 500; color: var(--text-strong); }
.wf-tag-fields { padding-left: 24px; display: flex; flex-direction: column; gap: 8px; }
.wf-tag-field-label { font-size: 12px; color: var(--text-subtle); }
.wf-tag-field-value {
  font-size: 13px; color: var(--text-strong); padding: 6px 8px;
  border: 1px solid var(--color-neutral-200); border-radius: var(--radius); background: var(--surface-card);
}
.wf-show-verdicts { font-size: 13px; color: var(--primary); cursor: pointer; padding-left: 24px; }
.wf-show-verdicts:hover { text-decoration: underline; }
.wf-verdicts { padding-left: 24px; margin-top: 8px; display: flex; flex-direction: column; gap: 8px; }
.wf-verdict-row { display: flex; flex-direction: column; gap: 4px; }
.wf-verdict-label { font-size: 12px; font-weight: 500; color: var(--text-strong); }
.wf-verdict-input {
  font-size: 13px; padding: 6px 8px; border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius); background: var(--surface-card); color: var(--text-strong);
  display: flex; align-items: center; justify-content: space-between;
}
.wf-verdict-input .clear-x { cursor: pointer; color: var(--text-muted); font-size: 14px; }

/* Remediation radio */
.wf-rem-option { padding: 8px 0; }
.wf-rem-radio { display: flex; align-items: center; gap: 8px; }
.wf-rem-radio input[type="radio"] { width: 16px; height: 16px; accent-color: var(--primary); }
.wf-rem-radio label { font-size: 14px; font-weight: 500; color: var(--text-strong); }
.wf-rem-content { padding-left: 24px; margin-top: 8px; }
.wf-storage-tags { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; margin-bottom: 12px; }
.wf-storage-tag {
  display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px;
  background: var(--color-neutral-100); border-radius: var(--radius); font-size: 13px; color: var(--text-strong);
}
.wf-storage-tag .remove-x { cursor: pointer; color: var(--text-muted); font-size: 14px; }
.wf-folder-check {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 0; border-bottom: 1px solid var(--border-card);
}
.wf-folder-check:last-child { border-bottom: none; }
.wf-folder-check label { font-size: 14px; color: var(--text-strong); }
.wf-folder-check input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--primary); }
```

- [ ] **Step 3: Commit**

```bash
cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui
git add apps/mdss/src/app.css
git commit -m "feat(mdss): port workflows CSS (flow diagram, config panels)"
```

---

### Task 5: Inventory & Account Detail CSS

**Files:**
- Modify: `apps/mdss/src/app.css`

- [ ] **Step 1: Add Inventory CSS**

Append — lines 747-776:

```css
/* ===== INVENTORY PAGE ===== */
.inv-promo {
  display: flex; gap: 24px; align-items: flex-start; margin-bottom: 24px;
}
.inv-promo-img {
  width: 64px; height: 64px; border-radius: 8px; flex-shrink: 0;
  background: linear-gradient(135deg, #1a2744 0%, #1d6bfc 100%);
  display: flex; align-items: center; justify-content: center;
}
.inv-promo-img svg { width: 32px; height: 32px; color: #fff; }
.inv-promo-content { flex: 1; }
.inv-promo-title { font-size: 14px; font-weight: 500; color: var(--text-strong); margin-bottom: 4px; }
.inv-promo-desc { font-size: 13px; color: var(--text-subtle); margin-bottom: 8px; line-height: 1.4; }
.inv-promo-link { font-size: 13px; color: var(--primary); text-decoration: none; cursor: pointer; font-weight: 500; }
.inv-promo-link:hover { text-decoration: underline; }
.inv-provider-icon.gcloud { background: #4285f4; }
```

- [ ] **Step 2: Add Account Detail CSS**

Append — lines 778-846:

```css
/* ===== ACCOUNT DETAIL ===== */
.acct-overview-row {
  display: flex; gap: 0;
  background: var(--surface-card); border: 1px solid var(--border-card);
  border-radius: var(--radius); box-shadow: var(--shadow-card); margin-bottom: 16px;
}
.acct-overview-stat {
  flex: 1; padding: 20px 24px;
  border-left: 3px solid transparent;
  display: flex; flex-direction: column; gap: 4px;
}
.acct-overview-stat:not(:last-child) { border-right: 1px solid var(--border-card); }
.acct-overview-stat:first-child { border-radius: var(--radius) 0 0 var(--radius); }
.acct-overview-stat:last-child { border-radius: 0 var(--radius) var(--radius) 0; }
.acct-overview-stat.blue { border-left-color: var(--color-blue-700); }
.acct-overview-stat.green { border-left-color: var(--color-green-800); }
.acct-overview-stat.red { border-left-color: var(--color-red-700); }
.acct-overview-stat.yellow { border-left-color: var(--color-yellow-700); }
.acct-overview-stat-label { font-size: 12px; font-weight: 500; color: var(--text-muted); }
.acct-overview-stat-value { font-size: 24px; font-weight: 500; color: var(--text-strong); }

/* Account detail tabs */
.acct-tab-panel, .grp-tab-panel { display: none; }
.acct-tab-panel.active, .grp-tab-panel.active { display: block; }

/* Donut charts */
.acct-donut-row { display: flex; gap: 0; padding: 24px 20px; justify-content: space-around; }
.acct-donut-item { display: flex; flex-direction: column; align-items: center; gap: 16px; flex: 1; }
.acct-donut-svg { width: 120px; height: 120px; transform: rotate(-90deg); }
.acct-donut-svg text { transform: rotate(90deg); transform-origin: center; }
.acct-donut-labels { display: flex; flex-direction: column; gap: 4px; }
.acct-donut-label-row { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-subtle); }
.acct-donut-label-row span:last-child { font-weight: 500; color: var(--text-strong); margin-left: auto; }
.acct-donut-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

/* Client ID cell */
.acct-client-id { display: flex; align-items: center; gap: 8px; width: 100%; }
.acct-client-id-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; font-family: 'Roboto Mono', monospace; color: var(--text-subtle); }
.acct-copy-btn { width: 16px; height: 16px; cursor: pointer; color: var(--text-muted); flex-shrink: 0; }
.acct-copy-btn:hover { color: var(--primary); }

/* Actions dropdown */
.acct-actions-wrap { position: relative; display: inline-block; }
.acct-actions-menu {
  position: absolute; top: 36px; right: 0; min-width: 180px; z-index: 100;
  background: var(--surface-card); border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-graphics); box-shadow: var(--shadow-3);
  padding: 4px 0; display: none;
}
.acct-actions-menu.open { display: block; }
.acct-settings-link { font-size: 13px; color: var(--primary); cursor: pointer; font-weight: 500; text-decoration: none; }
.acct-settings-link:hover { text-decoration: underline; }
```

- [ ] **Step 3: Commit**

```bash
cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui
git add apps/mdss/src/app.css
git commit -m "feat(mdss): port inventory and account detail CSS"
```

---

### Task 6: Report Detail CSS

**Files:**
- Modify: `apps/mdss/src/app.css`

- [ ] **Step 1: Add Report Detail CSS**

Append — lines 970-1086:

```css
/* ===== REPORT DETAIL VIEW ===== */
#reportDetailView, #sandboxDetailView { display: none; }
#reportDetailView.active, #sandboxDetailView.active { display: block; }
.rpt-tab-panel { display: none; }
.rpt-tab-panel.active { display: block; }

/* Results grid (2 rows: 4col + 3col) */
.rpt-results {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  border: 1px solid var(--border-card); border-radius: var(--radius);
  background: var(--surface-card); box-shadow: var(--shadow-card); margin-bottom: 12px;
}
.rpt-results-cell { padding: 20px; border-right: 1px solid var(--border-card); border-bottom: 1px solid var(--border-card); }
.rpt-results-cell:nth-child(4), .rpt-results-cell:nth-child(7) { border-right: none; }
.rpt-results-cell:nth-child(n+5) { border-bottom: none; }
.rpt-results-row2 { grid-template-columns: repeat(3, 1fr); }
.rpt-results-title { font-size: 12px; color: var(--text-muted); margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
.rpt-results-title svg { width: 14px; height: 14px; color: var(--text-link); cursor: pointer; }
.rpt-results-value { font-size: 24px; font-weight: 600; margin-bottom: 2px; }
.rpt-results-value.danger { color: var(--color-red-700); }
.rpt-results-value.success { color: var(--color-green-800); }
.rpt-results-value.warn { color: var(--color-yellow-700); }
.rpt-results-desc { font-size: 12px; color: var(--text-muted); }

/* 50/50 split layout */
.rpt-detail-split { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }

/* File Details key-value */
.rpt-kv { display: flex; flex-direction: column; }
.rpt-kv-row { display: flex; padding: 10px 20px; border-bottom: 1px solid var(--border-100); font-size: 13px; }
.rpt-kv-row:last-child { border-bottom: none; }
.rpt-kv-label { width: 140px; flex-shrink: 0; color: var(--text-muted); font-weight: 500; }
.rpt-kv-value { flex: 1; color: var(--text-strong); display: flex; align-items: center; gap: 8px; word-break: break-all; }
.rpt-kv-value .copy-icon { cursor: pointer; color: var(--text-muted); flex-shrink: 0; }
.rpt-kv-value .copy-icon:hover { color: var(--text-link); }
.rpt-kv-value .copy-icon svg { width: 14px; height: 14px; }

/* Remediations card */
.rpt-rem-item { padding: 16px 20px; border-bottom: 1px solid var(--border-100); }
.rpt-rem-item:last-child { border-bottom: none; }
.rpt-rem-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-size: 14px; font-weight: 500; }
.rpt-rem-icon { width: 20px; height: 20px; border-radius: 3px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.rpt-rem-icon.success { background: var(--color-blue-700); color: white; }
.rpt-rem-icon.fail { background: var(--color-red-700); color: white; }
.rpt-rem-icon svg { width: 12px; height: 12px; }
.rpt-rem-desc { font-size: 13px; color: var(--text-muted); margin-left: 28px; }
.rpt-rem-tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0 0 28px; }
.rpt-rem-tag { display: inline-flex; align-items: center; height: 24px; padding: 0 8px; background: var(--surface-bg); border: 1px solid var(--color-neutral-200); border-radius: var(--radius); font-size: 12px; color: var(--text-subtle); }
.rpt-rem-fail-msg { color: var(--color-red-700); font-size: 13px; margin-left: 28px; }
.rpt-rem-fail-msg a { color: var(--color-red-700); text-decoration: underline; cursor: pointer; }
.rpt-rem-dest-list { margin: 8px 0 0 28px; font-size: 13px; color: var(--text-muted); }
.rpt-rem-dest-list .rpt-rem-tag { margin-top: 6px; }

/* Category grid (DLP/Sanitization) */
.rpt-cat-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
  border: 1px solid var(--border-card); border-radius: var(--radius);
  background: var(--surface-card); box-shadow: var(--shadow-card); margin-bottom: 12px;
}
.rpt-cat-cell { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-right: 1px solid var(--border-card); border-bottom: 1px solid var(--border-card); font-size: 13px; }
.rpt-cat-cell:nth-child(3n) { border-right: none; }
.rpt-cat-cell:nth-last-child(-n+3) { border-bottom: none; }
.rpt-cat-icon { width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: var(--color-blue-100); color: var(--color-blue-700); }
.rpt-cat-icon svg { width: 16px; height: 16px; }
.rpt-cat-name { flex: 1; color: var(--text-strong); }
.rpt-cat-count { font-weight: 600; color: var(--text-strong); }

/* Scan stat header */
.rpt-scan-header { padding: 20px; margin-bottom: 12px; }
.rpt-scan-header-title { font-size: 14px; font-weight: 600; color: var(--text-strong); margin-bottom: 8px; }
.rpt-scan-header-value { font-size: 32px; font-weight: 500; color: var(--color-green-800); }
.rpt-scan-header-desc { font-size: 13px; color: var(--text-muted); margin-top: 2px; }

/* Sandbox summary */
.rpt-sandbox-verdict { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-left: 4px solid var(--color-red-700); background: #fef2f2; border-radius: var(--radius); margin-bottom: 12px; }
.rpt-sandbox-verdict .verdict-icon { width: 24px; height: 24px; color: var(--color-red-700); }
.rpt-sandbox-verdict .verdict-text { font-size: 16px; font-weight: 600; color: var(--color-red-700); }
.rpt-sandbox-indicators { display: flex; gap: 16px; padding: 12px 20px; flex-wrap: wrap; font-size: 13px; }
.rpt-sandbox-ind { display: flex; align-items: center; gap: 6px; }
.rpt-sandbox-ind .dot { width: 8px; height: 8px; border-radius: 50%; }
.rpt-sandbox-ind .dot.red { background: var(--color-red-700); }
.rpt-sandbox-ind .dot.green { background: var(--color-green-800); }
.rpt-sandbox-ind .dot.yellow { background: var(--color-yellow-700); }

/* Warning banner */
.rpt-warning-banner { display: flex; align-items: flex-start; gap: 12px; padding: 16px 20px; background: #fffbeb; border: 1px solid #fde68a; border-radius: var(--radius); margin-bottom: 12px; }
.rpt-warning-banner svg { width: 20px; height: 20px; color: var(--color-yellow-700); flex-shrink: 0; margin-top: 2px; }
.rpt-warning-banner-title { font-weight: 600; color: var(--text-strong); }
.rpt-warning-banner-desc { font-size: 13px; color: var(--text-muted); }
.rpt-warning-banner a { color: var(--text-link); cursor: pointer; }

/* Scan report chips */
.rpt-scan-chips { display: flex; gap: 0; border: 1px solid var(--border-card); border-radius: var(--radius); overflow: hidden; margin: 8px 0; }
.rpt-scan-chip { display: flex; align-items: center; gap: 8px; padding: 8px 16px; font-size: 13px; font-weight: 500; border-right: 1px solid var(--border-card); }
.rpt-scan-chip:last-child { border-right: none; }
.rpt-scan-chip svg { width: 16px; height: 16px; }

/* Code block */
.rpt-code-block { background: var(--surface-bg); border: 1px solid var(--color-neutral-200); border-radius: var(--radius); padding: 16px 20px; font-family: 'SF Mono', 'Fira Code', monospace; font-size: 12px; line-height: 1.6; white-space: pre-wrap; word-break: break-all; color: var(--text-strong); max-height: 400px; overflow: auto; }

/* Expanded row detail */
.rpt-expand-kv { padding: 12px 20px 12px 48px; }
.rpt-expand-kv .rpt-kv-row { padding: 6px 0; border-bottom: none; }
.rpt-expand-kv .rpt-kv-label { width: 120px; }

/* MITRE section */
.rpt-mitre-detail { padding: 12px 20px 12px 48px; }
.rpt-mitre-detail h4 { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
.rpt-mitre-detail p { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

/* Sandbox file details */
.rpt-sbx-file-layout { display: grid; grid-template-columns: 1fr 200px; gap: 20px; padding: 20px; }
.rpt-sbx-preview { width: 200px; height: 200px; background: var(--color-neutral-900); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; overflow: hidden; }
.rpt-sbx-preview img { max-width: 100%; max-height: 100%; }

/* Extended details sub-tabs */
.rpt-ext-panel { display: none; }
.rpt-ext-panel.active { display: block; }

/* Section title inside cards */
.rpt-section-title { font-size: 14px; font-weight: 600; color: var(--text-strong); padding: 16px 20px 12px; }
.rpt-section-title a { float: right; font-size: 13px; font-weight: 500; color: var(--text-link); cursor: pointer; }
```

- [ ] **Step 2: Commit**

```bash
cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui
git add apps/mdss/src/app.css
git commit -m "feat(mdss): port report detail CSS (results grid, KV, remediations, categories)"
```

---

## Chunk 3: Dashboard, Table Infrastructure, Dark Mode, Responsive

### Task 7: Dashboard CSS

**Files:**
- Modify: `apps/mdss/src/app.css`

- [ ] **Step 1: Add Dashboard filter & info-bar CSS**

Append — lines 849-911:

```css
/* ===== DASHBOARD ===== */

/* Filter button menus */
.btn-menu { height: 32px; padding: 0 12px; gap: 8px; background: transparent; border: 1px solid var(--color-neutral-200); border-radius: var(--radius); font-family: var(--font-sans); font-size: 14px; font-weight: 400; line-height: 16px; color: var(--text-strong); cursor: pointer; white-space: nowrap; display: inline-flex; align-items: center; justify-content: center; }
.btn-menu:hover { border-color: var(--color-neutral-500); }
.btn-menu svg { width: 16px; height: 16px; }
.btn-menu.active { border-color: var(--primary); }
.btn-menu.active:hover { border-color: var(--primary); }
.btn-menu:disabled, .btn-menu.disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
.btn-menu.skeleton { color: transparent; pointer-events: none; background: var(--color-neutral-100); border-color: transparent; }
.btn-menu.skeleton svg { visibility: hidden; }
.filter-btn-wrap { position: relative; }
.filter-menu {
  display: none; position: absolute; top: calc(100% + 4px); left: 0; z-index: 50;
  min-width: 100%; background: var(--surface-card); border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius); box-shadow: var(--shadow-md); padding: 4px 0;
}
.filter-btn-wrap.open .filter-menu { display: block; }
.filter-menu-item { padding: 8px 12px; font-size: 14px; color: var(--text-body); cursor: pointer; white-space: nowrap; }
.filter-menu-item:hover { background: var(--color-neutral-100); }
.filter-menu-item.active { color: var(--primary); font-weight: 500; }
.dash-card { margin-bottom: 12px; }

/* Info bar overrides */
.info-bar { align-items: center; padding: 20px; gap: 20px; border-radius: 4px; overflow: visible; }
.info-bar-section { gap: 20px; padding: 0; flex: 1 1 0; min-width: 0; }
.info-bar-divider { height: 64px; align-self: auto; background: var(--color-neutral-200); }
.info-bar-icon { width: 64px; height: 64px; background: var(--color-neutral-100); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.info-bar-icon .dash-provider-letter { font-size: 24px; font-weight: 600; color: var(--text-subtle); line-height: 1; }
.info-bar-meta { min-width: 0; }
.info-bar-label { font-size: 14px; font-weight: 400; line-height: 16px; color: var(--text-subtle); text-transform: none; letter-spacing: normal; }
.info-bar-value { gap: 8px; min-width: 0; font-size: 14px; font-weight: 500; line-height: 16px; height: 32px; padding: 8px 0; display: flex; align-items: center; box-sizing: border-box; }
.info-bar-value-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }

/* Page header overrides */
.page-header { margin-bottom: 20px; padding: 0; }
.page-title-row { margin-bottom: 20px; }
.page-header .page-title-row { margin-bottom: 0; }
.breadcrumb-item { background: none; border: none; padding: 0; }
.skeleton-text { width: 120px; height: 16px; background: var(--color-neutral-300); border-radius: 4px; }
.skeleton-block { width: 120px; height: 32px; background: var(--color-neutral-200); border-radius: 4px; }

/* Text button overrides */
.btn-text { padding: 0; height: auto; gap: 8px; background: none; line-height: 16px; text-decoration: none; }
.btn-text:hover { background: none; text-decoration: none; color: var(--color-blue-900); }
.audit-card-actions .btn-text { height: auto; }
.btn-text.skeleton { color: transparent; pointer-events: none; background: var(--color-neutral-200); border-radius: var(--radius); }

/* Checkbox size override */
.cb { width: 16px; height: 16px; min-width: 16px; min-height: 16px; border-radius: 4px; }
.cb svg { width: 16px; height: 16px; }

/* Card title accent */
.audit-card-title .count .accent { color: var(--color-blue-600); }
```

- [ ] **Step 2: Add Dashboard chart & widget CSS**

Append — lines 1140-1614:

```css
/* ===== JOB SUMMARY ===== */
.dash-job-summary-body { display: flex; align-items: stretch; gap: 32px; padding: 20px; }
.dash-donut-lockup { flex: 1 1 0; display: flex; align-items: center; gap: 20px; }
.dash-donut-svg { width: 44px; height: 44px; flex-shrink: 0; }
.dash-donut-legend { display: flex; flex-direction: column; gap: 12px; flex: 1; min-width: 0; }
.dash-legend-row { display: flex; align-items: center; gap: 8px; font-size: 14px; line-height: 16px; }
.dash-legend-marker { width: 14px; height: 14px; margin: 1px; border-radius: 4px; flex-shrink: 0; }
.dash-legend-label { color: var(--text-strong); flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dash-legend-val { color: var(--text-subtle); white-space: nowrap; }
.dash-delta { color: var(--color-blue-600); }

/* ===== SECURITY TREND ===== */
.dash-trend-legend { display: flex; align-items: center; gap: 16px; }
.dash-trend-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-subtle); white-space: nowrap; }
.dash-trend-legend-swatch { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }
.dash-trend-period-tabs { display: flex; border: 1px solid var(--color-neutral-200); border-radius: var(--radius); overflow: hidden; }
.dash-trend-tab {
  padding: 0 10px; height: 28px; border: none; background: transparent;
  font-family: var(--font-sans); font-size: 12px; font-weight: 500;
  color: var(--text-subtle); cursor: pointer; border-right: 1px solid var(--color-neutral-200);
}
.dash-trend-tab:last-child { border-right: none; }
.dash-trend-tab:hover { background: var(--hover-subtle); color: var(--text-strong); }
.dash-trend-tab.active { background: var(--color-blue-100); color: var(--primary); }
.dash-trend-chart-wrap { display: flex; align-items: stretch; padding: 8px 20px 0; height: 180px; }
.dash-trend-y-axis {
  display: flex; flex-direction: column; justify-content: space-between;
  padding-bottom: 24px; padding-right: 8px;
  font-size: 10px; color: var(--text-muted); text-align: right;
  flex-shrink: 0; min-width: 32px;
}
.dash-trend-chart {
  flex: 1; display: flex; align-items: flex-end; gap: 8px;
  border-left: 1px solid var(--border-100); border-bottom: 1px solid var(--border-100);
  padding: 0 12px;
}
.dash-trend-col { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 4px; height: 100%; }
.dash-trend-stacked { width: 100%; display: flex; flex-direction: column-reverse; align-items: stretch; gap: 1px; max-height: 130px; min-height: 0; flex: 1; justify-content: flex-start; }
.dash-trend-seg { width: 100%; min-height: 2px; border-radius: 1px; transition: height 0.3s ease; }
.dash-trend-threats { background: var(--color-red-600); }
.dash-trend-dataloss { background: var(--color-teal-600); }
.dash-trend-sanitized { background: var(--color-blue-600); }
.dash-trend-x-label { font-size: 10px; color: var(--text-muted); white-space: nowrap; padding-bottom: 4px; }

/* ===== REMEDIATION ACTIONS ===== */
.dash-rem-body { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-card); }
.dash-rem-item { background: var(--surface-card); display: flex; align-items: center; gap: 16px; padding: 20px 24px; cursor: pointer; transition: background 0.15s; }
.dash-rem-item:hover { background: var(--hover-subtle); }
.dash-rem-ring-wrap { position: relative; width: 52px; height: 52px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.dash-rem-ring-svg { width: 52px; height: 52px; transform: rotate(-90deg); position: absolute; top: 0; left: 0; }
.dash-rem-ring-track { fill: none; stroke: var(--color-neutral-100); stroke-width: 4; }
.dash-rem-ring-fill { fill: none; stroke-width: 4; stroke-linecap: round; transition: stroke-dasharray 0.3s ease; }
.dash-rem-ring-pct { font-size: 11px; font-weight: 500; color: var(--text-strong); position: relative; z-index: 1; line-height: 1; }
.dash-rem-label { font-size: 14px; font-weight: 500; color: var(--text-strong); }
.dash-rem-desc { font-size: 12px; color: var(--text-muted); line-height: 1.4; margin-top: 2px; }
.dash-rem-item > div:last-child { display: flex; flex-direction: column; gap: 2px; min-width: 0; }

/* ===== FILE TYPE DISTRIBUTION ===== */
.dash-filetype-body { display: flex; gap: 0; min-height: 240px; }
.dash-treemap { flex: 1.4; display: flex; flex-direction: column; gap: 2px; padding: 16px; min-width: 0; }
.dash-treemap-row { display: flex; gap: 2px; min-height: 0; }
.dash-treemap-cell { display: flex; flex-direction: column; justify-content: flex-end; padding: 6px 8px; border-radius: 3px; cursor: pointer; transition: opacity 0.15s; overflow: hidden; min-width: 0; }
.dash-treemap-cell:hover { opacity: 0.85; }
.dash-tm-name { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.9); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2; }
.dash-tm-count { font-size: 10px; color: rgba(255,255,255,0.65); font-variant-numeric: tabular-nums; }

/* Treemap cell colors */
.dash-tm-archive { background: var(--color-neutral-600); }
.dash-tm-application { background: var(--color-red-600); }
.dash-tm-executable { background: var(--color-neutral-400); }
.dash-tm-graphical { background: var(--color-red-400); }
.dash-tm-diskimage { background: var(--color-neutral-300); }
.dash-tm-openssl { background: var(--color-neutral-500); }
.dash-tm-pdf { background: var(--color-red-500); }
.dash-tm-text { background: #aaaaaa; }
.dash-tm-other { background: var(--color-neutral-200); }
.dash-tm-diskimage .dash-tm-name, .dash-tm-other .dash-tm-name { color: var(--text-subtle); }
.dash-tm-diskimage .dash-tm-count, .dash-tm-other .dash-tm-count { color: var(--text-muted); }

/* Right legend panel */
.dash-filetype-legend { flex: 1; border-left: 1px solid var(--border-card); display: flex; flex-direction: column; padding: 16px 20px; min-width: 0; }
.dash-filetype-legend-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid var(--border-100); }
.dash-filetype-legend-title { font-size: 13px; font-weight: 500; color: var(--text-strong); }
.dash-filetype-legend-total { font-size: 13px; font-weight: 500; color: var(--primary); }
.dash-filetype-legend-rows { display: flex; flex-direction: column; gap: 10px; }
.dash-filetype-legend-row { display: flex; align-items: center; gap: 10px; }
.dash-ftl-icon { width: 24px; height: 24px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dash-ftl-icon svg { width: 14px; height: 14px; }
.dash-ftl-archive { background: var(--color-neutral-100); color: var(--color-neutral-700); }
.dash-ftl-app { background: var(--color-red-100); color: var(--color-red-700); }
.dash-ftl-exe { background: var(--color-neutral-100); color: var(--color-neutral-600); }
.dash-ftl-img { background: var(--color-red-100); color: var(--color-red-500); }
.dash-ftl-pdf { background: var(--color-red-100); color: var(--color-red-600); }
.dash-ftl-other { background: var(--color-neutral-100); color: var(--color-neutral-500); }
.dash-ftl-info { flex: 1; display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.dash-ftl-name { font-size: 12px; color: var(--text-subtle); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dash-ftl-bar-wrap { height: 4px; background: var(--color-neutral-100); border-radius: 2px; overflow: hidden; }
.dash-ftl-bar { height: 100%; border-radius: 2px; transition: width 0.3s ease; }
.dash-ftl-val { font-size: 12px; font-weight: 500; color: var(--text-strong); font-variant-numeric: tabular-nums; white-space: nowrap; }

/* ===== JOB TYPE TAGS ===== */
.dash-job-type-tag { display: inline-flex; align-items: center; height: 22px; padding: 0 8px; font-size: 11px; font-weight: 500; border-radius: var(--radius); white-space: nowrap; }
.dash-jt-scan-now { background: var(--color-blue-100); color: var(--color-blue-800); border: 1px solid var(--color-blue-200); }
.dash-jt-scheduled { background: var(--color-neutral-100); color: var(--color-neutral-700); border: 1px solid var(--color-neutral-200); }
.dash-jt-realtime { background: var(--color-teal-100); color: var(--color-teal-800); border: 1px solid var(--color-teal-200); }
.dash-schedule-cell { display: flex; align-items: center; gap: 6px; font-size: 14px; color: var(--text-strong); }
```

- [ ] **Step 3: Commit**

```bash
cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui
git add apps/mdss/src/app.css
git commit -m "feat(mdss): port dashboard CSS (charts, treemap, remediation rings, job tags)"
```

---

### Task 8: Reports Column Pinning, Table Infrastructure & Sticky Headers

**Files:**
- Modify: `apps/mdss/src/app.css`

- [ ] **Step 1: Add column pinning & table infrastructure CSS**

Append — lines 912-968:

```css
/* ===== REPORTS TABLE: DYNAMIC COLUMN PINNING ===== */
#reportsTable .rpt-pinned { position: sticky; z-index: 2; background: var(--surface-card); }
#reportsTable thead th.rpt-pinned { z-index: 3; }
#reportsTable tbody tr:hover .rpt-pinned { background: var(--surface-hover); }
#reportsTable tbody tr.selected .rpt-pinned { background: var(--color-blue-100); }
#reportsTable tbody tr.selected:hover .rpt-pinned { background: var(--color-blue-200); }
#reportsTable .rpt-pin-edge { border-right: 1px solid var(--color-neutral-200); }
#reportsTable.has-pins .col-cb { border-right: none; }
#reportsTable .audit-table-scroll { scrollbar-width: thin; }
#reportsTable .audit-table-scroll::-webkit-scrollbar { height: 8px; }
#reportsTable .audit-table-scroll::-webkit-scrollbar-thumb { background: var(--color-neutral-300); border-radius: 4px; }
#reportsTable .audit-table-scroll::-webkit-scrollbar-track { background: var(--surface-bg); margin-left: var(--rpt-pin-margin, 48px); margin-right: 48px; }

/* Dropdown pin header & disabled state */
.col-dropdown-pin-header { display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
.col-dropdown-pin-count { font-weight: 500; color: var(--text-subtle); }
.col-dropdown-item.disabled { opacity: 0.35; pointer-events: none; }

/* TABLE CELL RIGHT PADDING */
th:has(+ .col-action) { padding-right: 20px !important; }
td:last-child:not(.col-action):not(.col-expand):not(.col-cb):not(.col-details) { padding-right: 20px !important; }
th:last-child:not(.col-action):not(.col-expand):not(.col-cb):not(:empty) { padding-right: 20px !important; }

/* ACCOUNTS CARD TITLE BOLD */
#accountsListView .audit-card-title h3 { font-weight: 600; }

/* THEAD COMPACT ON SCROLL */
.audit-table-scroll thead th,
.table-scroll thead th { transition: height 0.2s ease; }
.audit-table-scroll thead.compact th,
.table-scroll thead.compact th { height: 40px; }

/* COL-DETAILS WITH INLINE COPY */
td.col-details { display: flex; align-items: center; gap: 8px; overflow: hidden; }
.col-details-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
td.col-details .copy-btn { flex-shrink: 0; }

/* COL-EXPAND */
.col-expand { width: 1% !important; white-space: nowrap; }
.audit-table .col-expand, .data-table .col-expand, .table-fixed .col-expand,
th.col-expand, td.col-expand { padding: 0 12px 0 20px !important; }
.table-fixed .col-expand { width: 48px !important; min-width: 48px; max-width: 48px; }

/* COL-CB */
.col-cb, .audit-table .col-cb, .table-fixed .col-cb { padding: 0 12px 0 20px !important; }

/* PAGINATION HEIGHT */
.audit-pagination { height: 56px !important; min-height: 56px !important; }

/* ===== STICKY TABLE HEADERS ===== */
.table-scroll thead th,
.audit-table-scroll thead th { position: sticky; top: 0; z-index: 4; background: var(--surface-card); }
.table-fixed thead th.col-cb,
.table-fixed thead th.col-action,
.table-fixed thead th.col-pinned,
.table-fixed thead th.col-user-pinned,
#reportsTable thead th.rpt-pinned { z-index: 5; }

/* Multi-table pages: constrained scroll containers */
#usersPage .table-scroll,
#inventoryPage .table-scroll,
#inventoryPage .audit-table-scroll { max-height: 500px; overflow: auto; }

/* ===== FILTER DROPDOWN (Units tab) ===== */
.filter-dropdown {
  position: absolute; top: calc(100% + 4px); right: 0; z-index: 200;
  min-width: 200px; background: var(--surface-card); border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius); box-shadow: var(--shadow-3); padding: 0; font-size: 14px;
}
.filter-dropdown-header { padding: 10px 12px 6px; font-weight: 600; font-size: 13px; color: var(--text-strong); border-bottom: 1px solid var(--border-100); }
.filter-dropdown-item { display: flex; align-items: center; gap: 8px; padding: 6px 12px; cursor: pointer; color: var(--text-body); font-size: 13px; white-space: nowrap; }
.filter-dropdown-item:hover { background: var(--color-neutral-100); }
.filter-dropdown-footer { display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 8px 12px; border-top: 1px solid var(--border-100); }
```

- [ ] **Step 2: Commit**

```bash
cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui
git add apps/mdss/src/app.css
git commit -m "feat(mdss): port column pinning, sticky headers, filter dropdown CSS"
```

---

### Task 9: Dark Mode Overrides

**Files:**
- Modify: `apps/mdss/src/app.css`

- [ ] **Step 1: Add all dark mode overrides**

Append all `[data-theme="dark"]` rules, translated to `.dark`:

```css
/* ===== DARK MODE (product-specific overrides) ===== */
/* Translate [data-theme="dark"] → .dark (Tailwind v4 custom variant) */

.dark body { background: var(--surface-bg); color: var(--text-subtle); }
.dark .sidebar { background: var(--header-bg); border-color: var(--border-card); }
.dark .sidebar .nav-item { color: var(--text-subtle); }
.dark .sidebar .nav-item.active { background: rgba(29,107,252,0.25); color: var(--text-strong); }
.dark .sidebar .nav-item:hover:not(.active) { background: rgba(255,255,255,0.04); }
.dark .header { background: var(--surface-bg); border-color: var(--border-card); }
.dark .header .header-logo-text span { color: var(--text-strong); }
.dark .sidebar-toggle { color: var(--text-strong); }
.dark .sidebar-toggle:hover { background: var(--hover-default); color: var(--text-strong); }
.dark .settings-card { background: var(--surface-card); border-color: var(--border-card); }
.dark .card-header { border-color: var(--border-card); }
.dark .card-header h2 { color: var(--text-strong); }
.dark .btn-save { background: var(--surface-bg); border-color: var(--color-neutral-200); color: var(--text-muted); }
.dark .settings-card.dirty .btn-save { background: var(--primary); color: var(--text-on-fill); border-color: var(--primary); }
.dark .btn-discard { border-color: var(--color-neutral-200); color: var(--text-subtle); }
.dark .headers-table-head { background: var(--surface-card); color: var(--text-subtle); border-color: var(--border-card); }
.dark .headers-table-row { border-color: var(--border-card); color: var(--text-subtle); }
.dark .promo-banner { background: rgba(29,107,252,0.08); border-color: rgba(29,107,252,0.2); }
.dark .warning-banner { background: rgba(232,123,30,0.08); border-color: rgba(232,123,30,0.2); }
.dark .pool-card-header { border-color: var(--border-card); }
.dark .pool-card-header h2 { color: var(--text-strong); }
.dark .sidebar-footer { border-color: var(--border-card); }
.dark .sidebar-footer-brand path { fill: var(--text-on-fill); }
.dark .users-empty-icon { background: rgba(255,255,255,0.06); }
.dark .btn-export { border-color: var(--color-neutral-200); color: var(--text-subtle); }
.dark .audit-detail-row td { color: var(--text-muted); }

/* Dark mode — Workflows */
.dark .wf-canvas { background-color: var(--color-neutral-1100); background-image: radial-gradient(circle at 1px 1px, rgba(169, 178, 196, 0.08) 1px, transparent 1px); }
.dark .wf-node-box { background: var(--surface-card); border-color: var(--color-neutral-200); }
.dark .wf-rem-col { background: var(--surface-card); border-color: var(--color-neutral-200); }
.dark .wf-action-btn { background: var(--color-neutral-900); }
.dark .wf-action-btn:hover { background: var(--color-neutral-800); }
.dark .wf-action-btn.active { background: rgba(29,107,252,0.15); border-color: var(--primary); }
.dark .wf-rem-tag.keep { background: var(--color-neutral-900); color: var(--color-neutral-400); }
.dark .wf-rem-tag.copy, .dark .wf-rem-tag.move { background: rgba(29,107,252,0.15); color: var(--color-blue-400); }
.dark .wf-rem-tag.delete, .dark .wf-rem-tag.failed { background: rgba(212,0,49,0.15); color: var(--color-red-400); }
.dark .wf-storage-tag { background: var(--color-neutral-900); color: var(--text-strong); }
.dark .wf-tag-field-value, .dark .wf-verdict-input { background: var(--surface-bg); border-color: var(--color-neutral-200); color: var(--text-strong); }

/* Dark mode — Inventory */
.dark .inv-promo-img { background: linear-gradient(135deg, #0d1b2a 0%, #1d6bfc 100%); }

/* Dark mode — Account Detail */
.dark .acct-donut-dot { opacity: 0.8; }

/* Dark mode — Reports column pinning */
.dark #reportsTable .rpt-pinned { background: var(--surface-card); }
.dark #reportsTable tbody tr:hover .rpt-pinned { background: var(--surface-hover); }
.dark #reportsTable tbody tr.selected .rpt-pinned { background: rgba(29,107,252,0.10); }
.dark #reportsTable tbody tr.selected:hover .rpt-pinned { background: rgba(29,107,252,0.16); }

/* Dark mode — Sandbox verdict */
.dark .rpt-sandbox-verdict { background: rgba(220,38,38,0.08); }
.dark .rpt-warning-banner { background: rgba(234,179,8,0.08); border-color: rgba(234,179,8,0.2); }

/* Dark mode — Dashboard */
.dark .info-bar-icon { background: var(--color-neutral-800); }
.dark .btn-text:hover { background: none; color: var(--color-blue-400); }
.dark .btn-text.skeleton { background: var(--color-neutral-800); }
.dark .dash-donut-track { stroke: var(--color-neutral-800); }
.dark .dash-donut-sep { background: var(--border-card); }
.dark .dash-trend-chart { border-color: var(--color-neutral-200); }
.dark .dash-rem-body { background: var(--border-card); }
.dark .dash-rem-item { background: var(--surface-card); }
.dark .dash-rem-item:hover { background: var(--hover-default); }
.dark .dash-rem-ring-track { stroke: var(--color-neutral-800); }
.dark .dash-filetype-legend { border-color: var(--border-card); }
.dark .dash-filetype-legend-header { border-color: var(--color-neutral-200); }
.dark .dash-ftl-bar-wrap { background: var(--color-neutral-800); }
.dark .dash-ftl-archive { background: var(--color-neutral-800); color: var(--color-neutral-400); }
.dark .dash-ftl-app { background: rgba(212,0,49,0.12); color: var(--color-red-400); }
.dark .dash-ftl-exe { background: var(--color-neutral-800); color: var(--color-neutral-400); }
.dark .dash-ftl-img { background: rgba(212,0,49,0.1); color: var(--color-red-400); }
.dark .dash-ftl-pdf { background: rgba(212,0,49,0.1); color: var(--color-red-400); }
.dark .dash-ftl-other { background: var(--color-neutral-900); color: var(--color-neutral-500); }
.dark .btn-menu:hover { border-color: var(--color-neutral-400); }
.dark .btn-menu.active { border-color: var(--color-blue-400); }
.dark .btn-menu.active:hover { border-color: var(--color-blue-400); }
.dark .btn-menu.skeleton { background: var(--color-neutral-800); }
.dark .filter-menu { background: var(--surface-card); border-color: var(--color-neutral-200); }
.dark .filter-menu-item:hover { background: var(--color-neutral-800); }
.dark .dash-trend-period-tabs { border-color: var(--color-neutral-200); }
.dark .dash-trend-tab { border-color: var(--color-neutral-200); color: var(--text-muted); }
.dark .dash-trend-tab.active { background: rgba(29,107,252,0.12); color: var(--primary); }
.dark .dash-jt-scan-now { background: rgba(29, 107, 252, 0.12); color: var(--color-blue-400); border-color: rgba(29, 107, 252, 0.2); }
.dark .dash-jt-scheduled { background: rgba(255,255,255,0.05); color: var(--color-neutral-400); border-color: var(--color-neutral-200); }
.dark .dash-jt-realtime { background: rgba(0, 180, 160, 0.1); color: var(--color-teal-400); border-color: rgba(0, 180, 160, 0.2); }
.dark .filter-dropdown-item:hover { background: var(--color-neutral-800); }

/* Dark mode — Sticky headers */
.dark .table-scroll thead th,
.dark .audit-table-scroll thead th { background: var(--surface-card); }
```

- [ ] **Step 2: Commit**

```bash
cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui
git add apps/mdss/src/app.css
git commit -m "feat(mdss): port all dark mode CSS overrides (.dark class)"
```

---

### Task 10: Responsive CSS

**Files:**
- Modify: `apps/mdss/src/app.css`

- [ ] **Step 1: Add all responsive breakpoints**

Append at the END of `app.css` (after all dark mode rules):

```css
/* ===== RESPONSIVE BREAKPOINTS ===== */

@media (prefers-reduced-motion: reduce) {
  .sidebar { transition: none; }
}

@media (max-width: 1460px) {
  .content { padding: 20px; }
}

@media (max-width: 1200px) {
  .dash-rem-body { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 1024px) {
  .sidebar { width: var(--sidebar-collapsed); }
  .sidebar .nav-item { padding: 8px 12px; }
  .sidebar .nav-text { opacity: 0; pointer-events: none; }
  .sidebar .sidebar-footer { opacity: 0; pointer-events: none; }
}

@media (max-width: 900px) {
  .dash-job-summary-body { flex-direction: column; }
  .dash-card .audit-card-title .count { display: none; }
  .dash-filetype-body { flex-direction: column; }
  .dash-filetype-legend { border-left: none; border-top: 1px solid var(--border-card); }
  .dash-rem-body { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .sidebar { display: none; }
  .app.sidebar-open .sidebar {
    display: flex;
    position: fixed;
    top: 56px; left: 0; bottom: 0;
    width: 260px;
    z-index: 1500;
    box-shadow: 4px 0 24px rgba(0,0,0,0.12);
  }
  .app.sidebar-open .sidebar .nav-text { opacity: 1; pointer-events: auto; }
  .app.sidebar-open .sidebar .nav-item { padding: 8px 16px; }
  .app.sidebar-open .sidebar .sidebar-footer { opacity: 1; pointer-events: auto; }
  .app.sidebar-open .sidebar-mobile-overlay {
    display: block;
    position: fixed; inset: 0; top: 56px;
    background: var(--overlay-medium);
    z-index: 1499;
  }
  .sidebar-mobile-overlay { display: none; }
  .content { padding: 16px; }
  .header-logo-text { display: none; }
  #usersPage .table-scroll,
  #inventoryPage .table-scroll,
  #inventoryPage .audit-table-scroll { max-height: 350px; }

  /* Page header — title left, buttons stacked below */
  .page-title-row { flex-direction: column; align-items: flex-start; height: auto; gap: 20px; }
  .page-header-actions { flex-wrap: wrap; }

  /* Info-bar — stack sections vertically */
  .info-bar { flex-direction: column; align-items: flex-start; gap: 32px; }
  .info-bar-divider { display: none; }
  .info-bar-section { width: 100%; }

  /* Banner — stack text and actions */
  .banner-content { flex-wrap: wrap; }
  .banner-actions { width: 100%; }

  /* Tables — card full-width, content scrolls */
  .data-table, .pool-table { display: block; overflow-x: auto; }

  /* Inputs — full width */
  .input-field, .select-field { width: 100% !important; max-width: 100% !important; }
  .form-row { flex-direction: column; }
  .form-value { width: 100%; }

  /* Tabs — scroll when overflowing */
  .tab-bar { overflow-x: auto; flex-wrap: nowrap; }
}

@media (max-width: 600px) {
  .dash-trend-chart-wrap { height: 140px; }
  .dash-trend-period-tabs { display: none; }
  .dash-trend-legend { flex-wrap: wrap; gap: 8px; }
}

@media (max-width: 480px) {
  .content { padding: 12px; }
  .card-content { padding: 16px; column-gap: 8px; row-gap: 16px; }
  .card-header { padding: 0 16px; }
  .page-title { font-size: 20px; }
  .header { padding: 0 12px; }
  .headers-input-row { flex-direction: column; }
  .headers-input-row .input-field { width: 100%; }
  .pool-card-header { flex-direction: column; align-items: flex-start; gap: 8px; padding: 12px 16px; height: auto; min-height: auto; }
  .pool-card-header-right { flex-wrap: wrap; }
}
```

- [ ] **Step 2: Verify full CSS compiles and pages render**

Run: `cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui && pnpm --filter @opswat/mdss dev`
Expected: Dev server starts, no compilation errors. Open in browser and verify the pages render (they'll still look the same since the page components use Tailwind utilities, but the CSS classes are now available for the page rewrites in Phase 2/3).

- [ ] **Step 3: Commit**

```bash
cd /Users/elvijsvilevics/Documents/Cloude/opswat-ui
git add apps/mdss/src/app.css
git commit -m "feat(mdss): port responsive CSS breakpoints (1460, 1200, 1024, 900, 768, 600, 480px)"
```

---

## Verification

After all tasks are complete:

1. **CSS compiles without errors** — `pnpm --filter @opswat/mdss dev` starts cleanly
2. **Line count** — `app.css` should be ~1,700+ lines (4 import lines + ~1,660 ported CSS + section headers)
3. **All classes available** — Spot-check by temporarily adding `className="settings-card dirty"` to a div and verifying styles apply
4. **Dark mode** — Toggle dark mode in the app and verify `.dark` rules apply (check sidebar/header background changes)
5. **No duplicate styles** — Verify no BL styles were accidentally duplicated (search for patterns like `.data-table` base styles, `.modal-overlay`, etc.)
