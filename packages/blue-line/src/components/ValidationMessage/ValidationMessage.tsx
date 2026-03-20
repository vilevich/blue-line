import { cn } from '../../lib/cn'

export type ValidationMessageType = 'error' | 'success'

export interface ValidationMessageProps {
  type: ValidationMessageType
  children: string
  className?: string
}

// Dark palette steps match BL CSS: red-400 (#ff6e75), green-400 (#59ffcd) — bright for dark bg readability
const typeStyles: Record<ValidationMessageType, string> = {
  error: 'text-[var(--danger)] dark:text-[var(--color-red-400)]',
  success: 'text-[var(--feedback-success)] dark:text-[var(--color-green-400)]',
}

export function ValidationMessage({ type, children, className }: ValidationMessageProps) {
  return (
    <p className={cn('text-note mt-1', typeStyles[type], className)} role="alert">
      {children}
    </p>
  )
}
