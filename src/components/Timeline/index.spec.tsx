import React from 'react'
import { render, screen } from '@testing-library/react'
import { Timeline, TimelineItem } from '.'

const MockIcon = () => <span data-testid="icon">🔥</span>

const mockItems: TimelineItem[] = [
  {
    icon: <MockIcon />,
    title: 'First',
    subtitle: 'Subtitle one',
    caption: 'Caption 1',
  },
  {
    icon: <MockIcon />,
    title: 'Second',
    subtitle: 'Subtitle two',
    caption: 'Caption 2',
  },
  {
    icon: <MockIcon />,
    title: 'Third',
  },
]

describe('Timeline', () => {
  it('renders items correctly', () => {
    render(<Timeline items={mockItems} />)

    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('show subtitle and caption if they exist', () => {
    expect.assertions(2)
    render(<Timeline items={mockItems} />)

    expect(screen.getByText('Subtitle one')).toBeInTheDocument()
    expect(screen.getByText('Caption 1')).toBeInTheDocument()
  })

  it('shows "-" if subtitle or caption not exist', () => {
    render(<Timeline items={mockItems} />)

    const placeholders = screen.getAllByText('-')
    expect(placeholders.length).toBeGreaterThanOrEqual(2)
  })

  it('render icons correctly', () => {
    render(<Timeline items={mockItems} />)

    const icons = screen.getAllByTestId('icon')
    expect(icons).toHaveLength(mockItems.length)
  })
})
