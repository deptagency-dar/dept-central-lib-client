// Switch.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Switch from '.';

describe('Switch component', () => {
  it('renders switch correctly', () => {
    const { getByText } = render(<Switch leftOption="Left" rightOption="Right" onSwitch={() => {}} />);
    const leftButton = getByText('Left');
    const rightButton = getByText('Right');
    
    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  it('calls onSwitch with correct option when buttons are clicked', () => {
    const onSwitchMock = jest.fn();
    const { getByText } = render(<Switch leftOption="Left" rightOption="Right" onSwitch={onSwitchMock} />);
    const leftButton = getByText('Left');
    const rightButton = getByText('Right');

    // first time "Left" is selected by default so it don't call onSwitch
    fireEvent.click(leftButton);
    expect(onSwitchMock).not.toHaveBeenCalled();

    fireEvent.click(rightButton);
    expect(onSwitchMock).toHaveBeenCalledWith('Right');

    fireEvent.click(leftButton);
    expect(onSwitchMock).toHaveBeenCalledWith('Left');
  });

  it('applies selected styles to the clicked button', () => {
    const { getByText } = render(<Switch leftOption="Left" rightOption="Right" onSwitch={() => {}} />);
    const leftButton = getByText('Left');
    const rightButton = getByText('Right');

    fireEvent.click(leftButton);
    expect(leftButton).toHaveClass('selected');
    expect(rightButton).not.toHaveClass('selected');

    fireEvent.click(rightButton);
    expect(leftButton).not.toHaveClass('selected');
    expect(rightButton).toHaveClass('selected');
  });
});
