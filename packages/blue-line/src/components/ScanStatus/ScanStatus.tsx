import { cn } from '../../lib/cn'

export type ScanStatusVariant = 'allowed' | 'blocked' | 'complete' | 'failed' | 'skipped' | 'pending'

export interface ScanStatusProps {
  variant: ScanStatusVariant
  children: string
  className?: string
}

const variantStyles: Record<ScanStatusVariant, string> = {
  allowed: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-1200)] dark:bg-[var(--color-neutral-1000)] dark:text-[var(--text-on-fill)]',
  blocked: 'bg-[var(--color-blue-100)] text-[var(--color-blue-1000)] dark:bg-[var(--color-blue-1000)] dark:text-[var(--text-on-fill)]',
  complete: 'bg-[var(--color-green-100)] text-[var(--color-green-1200)] dark:bg-[var(--color-green-1000)] dark:text-[var(--text-on-fill)]',
  failed: 'bg-[var(--color-red-100)] text-[var(--color-red-1000)] dark:bg-[var(--color-red-1000)] dark:text-[var(--text-on-fill)]',
  skipped: 'bg-[var(--color-red-100)] text-[var(--color-red-1000)] dark:bg-[var(--color-red-1000)] dark:text-[var(--text-on-fill)]',
  pending: 'bg-[var(--color-orange-100)] text-[var(--color-orange-1000)] dark:bg-[var(--color-orange-1000)] dark:text-[var(--text-on-fill)]',
}

export function ScanStatus({ variant, children, className }: ScanStatusProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center p-2 rounded text-label font-regular leading-[16px] whitespace-nowrap',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
