// Checkbox.tsx
import React, { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react'
import { colors } from '../../constants'
import { ColorShade, ColorPalette } from '../../types'
import { getColor } from '../../utils'
import styles from './index.module.css'

interface CheckboxOwnProps {
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  variant?: 'check' | 'toggle'
}

type CheckboxRootAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'children'
  // | 'checked'
  | 'defaultChecked'
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
>

export type CheckboxProps = CheckboxRootAttributes & CheckboxOwnProps

const createCheckboxStyles = (
  color: string,
  initialColor: string,
  disabledColor: string,
): Record<string, unknown> => ({
  '--checkbox-scheme': color,
  '--checkbox-initial-color': initialColor,
  '--checkbox-disabled-color': disabledColor,
})

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      colorScheme = 'primary',
      colorShade = 600,
      variant = 'check',
      children,
      ...props
    }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const color = getColor(colorScheme, colorShade)
    const initialColor = colors.grayscale[500]!
    const disabledColor = colors.grayscale[100]!
    const checkboxStyles = createCheckboxStyles(
      color,
      initialColor,
      disabledColor,
    )
    const checkboxClasses = `${styles.checkbox} ${styles[variant]}`.trim()

    return (
      <label className={checkboxClasses} style={checkboxStyles}>
        <input
          type="checkbox"
          ref={ref}
          {...props}
        />
        {variant === 'toggle' && <span className={styles.toggleSlider}></span>}
        {children && <span className={styles.label}>{children}</span>}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
