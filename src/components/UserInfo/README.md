# UserInfo Component

The `UserInfo` component is intended to display brief information about a user, giving the option to logout if needed.

## Usage

```jsx
// Import component
import { UserInfo } from 'dept-central-lib-client'
```

```jsx
// Example usage
<UserInfo
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
| type        | 'normal' | 'compact' | 'image'                                          | Specifies the component type.              | "normal"      |
| className   | string                                                                  | Custom CSS className.                      | ""            |
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
<UserInfo user={user} type="normal" />

// Type normal with logout action
<UserInfo user={user} type="normal" onLogout={() => console.log('logging user out')} />

// Display only the user image
<UserInfo user={user} type="image" />

// Display in compact style
<UserInfo user={user} type="compact" />
```

## Go main README

[Main README](../../../README.md#components)

