// Radio.tsx
import { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react'
import { colors } from '../../constants'
import { ColorShade, ColorPalette } from '../../types'
import { getColor } from '../../utils'
import styles from './index.module.css'

interface RadioOwnProps {
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  variant?: 'button' | 'check'
}

type RadioRootAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'children'
  | 'checked'
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
      checked = false,
      colorScheme = 'primary',
      colorShade = 600,
      variant = 'button',
      disabled = false,
      children,
      ...props
    }: RadioProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const color = getColor(colorScheme, colorShade)
    const initialColor = colors.grayscale[500]!
    const disabledColor = colors.grayscale[100]!
    const radioStyles = createRadioStyles(color, initialColor, disabledColor)
    const radioClasses = `${styles.radio} ${styles[variant]}`.trim()
    return (
      <label className={radioClasses} style={radioStyles}>
        <input
          checked={checked}
          disabled={disabled}
          type="radio"
          ref={ref}
          {...props}
        />
        {variant === 'check' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={styles.radioIcon}
          >
            <circle cx="10" cy="10" r="9" strokeWidth="2" />
            <path
              d="M6.25 10L8.75 12.5L13.75 7.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
        {children && <span className={styles.label}>{children}</span>}
      </label>
    )
  },
)

Radio.displayName = 'Radio'
