# Button Component

The `Button` component is a versatile button implementation for React, allowing easy integration and customization. Below, you'll find essential information on how to use this component effectively.

## Usage

```jsx
// Import component
import { Button } from 'dept-central-lib-client'
```

```jsx
// Example usage
<Button
  colorScheme="primary"
  colorShade={600}
  variant="solid"
  onClick={() => console.log('Button clicked')}
>
  Click me!
</Button>
```

## Props

| Prop        | Type                                                                    | Description                                | Default Value |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------ | ------------- |
| colorScheme | 'primary' \| 'grayscale' \| 'error' \| 'warning' \| 'success'           | Specifies the color scheme for the button. | "primary"     |
| colorShade  | 25 \| 50 \| 100 \| 200 \| 300 \| 400 \| 500 \| 600 \| 700 \| 800 \| 900 | Specifies the color shade for the button.  | 600           |
| variant     | ButtonVariant                                                           | Specifies the button variant.              | "solid"       |
| type        | string                                                                  | Specifies the button type.                 | "button"      |
| disabled    | boolean                                                                 | Disables the button if set to `true`.      | false         |
| children    | ReactNode                                                               | Content to be displayed within the button. | -             |

## Styling

The button's appearance is determined by its color scheme and variant. You can further customize the button's style by modifying the CSS module.

## Examples

```jsx
// Solid button
<Button colorScheme="primary" variant="solid">
  Solid Button
</Button>

// Outline button
<Button colorScheme="secondary" variant="outline">
  Outline Button
</Button>

// Link button
<Button colorScheme="tertiary" variant="link">
  Link Button
</Button>

// Disabled button
<Button colorScheme="primary" disabled>
  Disabled Button
</Button>
```

### Customization

For advanced customization, you can modify the button's appearance by adjusting the color scheme, shade, and variant props.

## Go main README

[Main README](../../../README.md#components)
