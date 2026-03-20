import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center h-4 font-sans', className)} aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i} className="contents">
          {i > 0 && (
            <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-muted)]" aria-hidden="true">
              <Icon name="chevron-right" size="md" />
            </span>
          )}
          {item.onClick ? (
            <a
              onClick={item.onClick}
              className="flex items-center gap-1 text-note font-regular leading-[16px] text-[var(--text-muted)] no-underline cursor-pointer hover:text-[var(--primary)] transition-colors duration-150"
            >
              {item.label}
            </a>
          ) : (
            <span className="flex items-center gap-1 text-note font-regular leading-[16px] text-[var(--text-muted)]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
