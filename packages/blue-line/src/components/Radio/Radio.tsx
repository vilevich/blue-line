import { createContext, useContext, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

/* ---- Context ---- */

interface RadioContextValue {
  name?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

const RadioContext = createContext<RadioContextValue>({})

/* ---- RadioGroup ---- */

export interface RadioGroupProps {
  value?: string
  onChange?: (value: string) => void
  name?: string
  disabled?: boolean
  inline?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  children: ReactNode
  className?: string
}

export function RadioGroup({ value, onChange, name, disabled, inline, children, className, ...ariaProps }: RadioGroupProps) {
  return (
    <RadioContext.Provider value={{ name, value, onChange, disabled }}>
      <div
        role="radiogroup"
        aria-label={ariaProps['aria-label']}
        aria-labelledby={ariaProps['aria-labelledby']}
        className={cn(
          inline ? 'flex items-center gap-4' : 'flex flex-col gap-3',
          className,
        )}
      >
        {children}
      </div>
    </RadioContext.Provider>
  )
}

/* ---- RadioOption ---- */

export interface RadioOptionProps {
  value: string
  label?: ReactNode
  disabled?: boolean
  className?: string
}

export function RadioOption({ value, label, disabled: optionDisabled, className }: RadioOptionProps) {
  const ctx = useContext(RadioContext)
  const isDisabled = optionDisabled || ctx.disabled
  const isSelected = ctx.value === value

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none',
        isDisabled && 'cursor-not-allowed',
        className,
      )}
    >
      <span className="relative inline-flex items-center justify-center shrink-0">
        <input
          type="radio"
          name={ctx.name}
          value={value}
          checked={isSelected}
          disabled={isDisabled}
          onChange={() => ctx.onChange?.(value)}
          className="sr-only peer"
        />
        <span
          className={cn(
            'w-4 h-4 rounded-full border-2 inline-flex items-center justify-center transition-colors duration-150',
            isSelected
              ? 'border-[var(--primary)]'
              : 'border-[var(--toggle-inactive)]',
            !isDisabled && !isSelected && 'peer-hover:border-[var(--toggle-border-hover)]',
            isDisabled && 'border-[var(--toggle-border-disabled)]',
            'peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--primary)] peer-focus-visible:outline-offset-2',
          )}
        >
          {isSelected && (
            <span
              className={cn(
                'w-2 h-2 rounded-full',
                isDisabled ? 'bg-[var(--toggle-border-disabled)]' : 'bg-[var(--primary)]',
              )}
            />
          )}
        </span>
      </span>
      {label && (
        <span className={cn('text-label', isDisabled ? 'text-[var(--text-muted)]' : 'text-[var(--text-strong)]')}>
          {label}
        </span>
      )}
    </label>
  )
}
