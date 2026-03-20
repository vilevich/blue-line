import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'none'

export interface SeverityProps {
  level: SeverityLevel
  label?: string
  className?: string
}

const signalIcon: Record<SeverityLevel, 'signal-0' | 'signal-1' | 'signal-2' | 'signal-3' | 'signal-4'> = {
  none: 'signal-0',
  low: 'signal-1',
  medium: 'signal-2',
  high: 'signal-3',
  critical: 'signal-4',
}

const defaultLabel: Record<SeverityLevel, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  none: 'None',
}

export function Severity({ level, label, className }: SeverityProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-label font-regular leading-[16px] whitespace-nowrap font-sans text-[var(--text-subtle)]', className)}>
      <Icon multiColor={signalIcon[level]} size="md" />
      <span>{label ?? defaultLabel[level]}</span>
    </span>
  )
}
