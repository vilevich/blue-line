import { cn } from '../../lib/cn'
import { icons, multiColorIcons, type IconName, type MultiColorIconName } from './icons'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<IconSize, string> = {
  sm: 'w-3 h-3',       // 12px
  md: 'w-4 h-4',       // 16px
  lg: 'w-5 h-5',       // 20px
  xl: 'w-6 h-6',       // 24px
}

export interface IconProps {
  name?: IconName
  multiColor?: MultiColorIconName
  size?: IconSize
  className?: string
  'aria-label'?: string
}

export function Icon({ name, multiColor, size = 'md', className, 'aria-label': ariaLabel }: IconProps) {
  const iconName = name ?? multiColor
  if (!iconName) return null

  const isMultiColor = multiColor !== undefined
  const svgUrl = isMultiColor ? multiColorIcons[multiColor!] : icons[name!]

  const style: React.CSSProperties = isMultiColor
    ? {
        backgroundImage: svgUrl,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'transparent',
      }
    : {
        WebkitMaskImage: svgUrl,
        maskImage: svgUrl,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        backgroundColor: 'currentColor',
      }

  return (
    <span
      className={cn('inline-flex items-center justify-center shrink-0', sizeMap[size], className)}
      style={style}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    />
  )
}
