import React from 'react'
import { render, screen } from '@testing-library/react'
import { Timeline, TimelineItem } from '.'

const MockIcon = () => <span data-testid="icon">🔥</span>

const mockItems: TimelineItem[] = [
  {
    icon: MockIcon,
    title: 'First',
    subtitle: 'Subtitle one',
    caption: 'Caption 1',
  },
  {
    icon: MockIcon,
    title: 'Second',
    subtitle: 'Subtitle two',
    caption: 'Caption 2',
  },
  {
    icon: MockIcon,
    title: 'Third',
  },
  {
    icon: MockIcon,
    title: 'Fourth',
    cta: {
      label: 'View more',
      url: 'https://example.com',
    },
  },
]

describe('Timeline', () => {
  it('renders items correctly', () => {
    render(<Timeline items={mockItems} />)

    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('shows subtitle and caption if they exist, or CTA when provided', () => {
    render(<Timeline items={mockItems} />)

    expect(screen.getByText('Subtitle one')).toBeInTheDocument()
    expect(screen.getByText('Caption 1')).toBeInTheDocument()

    const ctaLink = screen.getByRole('link', { name: 'View more' })
    expect(ctaLink).toBeInTheDocument()
    expect(ctaLink).toHaveAttribute('href', 'https://example.com')
  })

  it('shows "-" if subtitle or caption not exist and no CTA is provided', () => {
    render(<Timeline items={mockItems} />)

    const placeholders = screen.getAllByText('-')
    expect(placeholders.length).toBeGreaterThanOrEqual(2)
  })

  it('render icons correctly', () => {
    render(<Timeline items={mockItems} />)

    const icons = screen.getAllByTestId('icon')
    expect(icons).toHaveLength(mockItems.length)
  })

  it('applies expected Tailwind classes for layout, icon size, and line height', () => {
    const { container } = render(<Timeline items={mockItems} />)

    const wrapper = container.querySelector('div')
    expect(wrapper?.className).toMatch(/gap-10/)

    const iconContainer = screen.getAllByTestId('icon')[0].parentElement
    expect(iconContainer?.className).toMatch(/size-10/)

    const line = screen.getAllByRole('presentation')[0]
    expect(line).toHaveClass('h-[100px]')
  })
})
