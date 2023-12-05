// Switch.stories.tsx

import React from 'react';
import Switch from '.';

export default {
  title: 'Components/Switch',
  component: Switch,
};

const Template = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  leftOption: 'Left',
  rightOption: 'Right',
  onSwitch: (selectedOption) => {
    console.log(`Selected option: ${selectedOption}`);
  },
};
