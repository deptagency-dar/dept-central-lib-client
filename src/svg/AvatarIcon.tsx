import classNames from 'classnames'
import { FC, SVGProps } from 'react'

interface DefaultAvatarIconProps extends SVGProps<SVGSVGElement> {
  size?: string
}

export const DefaultAvatarIcon: FC<DefaultAvatarIconProps> = ({
  size,
  className,
  ...otherProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      viewBox="0 0 24 24"
      style={{ width: size, height: size }}
      className={classNames('rounded-full', className)}
      {...otherProps}
    >
      <rect width="100%" height="100%" fill="#D0D5DD" />
      <path
        fill="white"
        stroke="white"
        strokeWidth="1"
        transform="scale(0.8) translate(3, 3)"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  )
}
