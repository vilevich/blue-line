import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface DataTableColumn<T> {
  key: string
  header: string
  width?: string
  render?: (row: T, index: number) => ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  onRowClick?: (row: T, index: number) => void
  rowKey?: (row: T, index: number) => string | number
  emptyMessage?: string
  className?: string
}

export function DataTable<T extends Record<string, unknown>>({ columns, data, onRowClick, rowKey, emptyMessage = 'No data', className }: DataTableProps<T>) {
  return (
    <table className={cn('w-full border-separate border-spacing-0 font-sans', className)}>
      <thead>
        <tr>
          {columns.map((col, ci) => (
            <th
              key={col.key}
              className={cn(
                'h-14 px-3 text-label font-medium text-[var(--text-strong)] text-left whitespace-nowrap leading-4 bg-[var(--surface-card)] border-b border-[var(--border-card)] relative',
                ci === 0 && 'pl-5',
                ci === columns.length - 1 && 'pr-5',
                col.align === 'center' && 'text-center',
                col.align === 'right' && 'text-right',
                col.className,
              )}
              style={col.width ? { width: col.width } : undefined}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="h-14 px-5 text-label text-[var(--text-muted)] text-center bg-[var(--surface-card)]">
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row, ri) => (
            <tr
              key={rowKey ? rowKey(row, ri) : ri}
              onClick={onRowClick ? () => onRowClick(row, ri) : undefined}
              className={cn(
                'group last:[&>td]:border-b-0',
                onRowClick && 'cursor-pointer',
              )}
            >
              {columns.map((col, ci) => (
                <td
                  key={col.key}
                  className={cn(
                    'h-14 px-3 text-label text-[var(--text-subtle)] whitespace-nowrap overflow-hidden text-ellipsis leading-4 bg-[var(--surface-card)] border-b border-[var(--border-card)] group-hover:bg-[var(--surface-hover)] transition-colors duration-100',
                    ci === 0 && 'pl-5',
                    ci === columns.length - 1 && 'pr-5',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    col.className,
                  )}
                >
                  {col.render ? col.render(row, ri) : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
