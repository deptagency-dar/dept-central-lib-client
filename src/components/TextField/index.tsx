// TextField.tsx
import { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react'
import { ColorPalette, ColorShade } from '../../types'
import styles from './index.module.css'
import { getColor } from '../../utils'

interface TextFieldOwnProps {
  label: string
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  error?: string
}

type TextFieldRootAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'disabled'
  | 'value'
  | 'onChange'
  | 'placeholder'
  | 'id'
  | 'name'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'size'
>

export type TextFieldProps = TextFieldRootAttributes & TextFieldOwnProps

const createTextFieldStyles = (
  color: string,
  disabledColor: string,
  labelColor: string,
  placeholderColor: string,
  errorColor: string,
): Record<string, unknown> => ({
  '--textfield-scheme': color,
  '--textfield-disabled-color': disabledColor,
  '--textfield-label-color': labelColor,
  '--textfield-placeholder-color': placeholderColor,
  '--textfield-error-color': errorColor,
})

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      colorScheme = 'primary',
      colorShade = 600,
      disabled = false,
      label,
      error,
      ...rest
    }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const color = getColor(colorScheme, colorShade)
    const disabledColor = getColor('grayscale', 100)
    const labelColor = getColor('grayscale', 800)
    const placeholderColor = getColor('grayscale', 400)
    const errorColor = getColor('error', 500)
    const textFieldStyles = createTextFieldStyles(
      color,
      disabledColor,
      labelColor,
      placeholderColor,
      errorColor,
    )
    const textFieldClasses = `${styles.textField} ${
      error ? styles.error : ''
    } ${disabled ? styles.disabled : ''}`.trim()

    return (
      <div style={textFieldStyles}>
        <div className={textFieldClasses}>
          <label className={styles.label}>{label}</label>
          <input type="text" disabled={disabled} ref={ref} {...rest} />
        </div>
        {error && <small className={styles.errorMessage}>{error}</small>}
      </div>
    )
  },
)

TextField.displayName = 'TextField'
