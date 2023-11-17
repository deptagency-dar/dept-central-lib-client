# DEPT Central Lib Client

## Introduction

This repository contains a React design system with TypeScript support that utilizes Webpack for compilation. The design system includes ui components, as well as styles for shadows, color palettes, typography, etc.

## Getting Started

To use this design system in your React project, follow these steps:

1. **Installation**: Install the design system package in your project.

   ```bash
   yarn add dept-central-lib-client
   ```

2. **Import the global styles**:
   Import the stylesheet into your root component file.

   ```javascript
   import 'dept-central-lib-client/dist/styles.css'
   ```

3. **Import Components**: Import the desired components into your React components.

   ```jsx
   import { Button, Checkbox, Radio } from 'dept-central-lib-client'
   ```

4. **Usage**: Use the components in your JSX as needed.

   ```jsx
   <Button colorScheme="primary" variant="solid">
     Click me
   </Button>
   ```

## Components

- [Button](src/components/Button/README.md)
- [Checkbox](src/components/Checkbox/README.md)
- [Radio](src/components/Radio/README.md)
- [TextField](src/components/TextField/README.md)

## Color Palette

The design system includes a predefined color palette with primary, grayscale, error, warning, and success colors. These can be accessed and customized as needed.

## Typography

Typography settings, including font family, weights, and sizes, are defined in the design system. You can use these settings to ensure a consistent typography style throughout your application using the provides css classes.

## Shadows

The design system provides CSS classes for different shadow sizes. You can apply these classes to elements to achieve various shadow effects.

```jsx
<div className="shadowMedium">This element has a medium shadow.</div>
```

## Utils

### Color Utilities

The design system includes utility functions, some of them for example are for working with colors, such as getting contrast colors, lightening, and darkening colors.

```jsx
import {
  getContrastColor,
  getLightenColor,
  getDarkenColor,
  getColor,
} from 'dept-central-lib-client/utils'
```

Feel free to explore and customize these utilities based on your project's needs.

## Storybook

The design system includes Storybook stories for colors, typography, and all the components.

## Development

To contribute to the design system, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/deptagency-dar/dept-central-lib-client.git
   ```

2. Install dependencies:

   ```bash
   cd dept-central-lib-client
   npm install
   ```

3. Make your changes and create a pull request.

# Unit Testing

This design system includes comprehensive unit tests to ensure the reliability and correctness of its components. The testing is done using Jest and Testing Library. Follow the guidelines below to run and extend the tests.

## Running Tests

To execute the unit tests, use the following npm scripts:

- Run all tests:

  ```bash
  npm test
  ```

- Generate test coverage report:

  ```bash
  npm run test:coverage
  ```

- Run tests in watch mode:

  ```bash
  npm run test:dev
  ```

## Jest Configuration

The Jest configuration is defined in the `jest.config.js` file. Some key settings include:

- **Preset**: The preset is set to `ts-jest` for TypeScript support.
- **Test Environment**: The test environment is configured as `jsdom`.
- **Module Mapper**: The module mapper is set up to handle CSS imports using `identity-obj-proxy`.
- **Setup Files After Env**: The setup file includes extended expectations from `@testing-library/jest-dom`.
- **Test Match**: Tests are matched based on the file pattern in the `src/components` directory.
- **Transform**: TypeScript files are transformed using `ts-jest` with the specified `tsconfig.json` file.
