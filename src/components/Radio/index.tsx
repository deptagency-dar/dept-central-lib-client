'use client'

// Radio.tsx
import { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react'
import { colors } from '../../constants'
import { ColorShade, ColorPalette } from '../../types'
import { getColor } from '../../utils'
import styles from './index.module.css'

interface RadioOwnProps {
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
}

type RadioRootAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'children'
  | 'disabled'
  | 'hidden'
  | 'id'
  | 'onChange'
  | 'onClick'
  | 'onFocus'
  | 'readOnly'
  | 'required'
  | 'tabIndex'
  | 'value'
  | 'name'
  | 'defaultChecked'
  | 'checked'
>

export type RadioProps = RadioRootAttributes & RadioOwnProps

const createRadioStyles = (
  color: string,
  initialColor: string,
  disabledColor: string,
): Record<string, unknown> => ({
  '--radio-scheme': color,
  '--radio-initial-color': initialColor,
  '--radio-disabled-color': disabledColor,
})

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      colorScheme = 'primary',
      colorShade = 600,
      children,
      ...rest
    }: RadioProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const color = getColor(colorScheme, colorShade)
    const initialColor = colors.grayscale[500]!
    const disabledColor = colors.grayscale[100]!
    const radioStyles = createRadioStyles(color, initialColor, disabledColor)
    return (
      <label className={styles.radio} style={radioStyles}>
        <input type="radio" ref={ref} {...rest} />
        {children && (
          <span className="text-sm leading-6 text-gray-500">{children}</span>
        )}
      </label>
    )
  },
)

Radio.displayName = 'Radio'
