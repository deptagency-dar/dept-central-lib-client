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
  onLogout?: () => void
}

export const Avatar: React.FC<TProps> = ({
  user,
  status,
  type = 'normal',
  className = '',
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
    if (!user.image) return null

    return (
      <div className="flex flex-col items-center relative">
        <img
          className="rounded-full w-[63px]"
          referrerPolicy="no-referrer"
          src={user.image || undefined}
          alt="Avatar"
        />
        {renderStatus()}
      </div>
    )
  }

  function logoutLink() {
    if (!onLogout) return null
    return (
      <a href="#" className="hover:underline text-sm" onClick={handleLogout}>
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
        <div className="px-4 w-[80%]">
          <div className="font-bold text-xl text-grayscale-700 text-ellipsis overflow-hidden">
            {user.name}
          </div>
          <div className="text-sm text-grayscale-600 text-ellipsis overflow-hidden">
            {user.email}
          </div>
          {logoutLink()}
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {!!user.image && (
        <div className="flex flex-col items-center">{avatar()}</div>
      )}
      <div className="px-2 pt-4 w-full">
        <div className="font-bold text-xl text-grayscale-700 text-ellipsis overflow-hidden">
          {user.name}
        </div>
        <div className="text-sm text-grayscale-600 text-ellipsis overflow-hidden">
          {user.email}
        </div>
        {logoutLink()}
      </div>
    </div>
  )
}
