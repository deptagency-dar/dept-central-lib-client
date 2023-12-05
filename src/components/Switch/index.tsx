// Switch.tsx

import React, { useState } from 'react';
import styles from './index.module.css';

interface SwitchProps {
  leftOption: string;
  rightOption: string;
  onSwitch: (selectedOption: string) => void;
}

const Switch: React.FC<SwitchProps> = ({ leftOption, rightOption, onSwitch }) => {
  const [selectedOption, setSelectedOption] = useState(leftOption);

  const handleSwitch = (option: string) => {
    if (option === selectedOption) return;
    setSelectedOption(option);
    onSwitch(option);
  };

  return (
    <div className={styles.switch}>
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
  );
};

export default Switch;
