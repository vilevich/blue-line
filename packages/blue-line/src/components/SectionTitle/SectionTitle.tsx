import { cn } from '../../lib/cn'

export interface SectionTitleProps {
  title: string
  description?: string
  className?: string
}

export function SectionTitle({ title, description, className }: SectionTitleProps) {
  return (
    <div className={cn('font-sans', description ? 'mb-4' : 'mb-1', className)}>
      <h2 className="text-h3 font-medium text-[var(--text-strong)] mb-1">{title}</h2>
      {description && (
        <p className="text-label font-regular text-[var(--text-subtle)] m-0">{description}</p>
      )}
    </div>
  )
}
