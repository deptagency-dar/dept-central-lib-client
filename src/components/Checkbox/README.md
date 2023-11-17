### Checkbox Component

The `Checkbox` component provides a customizable checkbox or toggle switch for React applications. Below is comprehensive information on using and customizing this component.

### Usage

```jsx
// Import component
import { Checkbox } from '@juanaraneta/dept-central-lib-client'
```

```jsx
// Example usage
<Checkbox
  colorScheme="primary"
  colorShade={600}
  variant="check"
  onChange={(e) => console.log('Checkbox changed', e.target.checked)}
>
  Check me
</Checkbox>
```

### Props

| Prop           | Type                                       | Description                                          | Default Value |
| -------------- | ------------------------------------------ | ---------------------------------------------------- | ------------- |
| colorScheme    | keyof ColorPalette                         | Specifies the color scheme for the checkbox.         | "primary"     |
| colorShade     | keyof ColorShade                           | Specifies the color shade for the checkbox.          | 600           |
| variant        | 'check' \| 'toggle'                        | Specifies the checkbox variant.                      | "check"       |
| children       | ReactNode                                  | Label for the checkbox.                              | -             |
| defaultChecked | boolean                                    | Specifies whether the checkbox is initially checked. | -             |
| disabled       | boolean                                    | Disables the checkbox if set to `true`.              | false         |
| hidden         | boolean                                    | Hides the checkbox if set to `true`.                 | false         |
| id             | string                                     | Specifies the id for the checkbox.                   | -             |
| onChange       | (e: ChangeEvent<HTMLInputElement>) => void | Function triggered on checkbox change.               | -             |
| onClick        | (e: MouseEvent<HTMLInputElement>) => void  | Function triggered on checkbox click.                | -             |
| onFocus        | (e: FocusEvent<HTMLInputElement>) => void  | Function triggered on checkbox focus.                | -             |
| readOnly       | boolean                                    | Makes the checkbox read-only if set to `true`.       | false         |
| required       | boolean                                    | Makes the checkbox required if set to `true`.        | false         |
| tabIndex       | number                                     | Specifies the tab order of the checkbox.             | -             |
| value          | string                                     | Specifies the value of the checkbox.                 | -             |
| name           | string                                     | Specifies the name of the checkbox.                  | -             |

_Note: Other standard HTML input attributes can also be applied._

### Styling

The appearance of the checkbox is determined by its color scheme, shade, and variant. You can further customize the checkbox's style by modifying the CSS module.

### Examples

```jsx
// Standard checkbox
<Checkbox colorScheme="primary" variant="check">
  Check me
</Checkbox>

// Toggle switch
<Checkbox colorScheme="secondary" variant="toggle">
  Toggle me
</Checkbox>

// Disabled checkbox
<Checkbox colorScheme="tertiary" disabled>
  Disabled
</Checkbox>
```

### Customization

For advanced customization, adjust the color scheme, shade, and variant props to suit your requirements.

### Go main README

[Main README](../../../README.md#components)
