import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type SelectStatus = 'default' | 'error' | 'success'

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  status?: SelectStatus
  children: ReactNode
  className?: string
}

const statusBorder: Record<SelectStatus, string> = {
  default: 'border-[var(--border-default)] hover:border-[var(--color-neutral-900)] dark:hover:border-[var(--color-neutral-200)]',
  error: 'border-[var(--danger)]',
  success: 'border-[var(--feedback-success)]',
}

const statusFocusBorder: Record<SelectStatus, string> = {
  default: 'focus:border-[var(--primary)]',
  error: 'focus:border-[var(--danger)]',
  success: 'focus:border-[var(--feedback-success)]',
}

const statusFocusShadow: Record<SelectStatus, string> = {
  default: 'focus:shadow-[var(--focus-ring)]',
  error: 'focus:shadow-[0_0_0_3px_rgba(212,0,49,0.15)]',
  success: 'focus:shadow-[0_0_0_3px_rgba(52,168,83,0.15)]',
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField({ status = 'default', disabled, className, children, ...props }, ref) {
    return (
      <div className={cn('select-field-wrap', className)}>
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            'appearance-none w-full h-8 pl-3 pr-7 border rounded bg-[var(--surface-card)] dark:bg-[var(--surface-bg)] font-sans text-label text-[var(--text-strong)] cursor-pointer transition-colors duration-150',
            statusBorder[status],
            statusFocusBorder[status],
            statusFocusShadow[status],
            'focus:outline-none',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    )
  }
)
