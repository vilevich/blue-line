import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Icon, type IconName } from '../Icon'

export type ButtonVariant = 'primary' | 'outline' | 'text' | 'menu' | 'icon' | 'brand' | 'danger' | 'save' | 'discard'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  danger?: boolean
  icon?: IconName
  loading?: boolean
  active?: boolean
  children?: ReactNode
}

const base = 'inline-flex items-center justify-center h-8 rounded cursor-pointer font-sans text-label shrink-0 transition-colors duration-150'

const variants: Record<ButtonVariant, string> = {
  primary: 'px-4 font-medium bg-[var(--primary)] text-[var(--text-on-fill)] border-none hover:bg-[var(--primary-hover)]',
  outline: [
    'px-3 gap-2 font-medium bg-transparent text-[var(--text-strong)] border border-[var(--border-default)]',
    'whitespace-nowrap w-fit hover:bg-[var(--hover-subtle)]',
  ].join(' '),
  text: 'px-0 gap-2 font-medium bg-transparent text-[var(--text-link)] border-none hover:text-[var(--color-blue-900)] whitespace-nowrap',
  menu: [
    'px-3 gap-2 font-regular bg-transparent text-[var(--text-strong)] border border-[var(--border-default)]',
    'whitespace-nowrap hover:border-[var(--color-neutral-500)]',
  ].join(' '),
  icon: 'w-8 p-0 bg-transparent text-[var(--text-subtle)] border border-[var(--border-default)] hover:bg-[var(--hover-subtle)] hover:text-[var(--text-strong)]',
  brand: [
    'px-4 gap-2 font-medium text-[var(--text-on-fill)] border-none whitespace-nowrap',
    'hover:brightness-[1.08]',
  ].join(' '),
  danger: 'px-4 gap-2 font-medium bg-[var(--danger)] text-[var(--text-on-fill)] border-none hover:bg-[var(--danger-hover)]',
  save: 'px-4 font-medium bg-[var(--surface-bg)] text-[var(--text-muted)] border border-[var(--border-default)] cursor-default pointer-events-none transition-[background,color,border-color] duration-200',
  discard: 'px-4 font-medium bg-transparent text-[var(--text-strong)] border border-[var(--border-default)] hidden hover:bg-[var(--hover-subtle)]',
}

const dangerModifiers: Partial<Record<ButtonVariant, string>> = {
  outline: 'text-[var(--danger)] border-[var(--danger)] hover:bg-[rgba(212,0,49,0.05)]',
  text: 'text-[var(--danger)] hover:text-[var(--color-red-700)]',
  menu: 'text-[var(--danger)] border-[var(--danger)] hover:bg-[rgba(212,0,49,0.05)]',
}

// Dark overrides — ONLY for palette-step differences (semantic tokens remap automatically)
const darkOverrides: Partial<Record<ButtonVariant, string>> = {
  text: 'dark:hover:text-[var(--color-blue-400)]',
  menu: 'dark:hover:border-[var(--color-neutral-400)] dark:active:border-[var(--color-blue-400)]',
}

const darkDangerOverrides: Partial<Record<ButtonVariant, string>> = {
  text: 'dark:hover:text-[var(--color-red-400)]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'primary', danger: isDanger, icon: iconName, loading, active, disabled, className, children, ...props }, ref) {
    const isSubtle = variant === 'outline' || variant === 'text' || variant === 'menu' || variant === 'icon'

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          base,
          variants[variant],
          variant !== 'brand' && darkOverrides[variant],
          isDanger && dangerModifiers[variant],
          isDanger && darkDangerOverrides[variant],
          active && variant === 'menu' && 'border-[var(--primary)] hover:border-[var(--primary)] dark:border-[var(--color-blue-400)] dark:hover:border-[var(--color-blue-400)]',
          (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
          loading && 'btn-loading',
          loading && isSubtle && 'btn-loading-subtle',
          className,
        )}
        style={variant === 'brand' ? {
          background: 'linear-gradient(19.57deg, #123d8b 0%, #1d6bfc 48.958%, #03e7f5 100%)',
        } : undefined}
        {...props}
      >
        {iconName && <Icon name={iconName} size="md" />}
        {children}
      </button>
    )
  }
)
