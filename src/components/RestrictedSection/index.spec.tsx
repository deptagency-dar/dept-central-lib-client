import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { RestrictedSection } from '.'

describe('RestrictedSection component', () => {
  it('renders the children correctly when user has access', () => {
    const { getByText } = render(
      <RestrictedSection hasAccess={true}>
        <p>Restricted Content</p>
      </RestrictedSection>
    )

    expect(getByText('Restricted Content')).toBeInTheDocument()
  })

  it('renders the default "access denied" message when no custom text is provided', () => {
    const { getByText, queryByText } = render(
      <RestrictedSection hasAccess={false}>
        <p>Restricted Content</p>
      </RestrictedSection>
    )

    expect(getByText("You don't have access")).toBeInTheDocument()
    expect(queryByText('Restricted Content')).not.toBeInTheDocument()
  })

  describe('Custom text', () => {
    it('renders the custom "access denied" message when a custom text is provided', () => {
      const { getByText } = render(
        <RestrictedSection hasAccess={false} text="You need to be a member to access" >
          <p>Restricted Content</p>
        </RestrictedSection>
      )

      expect(getByText('You need to be a member to access')).toBeInTheDocument()
    })
  })

  describe('MinHeight', () => {
    it('applies the default minHeight when no custom minHeight is provided', () => {
      const { container } = render(
        <RestrictedSection hasAccess={false}>
          <p>Restricted Content</p>
        </RestrictedSection>
      )

      const restrictedSection = container.firstChild as HTMLElement
      expect(restrictedSection).toHaveStyle('min-height: 75px')
    })

    it('applies a custom minHeight when provided', () => {
      const { container } = render(
        <RestrictedSection hasAccess={false} minHeight="250px">
          <p>Restricted Content</p>
        </RestrictedSection>
      )

      const restrictedSection = container.firstChild as HTMLElement
      expect(restrictedSection).toHaveStyle('min-height: 250px')
    })
  })
})
