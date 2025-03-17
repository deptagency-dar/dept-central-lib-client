import { classNames } from '../../utils'
import { FC, ReactNode } from 'react'

type SizeProp = 'small' | 'base' | 'large'
type VariantProp = 'default' | 'primary' | 'disabled'

interface ChipProps {
  label: string
  size?: SizeProp
  variant?: VariantProp
  icon?: ReactNode
  onClick?: (label: string) => void
}

export const Chip: FC<ChipProps> = ({
  label,
  size = 'base',
  variant = 'default',
  icon,
  onClick,
}: ChipProps) => {
  const sizeClasses: Record<SizeProp, string> = {
    small: 'text-xs px-2 py-1',
    base: 'text-sm px-2.5 py-1.5',
    large: 'text-base px-3 py-2',
  }

  const variantClasses: Record<VariantProp, string> = {
    disabled: 'bg-grayscale-200 text-grayscale-500',
    primary: 'bg-primary-25 text-primary-600 hover:bg-primary-50',
    default: 'bg-grayscale-200 text-grayscale-700 hover:bg-grayscale-300',
  }

  return (
    <button
      onClick={() => onClick?.(label)}
      disabled={variant === 'disabled'}
      className={classNames(
        `rounded-2xl capitalize transition-colors flex gap-2 items-center justify-center leading-[normal]`,
        sizeClasses[size],
        variantClasses[variant],
      )}
    >
      <span className="mt-0.5">{label}</span>
      {icon ? <span>{icon}</span> : null}
    </button>
  )
}
