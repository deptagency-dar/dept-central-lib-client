'use client'

import { Dispatch, createContext, useContext } from 'react'

export interface DatePickerState {
  startDate: Date | null
  endDate: Date | null
  modalOpen: boolean
  year: number
  secondYear: number
  month: number
  secondMonth: number
  rangeDays: Date[]
  language: string
}

export type Action =
  | { type: 'SET_START_DATE'; payload: Date | null }
  | { type: 'SET_END_DATE'; payload: Date | null }
  | { type: 'TOGGLE_MODAL' }
  | { type: 'SET_YEAR'; payload: number }
  | { type: 'SET_SECOND_YEAR'; payload: number }
  | { type: 'SET_MONTH'; payload: number }
  | { type: 'SET_SECOND_MONTH'; payload: number }
  | { type: 'SET_RANGE_DAYS'; payload: Date[] }
  | { type: 'SET_LANGUAGE'; payload: string }

export const datePickerReducer = (
  state: DatePickerState,
  action: Action,
): DatePickerState => {
  switch (action.type) {
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload }
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload }
    case 'TOGGLE_MODAL':
      return { ...state, modalOpen: !state.modalOpen }
    case 'SET_YEAR':
      return { ...state, year: action.payload }
    case 'SET_SECOND_YEAR':
      return { ...state, secondYear: action.payload }
    case 'SET_MONTH':
      return { ...state, month: action.payload }
    case 'SET_SECOND_MONTH':
      return { ...state, secondMonth: action.payload }
    case 'SET_RANGE_DAYS':
      return { ...state, rangeDays: action.payload }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    default:
      return state
  }
}

export const DatePickerContext = createContext<
  | {
      state: DatePickerState
      dispatch: Dispatch<Action>
    }
  | undefined
>(undefined)

export const useDatePicker = () => {
  const context = useContext(DatePickerContext)
  if (!context) {
    throw new Error('useDatePicker must be used within a DatePickerProvider')
  }
  return context
}
