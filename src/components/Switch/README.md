# Switch Component

The `Switch` component is a selector between two options, presented as side-by-side buttons. It provides an intuitive way to toggle between options with rounded borders for a polished appearance.

## Usage

```jsx
import { Switch } from 'dept-central-lib-client'
```

```jsx
// Example usage
<Switch
  leftOption="Option 1"
  rightOption="Option 2"
  onChange={(selectedOption) =>
    console.log(`Selected option: ${selectedOption}`)
  }
/>
```

## Props

| Prop           | Type                                                                    | Description                                           | Default Value |
| -------------- | ----------------------------------------------------------------------- | ----------------------------------------------------- | ------------- |
| colorScheme    | 'primary' \| 'grayscale' \| 'error' \| 'warning' \| 'success'           | Specifies the color scheme for the switch.            | "primary"     |
| colorShade     | 25 \| 50 \| 100 \| 200 \| 300 \| 400 \| 500 \| 600 \| 700 \| 800 \| 900 | Specifies the color shade for the switch.             | 600           |
| leftOption     | string                                                                  | Text for the left button option.                      | -             |
| rightOption    | string                                                                  | Text for the right button option.                     | -             |
| onChange       | function                                                                | Callback function triggered when an option is chosen. | -             |
| selectedOption | string                                                                  | Text for the default selected option.                 | -             |


## Go main README

[Main README](../../../README.md#components)