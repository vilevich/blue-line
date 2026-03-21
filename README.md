# OPSWAT UI

Monorepo for OPSWAT product UIs and the Blue Line design system.

## Structure

```
packages/
  blue-line/       — Blue Line design system (React + Tailwind CSS v4)
apps/
  mdss/            — MetaDefender Storage Security product UI
  bl-docs/         — Blue Line documentation site
```

## Getting Started

```bash
pnpm install
```

### Development

```bash
# MDSS product UI
pnpm dev

# Blue Line docs site
pnpm --filter @opswat/bl-docs dev

# Both
pnpm -r dev
```

### Build

```bash
pnpm build                          # MDSS
pnpm --filter @opswat/bl-docs build # Docs
```

## Links

- **Blue Line Docs:** https://vilevich.github.io/blue-line/
- **Figma:** https://www.figma.com/design/TkdLHVmqTZ9eAXbIBuuDul/Blue-Line-2.2.3
