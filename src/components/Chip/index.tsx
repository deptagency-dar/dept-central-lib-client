import PlusCircle from './icons/PlusCircle'
import XCircle from './icons/XCircle'
import { FC } from 'react'

type Size = 'small' | 'base' | 'large'

interface ChipProps {
  label: string
  size?: Size
  disabled?: boolean
  suggested?: boolean
  onClick?: () => void
}

const renderIcon = (disabled: boolean, suggested: boolean, size: Size) => {
  if (disabled) return null
  const sizeWidth: Record<Size, number> = {
    small: 12,
    base: 14,
    large: 16,
  }
  return suggested ? (
    <PlusCircle size={sizeWidth[size]} />
  ) : (
    <XCircle size={sizeWidth[size]} />
  )
}

export const Chip: FC<ChipProps> = ({
  label,
  size = 'base',
  disabled = false,
  suggested = false,
  onClick,
}: ChipProps) => {
  const sizeClasses: Record<Size, string> = {
    small: 'text-xs px-2 py-1',
    base: 'text-sm px-2.5 py-1.5',
    large: 'text-base px-3 py-2',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl font-["Maison Neue"] capitalize transition-colors 
        ${sizeClasses[size]} 
        ${disabled ? 'bg-grayscale-200 text-grayscale-500' : ''}
        ${suggested && !disabled ? 'bg-primary-25 text-primary-600 hover:bg-primary-50' : ''}
        ${!suggested && !disabled ? 'bg-grayscale-200 text-grayscale-700 hover:bg-grayscale-300' : ''}
        `}
    >
      <span className="flex gap-2 items-center justify-center leading-[normal]">
        {label} {renderIcon(disabled, suggested, size)}
      </span>
    </button>
  )
}
