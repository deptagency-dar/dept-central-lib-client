# Switch Component

The `Switch` component is a selector between two options, presented as side-by-side buttons. It provides an intuitive way to toggle between options with rounded borders for a polished appearance.

## Usage

```jsx
import { Switch } from 'dept-central-lib-client';

<Switch
  leftOption="Option 1"
  rightOption="Option 2"
  onSwitch={(selectedOption) => console.log(`Selected option: ${selectedOption}`)}
/>
```

## Props

| Prop        | Type       | Description                                           | Default Value |
| ----------- | ---------- | ----------------------------------------------------- | ------------- |
| leftOption  | string     | Text for the left button option.                      | -             |
| rightOption | string     | Text for the right button option.                     | -             |
| onSwitch    | function   | Callback function triggered when an option is chosen. | -             |
