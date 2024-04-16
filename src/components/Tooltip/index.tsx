import { HTMLAttributes, forwardRef } from 'react'

interface TooltipOwnProps {
  children: JSX.Element
  textComponent: JSX.Element
}

type TooltipPropsRootAttributes = Pick<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'style' | 'id'
>

type TooltipProps = TooltipPropsRootAttributes & TooltipOwnProps

const triangleStyle =
  "before:content-[''] before:block before:w-0 before:h-0 before:border-x-8 before:border-x-transparent before:border-b-8 before:border-b-transparent before:border-t-8 before:border-t-gray-700 before:top-[100%] before:left-[45%] before:absolute"

const transitioStyle =
  'opacity-0 ease-out duration-300 transition-all group-hover:opacity-100'

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ className = '', children, textComponent, ...rest }, ref) => {
    return (
      <div className={`${className} relative group`} {...rest} ref={ref}>
        {children}
        {textComponent && (
          <>
            <div
              className={`${triangleStyle} ${transitioStyle} absolute rounded-lg left-1/2 bottom-8 min-w-40 transform -translate-x-1/2 border mt-2 border-gray-700 w-125 text-center rounded-tiny p-2 z-50 bg-gray-700`}
            >
              <div className="text-nowrap">{textComponent}</div>
            </div>
          </>
        )}
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'
