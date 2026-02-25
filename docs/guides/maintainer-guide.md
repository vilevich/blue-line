# Maintainer Guide: Reviewing and Governing Blue Line

You are the quality gatekeeper for Blue Line. Every PR must pass your review before it reaches `main` and auto-deploys to GitHub Pages where all OPSWAT products consume it.

---

## 1. The 6-Point Review Checklist

### 1.1 Naming (No Collisions)

Search `components.css` for class names that start with the same prefix as the new component.

**Patterns to follow:**

| Prefix | Component |
|--------|-----------|
| `.btn-*` | Buttons |
| `.tag-*` | Tags |
| `.chip-*` | Chips |
| `.badge-dot-*`, `.badge-number-*` | Badges |
| `.verdict-*` | Verdicts |
| `.severity-*` | Severities |
| `.af-*` | Advanced filters |
| `.avd-*` | Avatar dropdown |
| `.notif-*` | Notifications |
| `.col-*` | Column-related (dropdown, pinned, action) |
| `.slide-panel-*` | Slide panels |
| `.modal-*` | Modals |
| `.audit-*` | Audit/data-table card features |
| `.inv-*` | Inventory provider icons |

**Red flags:**
- Generic bare names like `.active`, `.open`, `.selected` without a component prefix
- Names that match HTML elements or common utility classes
- Names that overlap with product-specific classes in consuming products

### 1.2 Token Usage

Zero hardcoded values. Search the PR diff for:
- `#` followed by hex color -- should be `var(--token-name)` instead
- Bare `px` values for spacing -- should use spacing tokens like `var(--space-sm)`
- Font names -- should use `var(--font)` or `var(--font-brand)`

**Exceptions:** SVG `fill` attributes inside inline data URIs, unique one-off values that genuinely aren't tokens.

### 1.3 Dark Mode

Every color, background, and border must have a `[data-theme="dark"]` override **colocated** immediately after the light-mode rule.

**Check for:**
- Missing dark overrides (any `background`, `color`, `border-color` without a dark variant)
- Overrides placed in a separate section instead of colocated
- Sticky/pinned elements using transparent backgrounds (must use `--surface-card` to prevent content show-through)

### 1.4 Responsive

Test at all four breakpoints:

| Breakpoint | Width | What to Check |
|------------|-------|---------------|
| Large | 1920px | Full layout, no wasted space |
| Medium | 1440px | Standard layout, no overflow |
| Small | 1024px | Forms stack, tables scroll, sidebar may collapse |
| Tablet | 768px | Everything still usable, no horizontal overflow on page |

### 1.5 Accessibility

| Requirement | How to Verify |
|-------------|---------------|
| `:focus-visible` state | Tab through the component -- blue 2px outline appears |
| Touch target >= 24px | Check `min-width`/`min-height` in CSS |
| No color-only indicators | Cover the screen in grayscale -- states should still be distinguishable |
| Contrast >= 4.5:1 (text) | Use Chrome DevTools color picker |
| Contrast >= 3:1 (UI elements) | Check borders, icons against their backgrounds |
| `--text-muted-accessible` | Placeholder text and hint text should use this, not `--text-muted` |

### 1.6 Documentation

- [ ] Example added to `index.html` in the correct section
- [ ] Class reference table updated if new classes were added
- [ ] `docs/components/[name].md` created or updated
- [ ] `CHANGELOG.md` updated under `[Unreleased]`

---

## 2. Collision Detection Process

When reviewing a PR with a new component:

1. **Search** `components.css` for class names that start with the same prefix
2. **Search** consuming product repos (e.g., MDSS `index.html`) for product-specific classes that overlap
3. **If overlap found:**
   - Compare both implementations side-by-side
   - Pick the one that follows DS conventions better
   - Or merge the best parts of both
   - Document the decision in the PR comments
4. **If the product class is better:** merge it into Blue Line, then remove it from the product

---

## 3. Z-Index Stack Reference

| Element | z-index | Notes |
|---------|---------|-------|
| Table pinned columns (body) | 2 | `.col-pinned`, `.col-action` |
| Table pinned columns (header) | 3 | `thead .col-pinned` |
| Modal overlay | 2000 | `.modal-overlay` |
| Slide panel | 2001 | `.slide-panel` |
| Avatar dropdown | 3000 | `.avatar-dropdown` |
| Row action menu | 9999 | `.row-action-menu` (fixed position) |
| Skip link | 9999 | `.skip-link` |

**Rule:** Don't add new z-index values without checking this stack. If you need a new layer, add it here.

---

## 4. Common Issues to Catch

| Issue | What It Looks Like | Fix |
|-------|-------------------|-----|
| Specificity creep | `.parent .child .deeply-nested` | Flatten to `.component-child` |
| `!important` | `color: red !important` | Remove; only allowed in `prefers-reduced-motion` block |
| ID selectors | `#my-component` | Use class selectors instead |
| Missing dark mode | Background set but no `[data-theme="dark"]` override | Add colocated dark override |
| Hardcoded colors | `color: #6b7a90` | Replace with `var(--text-muted)` |
| Opacity for disabled | `opacity: 0.3` | Use at least `0.5` for readability |

---

## 5. Release Process

1. Accumulate changes under `[Unreleased]` in `CHANGELOG.md`
2. When ready to release:
   - Decide version bump: major (breaking), minor (new components), patch (fixes)
   - Move `[Unreleased]` entries to a new version heading (e.g., `## [2.3.0] - 2026-03-15`)
   - Update version in `components.css` header comment
3. Merge to `main` -- auto-deploys to GitHub Pages
4. Verify the live docs site: https://vilevich.github.io/blue-line/
5. Verify a consuming product (e.g., MDSS) still works correctly

---

## 6. Governance

### Who Approves What

| Change Type | Approver |
|-------------|----------|
| New component | Design system owner |
| Variant addition | Design system owner |
| Bug fix / patch | Any maintainer |
| Breaking change | Design system owner + affected product teams |
| Token value change | Design system owner (affects all products) |

### Deprecation Policy

1. Mark component as deprecated in `CHANGELOG.md` and `docs/components/[name].md`
2. Add `/* DEPRECATED: Use [replacement] instead */` comment in CSS
3. Keep for **2 quarters** (6 months) minimum
4. Remove in next major version with migration guide
