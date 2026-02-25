# Accessibility Overview

Blue Line targets **WCAG 2.2 AA** compliance. Every component must meet these requirements.

## Built-in Accessibility Features

### Skip Link
`.skip-link` — hidden link that becomes visible on focus, allowing keyboard users to skip navigation.

### Screen Reader Utility
`.sr-only` — visually hidden text that remains accessible to screen readers.

### Focus Indicators
Global `:focus-visible` rule provides a 2px solid blue outline on all interactive elements. Components that need inset focus use `outline-offset: -2px`.

### Reduced Motion
`@media (prefers-reduced-motion: reduce)` disables all animations and transitions.

### Windows High Contrast
`@media (forced-colors: active)` provides explicit borders and colors for Windows High Contrast Mode.

### Dark Mode
Full dark theme via `data-theme="dark"` with all tokens remapped for dark surfaces.

## WCAG Requirements for New Components

| Criterion | Requirement | How Blue Line Meets It |
|-----------|-------------|----------------------|
| 1.4.1 Use of Color | Don't use color as the only indicator | Add border, icon, or text as secondary indicator |
| 1.4.3 Contrast (Minimum) | Text: 4.5:1, Large text: 3:1 | Use `--text-strong` or `--text-subtle` (not `--text-muted` for essential text) |
| 1.4.11 Non-text Contrast | UI components: 3:1 | Border and icon colors meet 3:1 against background |
| 2.4.7 Focus Visible | Keyboard focus must be visible | `:focus-visible` with 2px blue outline |
| 2.4.11 Focus Appearance | Focus indicator area >= 2px perimeter | 2px outline with 2px offset |
| 2.5.8 Target Size | Interactive targets >= 24x24px | `min-width`/`min-height` enforced in WCAG section |
| 3.3.1 Error Identification | Errors identified and described | `.input-field.error` + `.input-error-msg` |

## Accessible Muted Text

Blue Line provides two muted text tokens:

| Token | Value (Light) | Value (Dark) | Contrast | Use For |
|-------|--------------|-------------|----------|---------|
| `--text-muted` | #6b7a90 | #607497 | ~3.5:1 | Decorative text, icons (NOT essential text) |
| `--text-muted-accessible` | #566479 | #7b8da6 | >= 4.5:1 | Placeholder text, hint text, any readable text |

Always use `--text-muted-accessible` when the text conveys meaning that users need to read.

## Testing Checklist

See [checklist.md](checklist.md) for a step-by-step verification process.
