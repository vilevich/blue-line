import { cn } from '../../lib/cn'

export type VerdictVariant =
  | 'neutral' | 'not-active' | 'secure' | 'success' | 'accent'
  | 'guide' | 'alert' | 'warn' | 'caution'

export interface VerdictProps {
  variant: VerdictVariant
  children: string
  className?: string
}

const dotColor: Record<VerdictVariant, string> = {
  'neutral': 'bg-[var(--color-neutral-700)] dark:bg-[var(--color-neutral-400)]',
  'not-active': 'bg-[var(--color-neutral-200)] dark:bg-[var(--color-neutral-900)]',
  'secure': 'bg-[var(--color-blue-700)] dark:bg-[var(--color-blue-400)]',
  'success': 'bg-[var(--color-green-700)] dark:bg-[var(--color-green-400)]',
  'accent': 'bg-[var(--color-teal-700)] dark:bg-[var(--color-teal-400)]',
  'guide': 'bg-[var(--color-purple-700)] dark:bg-[var(--color-purple-400)]',
  'alert': 'bg-[var(--color-red-700)] dark:bg-[var(--color-red-400)]',
  'warn': 'bg-[var(--color-orange-700)] dark:bg-[var(--color-orange-400)]',
  'caution': 'bg-[var(--color-yellow-700)] dark:bg-[var(--color-yellow-400)]',
}

const textColor: Record<VerdictVariant, string> = {
  'neutral': 'text-[var(--color-neutral-500)]',
  'not-active': 'text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-800)]',
  'secure': 'text-[var(--text-strong)]',
  'success': 'text-[var(--text-strong)]',
  'accent': 'text-[var(--text-strong)]',
  'guide': 'text-[var(--text-strong)]',
  'alert': 'text-[var(--text-strong)]',
  'warn': 'text-[var(--text-strong)]',
  'caution': 'text-[var(--text-strong)]',
}

export function Verdict({ variant, children, className }: VerdictProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-label font-regular leading-[16px] whitespace-nowrap font-sans', className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColor[variant])} />
      <span className={textColor[variant]}>{children}</span>
    </span>
  )
}
