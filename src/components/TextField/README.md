# TextField Component

The `TextField` component is a customizable text input field for React, designed to enhance user interactions. Below, you'll find comprehensive information on using and customizing this component.

## Usage

```jsx
// Import component
import { TextField } from 'dept-central-lib-client'
```

```jsx
// Example usage
<TextField
  label="Username"
  colorScheme="primary"
  colorShade={600}
  placeholder="Enter your username"
  onChange={(e) => console.log('Input value:', e.target.value)}
/>
```

## Props

| Prop        | Type                                                                    | Description                                                 | Default Value |
| ----------- | ----------------------------------------------------------------------- | ----------------------------------------------------------- | ------------- |
| label       | string                                                                  | The label for the text input field.                         | -             |
| colorScheme | 'primary' \| 'grayscale' \| 'error' \| 'warning' \| 'success'           | Specifies the color scheme for the text field.              | "primary"     |
| colorShade  | 25 \| 50 \| 100 \| 200 \| 300 \| 400 \| 500 \| 600 \| 700 \| 800 \| 900 | Specifies the color shade for the text field.               | 600           |
| error       | string                                                                  | Displays an error message below the input field.            | -             |
| disabled    | boolean                                                                 | Disables the text input field if set to `true`.             | false         |
| value       | string                                                                  | Specifies the value of the text input field.                | -             |
| onChange    | (e: ChangeEvent<HTMLInputElement>) => void                              | Function triggered on input change.                         | -             |
| placeholder | string                                                                  | The placeholder text for the input field.                   | -             |
| id          | string                                                                  | Specifies the id for the input field.                       | -             |
| name        | string                                                                  | Specifies the name of the input field.                      | -             |
| min         | string                                                                  | Specifies the minimum value for the input field.            | -             |
| max         | string                                                                  | Specifies the maximum value for the input field.            | -             |
| minLength   | number                                                                  | Specifies the minimum length for the input field.           | -             |
| maxLength   | number                                                                  | Specifies the maximum length for the input field.           | -             |
| pattern     | string                                                                  | Specifies a regular expression pattern for the input field. | -             |
| size        | number                                                                  | Specifies the size of the input field.                      | -             |

_Note: Other standard HTML input attributes can also be applied._

## Styling

The appearance of the text input field is determined by its color scheme and state (disabled, error). You can further customize the text field's style by modifying the CSS module.

## Examples

```jsx
// Standard text input field
<TextField
  label="Username"
  colorScheme="primary"
  placeholder="Enter your username"
  onChange={(e) => console.log("Input value:", e.target.value)}
/>

// Text input field with an error
<TextField
  label="Password"
  colorScheme="error"
  placeholder="Enter your password"
  error="Password is too short"
/>

// Disabled text input field
<TextField
  label="Email"
  colorScheme="secondary"
  disabled
  value="example@email.com"
/>
```

### Customization

For advanced customization, adjust the color scheme, shade, and other props to suit your requirements.

## Go main README

[Main README](../../../README.md#components)
