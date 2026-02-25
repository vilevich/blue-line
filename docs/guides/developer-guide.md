# Developer Guide: Consuming Blue Line

How to use the Blue Line design system in your OPSWAT product.

---

## 1. Installation

Add these four tags to your `<head>`, in this order:

```html
<!-- Body font -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

<!-- Blue Line Design System -->
<link rel="stylesheet" href="https://vilevich.github.io/blue-line/tokens.css">
<link rel="stylesheet" href="https://vilevich.github.io/blue-line/components.css">
<link rel="stylesheet" href="https://vilevich.github.io/blue-line/icons.css">
```

Then add your product-specific styles in an inline `<style>` block after the DS links.

---

## 2. Architecture

```
tokens.css      →  CSS custom properties (colors, spacing, typography, radii, shadows)
                    + @font-face (Simplon Norm) + dark mode variable overrides
components.css  →  UI components that reference token variables
                    + colocated dark mode overrides per component
icons.css       →  Icon classes using inline SVG mask-image
```

**Load order matters:** tokens first, then components, then icons. Your product styles go last.

---

## 3. Quick Start: Common Patterns

### Button
```html
<button class="btn-primary">Save</button>
<button class="btn-outline">Cancel</button>
<button class="btn-danger">Delete</button>
<button class="btn-icon" aria-label="Edit">
  <svg class="icon icon-edit"></svg>
</button>
```

### Form Input
```html
<div class="form-row">
  <label class="form-label">Email</label>
  <div class="input-field">
    <input type="email" placeholder="user@example.com">
  </div>
</div>
```

### Table (Small, ≤5 columns)
```html
<table class="data-table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody><tr><td>Item</td><td><span class="tag tag-success">Active</span></td><td>2026-02-26</td></tr></tbody>
</table>
```

### Table (Big, 6+ columns with pinning)
```html
<div class="table-scroll">
  <table class="data-table table-fixed" style="min-width: 1200px">
    <thead>
      <tr>
        <th class="col-pinned col-cb"><div class="cb"></div></th>
        <th class="col-pinned col-name">Name</th>
        <th>Column 3</th>
        <!-- more columns -->
        <th class="col-action"></th>
      </tr>
    </thead>
    <tbody><!-- rows --></tbody>
  </table>
</div>
```

### Modal
```html
<div class="modal-overlay open">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal-header">
      <h2 id="modal-title">Title</h2>
      <button class="modal-close" aria-label="Close"><svg><!-- X --></svg></button>
    </div>
    <div class="modal-body"><!-- content --></div>
    <div class="modal-footer">
      <button class="btn-outline">Cancel</button>
      <button class="btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

### Tags
```html
<span class="tag tag-secure">Clean</span>
<span class="tag tag-alert">Detected</span>
```

---

## 4. Extending Blue Line

When your product needs something Blue Line doesn't provide:

1. Add it to your product's inline `<style>` block (not in Blue Line CSS)
2. Use Blue Line tokens: `var(--primary)`, `var(--space-sm)`, `var(--text-strong)`, etc.
3. Prefix with your product name: `.mdss-custom-widget`, `.metaaccess-sidebar-extra`
4. Include dark mode overrides using `[data-theme="dark"]`
5. If the component stabilizes and other products need it, promote it to Blue Line via PR

---

## 5. Dark Mode Integration

Blue Line dark mode is activated by setting `data-theme="dark"` on the `<html>` element:

```javascript
// Toggle dark mode
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}
```

All Blue Line components auto-adapt. Your product-specific styles need their own `[data-theme="dark"]` overrides.

---

## 6. Responsive Behavior

Blue Line defines four breakpoints:

| Name | Width | What Happens |
|------|-------|-------------|
| Large | 1920px | Full layout |
| Medium | 1440px | Standard layout |
| Small | 1024px | Forms stack vertically, card grids reduce columns |
| Tablet | 768px | Further grid compression |

**Components that auto-adapt:**
- `.cards-grid` reduces from 5 to 3 to 2 to 1 column
- `.form-row` stacks vertically at 1024px
- `.data-table.table-fixed` scrolls horizontally via `.table-scroll` wrapper

**Things you handle:**
- Sidebar collapse/expand logic (JS)
- Page layout at small widths
- Table `min-width` values for your specific column counts

---

## 7. Requesting Changes

Use the GitHub issue templates in the Blue Line repo:

| Need | Template |
|------|----------|
| Found a visual bug | **Bug Report** |
| Need a new component | **Component Request** |
| Found an accessibility problem | **Accessibility Issue** |

Include screenshots, browser info, and theme (light/dark) when reporting bugs.
