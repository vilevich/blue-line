import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface CardProps {
  children: ReactNode
  className?: string
}

export interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export interface CardTitleProps {
  title: string
  count?: string
  countAccent?: string
  actions?: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-[var(--surface-card)] border border-[var(--border-card)] rounded shadow-card overflow-hidden', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between px-5 h-14 border-b border-[var(--border-card)] font-sans', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ title, count, countAccent, actions, className }: CardTitleProps) {
  return (
    <div className={cn('flex items-center justify-between w-full', className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-label font-medium text-[var(--text-strong)] m-0">{title}</h3>
        {count && (
          <span className="text-label font-regular text-[var(--text-subtle)]">
            {count}
            {countAccent && <span className="text-[var(--color-blue-600)]"> {countAccent}</span>}
          </span>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
