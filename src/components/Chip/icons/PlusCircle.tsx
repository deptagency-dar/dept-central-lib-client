import { theme } from '../../../constants'

const PlusCircle = ({ size }: { size: number }) => {
  return (
    <svg
      data-testid="plus-circle-icon"
      role="presentation"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M7.5 5.5V7.25M7.5 7.25V9M7.5 7.25H9.25M7.5 7.25H5.75M12.75 7.25C12.75 10.1495 10.3995 12.5 7.5 12.5C4.6005 12.5 2.25 10.1495 2.25 7.25C2.25 4.3505 4.6005 2 7.5 2C10.3995 2 12.75 4.3505 12.75 7.25Z"
        stroke={theme.colors.primary[600]}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PlusCircle
