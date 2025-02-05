import React from 'react'
import { render, screen } from '@testing-library/react'
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

  it('renders the default skeleton when user has no access', () => {
    const { getByText, queryByText } = render(
      <RestrictedSection hasAccess={false}>
        <p>Restricted Content</p>
      </RestrictedSection>
    )

    expect(getByText("You don't have access")).toBeInTheDocument()
    expect(queryByText('Restricted Content')).not.toBeInTheDocument()
  })

  describe('Custom text', () => {
    it('renders the skeleton with custom restricted message', () => {
      const { getByText } = render(
        <RestrictedSection hasAccess={false} text="You need to be a member to access" >
          <p>Restricted Content</p>
        </RestrictedSection>
      )

      expect(getByText('You need to be a member to access')).toBeInTheDocument()
    })
  })

  describe('Skeleton lines', () => {
    it('renders the correct number of skeleton lines based on the "lines" prop', () => {
      render(
        <RestrictedSection hasAccess={false} lines={7}>
          <p>Restricted Content</p>
        </RestrictedSection>
      )

      const skeletonContainer = screen.getByTestId('skeleton-container')
      expect(skeletonContainer.childNodes.length).toBe(7)
    })
  })
})
