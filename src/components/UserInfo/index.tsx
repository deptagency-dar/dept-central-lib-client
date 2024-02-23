import React from 'react'

interface User {
  name: string | null
  email?: string | null
  image?: string | null
}

type TUserInfo = 'normal' | 'compact' | 'image'

type TProps = {
  user: Partial<User>
  type?: TUserInfo
  className?: string
  onLogout?: () => void
}

export const UserInfo: React.FC<TProps> = ({
  user,
  type = 'normal',
  className = '',
  onLogout,
}) => {

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    onLogout?.()
  }

  function avatar() {
    if (!user.image) return null
    return (
      <div className="flex flex-col items-center">
        <img
          className="rounded-full w-[60px]"
          referrerPolicy="no-referrer"
          src={user.image || undefined}
          alt="Avatar"
        />
      </div>
    )
  }

  function logoutLink() {
    if (!onLogout) return null
    return (
      <a href="#" className="hover:underline text-ml" onClick={handleLogout} >
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
        <div className="px-3 w-[80%]">
          <div className="font-bold text-xl text-ellipsis overflow-hidden">
            {user.name}
          </div>
          {logoutLink()}
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {
        !!user.image && (
          <div className="flex flex-col items-center">
            {avatar()}
          </div>
        )
      }
      <div className="px-2 pt-4 w-full">
        <div className="font-bold text-xl text-ellipsis overflow-hidden">
          {user.name}
        </div>
        <div className="text-sm text-gray-400 text-ellipsis overflow-hidden">
          {user.email}
        </div>
        {logoutLink()}
      </div>
    </div>
  )
}
