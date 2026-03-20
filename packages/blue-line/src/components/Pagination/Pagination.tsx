import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export interface PaginationProps {
  page: number
  totalPages: number
  pageSize: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  className?: string
}

export function Pagination({ page, totalPages, pageSize, pageSizeOptions = [10, 25, 50], onPageChange, onPageSizeChange, className }: PaginationProps) {
  return (
    <div className={cn('flex items-center justify-between px-5 h-14 bg-[var(--surface-card)] border-t border-[var(--border-card)] text-label font-regular text-[var(--text-subtle)] font-sans', className)}>
      <div className="flex items-center gap-2">
        <select
          value={pageSize}
          onChange={e => onPageSizeChange?.(Number(e.target.value))}
          className="min-w-16 h-8 px-2 border border-[var(--border-200)] rounded bg-[var(--surface-card)] text-label text-[var(--text-subtle)] font-sans cursor-pointer"
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <span>per page</span>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="w-8 h-8 border border-[var(--border-200)] bg-[var(--surface-card)] flex items-center justify-center cursor-pointer rounded-l disabled:opacity-50 disabled:cursor-not-allowed text-[var(--text-subtle)] hover:bg-[var(--hover-subtle)]"
          aria-label="Previous page"
        >
          <Icon name="chevron-left" size="sm" />
        </button>
        <span className="mx-2 text-label whitespace-nowrap">Page {page} of {totalPages}</span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="w-8 h-8 border border-[var(--border-200)] bg-[var(--surface-card)] flex items-center justify-center cursor-pointer rounded-r disabled:opacity-50 disabled:cursor-not-allowed text-[var(--text-subtle)] hover:bg-[var(--hover-subtle)]"
          aria-label="Next page"
        >
          <Icon name="chevron-right" size="sm" />
        </button>
      </div>
    </div>
  )
}
