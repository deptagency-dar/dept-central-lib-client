// Switch.tsx

import { ForwardedRef, HTMLAttributes, forwardRef, useState } from 'react'
import styles from './index.module.css'
import { ColorPalette, ColorShade } from '../../types'
import { getColor } from '../../utils'

export interface SwitchOwnProps {
  leftOption: string
  rightOption: string
  colorScheme?: keyof ColorPalette
  colorShade?: keyof ColorShade
  onChange?: (selectedOption: string) => void
  selectedOption?: string
}

type SwitchRootAttributes = Pick<HTMLAttributes<HTMLDivElement>, 'id'>

export type SwitchProps = SwitchRootAttributes & SwitchOwnProps

const createSwitchStyles = (color: string): Record<string, unknown> => ({
  '--switch-scheme': color,
})

export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  (
    {
      colorScheme = 'primary',
      colorShade = 600,
      leftOption,
      rightOption,
      onChange,
      selectedOption: controlledSelectedOption,
      ...rest
    }: SwitchProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(
      controlledSelectedOption ?? leftOption,
    )
    const color = getColor(colorScheme, colorShade)
    const switchStyles = createSwitchStyles(color)

    const handleSwitch = (option: string) => {
      if (option === selectedOption) return
      setSelectedOption(option)
      if (onChange) onChange(option)
    }

    return (
      <div className={styles.switch} ref={ref} style={switchStyles} {...rest}>
        <button
          className={`${styles.button} ${styles.leftButton} ${
            selectedOption === leftOption ? styles.selected : ''
          }`}
          onClick={() => handleSwitch(leftOption)}
        >
          {leftOption}
        </button>
        <button
          className={`${styles.button} ${styles.rightButton} ${
            selectedOption === rightOption ? styles.selected : ''
          }`}
          onClick={() => handleSwitch(rightOption)}
        >
          {rightOption}
        </button>
      </div>
    )
  },
)

Switch.displayName = 'Switch'
