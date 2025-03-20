# Chip Button Component

The `Chip` component provides a chip button for React applications. Below is comprehensive information on using and customizing this component.

## Usage

```jsx
// Import component
import { Chip } from 'dept-central-lib-client'
```

```jsx
// Example usage
<Chip
  label="Chip label"
  onClick={(label) => console.log(`${label} clicked!`)}
/>
```

## Props

| Prop     | Type                                 | Description                                          | Default Value |
| -------- | ------------------------------------ | ---------------------------------------------------- | ------------- |
| label    | string                               | REQUIRED. The label for the chip button.             | -             |
| size?    | 'small' \| 'base' \| 'large'         | OPTIONAL. Specifies the size for the chip button.     | 'base'        |
| variant? | 'default' \| 'primary' \| 'disabled' | OPTIONAL. Defines the style for the chip.             | 'default'     |
| icon?    | ReactNode                            | OPTIONAL. An icon to display next to the label.      | -             |
| onClick  | (label: string) => void              | OPTIONAL. Function triggered on chip button clicked. | -             |

## Examples

```jsx
// Default chip button
<Chip label="Default Chip" onClick={(label) => console.log(`${label} clicked!`)} />

// Primary chip button
<Chip label="Primary Chip" variant="primary" onClick={(label) => console.log(`${label} clicked!`)} />

// Disabled chip button
<Chip label="Disabled Chip" variant="disabled" />

// Small chip button
<Chip label="Small Chip" size="small" onClick={(label) => console.log(`${label} clicked!`)} />

// Large chip button
<Chip label="Large Chip" size="large" onClick={(label) => console.log(`${label} clicked!`)} />

// Chip with icon
<Chip label="Chip with Icon" icon={<span>🔥</span>} onClick={(label) => console.log(`${label} clicked!`)} />
```

## Go to main README

[Main README](../../../README.md#components)
