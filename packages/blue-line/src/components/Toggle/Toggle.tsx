import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  skeleton?: boolean
}

const thumbShadow = '0 0 6px -4px rgba(0,0,0,0.48), 0 2px 6px -4px rgba(0,0,0,0.48)'

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle({ checked = false, onChange, disabled = false, skeleton = false, className, ...props }, ref) {
    if (skeleton) {
      return (
        <span className={cn('inline-block w-7 h-4 rounded-full bg-[var(--surface-secondary)]', className)} />
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative inline-flex items-center shrink-0 w-7 h-4 rounded-full border transition-colors duration-150 cursor-pointer',
          checked
            ? 'bg-[var(--toggle-active)] border-[var(--toggle-active)]'
            : 'bg-[var(--toggle-inactive)] border-[var(--toggle-inactive)]',
          !disabled && 'hover:border-[var(--toggle-border-hover)]',
          disabled && 'bg-[var(--toggle-fill-disabled)] border-[var(--toggle-border-disabled)] cursor-not-allowed',
          'focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-[left] duration-150',
            disabled ? 'bg-[var(--toggle-thumb-disabled)]' : 'bg-[var(--color-neutral-white)]',
          )}
          style={{
            left: checked ? 13 : 1,
            boxShadow: disabled ? undefined : thumbShadow,
          }}
        />
      </button>
    )
  }
)
