import { forwardRef, ForwardedRef, InputHTMLAttributes, useState } from 'react'
import Datepicker, { Configs, DateType, DateValueType } from 'react-tailwindcss-datepicker'
import { ColorShade, ColorPalette } from '../../types'
import { getColor } from '../../utils'
import styles from './index.module.css'

interface DatePickerOwnProps {
  startDate?: DateType
  endDate?: DateType
  isRange?: boolean
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  i18n?: string
  configs?: Configs
  displayFormat?: string
  maxDate?: Date
  minDate?: Date
  showShortcuts?: boolean
  showFooter?: boolean
}

type DatePickerRootAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'children'
  | 'disabled'
  | 'id'
  | 'onChange'
  | 'required'
  | 'value'
  | 'placeholder'
  | 'readOnly'
>

export type DatePickerProps = DatePickerRootAttributes & DatePickerOwnProps

const createDatePickerStyles = (
  color: string,
  disabledColor: string,
): Record<string, unknown> => ({
  '--datepicker-scheme': color,
  '--datepicker-disabled-color': disabledColor,
})

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      colorScheme = 'primary',
      colorShade = 600,
      isRange = false,
      startDate = null,
      endDate = null,
      onChange,
      disabled,
      ...rest
    }: DatePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const color = getColor(colorScheme, colorShade)
    const disabledColor = getColor('grayscale', 100)
    const datePickerStyles = createDatePickerStyles(color, disabledColor)

    const [value, setValue] = useState<DateValueType>({
      startDate,
      endDate,
    })

    const handleValueChange = (newValue: DateValueType) => {
      setValue(newValue)
      if (onChange) onChange(newValue as never)
    }

    const datePickerClasses =
      `${styles.datepicker} ${disabled ? styles.disabled : ''}`.trim()

    return (
      <div className={datePickerClasses} ref={ref} style={datePickerStyles}>
        <Datepicker
          primaryColor="violet"
          disabled={disabled}
          useRange={isRange}
          asSingle={!isRange}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value={value as any}
          onChange={handleValueChange}
          {...rest}
        />
      </div>
    )
  },
)

DatePicker.displayName = 'DatePicker'
