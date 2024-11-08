# Avatar Component

The `Avatar` component is intended to display brief information about a user, giving the option to logout if needed.

## Usage

```jsx
// Import component
import { Avatar } from 'dept-central-lib-client'
```

```jsx
// Example usage
<Avatar
  user={user}
  type="normal"
  onLogout={() => console.log('Logging out user')}
/>
```

User prop implements the following interface:
```tsx
interface User {
  name: string
  email?: string
  image?: string
}
```

## Props

| Prop        | Type                                                                    | Description                                | Default Value |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------ | ------------- |
| user        | User                                                                    | Specifies the user information.            | -             |
| status      | 'online' | 'company' | 'verified'                                       | Specifies the avatar status.               | -             |
| type        | 'normal' | 'compact' | 'image'                                          | Specifies the component type.              | "normal"      |
| className   | string                                                                  | Custom CSS className.                      | ""            |
| imageWidth  | string                                                                  | Specifies the image width.                 | "63px"        |
| onLogout    | () => void                                                              | Logout action.                             | -             |


## Examples

```jsx
// define some user information
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  image: 'https://example.com/some-image.png'
}
// Type normal (default if non specified)
<Avatar user={user} type="normal" />

// Type normal with logout action
<Avatar user={user} type="normal" onLogout={() => console.log('logging user out')} />

// Display only the user image
<Avatar user={user} type="image" />

// Display in compact style
<Avatar user={user} type="compact" />

// Display status
<Avatar user={user} status="online" type="compact" />

// Specify image width
<Avatar user={user} status="online" type="compact" width="40px"/>
```

## Go main README

[Main README](../../../README.md#components)

