# Radio Component

The `Radio` component provides a customizable radio button for React applications. Below is comprehensive information on using and customizing this component.

## Usage

```jsx
// Import component
import { Radio } from '@juanaraneta/dept-central-lib-client'
```

```jsx
// Example usage
<Radio
  colorScheme="primary"
  colorShade={600}
  variant="button"
  onChange={(e) => console.log('Radio changed', e.target.checked)}
>
  Select me
</Radio>
```

## Props

| Prop           | Type                                                                    | Description                                              | Default Value |
| -------------- | ----------------------------------------------------------------------- | -------------------------------------------------------- | ------------- |
| colorScheme    | 'primary' \| 'grayscale' \| 'error' \| 'warning' \| 'success'           | Specifies the color scheme for the radio button.         | "primary"     |
| colorShade     | 25 \| 50 \| 100 \| 200 \| 300 \| 400 \| 500 \| 600 \| 700 \| 800 \| 900 | Specifies the color shade for the radio button.          | 600           |
| variant        | 'button' \| 'check'                                                     | Specifies the radio button variant.                      | "button"      |
| children       | ReactNode                                                               | Label for the radio button.                              | -             |
| defaultChecked | boolean                                                                 | Specifies whether the radio button is initially checked. | -             |
| disabled       | boolean                                                                 | Disables the radio button if set to `true`.              | false         |
| hidden         | boolean                                                                 | Hides the radio button if set to `true`.                 | false         |
| id             | string                                                                  | Specifies the id for the radio button.                   | -             |
| onChange       | (e: ChangeEvent<HTMLInputElement>) => void                              | Function triggered on radio button change.               | -             |
| onClick        | (e: MouseEvent<HTMLInputElement>) => void                               | Function triggered on radio button click.                | -             |
| onFocus        | (e: FocusEvent<HTMLInputElement>) => void                               | Function triggered on radio button focus.                | -             |
| readOnly       | boolean                                                                 | Makes the radio button read-only if set to `true`.       | false         |
| required       | boolean                                                                 | Makes the radio button required if set to `true`.        | false         |
| tabIndex       | number                                                                  | Specifies the tab order of the radio button.             | -             |
| value          | string                                                                  | Specifies the value of the radio button.                 | -             |
| name           | string                                                                  | Specifies the name of the radio button.                  | -             |

_Note: Other standard HTML input attributes can also be applied._

## Styling

The appearance of the radio button is determined by its color scheme, shade, and variant. You can further customize the radio button's style by modifying the CSS module.

## Examples

```jsx
// Standard radio button
<Radio colorScheme="primary" variant="button">
  Select me
</Radio>

// Checkmark style radio button
<Radio colorScheme="secondary" variant="check">
  Check me
</Radio>

// Disabled radio button
<Radio colorScheme="tertiary" disabled>
  Disabled
</Radio>
```

### Customization

For advanced customization, adjust the color scheme, shade, and variant props to suit your requirements.

## Go main README

[Main README](../../../README.md#components)
