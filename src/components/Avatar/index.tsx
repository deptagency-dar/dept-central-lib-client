import React from 'react'

interface User {
  name: string | null
  email?: string | null
  image?: string | null
}

type TAvatar = 'normal' | 'compact' | 'image'
type TProps = {
  user: Partial<User>
  status?: 'online' | 'company' | 'verified'
  type?: TAvatar
  className?: string
  imageWidth?: string
  onLogout?: () => void
}

export const Avatar: React.FC<TProps> = ({
  user,
  status,
  type = 'normal',
  className = '',
  imageWidth = '63px',
  onLogout,
}) => {
  function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    onLogout?.()
  }

  function renderStatus() {
    if (status === 'company')
      return (
        <div className="block w-5 h-5 rounded-full absolute bottom-0 right-0">
          <img src="images/company-status.png" alt="" />
        </div>
      )

    if (status === 'online')
      return (
        <div className="block w-5 h-5 border-2 border-white bg-success-500 rounded-full absolute bottom-0 right-0" />
      )

    if (status === 'verified')
      return (
        <div className="block w-5 h-5 absolute bottom-0 right-0">
          <img src="images/verified.png" alt="" />
        </div>
      )
  }

  function avatar() {
    const noImageIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"> 
                            <rect width="100%" height="100%" fill="#D0D5DD" /> 
                            <path fill="white" stroke="white" stroke-width="1" transform="scale(0.8) translate(3, 3)" stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /> 
                          </svg>`;

    return (
      <div className="flex flex-col items-center relative">
        <img
          className="rounded-full"
          style={{ width: imageWidth }}
          referrerPolicy="no-referrer"
          src={user.image || `data:image/svg+xml;base64,${btoa(noImageIcon)}`}
          alt="Avatar"
          data-testid={user.image ? undefined : 'default-avatar-icon'}
        />
        {renderStatus()}
      </div>
    )
  }

  function logoutLink() {
    if (!onLogout) return null
    return (
      <a
        href="#"
        className="hover:underline text-sm text-grayscale-600"
        onClick={handleLogout}
      >
        Log out
      </a>
    )
  }

  if (type === 'image') {
    return avatar()
  }

  if (type === 'compact') {
    return (
      <div className={`${className} flex items-center`}>
        {avatar()}
        <div className="px-4">
          <div className="font-bold text-base text-grayscale-700 text-ellipsis overflow-hidden">
            {user.name}
          </div>
          {logoutLink()}
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="flex flex-col items-center">{avatar()}</div>
      <div className="px-2 pt-4 w-full">
        <div className="font-bold text-lg text-grayscale-700 text-ellipsis overflow-hidden">
          {user.name}
        </div>
        {logoutLink()}
      </div>
    </div>
  )
}
