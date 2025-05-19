# Timeline Component

The `Timeline` component displays a list of items in a vertical timeline layout. Each item can include an icon, title, subtitle, caption, and optionally a call-to-action (CTA) link.

## Usage

```tsx
// Import component
import { Timeline } from 'dept-central-lib-client'
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline'
```

```tsx
// Example usage
<Timeline
  items={[
    {
      icon: CheckIcon,
      iconColorScheme: 'success',
      iconColorShade: 500,
      title: 'Timeline Item 1',
      subtitle: 'Subtitle here',
      caption: 'Caption here',
    },
    {
      icon: ClockIcon,
      title: 'Timeline Item 2',
      cta: {
        label: 'CTA Label',
        onClick: alert('Reminder created!'),
      },
    },
  ]}
/>
```

## Props

### Timeline

| Prop  | Type           | Description                              | Default Value |
| ----- | -------------- | ---------------------------------------- | ------------- |
| items | TimelineItem[] | REQUIRED. List of items to be displayed. | -             |

### TimelineItem

| Prop            | Type                                                                    | Description                                                                                                              | Default Value |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------- |
| icon            | ElementType                                                             | REQUIRED. A reference to a React component representing an SVG icon (e.g., from Heroicons), not an instantiated element. | -             |
| iconColorScheme | 'primary' \| 'grayscale' \| 'error' \| 'warning' \| 'success'           | OPTIONAL. Specifies the icon bg color.                                                                                   | "grayscale"   |
| iconColorShade  | 25 \| 50 \| 100 \| 200 \| 300 \| 400 \| 500 \| 600 \| 700 \| 800 \| 900 | OPTIONAL. Specifies the icon bg color.                                                                                   | 300           |
| title           | string                                                                  | REQUIRED. Main title of the item.                                                                                        | -             |
| subtitle?       | string?                                                                 | OPTIONAL. Secondary line below the title. Ignored if cta is present.                                                     | -             |
| caption?        | string?                                                                 | OPTIONAL. Caption under the subtitle. Ignored if cta is present.                                                         | -             |
| cta?            | { label: string; onClick: () => void }                                  | OPTIONAL. Replaces subtitle and caption with a clickable call-to-action.                                                 | -             |

## Go to main README

[Main README](../../../README.md#components)
