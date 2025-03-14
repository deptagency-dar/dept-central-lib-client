# Chip button Component

The `Chip` component provides a chip button for React applications. Below is comprehensive information on using and customizing this component.

## Usage

```jsx
// Import component
import { Chip } from 'dept-central-lib-client'
```

```jsx
// Example usage
<Chip label="Chip label" onClick={() => console.log('Chip clicked!')} />
```

## Props

| Prop      | Type                         | Description                                          | Default Value |
| --------- | ---------------------------- | ---------------------------------------------------- | ------------- |
| label     | string                       | REQUIRED. The label for the chip button.             | -             |
| size?     | 'small' \| 'base' \| 'large' | OPTIONAL. Specifies the size for the chip button.     | 'base'        |
| disabled? | boolean                      | OPTIONAL. Disables the chip button if set to `true`. | false         |
| suggested | boolean                      | OPTIONAL. Applies styles to the chip button.         | false         |
| onClick   | () => void                   | OPTIONAL. Function triggered on chip button clicked. | -             |

## Examples

```jsx
// Default chip button
<Chip label="Default Chip" onClick={() => alert('Chip Clicked!')} />

// Suggested chip button
<Chip label="Suggested Chip" suggested />

// Disabled chip button
<Chip label="Disabled Chip" disabled />

// Disabled chip button
<Chip label="Disabled Chip" disabled />

// Small chip button
<Chip label="Default Small Chip" size="small" />

// Large chip button
<Chip label="Default Large Chip" size="large" />

```

## Go main README

[Main README](../../../README.md#components)
