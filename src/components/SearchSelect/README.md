# SearchSelect Component

The `SearchSelect` component provides a customizable search input for React applications with a item list that contains the label and an optional rounded picture for the search matches. Below is comprehensive information on using and customizing this component.

## Usage

```jsx
// Import component
import { SearchSelect } from 'dept-central-lib-client'
```

```jsx
// Example usage
<SearchSelect
  placeholder="Search"
  onSelected={(option) => console.log('Option selected', option)}
/>
```

## Props

| Prop        | Type                                                                  | Description                                      | Default Value |
| ----------- | --------------------------------------------------------------------- | ------------------------------------------------ | ------------- |
| options     | { label: string, value: string, picture:? string }[]                   | Specifies the options for the select input list.  | -             |
| placeholder | string                                                                | Specifies the placeholder for the search input.   | -             |
| disabled    | boolean                                                               | Disables the search input if set to `true`.      | false         |
| onSelected  | (option: { label: string, value: string, picture: string }[]) => void | Function triggered on item list selected         | -             |

## Examples

```jsx

const OPTIONS = [
  {
    value: '1',
    label: 'John Smith',
    picture: 'https://placehold.co/50',
  },
  {
    value: '2',
    label: 'John Travolta',
    picture: 'https://placehold.co/50',
  },
  {
    value: '3',
    label: 'Marie Curie',
    picture: 'https://placehold.co/50',
  },
  {
    value: '4',
    label: 'Anna Taylor',
    picture: 'https://placehold.co/50',
  },
  {
    value: '5',
    label: 'Peter Wilson',
    picture: 'https://placehold.co/50',
  },
  {
    value: '6',
    label: 'Laura Moore',
    picture: 'https://placehold.co/50',
  },
]

// Standard search select
<SearchSelect options={OPTIONS} placeholder="Search..." onSelected={(option) => console.log(option)} />

// Disabled search select
<SearchSelect disabled options={OPTIONS} placeholder="Search..." onSelected={(option) => console.log(option)} />
```

## Go main README

[Main README](../../../README.md#components)
