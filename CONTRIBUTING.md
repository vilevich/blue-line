# Contributing to Blue Line

Guidelines for designers and developers working with the Blue Line design system.

---

## Starting a New Product

When starting a new OPSWAT product, open a new Claude Code chat and use this prompt:

```
I'm starting [Product Name], an OPSWAT product that uses the Blue Line design system.

Blue Line repo: https://github.com/vilevich/blue-line
Blue Line docs: https://vilevich.github.io/blue-line/

Here are the Figma designs: [paste Figma links]

Build the UI using Blue Line CSS classes. Load the DS from GitHub Pages:
  <link rel="stylesheet" href="https://vilevich.github.io/blue-line/tokens.css">
  <link rel="stylesheet" href="https://vilevich.github.io/blue-line/components.css">
  <link rel="stylesheet" href="https://vilevich.github.io/blue-line/icons.css">

If a component doesn't exist in Blue Line, build it as product-specific first.
We'll promote it to Blue Line later if it's reusable across products.
```

This gives Claude Code full context to build your product using existing DS components.

---

## Branch Workflow

```
main ─────────────────────────────── (stable, deployed to GitHub Pages)
  └── feature/component-name ─────── (work in progress)
```

- **`main`** is always stable and auto-deploys to GitHub Pages
- Create **`feature/component-name`** branches for new work
- Open a **Pull Request** when ready for review
- PRs require reviewer approval before merging to `main`

---

## Component Quality Reviewer

The reviewer ensures Blue Line stays consistent and high-quality.

### What the reviewer checks:

1. **Naming** — Does the class name follow existing patterns? (e.g., `.tag-*` for tags, `.btn-*` for buttons)
2. **Token usage** — Are CSS custom properties used instead of hardcoded values?
3. **Dark mode** — Is a `[data-theme="dark"]` override included, colocated with the component?
4. **Responsive** — Does it work at all breakpoints (1920, 1440, 1024, 768)?
5. **Accessibility** — Focus-visible states, sufficient contrast, proper semantic structure?
6. **Documentation** — Is an example added to `index.html`?

### Reviewer workflow:

1. Designer opens PR to `blue-line` repo
2. Reviewer checks the 6 criteria above
3. If changes needed → reviewer leaves comments, designer iterates
4. If approved → reviewer merges to `main` → auto-deploys to GitHub Pages

---

## Promoting Product Components to Blue Line

When a product-specific component is useful across products:

1. **Designer opens a PR** to the `blue-line` repo with the component styles
2. **Move the CSS** from the product's inline `<style>` to `components.css`
3. **Replace hardcoded values** with token variables
4. **Add dark mode** overrides colocated with the component
5. **Add a docs example** to `index.html`
6. **Reviewer approves and merges**
7. **Product removes** the local styles and uses the Blue Line version

---

## Resolving Duplicate Components

When two designers create similar components for different products:

1. **Reviewer identifies the overlap** during PR review
2. **Compare both implementations** — which follows DS conventions better?
3. **Pick the better one** (or merge the best parts of both) to create one canonical version
4. **Merge the canonical version** into Blue Line
5. **Both products** update to use the canonical Blue Line component
6. **Remove duplicate** product-specific styles

The goal: one well-built component in Blue Line, used everywhere.

---

## Checklist for New Components

Before opening a PR, verify:

- [ ] Uses existing token variables (no hardcoded colors, spacing, or fonts)
- [ ] Includes `[data-theme="dark"]` override (colocated)
- [ ] Class name follows existing conventions
- [ ] Example added to `index.html` docs page
- [ ] `docs/components/` markdown created or updated
- [ ] Tested in both light and dark mode
- [ ] Works at all breakpoints (1920, 1440, 1024, 768)
- [ ] Focus-visible states included for interactive elements
- [ ] Touch targets at least 24x24px
- [ ] No class name collisions with existing components
- [ ] `CHANGELOG.md` updated

---

## Filing Issues

Use the GitHub issue templates:

- **Bug Report** — for visual bugs or broken behavior
- **Component Request** — to request a new component or variant
- **Accessibility Issue** — to report a WCAG compliance problem

---

## Governance

### Decision Rights
- **New components**: design system owner reviews and approves
- **Breaking changes**: require explicit approval and a migration note in CHANGELOG
- **Deprecation**: 2-quarter notice period, documented in CHANGELOG

### Versioning
Blue Line follows [Semantic Versioning](https://semver.org/):
- **Major** (3.0.0) — breaking changes to existing class names or token values
- **Minor** (2.3.0) — new components, new tokens, new variants
- **Patch** (2.2.3) — bug fixes, doc updates, WCAG improvements

### Release Process
1. Update `CHANGELOG.md` with changes under `[Unreleased]`
2. Bump version in `components.css` header comment
3. Move `[Unreleased]` to a versioned heading (e.g., `[2.3.0] - 2026-03-15`)
4. Merge to `main` — auto-deploys to GitHub Pages
5. Verify the live docs site

---

## Detailed Guides

For deeper documentation, see:
- **[Designer Guide](docs/guides/designer-guide.md)** — starting a product, naming conventions, handoff
- **[Maintainer Guide](docs/guides/maintainer-guide.md)** — PR review, collision detection, release process
- **[Developer Guide](docs/guides/developer-guide.md)** — consuming Blue Line, extending, dark mode
- **[AI Prompts Guide](docs/guides/ai-prompts.md)** — Claude Code prompt templates
