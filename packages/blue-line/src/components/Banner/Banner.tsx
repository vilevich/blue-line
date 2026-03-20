import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type BannerVariant = 'info' | 'alert' | 'neutral' | 'warn'

export interface BannerAction {
  label: string
  onClick: () => void
}

export interface BannerProps {
  variant?: BannerVariant
  icon?: ReactNode
  title?: string
  description?: string
  actions?: BannerAction[]
  className?: string
}

const variantBg: Record<BannerVariant, string> = {
  info: 'bg-[var(--color-blue-100)] dark:bg-[rgba(29,107,252,0.10)]',
  alert: 'bg-[var(--color-red-100)] dark:bg-[rgba(212,0,49,0.10)]',
  neutral: 'bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)]',
  warn: 'bg-[var(--color-orange-100)] dark:bg-[rgba(232,135,37,0.10)]',
}

export function Banner({ variant = 'info', icon, title, description, actions, className }: BannerProps) {
  return (
    <div
      className={cn(
        'flex items-center p-5 gap-3 rounded font-sans',
        variantBg[variant],
        className,
      )}
      role={variant === 'alert' || variant === 'warn' ? 'alert' : 'status'}
    >
      {icon && (
        <div className="w-4 h-4 shrink-0 flex items-center justify-center text-[var(--text-strong)]">
          {icon}
        </div>
      )}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-1 min-w-0 text-label leading-[16px]">
          {title && <span className="font-medium text-[var(--text-strong)] whitespace-nowrap">{title}</span>}
          {description && <span className="font-regular text-[var(--text-subtle)]">{description}</span>}
        </div>
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-px h-3 bg-[var(--border-default)]" />
            {actions.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={action.onClick}
                className="text-label font-medium text-[var(--primary)] whitespace-nowrap cursor-pointer bg-transparent border-none p-0 leading-[16px] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
