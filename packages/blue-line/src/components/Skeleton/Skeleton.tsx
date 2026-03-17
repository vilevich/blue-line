import { cn } from '../../lib/cn'

export type SkeletonVariant = 'text' | 'block' | 'button'

export interface SkeletonProps {
  variant?: SkeletonVariant
  width?: number | string
  height?: number | string
  className?: string
}

const variantDefaults: Record<SkeletonVariant, { width: number; height: number; bg: string }> = {
  text:   { width: 120, height: 16, bg: 'bg-[var(--color-neutral-300)] dark:bg-[var(--color-neutral-800)]' },
  block:  { width: 120, height: 32, bg: 'bg-[var(--color-neutral-200)] dark:bg-[var(--color-neutral-900)]' },
  button: { width: 80,  height: 32, bg: 'bg-[var(--color-neutral-200)] dark:bg-[var(--color-neutral-900)]' },
}

export function Skeleton({ variant = 'text', width, height, className }: SkeletonProps) {
  const defaults = variantDefaults[variant]

  return (
    <span
      className={cn('inline-block rounded', defaults.bg, className)}
      style={{
        width: width ?? defaults.width,
        height: height ?? defaults.height,
      }}
    />
  )
}
