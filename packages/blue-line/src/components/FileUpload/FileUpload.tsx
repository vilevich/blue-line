import { useRef, type ChangeEvent } from 'react'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export interface FileUploadProps {
  accept?: string
  fileName?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export function FileUpload({ accept, fileName, placeholder = 'Add file', disabled, onChange, className }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'inline-flex items-center gap-2 h-8 px-3 border rounded bg-[var(--surface-card)] dark:bg-[var(--surface-bg)] cursor-pointer transition-colors duration-150',
        'border-[var(--border-default)] hover:border-[var(--primary)]',
        'focus-visible:border-[var(--primary)] focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
        tabIndex={-1}
      />
      <span className={cn(
        'flex-1 text-left text-label truncate',
        fileName ? 'text-[var(--text-strong)]' : 'text-[var(--text-muted-accessible)]',
      )}>
        {fileName || placeholder}
      </span>
      <Icon name="upload" size="md" className="text-[var(--text-muted)] shrink-0" />
    </button>
  )
}
