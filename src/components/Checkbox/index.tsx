'use client'

// Checkbox.tsx
import React, {
  forwardRef,
  ForwardedRef,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react'
import { colors } from '../../constants'
import { ColorShade, ColorPalette } from '../../types'
import { classNames, getColor } from '../../utils'
import styles from './index.module.css'

interface CheckboxOwnProps {
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  isRequired?: boolean
  variant?: 'check' | 'toggle'
  onChange?: (isChecked: boolean) => void
  checked?: boolean
}

type CheckboxRootAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'children'
  | 'defaultChecked'
  | 'disabled'
  | 'hidden'
  | 'id'
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
      isRequired,
      onChange,
      checked,
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

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target
      if (onChange) {
        onChange(checked)
      }
    }

    return (
      <label
        className={classNames(
          styles.checkbox,
          styles[variant],
          isRequired
            ? 'after:content-["*"] after:ml-0.5 after:text-red-500'
            : '',
        )}
        style={checkboxStyles}
      >
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={handleCheckboxChange}
          {...props}
        />
        {variant === 'toggle' && <span className={styles.toggleSlider}></span>}
        {children && <span className={styles.label}>{children}</span>}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
