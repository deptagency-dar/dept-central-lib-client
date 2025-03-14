import { theme } from '../../../constants'

const XCircle = ({ size }: { size: number }) => {
  return (
    <svg
      data-testid="x-circle-icon"
      role="presentation"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M5.75 9L7.5 7.25M7.5 7.25L9.25 5.5M7.5 7.25L5.75 5.5M7.5 7.25L9.25 9M12.75 7.25C12.75 10.1495 10.3995 12.5 7.5 12.5C4.6005 12.5 2.25 10.1495 2.25 7.25C2.25 4.3505 4.6005 2 7.5 2C10.3995 2 12.75 4.3505 12.75 7.25Z"
        stroke={theme.colors.grayscale[700]}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default XCircle
