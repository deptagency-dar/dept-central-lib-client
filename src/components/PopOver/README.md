# PopOver Component

The `PopOver` component is a flexible and reusable popover menu that can be triggered by any element and display custom content.
It will adjust its position based on the placement prop in case it doesn't fit in the container.

## Usage

```jsx
// Import component
import { PopOver } from 'dept-central-lib-client'
```

```jsx
// Example usage
const [isOpen, setOpen] = React.useState(false)

<PopOver
  isOpen={isOpen}
  setOpen={setOpen}
  trigger={<button>Click me</button>}
  content={<div>Popover Content</div>}
/>
```

## Props

| Prop      | Type      | Description                                         | Default Value   |
| --------- | --------- | --------------------------------------------------- | --------------- |
| isOpen    | boolean   | Controls the visibility of the popover.             | -               |
| setOpen   | function  | Function to toggle the popover state.               | -               |
| trigger   | ReactNode | The element that triggers the popover.              | -               |
| content   | ReactNode | The content displayed inside the popover.           | -               |
| placement | Placement | Positioning of the popover relative to the trigger. | "bottom-center" |

### Placement Options

The `placement` prop accepts the following values:

- `bottom-start`
- `bottom-end`
- `bottom-center`
- `top-start`
- `top-center`
- `top-end`
- `left-end`
- `left-center`
- `left-start`
- `right-end`
- `right-center`
- `right-start`
- `center`

## Examples

```jsx
// Basic popover
const [isOpen, setOpen] = React.useState(false)

;<PopOver
  isOpen={isOpen}
  setOpen={setOpen}
  trigger={<button>Open PopOver</button>}
  content={<div>Popover Content</div>}
/>
```

```jsx
// Popover with custom placement
const [isOpen, setOpen] = React.useState(false)

;<PopOver
  isOpen={isOpen}
  setOpen={setOpen}
  trigger={<button>Hover me</button>}
  content={<div>Custom positioned popover</div>}
  placement="top-start"
/>
```

## Go to main README

[Main README](../../../README.md#components)
