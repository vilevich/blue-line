# Tables

Tables display structured data in rows and columns. Blue Line uses a two-type table system: **small tables** for simple data (up to 5 columns) and **big tables** for complex data (6+ columns) with horizontal scrolling and pinned columns.

## Anatomy

### Shared structure

- **`.audit-card`** -- Card wrapper providing background, border, border-radius, and shadow
- **Card header** -- `.card-header` (simple) or `.audit-card-header` (with bulk actions, search, filters)
- **`.data-table`** -- The `<table>` element with all base table styles
- **`<thead>` / `<th>`** -- Column headers (56px tall, 14px medium weight, includes filter icon slot)
- **`<tbody>` / `<td>`** -- Data cells (56px tall, 14px regular weight, text truncation)
- **`.audit-pagination`** -- Pagination bar at the card bottom

### Big table additions

- **`.table-scroll`** -- Overflow wrapper around the `<table>` enabling horizontal scroll
- **`.table-fixed`** -- Added to `.data-table` to enable `table-layout: fixed` and pinned columns
- **`.col-cb`** -- Checkbox column, sticky left (48px)
- **`.col-pinned`** -- Name/identifier column, sticky left (after checkbox if present)
- **`.col-action`** -- Action column, sticky right (56px)

### Card header variants

| Variant | Class | Use Case |
|---------|-------|----------|
| Simple header | `.card-header` | Settings cards, generic cards. Title + optional action buttons. |
| Header with description | `.card-header-with-desc` | Cards that need a subtitle below the title. |
| Data table header | `.audit-card-header` | Audit, Jobs, Workflows, Inventory pages. Supports title, count, search, filter, bulk actions. |
| Header with description | `.audit-card-header.with-desc` | Data table header variant with subtitle row. |
| Selected state | `.audit-card-header.selected` | Blue background; hides title/actions, shows `.card-bulk-actions`. |

## Variants

### Two-type system

| Type | Classes | When to Use | Layout |
|------|---------|-------------|--------|
| Small table | `.data-table` | 5 or fewer columns, no horizontal scroll needed | `width: 100%`, auto column sizing |
| Big table | `.data-table.table-fixed` inside `.table-scroll` | 6+ columns, needs horizontal scroll and pinned columns | `table-layout: fixed`, explicit `%` widths on `<th>` |

### Column types

| Column | Class | Behavior |
|--------|-------|----------|
| Standard | (none) | Default padding and text truncation |
| Checkbox | `.col-cb` | 48px, sticky left, center-aligned. Contains a `.cb` checkbox. |
| Pinned | `.col-pinned` | Sticky left (offset 48px when preceded by `.col-cb`). Has right border separator. |
| Action | `.col-action` | 56px, sticky right (in big tables) or fixed-width (in small tables). Center-aligned. |

### Row action patterns

| Pattern | Classes | Description |
|---------|---------|-------------|
| Three-dot menu | `.row-action-btn` + `.row-action-menu` | 28x28px button with a dropdown menu. Menu items use `.row-action-menu-item`. |
| Inline menu | `.row-action-menu--inline` | Positioned absolutely from the button, not fixed to viewport. |
| Multi-action cell | `.col-actions-cell` | Flex container with multiple icon buttons in a row. |

### Audit table

The `.audit-table` is a specialized variant for audit log data with predefined column classes:

- `.col-expand` -- 56px expand/collapse trigger
- `.col-user` -- Min 150px user column
- `.col-level` -- 100px log level
- `.col-category` -- 130px category
- `.col-type` -- Min 180px event type
- `.col-date` -- Min 180px timestamp
- `.col-details` -- 120-200px, truncated details
- `.col-copy` -- 56px copy action

## States

### Row states

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Default | Base `<tr>` | White background (`var(--surface-card)`) |
| Hover | `:hover` on `<tr>` | Background shifts to `var(--surface-hover)` |
| Selected | `.selected` on `<tr>` | Background becomes `var(--blue-100)` |
| Selected + Hover | `.selected` + `:hover` | Background becomes `var(--blue-200)` |

### Header states

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Default | `.audit-card-header` | Standard header with title and actions |
| Selected (bulk mode) | `.audit-card-header.selected` | Blue background (`var(--blue-100)`), title/actions hidden, bulk actions bar shown |

