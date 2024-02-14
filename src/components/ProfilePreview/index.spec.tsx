import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { ProfilePreview } from '.'

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  image: 'https://example.com/some-image.png',
}

describe('ProfilePreview component', () => {
  it('renders correctly with default props', () => {
    const { getByAltText, getByText, queryByText } = render(<ProfilePreview user={user} />)

    const image = getByAltText('Avatar') as HTMLImageElement
    expect(image).toBeInTheDocument()
    expect(image.src).toEqual('https://example.com/some-image.png')
    expect(getByText('John Doe')).toBeInTheDocument()
    expect(getByText('john@example.com')).toBeInTheDocument()
    expect(queryByText('Log out')).not.toBeInTheDocument()
  })

  describe('"image" type', () => {
    it('renders the image only', () => {
      const { getByAltText, queryByText } = render(
        <ProfilePreview user={user} type="image" />
      )
      const image = getByAltText('Avatar') as HTMLImageElement
      expect(image).toBeInTheDocument()
      expect(image.src).toEqual('https://example.com/some-image.png')
      expect(queryByText('John Doe')).not.toBeInTheDocument()
      expect(queryByText('john@example.com')).not.toBeInTheDocument()
      expect(queryByText('Log out')).not.toBeInTheDocument()
    })
  })

  describe('"normal" (default) type width "onLogout" action', () => {
    it('renders the image only', async () => {
      const onLogoutMock = jest.fn()
      const { getByAltText, getByText } = render(
        <ProfilePreview
          user={user}
          type="normal"
          onLogout={onLogoutMock}
        />
      )
      const image = getByAltText('Avatar') as HTMLImageElement
      expect(image).toBeInTheDocument()
      expect(image.src).toEqual('https://example.com/some-image.png')
      expect(getByText('John Doe')).toBeInTheDocument()
      expect(getByText('john@example.com')).toBeInTheDocument()
      expect(getByText('Log out')).toBeInTheDocument()

      // logout action
      fireEvent.click(getByText('Log out'))
      await waitFor(() => {
        expect(onLogoutMock).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('"compact" type', () => {
    it('renders the image only', () => {
      const { getByAltText, getByText, queryByText } = render(
        <ProfilePreview user={user} type="compact" />
      )
      const image = getByAltText('Avatar') as HTMLImageElement
      expect(image).toBeInTheDocument()
      expect(image.src).toEqual('https://example.com/some-image.png')
      expect(getByText('John Doe')).toBeInTheDocument()
      expect(getByText('john@example.com')).toBeInTheDocument()
      expect(queryByText('Log out')).not.toBeInTheDocument()
    })
  })
})
