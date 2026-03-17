import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  label?: ReactNode
}

const checkSvg = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5L6.5 10.5L4 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const dashSvg = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8H12" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ checked = false, indeterminate = false, disabled = false, label, className, ...props }, forwardedRef) {
    const innerRef = useRef<HTMLInputElement>(null)

    // Sync indeterminate property (not available as HTML attribute)
    useEffect(() => {
      const el = innerRef.current
      if (el) el.indeterminate = indeterminate
    }, [indeterminate])

    // Merge refs
    const setRef = (node: HTMLInputElement | null) => {
      (innerRef as React.MutableRefObject<HTMLInputElement | null>).current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node
    }

    const isActive = checked || indeterminate

    return (
      <label
        className={cn(
          'inline-flex items-center gap-2 cursor-pointer select-none',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
      >
        <span className="relative inline-flex items-center justify-center shrink-0">
          <input
            ref={setRef}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <span
            className={cn(
              'w-4 h-4 rounded-[4px] border inline-flex items-center justify-center transition-colors duration-150',
              isActive
                ? 'bg-[var(--primary)] border-[var(--primary)] peer-hover:bg-[var(--primary-hover)] peer-hover:border-[var(--primary-hover)]'
                : 'bg-transparent border-[var(--color-neutral-400)] peer-hover:border-[var(--color-neutral-600)]',
              'peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--primary)] peer-focus-visible:outline-offset-2',
            )}
          >
            {checked && !indeterminate && checkSvg}
            {indeterminate && dashSvg}
          </span>
        </span>
        {label && <span className="text-label text-[var(--text-strong)]">{label}</span>}
      </label>
    )
  }
)
