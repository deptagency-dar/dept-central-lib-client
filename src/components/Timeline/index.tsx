import { ReactNode } from 'react'
import typography from '../../styles/typography.module.css'
import { classNames as cn } from '../../utils'

export interface TimelineItem {
  icon: ReactNode
  title: string
  subtitle?: string
  caption?: string
  cta?: { label: string; url: string }
}

export interface TimelineProps {
  items: TimelineItem[]
}

/**
 * A customizable timeline component that displays a list of items with optional icons, titles,
 * subtitles, captions, and call-to-action (CTA) elements.
 *
 * The component supports different size and variant styles, making it adaptable to various design
 * requirements.
 *
 * @param {TimelineItem[]} items - An array of items to be displayed in the timeline. Each item can
 * contain an icon, title, subtitle, date, and a CTA.
 *
 * @returns {JSX.Element} The timeline component.
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
              <div className="size-10 overflow-hidden rounded-full flex justify-center items-center">
                {IconComponent}
              </div>
              {!isLast && (
                <div
                  role="presentation"
                  className="w-px h-[100px] bg-grayscale-300 absolute top-1/2 -z-10"
                />
              )}
            </div>

            <div className="flex flex-col">
              <p
                className={cn(typography.baseBold, 'text-grayscale-900 mb-0.5')}
              >
                {item.title}
              </p>
              {item.cta ? (
                <a
                  href={item.cta.url}
                  className="cursor-pointer underline text-primary-600 underline-offset-[0.5rem] text-base font-medium hover:text-primary-700"
                >
                  {item.cta.label}
                </a>
              ) : (
                <>
                  <p className={cn(typography.smallBold, 'text-grayscale-700')}>
                    {item.subtitle || '-'}
                  </p>
                  <p className={cn(typography.small, 'text-grayscale-400')}>
                    {item.caption || '-'}
                  </p>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
