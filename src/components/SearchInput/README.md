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

| Prop        | Type                                       | Description                                                  | Default Value |
| ----------- | ------------------------------------------ | ------------------------------------------------------------ | ------------- |
| value       | string                                     | Specifies the value for the search input.                    | -             |
| disabled    | boolean                                    | Disables the search input if set to `true`.                  | false         |
| id          | string                                     | Specifies the id for the search input.                       | -             |
| name        | string                                     | Specifies the name for the search input.                     | -             |
| min         | string                                     | Specifies the minimum value for the search input.            | -             |
| max         | string                                     | Specifies the maximum value for the search input.            | -             |
| minLength   | number                                     | Specifies the minimum length for the search input.           | -             |
| maxLength   | number                                     | Specifies the maximum length for the search input.           | -             |
| pattern     | string                                     | Specifies a regular expression pattern for the search input. | -             |
| size        | number                                     | Specifies the size of the search input.                      | -             |
| placeholder | string                                     | Specifies the placeholder for the search input.              | -             |
| onChange    | (e: ChangeEvent<HTMLInputElement>) => void | Function triggered on search input change.                   | -             |

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
