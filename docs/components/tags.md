# Tags, Badges, Chips, Verdicts & Severities

Status indicators and categorization elements. Blue Line provides five related component families that share the same 9-color semantic system.

## Tags

Inline status labels with filled backgrounds. Used to indicate the state of an item (e.g., scan status, account type).

### Anatomy

- **Root element** -- `<span>` with `.tag` base class + color variant class (e.g., `.tag-secure`)
- Tags are inline-flex, 14px text, 8px padding, no border radius

### Variants

| Variant | Class | Visual | Use Case |
|---------|-------|--------|----------|
| Neutral | `.tag-neutral` | Gray fill | Default / unknown state |
| Inactive | `.tag-inactive` | Light gray fill | Disabled / paused |
| Secure | `.tag-secure` | Solid green fill, white text | Scan passed, verified |
| Success | `.tag-success` | Light green fill | Completed, active |
| Accent | `.tag-accent` | Light blue fill | Info, in progress |
| Guide | `.tag-guide` | Solid purple fill, white text | Guidance, help |
| Alert | `.tag-alert` | Light red fill | Error, threat detected |
| Warn | `.tag-warn` | Light orange fill | Warning state |
| Caution | `.tag-caution` | Light yellow fill | Attention needed |
| Keyword | `.tag-keyword` | Bordered, no fill | Metadata tags, labels |

### Tag Group

Wrap multiple tags in `.tag-group` for consistent 8px gap spacing:

```html
<div class="tag-group">
  <span class="tag tag-secure">Secure</span>
  <span class="tag tag-accent">Scanning</span>
</div>
```

## Badges

Small status indicators. Two types: dots (colored circles) and numbers (count pills).

### Badge Dots

8px colored circles used alongside text to indicate status.

| Variant | Class |
|---------|-------|
| Neutral | `.badge-dot-neutral` |
| Inactive | `.badge-dot-inactive` |
| Secure | `.badge-dot-secure` |
| Success | `.badge-dot-success` |
| Accent | `.badge-dot-accent` |
| Guide | `.badge-dot-guide` |
| Alert | `.badge-dot-alert` |
| Warn | `.badge-dot-warn` |
| Caution | `.badge-dot-caution` |

```html
<span class="badge-dot badge-dot-secure"></span>
```

### Badge Numbers

16px tall rounded rectangles displaying a count. White text on colored background.

| Variant | Class |
|---------|-------|
| Neutral | `.badge-number-neutral` |
| Accent | `.badge-number-accent` |
| Alert | `.badge-number-alert` |
| (all 9 colors) | `.badge-number-[color]` |

```html
<span class="badge-number badge-number-alert">3</span>
```

## Chips

24px height selection elements with filled background. Used in filter bars and multi-select contexts.

### Variants

| Variant | Class | Description |
|---------|-------|-------------|
| Default | `.chip-default` | Gray background, standard text |
| Disabled | `.chip-disabled` | Gray, reduced opacity, `cursor: not-allowed` |
| Inactive | `.chip-inactive` | Transparent with border |
| Secure | `.chip-secure` | Green fill, white text |
| (all 9 colors) | `.chip-[color]` | Semantic color fill |
| Selected | `.chip-selected` | Add to any chip to show remove button |

### Selected Chips (Removable)

```html
<span class="chip chip-accent chip-selected">
  Filter Name
  <button class="chip-remove" aria-label="Remove filter">
    <svg><!-- close icon --></svg>
  </button>
</span>
```

## Verdicts

Dot + text inline indicators for scan results and job outcomes.

### Anatomy

- `.verdict` -- flex container
- `.verdict-dot` -- 8px circle
- `.verdict-text` -- label text

### Variants

| Variant | Class | Dot Color |
|---------|-------|-----------|
| Neutral | `.verdict-neutral` | Gray |
| Not Active | `.verdict-not-active` | Gray (inactive) |
| Detected | `.verdict-detected` | Red |
| Progress | `.verdict-progress` | Blue |
| Completed | `.verdict-completed` | Green |
| Failed | `.verdict-failed` | Red |
| Secure | `.verdict-secure` | Green |
| Warn | `.verdict-warn` | Orange |
| Accent | `.verdict-accent` | Blue |
| Guide | `.verdict-guide` | Purple |
| Caution | `.verdict-caution` | Yellow |

```html
<span class="verdict verdict-secure">
  <span class="verdict-dot"></span>
  <span class="verdict-text">No Threats Found</span>
</span>
```

## Severities

Triangle icon + text inline indicators for security severity levels.

### Variants

| Level | Class | Icon Color |
|-------|-------|------------|
| Critical | `.severity-critical` | Red |
| High | `.severity-high` | Red |
| Medium | `.severity-medium` | Orange |
| Low | `.severity-low` | Yellow |
| None | `.severity-none` | Gray |

```html
<span class="severity severity-critical">
  <span class="severity-icon"><svg><!-- triangle --></svg></span>
  Critical
</span>
```

## Dark Mode

All components auto-adapt via `--ds-*` semantic tokens. Tags, badges, chips, verdicts, and severities all remap their colors in dark mode without any additional classes.

## Accessibility

### Screen Reader
- Tags and badges are decorative when paired with adjacent text. Use `aria-hidden="true"` on the visual element if the status is already conveyed by text.
- When a tag is the only indicator of status, wrap it in a meaningful `<span>` or use `aria-label`.

### Color
- Badge dots MUST be paired with text -- never use a colored dot alone to convey meaning (WCAG 1.4.1).
- Verdict components already combine dot + text, meeting this requirement.
- Severity components combine icon + text.

## Tokens Used

| Token Pattern | Purpose |
|---------------|---------|
| `--ds-[name]-100` | Light background fill |
| `--ds-[name]-text` | Foreground text color |
| `--ds-[name]-700` | Dot / strong accent color |
| `--ds-[name]-fill` | Solid fill background (for `.tag-secure`, `.tag-guide`) |
| `--text-on-fill` | White text on solid fill backgrounds |

## Maturity

**Status**: Stable
