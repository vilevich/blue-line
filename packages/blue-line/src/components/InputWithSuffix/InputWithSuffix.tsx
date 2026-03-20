import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface InputWithSuffixProps extends InputHTMLAttributes<HTMLInputElement> {
  suffix: string
  maxWidth?: number | string
  className?: string
}

export const InputWithSuffix = forwardRef<HTMLInputElement, InputWithSuffixProps>(
  function InputWithSuffix({ suffix, maxWidth = 180, disabled, className, ...props }, ref) {
    return (
      <div
        className={cn('inline-flex items-center', className)}
        style={{ maxWidth }}
      >
        <div
          className={cn(
            'flex-1 flex items-center h-8 px-3 border rounded-l border-r-0 bg-[var(--surface-card)] dark:bg-[var(--surface-bg)] transition-colors duration-150',
            'border-[var(--border-default)] focus-within:border-[var(--primary)] focus-within:shadow-[var(--focus-ring)]',
            disabled && 'opacity-50',
          )}
        >
          <input
            ref={ref}
            disabled={disabled}
            className="flex-1 min-w-0 border-none outline-none bg-transparent font-sans text-label text-[var(--text-subtle)] placeholder:text-[var(--text-muted-accessible)]"
            {...props}
          />
        </div>
        <span
          className={cn(
            'h-8 px-3 flex items-center text-label text-[var(--text-muted)] bg-[var(--surface-bg)] border border-[var(--border-default)] border-l-0 rounded-r shrink-0',
            disabled && 'opacity-50',
          )}
        >
          {suffix}
        </span>
      </div>
    )
  }
)
