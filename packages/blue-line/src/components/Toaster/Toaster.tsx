import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export type ToasterVariant = 'info' | 'success' | 'error'

export interface ToasterProps {
  variant?: ToasterVariant
  visible: boolean
  title: string
  description?: string
  icon?: ReactNode
  onClose?: () => void
  children?: ReactNode
  className?: string
}

const variantBorder: Record<ToasterVariant, string> = {
  info: 'border-[var(--color-neutral-500)]',
  success: 'border-[var(--color-blue-500)]',
  error: 'border-[var(--color-red-500)]',
}

export function Toaster({ variant = 'info', visible, title, description, icon, onClose, children, className }: ToasterProps) {
  return (
    <div
      className={cn(
        'fixed top-[76px] right-5 flex items-start gap-5 p-5 w-[485px] max-w-[calc(100vw-40px)]',
        'bg-[var(--surface-card)] border rounded shadow-toast font-sans z-[1001]',
        'transition-all duration-300',
        variantBorder[variant],
        visible ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-[100px] pointer-events-none',
        className,
      )}
      role="alert"
    >
      {icon && <div className="shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="text-h4 font-medium leading-[18px] text-[var(--text-strong)]">{title}</div>
          {description && (
            <div className="text-label font-regular leading-[1.5] text-[var(--text-subtle)]">{description}</div>
          )}
        </div>
        {children}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center w-4 h-4 shrink-0 bg-transparent border-none p-0 cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-strong)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2"
          aria-label="Close notification"
        >
          <Icon name="close" size="md" />
        </button>
      )}
    </div>
  )
}
