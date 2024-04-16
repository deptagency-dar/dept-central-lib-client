import { forwardRef, HTMLAttributes } from 'react'
import styles from './index.module.css'
type StatusBadgePropsRootAttributes = Pick<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'style' | 'id'
>

interface StatusBadgeOwnProps {
  type: 'pending' | 'denied' | 'approved'
  text: string
}

type StatusBadgeProps = StatusBadgePropsRootAttributes & StatusBadgeOwnProps

export const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className = '', type, text = null, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-row items-center pl-2 py-2 pr-3 rounded-full h-6 w-fit ${className} ${styles[type]}`}
        {...rest}
      >
        <div
          className={`bg-red w-2 h-2 mr-2 rounded-full dot-${type} ${styles[`dot-${type}`]}`}
        ></div>
        <span className={`text-sm font-semibold ${styles[`text-${type}`]}`}>
          {text || type.toUpperCase()}
        </span>
      </div>
    )
  },
)

StatusBadge.displayName = 'StatusBadge'
