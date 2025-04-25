import styles from './index.module.css'

export interface StatusBadgeProps {
  type: 'pending' | 'denied' | 'approved' | 'reminded' | 'archived' | 'resolved'
  text?: string | null
  className?: string
}

export const StatusBadge = ({
  type,
  text = null,
  className,
}: StatusBadgeProps) => {
  return (
    <div
      className={`flex flex-row items-center pl-2 py-2 pr-3 rounded-full h-6 w-fit text-nowrap ${className} ${styles[type]}`}
    >
      <div
        className={`bg-red w-2 h-2 mr-2 rounded-full dot-${type} ${styles[`dot-${type}`]}`}
      ></div>
      <span className={`text-sm font-semibold ${styles[`text-${type}`]}`}>
        {text || type.toUpperCase()}
      </span>
    </div>
  )
}
