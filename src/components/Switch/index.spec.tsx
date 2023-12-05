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

  it('calls onSwitch with correct option when left button is clicked', () => {
    const onSwitchMock = jest.fn();
    const { getByText } = render(<Switch leftOption="Left" rightOption="Right" onSwitch={onSwitchMock} />);
    const leftButton = getByText('Left');

    fireEvent.click(leftButton);
    expect(onSwitchMock).toHaveBeenCalledWith('Left');
  });

  it('calls onSwitch with correct option when right button is clicked', () => {
    const onSwitchMock = jest.fn();
    const { getByText } = render(<Switch leftOption="Left" rightOption="Right" onSwitch={onSwitchMock} />);
    const rightButton = getByText('Right');

    fireEvent.click(rightButton);
    expect(onSwitchMock).toHaveBeenCalledWith('Right');
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
