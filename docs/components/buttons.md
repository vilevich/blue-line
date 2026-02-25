# Buttons

Buttons trigger actions or navigate the user. Blue Line provides eight button variants that cover primary actions, secondary actions, destructive operations, and icon-only triggers.

## Anatomy

Every button shares a common structure:

- **Root element** -- `<button>` (or `<a>` styled as a button) with the variant class (e.g. `.btn-primary`)
- **Label** -- text content inside the button, 14px medium weight
- **Icon (optional)** -- an inline `<svg>` placed before or after the label
- **Spinner (optional)** -- added via the `.btn-loading` modifier class, which replaces visible content with a CSS spinner

All buttons are 32px tall, use `border-radius: var(--radius)` (4px), and set `font-family: var(--font)`.

## Variants

| Variant | Class | Description |
|---------|-------|-------------|
| Primary | `.btn-primary` | Solid blue fill. The main call-to-action in any context. |
| Outline | `.btn-outline` | Transparent background with a `var(--border-200)` border. Secondary actions. |
| Text | `.btn-text` | No background or border. Tertiary / inline actions. Uses `var(--text-link)` color. |
| Brand | `.btn-brand` | Gradient fill (blue-to-teal). Reserved for marketing or branded CTAs. |
| Icon-only | `.btn-icon` | 32x32 square with a border. Contains only an SVG icon, no text label. |
| Danger | `.btn-danger` | Solid red fill (`var(--danger)`). Destructive actions like delete or revoke. |
| Save | `.btn-save` | Disabled by default (muted text, `pointer-events: none`). Activates via JS when a form becomes dirty. |
| Discard | `.btn-discard` | Hidden by default (`display: none`). Shown alongside Save when a form is dirty. Outline style. |

### Danger modifiers on other variants

Both `.btn-outline` and `.btn-text` accept a `.danger` modifier class:

- `.btn-outline.danger` -- red text and red border
- `.btn-text.danger` -- red text, no border

## States

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Default | Base variant class | Standard appearance for the variant |
| Hover | `:hover` (automatic) | Primary darkens to `var(--primary-hover)`. Outline/Text get subtle background. Brand brightens via `filter: brightness(1.08)`. Danger darkens to `var(--danger-hover)`. |
| Focus | `:focus-visible` | 2px outline in `var(--blue-300)` with 2px offset on all button variants |
| Disabled | `:disabled` or `.disabled` | `opacity: 0.4`, `cursor: not-allowed`, `pointer-events: none` |
| Loading | `.btn-loading` (add to any variant) | Label becomes transparent, a 16px CSS spinner appears centered. `pointer-events: none`. |

### Loading spinner details

- On filled buttons (`.btn-primary`, `.btn-danger`, `.btn-brand`): white spinner border with semi-transparent track
- On non-filled buttons (`.btn-outline`, `.btn-text`, `.btn-icon`): blue spinner using `var(--primary)` with a lighter track

## Dark Mode

All buttons respond automatically to `[data-theme="dark"]` on a parent element. Key changes:

- `.btn-primary` background shifts to `#4d8dff` (lighter blue for contrast)
- `.btn-outline` and `.btn-icon` use dark-mode `var(--border-200)` and `var(--text-subtle)`
- `.btn-text` link color becomes `#6fa3ff`
- Loading spinners on outline/text/icon variants use `rgba(111,163,255,0.2)` track with `var(--text-link)` top color
- Focus rings remain `var(--blue-300)`

## Accessibility

### Keyboard

- **Tab**: Moves focus to the next focusable button
- **Enter** / **Space**: Activates the focused button
- Disabled buttons are removed from the tab order via `pointer-events: none`

### ARIA

- Use semantic `<button>` elements (not `<div>` or `<span>`)
- Icon-only buttons (`.btn-icon`) **must** have `aria-label` describing the action
- Loading buttons should add `aria-busy="true"` and optionally `aria-label="Loading"`
- Disabled buttons should use the `disabled` attribute (not just the `.disabled` class) for screen reader compatibility

### Screen Reader

- Text buttons are announced by their visible label
- Icon-only buttons are announced by their `aria-label`
- Loading state hides text visually but screen readers need `aria-busy="true"` to convey the state

## Usage Guidelines

### Do

- Use `.btn-primary` for the single most important action on a page or card
- Use `.btn-outline` for secondary actions alongside a primary button
- Use `.btn-text` for inline or low-emphasis actions
- Use `.btn-danger` only for irreversible destructive actions (delete, revoke)
- Use `.btn-loading` to indicate async operations and prevent double-clicks
- Always provide `aria-label` on `.btn-icon` buttons
- Pair `.btn-save` and `.btn-discard` together for card dirty-state patterns

### Don't

- Don't place two `.btn-primary` buttons side by side -- demote one to `.btn-outline`
- Don't use `.btn-brand` for standard UI actions -- it is reserved for marketing/brand CTAs
- Don't rely solely on the `.disabled` class -- always use the native `disabled` attribute
- Don't use a `<div>` or `<a>` when a `<button>` is semantically correct
- Don't use `.btn-danger` for non-destructive actions, even if you want red emphasis

## Code Examples

### Primary button

```html
<button class="btn-primary">Create Account</button>
```

### Outline button with icon

```html
<button class="btn-outline">
  <svg><!-- icon SVG --></svg>
  Export
</button>
```

### Text button (danger variant)

```html
<button class="btn-text danger">Remove</button>
```

### Brand button with icon

```html
<button class="btn-brand">
  <svg><!-- icon SVG --></svg>
  Get Started
</button>
```

### Icon-only button

```html
<button class="btn-icon" aria-label="Edit">
  <svg><!-- edit icon --></svg>
</button>
```

### Danger button

```html
<button class="btn-danger">Delete Account</button>
```

### Save / Discard pair (card dirty state)

```html
<div class="card-header-actions">
  <button class="btn-discard">Discard</button>
  <button class="btn-save">Save</button>
</div>
```

### Loading state

```html
<button class="btn-primary btn-loading" aria-busy="true">Saving</button>
```

### Disabled state

```html
<button class="btn-primary" disabled>Submit</button>
```

## Tokens Used

| Token | Purpose |
|-------|---------|
| `--primary` | Primary button background; focus ring base |
| `--primary-hover` | Primary button hover background |
| `--text-on-fill` | Text color on filled buttons (primary, danger, brand) |
| `--text-strong` | Text color on outline and discard buttons |
| `--text-subtle` | Icon-only button default color |
| `--text-link` | Text button color |
| `--text-muted` | Save button (disabled state) text |
| `--danger` | Danger button background |
| `--danger-hover` | Danger button hover background |
| `--border-200` | Outline, icon, save, discard button border |
| `--hover-subtle` | Outline, icon, discard button hover background |
| `--surface-bg` | Save button background |
| `--surface-card` | Save button background base |
| `--radius` | Border radius for all buttons (4px) |
| `--font` | Font family for all button text |
| `--blue-300` | Focus-visible outline color |

## Maturity

**Status**: Stable
