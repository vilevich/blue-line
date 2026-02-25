# AI-Assisted Development with Blue Line

Ready-to-use prompt templates for Claude Code when working with Blue Line.

---

## 1. Starting a New OPSWAT Product

Copy and paste this prompt into Claude Code when beginning a new product:

```
I'm starting [Product Name], an OPSWAT product that uses the Blue Line design system.

Blue Line repo: [repo URL]
Blue Line docs: [docs URL]

Here are the Figma designs: [paste Figma links or describe the pages]

Build the UI as a single index.html file using Blue Line CSS classes. Load the DS from GitHub Pages:
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://vilevich.github.io/blue-line/tokens.css">
  <link rel="stylesheet" href="https://vilevich.github.io/blue-line/components.css">
  <link rel="stylesheet" href="https://vilevich.github.io/blue-line/icons.css">

If a component doesn't exist in Blue Line, build it as product-specific first in an inline <style> block.
Use Blue Line token variables (var(--primary), var(--space-sm), etc.) — never hardcode colors or spacing.
Include dark mode support using [data-theme="dark"] overrides.
We'll promote reusable components to Blue Line later.
```

---

## 2. Adding a New Component to Blue Line

```
I need to add a [component name] component to the Blue Line design system.

Read the Blue Line repo at [path or URL]. Follow the existing patterns:

1. Add styles to components.css in a new section with the standard header comment format
2. Use token variables from tokens.css — no hardcoded colors, spacing, or fonts
3. Include [data-theme="dark"] overrides colocated immediately after the light-mode rules
4. Follow the naming convention: .[prefix]-[variant] (check existing prefixes to avoid collisions)
5. Add :focus-visible states for all interactive elements (2px solid var(--primary))
6. Ensure touch targets are at least 24x24px
7. Add an example section in index.html following the existing documentation structure
8. Create docs/components/[name].md following the template in the existing component docs
9. Add the changes to CHANGELOG.md under [Unreleased]
10. Test in both light and dark mode
```

---

## 3. Reviewing a Component for WCAG Issues

```
Review the [component name] section in Blue Line's components.css for WCAG 2.2 AA compliance.

Check these specific criteria:
- 2.4.7 / 2.4.11: Every interactive element has a :focus-visible style
- 1.4.3: Text color contrast >= 4.5:1 against its background
- 1.4.11: UI component contrast >= 3:1 (borders, icons)
- 2.5.8: Interactive touch targets >= 24x24px
- 1.4.1: No state relies solely on color (needs a secondary indicator)
- 2.3.3: Transitions are covered by the prefers-reduced-motion block

Use --text-muted-accessible (not --text-muted) for placeholder and hint text.

Report specific violations with line numbers, the CSS selector, and what needs to change.
```

---

## 4. Promoting a Product Component to Blue Line

```
I have a product-specific component [name] in [product repo path] index.html (inline <style> block).
It needs to be promoted to the Blue Line design system.

Steps:
1. Read the product CSS and extract the [component] styles
2. Replace any hardcoded values (#hex colors, px spacing) with Blue Line token variables
3. Add [data-theme="dark"] overrides colocated with the component
4. Follow Blue Line naming conventions (check components.css for existing patterns)
5. Add :focus-visible states for interactive elements
6. Add the CSS to Blue Line's components.css in the appropriate section
7. Add a documentation example to Blue Line's index.html
8. Create docs/components/[name].md
9. Update CHANGELOG.md under [Unreleased]
10. In the product, remove the local styles and verify it works with the Blue Line version
```

---

## 5. Fixing a Bug in Blue Line

```
There's a bug in Blue Line's [component name]:
[Describe the bug — what's happening vs what should happen]

Read the Blue Line repo at [path or URL]. Find the relevant CSS in components.css.

Fix the bug while maintaining:
- Existing naming conventions
- Token variable usage (no hardcoded values)
- Dark mode overrides (colocated)
- Focus-visible states
- Backward compatibility with consuming products

Update CHANGELOG.md under [Unreleased] > Fixed.
```

---

## 6. Reviewing a PR Against the 6-Point Checklist

```
Review this Blue Line PR for quality. Check these 6 criteria:

1. NAMING: Do class names follow existing patterns (.btn-*, .tag-*, etc.)? Any collisions with existing classes in components.css?
2. TOKENS: Are all colors, spacing, and fonts using CSS custom properties? Search for hardcoded # hex values and bare px values.
3. DARK MODE: Does every color/background/border have a [data-theme="dark"] override colocated immediately after the light-mode rule?
4. RESPONSIVE: Are there breakpoint considerations? Check that layouts work at 1920, 1440, 1024, 768.
5. ACCESSIBILITY: Are :focus-visible states included for interactive elements? Touch targets >= 24px? No color-only state indicators?
6. DOCS: Is an example added to index.html? Is docs/components/ markdown created or updated? Is CHANGELOG.md updated?

List any violations with specific line numbers and suggestions.
```
