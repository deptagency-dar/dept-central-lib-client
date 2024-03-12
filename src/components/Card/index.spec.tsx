// Card.spec.tsx
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Card, CardHeader, CardBody, CardFooter } from '.'

describe('Card component', () => {
  it('renders Card component with children correctly', () => {
    const { getByText } = render(
      <Card>
        <CardHeader>
          <h3>This is the header</h3>
        </CardHeader>
        <CardBody>
          <p>This is the body</p>
        </CardBody>
        <CardFooter>
          <p>This is the footer</p>
        </CardFooter>
      </Card>,
    )

    expect(getByText('This is the header')).toBeInTheDocument()
    expect(getByText('This is the body')).toBeInTheDocument()
    expect(getByText('This is the footer')).toBeInTheDocument()
  })

  it('renders CardHeader component correctly', () => {
    const { getByText } = render(
      <CardHeader>
        <h3>This is the header</h3>
      </CardHeader>,
    )
    expect(getByText('This is the header')).toBeInTheDocument()
  })

  it('renders CardBody component correctly', () => {
    const { getByText } = render(
      <CardBody>
        <p>This is the body</p>
      </CardBody>,
    )
    expect(getByText('This is the body')).toBeInTheDocument()
  })

  it('renders CardFooter component correctly', () => {
    const { getByText } = render(
      <CardFooter>
        <p>This is the footer</p>
      </CardFooter>,
    )
    expect(getByText('This is the footer')).toBeInTheDocument()
  })
})
