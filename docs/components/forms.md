# Forms

Form components provide structured input patterns for settings pages, modals, and panels. Blue Line forms use a label-value layout with consistent 32px-tall controls.

## Anatomy

A form is built from these structural pieces:

- **`.form-row`** -- Flex container that places a label and value side by side (`gap: 12px`, `align-items: center`)
- **`.form-label`** -- Fixed-width label (266px) with optional help icon
- **`.form-value`** -- Flexible content area holding the input control(s)
- **Input controls** -- `.input-field`, `.select-field`, `.toggle-switch`, `.radio-group`, `.file-upload-field`, or `.cb` (checkbox)

All form controls are 32px tall and use `var(--font)` at 14px.

## Variants

### Layout

| Variant | Class | Description |
|---------|-------|-------------|
| Standard row | `.form-row` | Label left, value right, vertically centered |
| Top-aligned row | `.form-row.form-row--top` | Label and value aligned to flex-start (for tall content like radio groups) |
| Inline value | `.form-value--inline` | Value children laid out in a row instead of a column |

### Input Controls

| Variant | Class | Description |
|---------|-------|-------------|
| Text input | `.input-field` | Bordered container with an inner `<input>`. Supports optional clear button (`.input-clear`) and password eye icon (`.input-eye`). |
| Select | `.select-field` | Applied to a native `<select>`. Max-width 340px. Custom chevron via background SVG. |
| Input with suffix | `.input-with-suffix` | Composite: `.input-field` + `.input-suffix` (e.g. "days"). Max-width 180px. |
| File upload | `.file-upload-field` | Bordered container with `.file-upload-text` and `.file-upload-icon`. Hidden `<input type="file">` inside. Max-width 340px. |
| Toggle switch | `.toggle-switch` | 28x16px pill toggle with `.toggle-thumb`. Activated by adding `.active` class. Wrapped in `.toggle-row` with optional `.toggle-label`. |
| Radio group | `.radio-group` > `.radio-option` | Vertical list of options. Each option has `.radio-circle` and `.radio-label`. Selected state via `.selected` class on `.radio-option`. |
| Radio inline | `.radio-inline` | Horizontal radio layout variant (replaces `.radio-group`). |
| Checkbox | `.cb` | 16x16px square checkbox. States: `.checked`, `.semi` (indeterminate), `.disabled`. Contains two SVGs: `.cb-check` and `.cb-semi`. |
| Help icon | `.help-icon` | 16x16px icon placed inside `.form-label` for contextual help. |

## States

### Input field

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Default | `.input-field` | 1px border `var(--border-200)`, white background |
| Focus | `:focus-within` on `.input-field` | Border becomes `var(--primary)`, box-shadow `var(--focus-ring)` |
| Placeholder | `input::placeholder` | Text in `var(--text-muted)` |
| Filled | Input has value | Text in `var(--text-subtle)` |

### Select field

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Default | `<select class="select-field">` | Inherits global `select` styles with custom chevron |
| Focus | `:focus` | Border becomes `var(--primary)` |

### Toggle switch

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Inactive | `.toggle-switch` (base) | Gray pill (`var(--toggle-inactive)`), thumb at left |
| Active | `.toggle-switch.active` | Blue pill (`var(--toggle-active)`), thumb slides to right (left: 13px) |

### Radio option

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Unselected | `.radio-option` (base) | Gray circle border (`var(--toggle-inactive)`) |
| Selected | `.radio-option.selected` | Blue border + filled 8px blue dot inside circle |

### Checkbox

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Unchecked | `.cb` (base) | 16x16 empty square, border `#c7ccd5` |
| Hover | `:hover` | Border darkens to `var(--neutral-600)` |
| Checked | `.cb.checked` | Blue fill (`var(--primary)`), checkmark SVG visible |
| Indeterminate | `.cb.semi` | Blue fill (`var(--primary)`), minus/dash SVG visible |
| Checked hover | `.cb.checked:hover` | Darker blue (`var(--primary-hover)`) |
| Disabled | `.cb.disabled` | `opacity: 0.5`, `pointer-events: none` |

### File upload

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Empty | `.file-upload-field` | Muted placeholder text (`.file-upload-text`) |
| Has file | `.file-upload-text.has-file` | Text becomes `var(--text-strong)` |
| Hover | `:hover` | Border color changes to `var(--primary)` |

## Dark Mode

When `[data-theme="dark"]` is set:

- `.form-label` text becomes `var(--text-subtle)` (lighter gray)
- `.input-field` gets `var(--surface-bg)` background and dark border
- Inner `<input>` text becomes `var(--text-strong)` (white)
- `.file-upload-field` background switches to `var(--surface-bg)`
- `.radio-circle` border uses `var(--border-200)` (dark mode value)
- `.cb` border shifts to `var(--neutral-600)`; hover to `var(--neutral-500)`
- Select fields get dark background via global `[data-theme="dark"] select` rule
- Toggle and radio active states keep their blue colors (tokens auto-remap)

## Accessibility

### Keyboard

- **Tab**: Moves between form controls in document order
- **Space**: Toggles checkboxes and toggle switches; selects radio options
- **Arrow keys**: Navigate between radio options within a group (when using native `<input type="radio">`)
- **Enter**: Submits forms or activates buttons within forms

### ARIA

- Each `.input-field` should wrap a native `<input>` element with appropriate `type` attribute
- Labels should use `<label>` with a `for` attribute, or wrap the control. The `.form-label` class alone is not semantic.
- Toggle switches built with `<div>` need `role="switch"` and `aria-checked="true|false"`
- Custom checkboxes (`.cb`) built with `<div>` need `role="checkbox"` and `aria-checked="true|false|mixed"`
- Custom radio options need `role="radio"`, `aria-checked`, and the group needs `role="radiogroup"`
- File upload fields should associate with their hidden `<input type="file">` via click handler
- Required fields should use `aria-required="true"` on the input

