# Changelog

All notable changes to Blue Line will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Changed
- **Tables**: `.col-cb` and `.col-action` are now sticky (left/right) for all `.data-table` tables, not just `.table-fixed`. Hover, selected, and dark mode states handled automatically by existing `td`/`th` rules — no explicit overrides needed.
- **Pagination**: Default items per page changed from 10 to **20** for single-table pages. Added `.no-footer` modifier on `.audit-card` to hide pagination when ≤10 items (also rounds bottom corners of table scroll area). Documented in pagination guideline and tables.md.
- **Tables**: Added assembled Content Card demos — full card with header/search/filter/table/pagination, and small card with `.no-footer` (≤10 items). Expanded class reference table with card-level and pagination classes.
- **Tables**: `.table-fixed .col-cb` simplified to width override only; `.table-fixed .col-action` simplified to border-left only. Removed 16 lines of redundant hover/selected/dark-mode overrides.
- **Layout**: `.table-page .table-scroll` now gets flex fill alongside `.audit-table-scroll`, so table pages can use either scroll wrapper class.

### Added
- **Toggle**: Hover state now changes border to `--toggle-border-hover` (neutral-600 light / neutral-500 dark). Disabled state (`.disabled`, `aria-disabled="true"`) and skeleton state (`.skeleton`) added with muted fill/border/thumb tokens. Dark mode auto-adapts via new `--toggle-active`, `--toggle-inactive`, and related tokens in `[data-theme="dark"]`. `.toggle-row` / `.toggle-label` documented in the Forms demo. Toggle Switch also added to the Toggles & Expand section.
- **Radio**: Added hover (`.radio-option:hover`), disabled (`.radio-option.disabled`), and skeleton (`.radio-option.skeleton`) states. Fixed dark mode border — was using `--border-200` (neutral-800), now correctly inherits from `--toggle-inactive` (neutral-700 dark). Forced-colors support added for disabled/skeleton. Forms demo updated to show all states.
- **Tokens**: Added `--toggle-border-hover`, `--toggle-fill-disabled`, `--toggle-border-disabled`, `--toggle-thumb-disabled` to `:root`; added full dark mode overrides for all toggle tokens.
- **Badges**: Corrected dot and number badge colors to use direct palette tokens matching Figma specs. Added full dark mode overrides for all 9 variants (dots flip to `-400` level, numbers flip to pastel backgrounds with dark text). Added skeleton states (`.badge-dot-skeleton`, `.badge-number-skeleton`). Fixed inactive variant colors. Forced-colors support for skeleton states.
- **Chips**: Corrected all chip colors from bright `-700` fills to pastel `-100` backgrounds with dark text, matching Figma specs. Full dark mode overrides using deep `-1000` backgrounds. Added hover borders for selected/removable chips (`.chip-selected:hover`). Added skeleton state (`.chip-skeleton`). Fixed disabled (no more opacity hack) and inactive (solid background, no border). Forced-colors support for skeleton. Added interior variant classes: `.chip-interior` (borderless content layout), `.chip-icon` (16×16 inline SVG), `.chip-avatar` (16×16 round letter avatar with 8 color variants), `.chip-flag` (20×16 flag image, compatible with flag-icons library).
- **Scan Status**: New component (`.scan-status`) with 6 variants: allowed, blocked, complete, failed, skipped, pending. Pastel `-100` backgrounds with deep text in light mode; deep `-1000` backgrounds with white text in dark mode.
- **Tags**: Added 8 keyword color variant classes (`.tag-keyword-inactive` through `.tag-keyword-caution`) for colored-text keyword tags. Full dark mode overrides. Tag Variables demo section added to docs.
- **Verdicts**: Updated to match Figma scan verdicts spec. Dot size reduced from 8px to 6px. Added scan-specific variants: `.verdict-not-detected`, `.verdict-not-supported`, `.verdict-excluded`, `.verdict-detected-metascan`, `.verdict-origin-blocked`, `.verdict-origin-allowed`. Added `.verdict-flag` class for origin verdicts with flag icons. Text colors simplified to strong (`--text-strong`) or muted (`--neutral-500`). Dot colors now use direct palette tokens (`--red-700`, `--green-700`, `--neutral-700`, `--neutral-200`). Generic verdict palette expanded to 9 semantic colors (added `.verdict-success`, `.verdict-alert`; `.verdict-secure` corrected to use `--blue-700`). Flag variants added (`.verdict-flag-neutral`). Full dark mode overrides — dots lighten to `-400` palette level, not-active dims to neutral-900/neutral-800.
- **Severities**: Updated to use multi-colored signal-level icons (`icon-signal-0` through `icon-signal-4`). Legacy CSS-colored inline SVG approach retained for backward compat. New demos show Severity Levels, Scan Severities — Threat Risk, and Scan Severities — Risk Level.
- **Icons**: Added signal-level icon classes (`icon-signal-0`…`icon-signal-4`) using multi-colored SVG `background-image`. signal-4: red full triangle (#FF003D), signal-3: orange ¾ triangle (#FF6B00), signal-2: yellow half triangle (#DBB600), signal-1: gray partial triangle (#607497), signal-0: gray slashed triangle (#A9B2C4). Signal Icons subsection added to the Icons doc page.

### Fixed
- **Priority Toggle**: `priority-toggle-btn` height corrected from 30px to 32px to match system button standard.
- GitHub issue templates (bug report, component request, accessibility issue)
- Pull request template with review checklist
- CODEOWNERS file
- This changelog
- `docs/` directory with guides and per-component documentation
- Workflow guides: designer, maintainer, developer, AI prompts

---

## [2.2.2] - 2026-02-26

Baseline release. First versioned snapshot of Blue Line as an independent design system.

### Component Inventory

**Foundation**
- Design tokens (tokens.css): colors (8 palettes, 9 semantic themes), typography, spacing, shadows, radii, breakpoints
- Dark mode via `[data-theme="dark"]` with colocated overrides
- Icon library (icons.css): 19 icons, CSS mask-image approach, 4 size variants

**Form Controls**
- Global select (native dropdown styling)
- Input field with focus ring and validation states
- Select field (custom styled)
- Toggle switch
- Radio group (inline and stacked)
- File upload field
- Checkbox (custom styled)
- Form row and form label layout

**Buttons**
- Primary, outline, text, brand, icon, danger, save, discard
- Loading state with spinner
- Button groups

**Data Display**
- Tags (9 semantic color variants + keyword)
- Badges (dot and number variants, 9 colors each)
- Chips (9 color variants + selected state)
- Verdicts (11 variants: secure, detected, progress, completed, etc.)
- Severities (5 levels: critical, high, medium, low, none)
- Level badges and category badges

**Data Containers**
- Tabs (horizontal tab bar with panels)
- Cards (simple header + data-table header with bulk actions)
- Tables: two-type system (small auto-layout + big fixed-layout with pinned columns)
- Search and filter bar
- Pagination
- Advanced filters panel

**Overlays & Panels**
- Modal (overlay, header, body, footer)
- Slide panels (header, body)
- Toasts (bottom-right + top-of-page banner)

**Navigation**
- Avatar dropdown
- Notification dropdown
- Column visibility panel
- Row action menu

**Utility**
- Provider icons (17 cloud/storage providers)
- Count-more badge (+N overflow)
- Skip link, screen-reader-only text
- WCAG 2.2 AA compliance foundations (focus-visible, reduced motion, high contrast)
- Responsive breakpoints (1920, 1440, 1024, 768)