### Filter icon states

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Default | `.filter-icon` | Muted color (`var(--text-muted)`) |
| Hover | `:hover` | Strong color (`var(--text-strong)`) |
| Active (filtered) | `.filter-icon.active` | Primary color (`var(--primary)`) |

### Row action button states

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Default | `.row-action-btn` | Transparent, muted icon |
| Hover | `:hover` | Subtle background, strong icon color |

## Dark Mode

When `[data-theme="dark"]` is set:

- Table headers and cells switch to `var(--surface-card)` (dark card color)
- Header text becomes `var(--text-subtle)`, cell text stays `var(--text-subtle)`
- Borders use `var(--border-card)` (dark variant)
- Row hover uses `var(--surface-hover)` (dark overlay)
- Selected rows use `rgba(29,107,252,0.10)`, selected+hover uses `rgba(29,107,252,0.16)`
- Pinned columns (`.col-cb`, `.col-pinned`, `.col-action`) maintain their backgrounds through dark mode sticky overrides
- Bulk selection header uses `rgba(29,107,252,0.12)` background
- Row action menus get dark surface and border colors

## Accessibility

### Keyboard

- **Tab**: Moves focus through interactive elements in the table (checkboxes, action buttons, links)
- **Space**: Toggles checkbox selection
- **Enter**: Activates row action buttons or links
- **Escape**: Closes open row action menus or column dropdowns

### ARIA

- Use semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements
- Sortable columns should use `aria-sort="ascending|descending|none"` on `<th>`
- The header checkbox (select-all) should have `aria-label="Select all rows"`
- Row checkboxes should have `aria-label="Select [row identifier]"`
- Row action menus should use `aria-expanded="true|false"` on the trigger button
- Row action menus should have `role="menu"` with items as `role="menuitem"`
- Pagination controls should be wrapped in `<nav aria-label="Table pagination">`

### Screen Reader

- Table is announced with its row and column count
- Column headers are read when navigating cells
- Selected rows should be announced via `aria-selected="true"` on `<tr>`
- Bulk action count (e.g. "3 selected") should be a live region (`aria-live="polite"`)

## Usage Guidelines

### Do

- Use **small tables** (`.data-table` only) for 5 or fewer columns
- Use **big tables** (`.data-table.table-fixed` in `.table-scroll`) for 6+ columns
- Set explicit percentage widths on `<th>` elements in big tables
- Always include `.col-action` for rows with contextual actions
- Use `.col-pinned` for the primary identifier column in big tables so users can always see what row they are looking at
- Use `.audit-card-header` with `.card-bulk-actions` when the table supports multi-select
- Keep cell content concise; rely on `text-overflow: ellipsis` for long values
- Match card header padding (20px) with first/last column padding

### Don't

- Don't use `.table-fixed` without wrapping in `.table-scroll` -- the table will overflow its card
- Don't use auto-layout (small table) for 6+ columns -- it will compress columns unreadably
- Don't place interactive elements inside truncated cells -- they may become unreachable
- Don't forget to update pinned column backgrounds on hover/select states if adding custom columns
- Don't use `.audit-table` for non-audit data -- use `.data-table` with appropriate column classes

## Code Examples

### Small table (auto layout, up to 5 columns)

