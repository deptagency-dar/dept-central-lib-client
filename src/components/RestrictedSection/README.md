# RestrictedSection Component

The `RestrictedSection` component conditionally displays content based on access permissions, showing a placeholder with a message when access is denied.

## Usage

```jsx
// Import component
import { RestrictedSection } from 'dept-central-lib-client'
```

```jsx
// Example usage
<RestrictedSection hasAccess={false} type="normal">
  {children}
</RestrictedSection>
```

## Props

    hasAccess: boolean,
    children: JSX.Element,
    minHeight?: number,
    className?: string,
    text?: string

| Prop      | Type        | Description                                              | Default Value           |
| --------- | ----------- | -------------------------------------------------------- | ----------------------- | 
| hasAccess | boolean     | Determines if the user has access to the content.        | -                       |
| children  | JSX.Element | Content that will be displayed when the user has access. | -                       |
| minHeight | string      | Minimum height of the restricted section.                | "75px"                  |
| className | string      | Custom CSS className.                                    | ""                      |
| text      | string      | Text to display when the user doesn’t have access.       | "You don't have access" |

## Examples

```jsx
// With access
<RestrictedSection
  hasAccess={true}
>
  {children}
</RestrictedSection>

// Without access
<RestrictedSection
  hasAccess={false}
>
  {children}
</RestrictedSection>

// With custom text
<RestrictedSection
  hasAccess={false}
  text="You need to be a member to access"
>
  {children}
</RestrictedSection>

// With custom minimum height
<RestrictedSection
  hasAccess={false}
  minHeight="250px"
>
  {children}
</RestrictedSection>

```

## Go main README

[Main README](../../../README.md#components)
