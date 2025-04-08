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
      icon: <CheckIcon className="text-white bg-success-500 p-2" />,
      title: 'Timeline Item 1',
      subtitle: 'Subtitle here',
      caption: 'Caption here',
    },
    {
      icon: <ClockIcon className="text-white bg-gray-300 p-2" />,
      title: 'Timeline Item 2',
      cta: {
        label: 'Learn more',
        url: 'https://example.com',
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

| Prop      | Type                           | Description                                                              | Default Value |
| --------- | ------------------------------ | ------------------------------------------------------------------------ | ------------- |
| icon      | ReactNode                      | REQUIRED. Icon to display in the timeline circle.                        | -             |
| title     | string                         | REQUIRED. Main title of the item.                                        | -             |
| subtitle? | string?                        | OPTIONAL. Secondary line below the title. Ignored if cta is present.     | -             |
| caption?  | string?                        | OPTIONAL. Caption under the subtitle. Ignored if cta is present.         | -             |
| cta?      | { label: string; url: string } | OPTIONAL. Replaces subtitle and caption with a clickable call-to-action. | -             |

## Go to main README

[Main README](../../../README.md#components)
