import typography from '../../styles/typography.module.css'
import { classNames as cn, getColor } from '../../utils'
import { ColorPalette, ColorShade } from '../../types'
import { ElementType } from 'react'
import { Button } from '../Button'

export interface TimelineItem {
  icon: ElementType
  title: string
  iconColorScheme?: keyof ColorPalette
  iconColorShade?: keyof ColorShade
  subtitle?: string
  caption?: string
  cta?: { label: string; onClick: () => void }
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
    <div className="flex flex-col gap-10">
      {items.map((item, index) => {
        const {
          icon: Icon,
          iconColorScheme = 'grayscale',
          iconColorShade = 300,
          title,
          subtitle,
          caption,
          cta,
        } = item

        const iconColor = getColor(iconColorScheme, iconColorShade)

        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center gap-4">
            <div className="relative flex flex-col items-center">
              <div className="size-10 overflow-hidden rounded-full flex justify-center items-center">
                {
                  <Icon
                    className="text-white p-2"
                    style={{ backgroundColor: iconColor }}
                  />
                }
              </div>
              {!isLast && (
                <div
                  role="presentation"
                  className="w-px h-[80px] bg-grayscale-300 absolute top-full"
                />
              )}
            </div>

            <div className="flex flex-col">
              <p
                className={cn(typography.baseBold, 'text-grayscale-900 mb-0.5')}
              >
                {title}
              </p>
              {cta ? (
                <Button
                  onClick={cta.onClick}
                  variant="link"
                  className='!p-0 !text-base'
                >
                  {cta.label}
                </Button>
              ) : (
                <>
                  <p className={cn(typography.smallBold, 'text-grayscale-700')}>
                    {subtitle || '-'}
                  </p>
                  <p className={cn(typography.small, 'text-grayscale-400')}>
                    {caption || '-'}
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
