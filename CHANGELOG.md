# Changelog

All notable changes to Blue Line will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
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
