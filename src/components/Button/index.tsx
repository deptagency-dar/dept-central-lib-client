// Button.tsx

import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react'
import cn from 'classnames'
import { ColorPalette, ColorShade } from '../../types'
import { getColor, getContrastColor, getDarkenColor } from '../../utils'
import styles from './index.module.css'

interface ButtonOwnProps {
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  variant?: ButtonVariant
  className?: string
  icon?: JSX.Element | null
}

type ButtonVariant = 'solid' | 'outline' | 'link'

type ButtonRootAttributes = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'children'
  | 'disabled'
  | 'hidden'
  | 'id'
  | 'onBlur'
  | 'onClick'
  | 'onFocus'
  | 'tabIndex'
  | 'type'
>

export type ButtonProps = ButtonRootAttributes & ButtonOwnProps

const createButtonStyles = (
  color: string,
  contrastColor: string,
  focusColor: string,
  hoverColor: string,
): Record<string, unknown> => ({
  '--button-scheme': color,
  '--button-text-color': contrastColor,
  '--button-focus-color': focusColor,
  '--button-hover-color': hoverColor,
})

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      colorScheme = 'primary',
      colorShade = 600,
      variant = 'solid',
      type = 'button',
      disabled = false,
      icon = null,
      children,
      className = '',
      ...rest
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const color = getColor(colorScheme, colorShade)
    const contrastColor = getContrastColor(color)
    const focusColor = getDarkenColor(color, 30)
    const hoverColor = getDarkenColor(color)
    const buttonStyles = createButtonStyles(
      color,
      contrastColor,
      focusColor,
      hoverColor,
    )

    return (
      <button
        className={cn(styles[variant], disabled && styles.disabled, className)}
        disabled={disabled}
        ref={ref}
        style={buttonStyles}
        type={type}
        {...rest}
      >
        {icon}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
