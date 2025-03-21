import { InputHTMLAttributes } from 'react'
import { ColorPalette, ColorShade } from '../../types'

export type DatePickerRootAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'id' | 'required' | 'placeholder'
>

export interface DatePickerOwnProps {
  label?: string
  startDate?: Date
  endDate?: Date
  isRange?: boolean
  isRequired?: boolean
  alwaysOpen?: boolean
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  maxDate?: Date
  minDate?: Date
  i18n?: string
  hint?: string
  errorMessage?: string
  onChange?: (value: { startDate: Date; endDate?: Date }) => void
  onBlur?: (value?: { startDate?: Date; endDate?: Date }) => void
  shouldDisableDate?: (date: Date) => boolean
  withTime?: boolean
}

export interface Option {
  value: string
  label: string
}
