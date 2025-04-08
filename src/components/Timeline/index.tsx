import { ReactNode } from 'react'
import typography from '../../styles/typography.module.css'
import { classNames } from '../../utils'

export interface TimelineItem {
  icon: ReactNode
  title: string
  subtitle?: string
  caption?: string
  cta?: string
  className?: string
}

export interface TimelineProps {
  items: TimelineItem[]
}

/**
 * Renders a customizable timeline component that displays a list of items with optional icons, titles,
 * subtitles, dates, and call-to-action (CTA) elements. The component supports different size and variant
 * styles, making it adaptable to various design requirements.
 *
 * @param items - An array of items to be displayed in the timeline. Each item can contain an icon, title,
 *                subtitle, date, and a CTA.
 */

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative flex flex-col gap-10">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const IconComponent = item.icon

        return (
          <div key={index} className="flex items-center gap-4">
            <div className="relative flex flex-col items-center">
              <div className="size-10 overflow-hidden rounded-full">
                {IconComponent}
              </div>
              {!isLast && (
                <div className="w-px h-20 bg-grayscale-300 absolute top-8 -z-10" />
              )}
            </div>

            <div className="flex flex-col">
              <p
                className={classNames(
                  typography.baseBold,
                  'text-grayscale-900 mb-0.5',
                )}
              >
                {item.title}
              </p>
              <p
                className={classNames(
                  typography.smallBold,
                  'text-grayscale-700',
                )}
              >
                {item.subtitle || '-'}
              </p>
              <p className={classNames(typography.small, 'text-grayscale-400')}>
                {item.caption || '-'}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
