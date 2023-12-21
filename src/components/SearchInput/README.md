# SearchInput Component

The `SearchInput` component provides a customizable search input for React applications. Below is comprehensive information on using and customizing this component.

## Usage

```jsx
// Import component
import { SearchInput } from 'dept-central-lib-client'
```

```jsx
// Example usage
<SearchInput
  placeholder="Search"
  onChange={(e) => console.log('Value changed', e.target.checked)}
/>
```

## Props

| Prop        | Type                                       | Description                                     | Default Value |
| ----------- | ------------------------------------------ | ----------------------------------------------- | ------------- |
| value       | string                                     | Specifies the value for the search input.       | -             |
| disabled    | boolean                                    | Disables the radio button if set to `true`.     | false         |
| id          | string                                     | Specifies the id for the radio button.          | -             |
| placeholder | string                                     | Specifies the placeholder for the search input. | -             |
| onChange    | (e: ChangeEvent<HTMLInputElement>) => void | Function triggered on radio button change.      | -             |
| onFocus     | (e: FocusEvent<HTMLInputElement>) => void  | Function triggered on radio button focus.       | -             |

_Note: Other standard HTML input attributes can also be applied._

## Examples

```jsx
// Standard search input
<SearchInput placeholder="Search" />

// Disabled search input
<SearchInput placeholder="Search" disabled />

// Change event
<SearchInput
  placeholder="Search"
  onChange={(e) => console.log('Value changed', e.target.checked)}
/>

// Controlled search input
const [value, setValue] = useState('')
<SearchInput
  placeholder="Search"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

## Go main README

[Main README](../../../README.md#components)