```html
<div class="audit-card">
  <div class="card-header">
    <h2>Scan Pools</h2>
    <button class="btn-outline">Add Pool</button>
  </div>
  <table class="data-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Status</th>
        <th class="col-action"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Default Pool</td>
        <td>Standard</td>
        <td><span class="tag tag-success">Active</span></td>
        <td class="col-action">
          <button class="row-action-btn" aria-label="Row actions">
            <svg><!-- three-dot icon --></svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Big table (fixed layout, 6+ columns, pinned columns)

```html
<div class="audit-card">
  <div class="audit-card-header">
    <div class="audit-card-title">
      <h3>Accounts</h3>
      <span class="count">128</span>
    </div>
    <div class="audit-card-actions">
      <div class="audit-search">
        <svg><!-- search icon --></svg>
        <input type="text" placeholder="Search accounts...">
      </div>
      <button class="btn-primary">Add Account</button>
    </div>
    <!-- Bulk actions (hidden until .selected) -->
    <div class="card-bulk-actions">
      <span class="bulk-count">3 selected</span>
      <div class="card-bulk-divider"></div>
      <button class="btn-text">Delete</button>
      <button class="btn-text">Export</button>
    </div>
  </div>
  <div class="table-scroll">
    <table class="data-table table-fixed">
      <thead>
        <tr>
          <th class="col-cb"><div class="cb" role="checkbox" aria-checked="false" aria-label="Select all"><svg class="cb-check"><!-- check --></svg><svg class="cb-semi"><!-- semi --></svg></div></th>
          <th class="col-pinned" style="width:20%">Account Name</th>
          <th style="width:12%">Provider</th>
          <th style="width:12%">Region</th>
          <th style="width:12%">Status</th>
          <th style="width:15%">Last Scan</th>
          <th style="width:12%">Units</th>
          <th class="col-action"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-cb"><div class="cb" role="checkbox" aria-checked="false"><svg class="cb-check"><!-- check --></svg><svg class="cb-semi"><!-- semi --></svg></div></td>
          <td class="col-pinned">Production AWS</td>
          <td>AWS S3</td>
          <td>us-east-1</td>
          <td><span class="tag tag-success">Connected</span></td>
          <td>2024-01-15 14:32</td>
          <td>1,247</td>
          <td class="col-action">
            <button class="row-action-btn" aria-label="Row actions">
              <svg><!-- three-dot icon --></svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="audit-pagination">
    <div class="audit-pagination-left">
      Rows per page
      <select><option>25</option><option>50</option><option>100</option></select>
    </div>
    <div class="audit-pagination-right">
      <button class="audit-page-btn" disabled aria-label="Previous page">
        <svg><!-- chevron-left --></svg>
      </button>
      <select class="audit-page-select"><option>1 of 6</option></select>
      <button class="audit-page-btn" aria-label="Next page">
        <svg><!-- chevron-right --></svg>
      </button>
    </div>
  </div>
</div>
```

### Row action menu

```html
<td class="col-action">
  <button class="row-action-btn" aria-expanded="false" aria-label="Row actions">
    <svg><!-- three-dot icon --></svg>
  </button>
  <div class="row-action-menu" role="menu">
    <div class="row-action-menu-item" role="menuitem">
      <svg><!-- edit icon --></svg> Edit
    </div>
    <div class="row-action-menu-item" role="menuitem">
      <svg><!-- copy icon --></svg> Duplicate
    </div>
    <div class="row-action-menu-divider"></div>
    <div class="row-action-menu-item danger" role="menuitem">
      <svg><!-- trash icon --></svg> Delete
    </div>
  </div>
</td>
```

### Selected row state

```html
<tr class="selected">
  <td class="col-cb"><div class="cb checked" role="checkbox" aria-checked="true"><svg class="cb-check"><!-- check --></svg><svg class="cb-semi"><!-- semi --></svg></div></td>
  <td class="col-pinned">Staging Azure</td>
  <td>Azure Blob</td>
  <!-- ... -->
</tr>
```

## Tokens Used

| Token | Purpose |
|-------|---------|
| `--surface-card` | Table cell and header background |
| `--surface-hover` | Row hover background |
| `--surface-bg` | Row action menu item hover |
| `--text-strong` | Header text, row action menu text |
| `--text-subtle` | Cell text |
| `--text-muted` | Filter icon default, action button default, pagination text |
| `--border-card` | Cell borders, header bottom border, pinned column separator |
| `--border-200` | Row action menu border, pagination button border |
| `--primary` | Active filter icon, bulk count text |
| `--blue-100` | Selected row background, bulk header background |
| `--blue-200` | Selected row hover background |
| `--danger` | Danger menu item text |
| `--hover-subtle` | Row action button hover background |
| `--shadow-card` | Card outer shadow |
| `--shadow-dropdown` | Row action menu and column dropdown shadow |
| `--radius` | Border-radius on cards, action buttons, menus |
| `--table-pad-left` | First column left padding (20px) |
| `--table-pad-right` | Standard right padding (12px) |
| `--table-pad-right-last` | Last column right padding (20px) |

## Maturity

**Status**: Stable
