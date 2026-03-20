import { forwardRef, useState, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export type InputType = 'text' | 'email' | 'password' | 'number' | 'date' | 'search'
export type InputStatus = 'default' | 'error' | 'success'

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: InputType
  status?: InputStatus
  clearable?: boolean
  onClear?: () => void
  className?: string
}

const statusBorder: Record<InputStatus, string> = {
  default: 'border-[var(--border-default)]',
  error: 'border-[var(--danger)] dark:border-[var(--color-red-500)]',
  success: 'border-[var(--feedback-success)] dark:border-[var(--color-green-600)]',
}

const statusFocusShadow: Record<InputStatus, string> = {
  default: 'focus-within:shadow-[var(--focus-ring)]',
  error: 'focus-within:shadow-[0_0_0_3px_rgba(212,0,49,0.15)]',
  success: 'focus-within:shadow-[0_0_0_3px_rgba(52,168,83,0.15)]',
}

const statusFocusBorder: Record<InputStatus, string> = {
  default: 'focus-within:border-[var(--primary)]',
  error: 'focus-within:border-[var(--danger)]',
  success: 'focus-within:border-[var(--feedback-success)]',
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField({ type = 'text', status = 'default', clearable, onClear, disabled, className, value, onChange, ...props }, ref) {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const resolvedType = isPassword && showPassword ? 'text' : type

    const hasValue = value !== undefined && value !== ''

    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 h-8 px-3 border rounded bg-[var(--surface-card)] dark:bg-[var(--surface-bg)] font-sans text-label text-[var(--text-strong)] transition-colors duration-150',
          statusBorder[status],
          statusFocusBorder[status],
          statusFocusShadow[status],
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
      >
        <input
          ref={ref}
          type={resolvedType}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className="flex-1 min-w-0 border-none outline-none bg-transparent font-sans text-label text-[var(--text-subtle)] placeholder:text-[var(--text-muted-accessible)]"
          {...props}
        />
        {clearable && hasValue && (
          <button
            type="button"
            onClick={onClear}
            tabIndex={-1}
            className="flex items-center justify-center w-3.5 h-3.5 min-w-6 min-h-6 shrink-0 text-[var(--text-muted)] hover:text-[var(--text-strong)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2 focus-visible:rounded-sm"
            aria-label="Clear input"
          >
            <Icon name="close" size="sm" />
          </button>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            tabIndex={-1}
            className="flex items-center justify-center w-4 h-4 min-w-6 min-h-6 shrink-0 text-[var(--text-muted)] hover:text-[var(--text-strong)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2 focus-visible:rounded-sm"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size="md" />
          </button>
        )}
      </div>
    )
  }
)