### Screen Reader

- Text inputs are announced by their associated label text
- Toggle switches should be announced as "switch, [label], on/off"
- Checkboxes should be announced as "checkbox, checked/unchecked/mixed"
- Radio options should be announced as "radio button, [label], selected/not selected, N of M"

## Usage Guidelines

### Do

- Use `.form-row` for all settings-style forms with label-value pairs
- Use `.form-row--top` when the value area is taller than one line (e.g. radio groups, textareas)
- Use `.form-value--inline` to place multiple controls or a control + label on one line
- Use `.input-with-suffix` for numeric inputs with units (days, hours, MB)
- Keep `.form-label` at its default 266px width for visual consistency across settings pages
- Use native `<select>` with `.select-field` rather than building custom dropdowns when possible
- Add `.help-icon` inside `.form-label` for fields that need additional explanation

### Don't

- Don't nest `.form-row` inside another `.form-row`
- Don't use `.toggle-switch` for choices that require a form submission -- use checkboxes or radios instead
- Don't use a custom checkbox (`.cb`) without providing `role="checkbox"` and `aria-checked`
- Don't override `.form-label` width on individual rows -- keep it consistent
- Don't use `.file-upload-field` for drag-and-drop areas -- it is a click-to-browse pattern only

## Code Examples

### Standard form row with text input

```html
<div class="form-row">
  <label class="form-label">Display Name</label>
  <div class="form-value">
    <div class="input-field">
      <input type="text" placeholder="Enter name">
    </div>
  </div>
</div>
```

### Input with clear button

```html
<div class="input-field">
  <input type="text" value="search term">
  <span class="input-clear">
    <svg><!-- close icon --></svg>
  </span>
</div>
```

### Password input with eye toggle

```html
<div class="input-field">
  <input type="password" placeholder="Enter password">
  <span class="input-eye">
    <svg><!-- eye icon --></svg>
  </span>
</div>
```

### Select field

```html
<div class="form-row">
  <label class="form-label">Region</label>
  <div class="form-value">
    <select class="select-field">
      <option>US East</option>
      <option>US West</option>
      <option>EU Central</option>
    </select>
  </div>
</div>
```

### Input with suffix

```html
<div class="form-row">
  <label class="form-label">Retention Period</label>
  <div class="form-value">
    <div class="input-with-suffix">
      <div class="input-field">
        <input type="number" value="30">
      </div>
      <span class="input-suffix">days</span>
    </div>
  </div>
</div>
```

### Toggle switch

```html
<div class="form-row">
  <label class="form-label">Enable notifications</label>
  <div class="form-value">
    <div class="toggle-row">
      <div class="toggle-switch active" role="switch" aria-checked="true">
        <div class="toggle-thumb"></div>
      </div>
      <span class="toggle-label">On</span>
    </div>
  </div>
</div>
```

### Radio group

```html
<div class="form-row form-row--top">
  <label class="form-label">Scan Mode</label>
  <div class="form-value">
    <div class="radio-group" role="radiogroup">
      <div class="radio-option selected" role="radio" aria-checked="true">
        <div class="radio-circle"></div>
        <span class="radio-label">Quick scan</span>
      </div>
      <div class="radio-option" role="radio" aria-checked="false">
        <div class="radio-circle"></div>
        <span class="radio-label">Full scan</span>
      </div>
    </div>
  </div>
</div>
```

### Checkbox

```html
<div class="cb checked" role="checkbox" aria-checked="true">
  <svg class="cb-check"><!-- checkmark SVG --></svg>
  <svg class="cb-semi"><!-- minus SVG --></svg>
</div>
```

### Indeterminate checkbox

```html
<div class="cb semi" role="checkbox" aria-checked="mixed">
  <svg class="cb-check"><!-- checkmark SVG --></svg>
  <svg class="cb-semi"><!-- minus SVG --></svg>
</div>
```

### File upload

```html
<div class="form-row">
  <label class="form-label">Certificate</label>
  <div class="form-value">
    <div class="file-upload-field">
      <span class="file-upload-text">Choose file...</span>
      <span class="file-upload-icon">
        <svg><!-- upload icon --></svg>
      </span>
      <input type="file" accept=".pem,.crt">
    </div>
  </div>
</div>
```

### Form label with help icon

```html
<label class="form-label">
  API Key
  <span class="help-icon" title="Your unique API key from the dashboard">
    <svg><!-- question-circle icon --></svg>
  </span>
</label>
```

## Tokens Used

| Token | Purpose |
|-------|---------|
| `--font` | Font family for all form text |
| `--text-strong` | Label text, filled input text, checkbox border base |
| `--text-subtle` | Input text, form value text, radio label |
| `--text-muted` | Placeholder text, help icon color, file upload placeholder |
| `--border-200` | Input, select, file upload, checkbox border |
| `--surface-card` | Input and file upload background (light mode) |
| `--surface-bg` | Input background (dark mode), input suffix background |
| `--primary` | Focus border, toggle active, radio selected, checkbox checked fill |
| `--primary-hover` | Checked checkbox hover |
| `--focus-ring` | Box-shadow on focused inputs |
| `--radius` | Border radius on inputs, selects, file upload (4px) |
| `--toggle-active` | Toggle switch active background (`var(--blue-700)`) |
| `--toggle-inactive` | Toggle switch inactive background (`var(--neutral-400)`) |
| `--neutral-white` | Toggle thumb color |
| `--neutral-600` | Checkbox hover border, dark mode checkbox border |

## Maturity

**Status**: Stable
