import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type ChipColor = 'default' | 'accent' | 'success' | 'secure' | 'guide' | 'alert' | 'warn' | 'caution' | 'inactive' | 'disabled'

export interface ChipProps {
  color?: ChipColor
  removable?: boolean
  onRemove?: () => void
  skeleton?: boolean
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const base = 'inline-flex items-center justify-center gap-2 h-6 rounded-[2px] text-label font-regular leading-4 whitespace-nowrap border border-transparent text-[var(--text-strong)]'

const colorStyles: Record<ChipColor, string> = {
  default:  'bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-1000)]',
  accent:   'bg-[var(--color-teal-100)] dark:bg-[var(--color-teal-1000)]',
  success:  'bg-[var(--color-green-100)] dark:bg-[var(--color-green-1000)]',
  secure:   'bg-[var(--color-blue-100)] dark:bg-[var(--color-blue-1000)]',
  guide:    'bg-[var(--color-purple-100)] dark:bg-[var(--color-purple-1000)]',
  alert:    'bg-[var(--color-red-100)] dark:bg-[var(--color-red-1000)]',
  warn:     'bg-[var(--color-orange-100)] dark:bg-[var(--color-orange-1000)]',
  caution:  'bg-[var(--color-yellow-100)] dark:bg-[var(--color-yellow-1000)]',
  inactive: 'bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-1000)]',
  disabled: 'bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-1000)] cursor-not-allowed pointer-events-none',
}

export function Chip({ color = 'default', removable, onRemove, skeleton, icon, children, className }: ChipProps) {
  if (skeleton) {
    return (
      <span
        className={cn(
          'inline-block w-[50px] h-6 rounded-[2px] bg-[var(--color-neutral-200)] dark:bg-[var(--color-neutral-900)]',
          className,
        )}
      />
    )
  }

  return (
    <span
      className={cn(
        base,
        colorStyles[color],
        removable ? 'pl-2 pr-6 relative' : 'px-2',
        className,
      )}
    >
      {icon}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 rounded-full cursor-pointer bg-transparent border-none text-[var(--text-subtle)] hover:text-[var(--text-strong)]"
          aria-label="Remove"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  )
}
