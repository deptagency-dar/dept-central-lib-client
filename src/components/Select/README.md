# Select Component

The `Select` component provides a customizable select input for React applications. Below is comprehensive information on using and customizing this component.

## Usage

```jsx
// Import component
import { Select } from 'dept-central-lib-client'
```

```jsx
// Example usage
<Select
  label="Field label"
  placeholder="Choose an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  onChange={(option) => console.log('Option selected', option)}
/>
```

## Props

| Prop         | Type                                                                    | Description                                              | Default Value |
| ------------ | ----------------------------------------------------------------------- | -------------------------------------------------------- | ------------- |
| label        | string                                                                  | The label for the select input.                          | -             |
| options      | { label: string, value: any }[]                                         | Specifies the options for the select input.              | -             |
| placeholder  | string                                                                  | Specifies the placeholder for the select input.          | -             |
| disabled     | boolean                                                                 | Disables the select input if set to `true`.              | false         |
| isRequired   | boolean                                                                 | Specifies whether the field is required.                 | false         |
| colorScheme  | 'primary' \| 'grayscale' \| 'error' \| 'warning' \| 'success'           | Specifies the color scheme for the select input.         | "primary"     |
| colorShade   | 25 \| 50 \| 100 \| 200 \| 300 \| 400 \| 500 \| 600 \| 700 \| 800 \| 900 | Specifies the color shade for the select input.          | 600           |
| errorMessage | string                                                                  | Displays an errorMessage message below the select input. | -             |
| onChange     | (option: SelectOption) => void                                          | Function triggered on select input change.               | -             |
| onBlur       | (option?: SelectOption) => void                                         | Function triggered when the select input loses focus.    | -             |
| small        | boolean                                                                 | Specifies whether the select input is small.             | false         |

## Examples

```jsx
// Standard select input
<Select
  label="Select"
  placeholder="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  onChange={(option) => console.log('Option selected', option)}
/>

// Disabled select input
<Select
  label="Select"
  placeholder="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  disabled
/>

// Select without label

<Select
  placeholder="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  onChange={(option) => console.log('Option selected', option)}
/>

// Small version

<Select
  small
  placeholder="Select an option"
  options={[
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ]}
  onChange={(option) => console.log('Option selected', option)}
/>

```

## Go main README

[Main README](../../../README.md#components)
