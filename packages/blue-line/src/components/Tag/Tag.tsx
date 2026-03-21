import { type ReactNode, Children } from 'react'
import { cn } from '../../lib/cn'

export type TagVariant = 'neutral' | 'inactive' | 'secure' | 'success' | 'accent' | 'guide' | 'alert' | 'warn' | 'caution'
export type TagKeywordColor = 'inactive' | 'secure' | 'success' | 'accent' | 'guide' | 'alert' | 'warn' | 'caution'

export interface TagProps {
  variant?: TagVariant
  keyword?: boolean
  keywordColor?: TagKeywordColor
  children: ReactNode
  className?: string
}

export interface TagGroupProps {
  children: ReactNode
  maxVisible?: number
  className?: string
}

const base = 'inline-flex items-center justify-center px-2 text-label font-regular leading-4 whitespace-nowrap'

const variantStyles: Record<TagVariant, string> = {
  neutral:  'bg-[var(--ds-neutral-100)] text-[var(--ds-neutral-text)]',
  inactive: 'bg-[var(--ds-inactive-100)] text-[var(--ds-inactive-text)]',
  secure:   'bg-[var(--ds-secure-fill)] text-[var(--text-on-fill)]',
  success:  'bg-[var(--ds-success-100)] text-[var(--ds-success-text)]',
  accent:   'bg-[var(--ds-accent-100)] text-[var(--ds-accent-text)]',
  guide:    'bg-[var(--ds-guide-fill)] text-[var(--text-on-fill)]',
  alert:    'bg-[var(--ds-alert-100)] text-[var(--ds-alert-text)]',
  warn:     'bg-[var(--ds-warn-100)] text-[var(--ds-warn-text)]',
  caution:  'bg-[var(--ds-caution-100)] text-[var(--ds-caution-text)]',
}

const keywordColorStyles: Record<TagKeywordColor, string> = {
  inactive: 'text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-800)]',
  secure:   'text-[var(--color-blue-800)] dark:text-[var(--color-blue-500)]',
  success:  'text-[var(--color-green-1000)] dark:text-[var(--color-green-600)]',
  accent:   'text-[var(--color-teal-1000)] dark:text-[var(--color-teal-600)]',
  guide:    'text-[var(--color-purple-700)] dark:text-[var(--color-purple-500)]',
  alert:    'text-[var(--color-red-700)] dark:text-[var(--color-red-400)]',
  warn:     'text-[var(--color-orange-900)] dark:text-[var(--color-orange-500)]',
  caution:  'text-[var(--color-yellow-1000)] dark:text-[var(--color-yellow-600)]',
}

export function Tag({ variant, keyword, keywordColor, children, className }: TagProps) {
  const isKeyword = keyword || !variant

  return (
    <span
      className={cn(
        base,
        isKeyword
          ? cn(
              'border border-[var(--border-default)] text-[var(--text-subtle)]',
              keywordColor && keywordColorStyles[keywordColor],
            )
          : variantStyles[variant!],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TagGroup({ children, maxVisible, className }: TagGroupProps) {
  const items = Children.toArray(children)
  const hasOverflow = maxVisible != null && items.length > maxVisible
  const visible = hasOverflow ? items.slice(0, maxVisible) : items
  const overflowCount = hasOverflow ? items.length - maxVisible : 0

  return (
    <div className={cn('flex flex-wrap gap-2 items-center', className)}>
      {visible}
      {hasOverflow && (
        <span
          className={cn(
            base,
            'bg-[var(--ds-neutral-100)] text-[var(--ds-neutral-text)] font-medium',
          )}
        >
          +{overflowCount}
        </span>
      )}
    </div>
  )
}
