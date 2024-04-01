import { forwardRef, HTMLAttributes } from 'react'
import styles from './index.module.css'
type StatusBadgePropsRootAttributes = Pick<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'style' | 'id'
>

interface StatusBadgeOwnProps {
  type: 'DENIED' | 'APPROVED' | 'PENDING'
}

type StatusBadgeProps = StatusBadgePropsRootAttributes & StatusBadgeOwnProps

const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className = '', type, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-row items-center pl-2 py-2 pr-3 rounded-full h-6 ${className} ${styles[type.toLowerCase()]}`}
        {...rest}
      >
        <div
          className={`bg-red w-2 h-2 mr-2 rounded-full dot-${type} ${styles[`dot-${type.toLowerCase()}`]}`}
        ></div>
        <span className={`text-sm ${styles[`text-${type.toLowerCase()}`]}`}>
          {type}
        </span>
      </div>
    )
  },
)

StatusBadge.displayName = 'StatusBadge'
