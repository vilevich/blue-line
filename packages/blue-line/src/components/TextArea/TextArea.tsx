import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type TextAreaStatus = 'default' | 'error' | 'success'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  status?: TextAreaStatus
  className?: string
}

const statusBorder: Record<TextAreaStatus, string> = {
  default: 'border-[var(--border-default)]',
  error: 'border-[var(--danger)]',
  success: 'border-[var(--feedback-success)]',
}

const statusFocusShadow: Record<TextAreaStatus, string> = {
  default: 'focus:shadow-[var(--focus-ring)]',
  error: 'focus:shadow-[0_0_0_3px_rgba(212,0,49,0.15)]',
  success: 'focus:shadow-[0_0_0_3px_rgba(52,168,83,0.15)]',
}

const statusFocusBorder: Record<TextAreaStatus, string> = {
  default: 'focus:border-[var(--primary)]',
  error: 'focus:border-[var(--danger)]',
  success: 'focus:border-[var(--feedback-success)]',
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ status = 'default', disabled, className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          'w-full px-3 py-2 border rounded bg-[var(--surface-card)] dark:bg-[var(--surface-bg)] font-sans text-label text-[var(--text-subtle)] resize-y transition-colors duration-150',
          'placeholder:text-[var(--text-muted-accessible)] outline-none',
          statusBorder[status],
          statusFocusBorder[status],
          statusFocusShadow[status],
          disabled && 'opacity-50 cursor-not-allowed resize-none',
          className,
        )}
        {...props}
      />
    )
  }
)
