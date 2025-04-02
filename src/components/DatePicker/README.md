# DatePicker Component

The `DatePicker` component offers a flexible date selection interface for React applications. Below is comprehensive information on using and customizing this component.

## Usage

```jsx
// Import component
import { DatePicker } from 'dept-central-lib-client'
```

```jsx
// Example usage
<DatePicker
  startDate={new Date()}
  onChange={(value) => console.log('Date selected:', value)}
/>
```

## Props

Here is the updated props table for the `DatePicker` component:

## Props

| Prop         | Type                                                                    | Description                                              | Default Value |
| ------------ | ----------------------------------------------------------------------- | -------------------------------------------------------- | ------------- |
| startDate    | Date                                                                    | Initial start date for the date picker.                  | -             |
| endDate      | Date                                                                    | Initial end date for the date picker.                    | -             |
| errorMessage | string                                                                  | Displays an errorMessage message below the select input. | -             |
| isRange      | boolean                                                                 | Specifies whether the date picker is in range mode.      | false         |
| colorScheme  | 'primary' \| 'grayscale' \| 'error' \| 'warning' \| 'success'           | Specifies the color scheme for the date picker.          | "primary"     |
| colorShade   | 25 \| 50 \| 100 \| 200 \| 300 \| 400 \| 500 \| 600 \| 700 \| 800 \| 900 | Specifies the color shade for the date picker.           | 600           |
| config       | DatePickerConfig                                                        | Additional configurations for the date picker.           | -             |
| maxDate      | Date                                                                    | Maximum allowed date for selection in the date picker.   | -             |
| minDate      | Date                                                                    | Minimum allowed date for selection in the date picker.   | -             |
| placeholder  | string                                                                  | Placeholder text for the date picker input.              | -             |
| onChange     | (value: { startDate: Date; endDate?: Date }) => void                    | Function triggered on date selection.                    | -             |
| onBlur       | (value?: { startDate?: Date; endDate?: Date }) => void                  | Function triggered when the date picker loses focus.     | -             |
| disabled     | boolean                                                                 | Disables the date picker if set to `true`.               | false         |
| id           | string                                                                  | Specifies the id for the date picker.                    | -             |

## Styling

The appearance of the date picker is determined by its color scheme, shade, and additional configurations. For further customization, you can modify the CSS module to suit your design requirements.

## Examples

```jsx
// Standard date picker
<DatePicker startDate={new Date()} />

// Range date picker
<DatePicker startDate={new Date()} endDate={new Date('2024-02-28')} isRange />
```

### Customization

For advanced customization, adjust the color scheme, shade, additional configurations, and display format props to suit your application's needs.

## Go to Main README

[Main README](../../../README.md#components)
