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

| Prop        | Type                            | Description                                     | Default Value |
| ----------- | ------------------------------- | ----------------------------------------------- | ------------- |
| label       | string                          | Specifies the label for the select input.       | -             |
| options     | { label: string, value: any }[] | Specifies the options for the select input.     | -             |
| placeholder | string                          | Specifies the placeholder for the select input. | -             |
| disabled    | boolean                         | Disables the select input if set to `true`.     | false         |
| onChange    | (option: SelectOption) => void  | Function triggered on select input change.      | -             |

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

```

## Go main README

[Main README](../../../README.md#components)
