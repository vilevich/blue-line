# Modals & Slide Panels

Overlay components for focused interactions that require user attention. Modals center on screen for confirmations and forms. Slide panels animate from the right for detail views and editing.

## Anatomy

### Modal
- `.modal-overlay` -- fixed full-screen backdrop with `--overlay-heavy` background, `z-index: 2000`
- `.modal` -- centered white card, `width: 480px`, `border-radius: 8px`, `padding: 24px`
- `.modal-header` -- flex row: title (`<h2>`) + close button
- `.modal-close` -- 28x28 icon button for dismissing
- `.modal-divider` -- optional 1px separator
- `.modal-body` -- flex column with `gap: 16px` for form fields
- `.modal-field` -- flex column with `gap: 6px` (label + input pair)
- `.modal-field-label` -- 14px medium weight label
- `.modal-footer` -- flex row justified right, `gap: 8px`, separated by top border
- `.modal-instructions` -- 14px paragraph text with styled links

### Slide Panel
- `.slide-panel-overlay` -- fixed full-screen backdrop with `--overlay-medium` background
- `.slide-panel` -- fixed right-side panel, `width: 400px`, animates from `right: -400px` to `right: 0`
- `.slide-panel-header` -- 56px flex row: title + close button, bottom border
- `.slide-panel-body` -- scrollable content area, `padding: 20px`, `gap: 20px`
- `.slide-panel-footer` -- flex row justified right, `gap: 8px`, top border
- `.panel-field` -- flex column with `gap: 6px` (label + input)
- `.panel-field-label` -- 14px medium weight label
- `.panel-banner` -- contextual alert inside panels (warning, error, info variants)

## Variants

### Modal
Single variant. Customize width via inline style if needed (default 480px).

### Slide Panel
Single variant with fixed 400px width.

### Panel Banner

| Variant | Class | Use For |
|---------|-------|---------|
| Warning | `.panel-banner.warning` | Caution messages (yellow tint) |
| Error | `.panel-banner.error` | Error/destructive warnings (red tint) |
| Info | `.panel-banner.info` | Informational context (blue tint) |

## States

| State | How to Apply | Visual Change |
|-------|-------------|---------------|
| Hidden | Default (no `.open`) | `opacity: 0`, `pointer-events: none` |
| Open | Add `.open` to overlay AND panel/modal | Fades in, panel slides from right |
| Scrollable | Automatic when content exceeds `max-height: 90vh` (modal) or panel height | Scrollbar appears in `.modal` or `.slide-panel-body` |

## Dark Mode

- Modal and panel backgrounds use `--surface-card`
- Borders use `--border-card`
- Title text uses `--text-strong`
- Panel banners get semi-transparent rgba backgrounds in dark mode
- Overlay backdrops use `--overlay-heavy` / `--overlay-medium` (darker in dark mode)

## Accessibility

### Keyboard
- **Escape**: should close the modal/panel (implement in JS)
- **Tab**: must cycle within the modal (focus trap -- implement in JS)
- **Enter/Space**: on close button dismisses the overlay

### ARIA
- Modal container: `role="dialog"` + `aria-modal="true"` + `aria-labelledby="[header-id]"`
- Close button: `aria-label="Close"`
- When open, set `aria-hidden="true"` on all content behind the overlay
- Return focus to the triggering element when closed

### Screen Reader
- The dialog role causes screen readers to announce "dialog" when focus enters
- `aria-labelledby` links to the heading so the dialog title is announced
- Focus should move to the first interactive element (or the heading) on open

## Usage Guidelines

### Do
- Use modals for confirmations, short forms, and destructive action warnings
- Use slide panels for detail views, editing, and settings
- Always include a close button
- Include a Cancel/Close action in the footer
- Trap focus within the overlay when open

### Don't
- Don't stack multiple modals
- Don't use modals for content that could be a page or inline section
- Don't leave the overlay open without a way to close it (close button + Escape + backdrop click)
- Don't put complex multi-step flows in modals -- use slide panels or full pages

## Code Examples

### Modal
```html
<div class="modal-overlay open">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal-header">
      <h2 id="modal-title">Confirm Action</h2>
      <button class="modal-close" aria-label="Close">
        <svg><!-- close icon --></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="modal-field">
        <label class="modal-field-label">Name</label>
        <div class="input-field"><input type="text"></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-outline">Cancel</button>
      <button class="btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

### Slide Panel
```html
<div class="slide-panel-overlay open"></div>
<div class="slide-panel open" role="dialog" aria-modal="true" aria-labelledby="panel-title">
  <div class="slide-panel-header">
    <h2 id="panel-title">Edit Details</h2>
    <button class="modal-close" aria-label="Close">
      <svg><!-- close icon --></svg>
    </button>
  </div>
  <div class="slide-panel-body">
    <div class="panel-banner warning">
      <svg><!-- warning icon --></svg>
      This action cannot be undone.
    </div>
    <div class="panel-field">
      <label class="panel-field-label">Description</label>
      <div class="input-field"><input type="text"></div>
    </div>
  </div>
  <div class="slide-panel-footer">
    <button class="btn-outline">Cancel</button>
    <button class="btn-primary">Save</button>
  </div>
</div>
```

## Tokens Used

| Token | Purpose |
|-------|---------|
| `--overlay-heavy` | Modal backdrop opacity |
| `--overlay-medium` | Slide panel backdrop opacity |
| `--surface-card` | Modal/panel background |
| `--shadow-modal` | Modal box shadow |
| `--shadow-panel` | Slide panel box shadow |
| `--border-200` | Dividers and footer borders |
| `--border-card` | Dark mode borders |
| `--text-strong` | Heading text |
| `--text-subtle` | Labels and instructions |
| `--text-muted` | Close button icon |
| `--radius` | Close button border radius |

## Maturity

**Status**: Stable
