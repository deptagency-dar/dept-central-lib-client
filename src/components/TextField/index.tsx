// TextField.tsx
import {
  forwardRef,
  ForwardedRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { ColorPalette, ColorShade } from '../../types'
import styles from './index.module.css'
import { classNames, getColor } from '../../utils'

interface TextFieldOwnProps {
  label?: string
  internalLabel?: string
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  errorMessage?: string
  isMultiLine?: boolean
  isRequired?: boolean
}

type TextFieldRootAttributes =
  | Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | 'disabled'
      | 'required'
      | 'value'
      | 'onChange'
      | 'onBlur'
      | 'placeholder'
      | 'id'
      | 'name'
      | 'min'
      | 'max'
      | 'minLength'
      | 'maxLength'
      | 'pattern'
      | 'readOnly'
      | 'size'
    >
  | Pick<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      | 'disabled'
      | 'required'
      | 'value'
      | 'placeholder'
      | 'id'
      | 'name'
      | 'onChange'
      | 'onBlur'
      | 'readOnly'
      | 'rows'
      | 'cols'
      | 'minLength'
      | 'maxLength'
    >

export type TextFieldProps = TextFieldRootAttributes & TextFieldOwnProps

const createTextFieldStyles = (
  color: string,
  disabledColor: string,
  readOnlyColor: string,
  labelColor: string,
  placeholderColor: string,
  errorColor: string,
): Record<string, unknown> => ({
  '--textfield-scheme': color,
  '--textfield-disabled-color': disabledColor,
  '--textfield-readonly-color': readOnlyColor,
  '--textfield-label-color': labelColor,
  '--textfield-placeholder-color': placeholderColor,
  '--textfield-error-color': errorColor,
})

export const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>(
  (
    {
      colorScheme = 'primary',
      colorShade = 600,
      disabled = false,
      readOnly = false,
      label,
      internalLabel,
      errorMessage,
      isMultiLine,
      isRequired,
      onChange,
      onBlur,
      ...rest
    }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const color = getColor(colorScheme, colorShade)
    const disabledColor = getColor('grayscale', 100)
    const labelColor = getColor('grayscale', 800)
    const placeholderColor = getColor('grayscale', 400)
    const errorColor = getColor('error', 500)
    const readOnlyColor = getColor('primary', 50)
    const textFieldStyles = createTextFieldStyles(
      color,
      disabledColor,
      readOnlyColor,
      labelColor,
      placeholderColor,
      errorColor,
    )
    const textFieldClasses = `${styles.textField} ${
      errorMessage ? styles.error : ''
    } ${disabled ? styles.disabled : ''} ${readOnly ? styles.readOnly : ''}`.trim()

    return (
      <>
        {label && (
          <label
            className={classNames(
              isRequired
                ? 'after:content-["*"] after:ml-0.5 after:text-red-500'
                : '',
              styles.label,
            )}
          >
            {label}
          </label>
        )}
        <div className={textFieldClasses} style={textFieldStyles}>
          {internalLabel && <label>{internalLabel}</label>}
          {isMultiLine ? (
            <textarea
              disabled={disabled}
              readOnly={readOnly}
              ref={ref as ForwardedRef<HTMLTextAreaElement>}
              onChange={(e) => (onChange ? onChange(e as never) : null)}
              onBlur={(e) => (onBlur ? onBlur(e as never) : null)}
              {...rest}
            />
          ) : (
            <input
              type="text"
              disabled={disabled}
              readOnly={readOnly}
              ref={ref as ForwardedRef<HTMLInputElement>}
              onChange={(e) => (onChange ? onChange(e as never) : null)}
              onBlur={(e) => (onBlur ? onBlur(e as never) : null)}
              {...rest}
            />
          )}
        </div>
        {errorMessage && (
          <small className={styles.errorMessage } style={textFieldStyles}>
            {errorMessage}
          </small>
        )}
      </>
    )
  },
)

TextField.displayName = 'TextField'
