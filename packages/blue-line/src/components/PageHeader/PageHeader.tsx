import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface PageHeaderProps {
  breadcrumb?: ReactNode
  title: string
  actions?: ReactNode
  className?: string
}

export function PageHeader({ breadcrumb, title, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2 items-start font-sans', className)}>
      {breadcrumb}
      <div className="flex items-center justify-between h-8 w-full">
        <h1 className="text-h2 font-regular leading-[27px] text-[var(--text-strong)] m-0">{title}</h1>
        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  )
}
