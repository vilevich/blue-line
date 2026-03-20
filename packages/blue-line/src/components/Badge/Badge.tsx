import { cn } from '../../lib/cn'

export type BadgeColor = 'neutral' | 'inactive' | 'secure' | 'success' | 'accent' | 'guide' | 'alert' | 'warn' | 'caution'

export interface BadgeDotProps {
  color?: BadgeColor
  skeleton?: boolean
  className?: string
}

export interface BadgeNumberProps {
  value: number
  color?: BadgeColor
  skeleton?: boolean
  className?: string
}

const bgColors: Record<BadgeColor, string> = {
  neutral:  'bg-[var(--color-neutral-700)] dark:bg-[var(--color-neutral-400)]',
  inactive: 'bg-[var(--color-neutral-700)] dark:bg-[var(--color-neutral-400)]',
  secure:   'bg-[var(--color-blue-700)] dark:bg-[var(--color-blue-400)]',
  success:  'bg-[var(--color-green-700)] dark:bg-[var(--color-green-400)]',
  accent:   'bg-[var(--color-teal-700)] dark:bg-[var(--color-teal-400)]',
  guide:    'bg-[var(--color-purple-700)] dark:bg-[var(--color-purple-400)]',
  alert:    'bg-[var(--color-red-700)] dark:bg-[var(--color-red-400)]',
  warn:     'bg-[var(--color-orange-700)] dark:bg-[var(--color-orange-400)]',
  caution:  'bg-[var(--color-yellow-700)] dark:bg-[var(--color-yellow-400)]',
}

export function BadgeDot({ color = 'neutral', skeleton, className }: BadgeDotProps) {
  if (skeleton) {
    return (
      <span
        className={cn(
          'inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-neutral-200)] dark:bg-[var(--color-neutral-900)]',
          className,
        )}
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-block w-2 h-2 rounded-full',
        bgColors[color],
        className,
      )}
    />
  )
}

export function BadgeNumber({ value, color = 'neutral', skeleton, className }: BadgeNumberProps) {
  if (skeleton) {
    return (
      <span
        className={cn(
          'inline-block w-[22px] h-4 rounded bg-[var(--color-neutral-200)] dark:bg-[var(--color-neutral-900)]',
          className,
        )}
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-4 min-w-4 px-1 py-0.5 rounded text-note font-regular leading-[14px] text-[var(--text-on-fill)]',
        bgColors[color],
        className,
      )}
    >
      {value}
    </span>
  )
}
