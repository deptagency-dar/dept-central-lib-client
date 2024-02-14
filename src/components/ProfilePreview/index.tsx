import React from 'react'

interface User {
  name: string | null
  email?: string | null
  image?: string | null
}

type TProfilePreview = 'normal' | 'compact' | 'image'

type TProps = {
  user: Partial<User>
  type?: TProfilePreview
  className?: string
  onLogout?: () => void
}

export const ProfilePreview: React.FC<TProps> = ({
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
    return (
      <img
        width={70}
        height={70}
        className="rounded-full"
        referrerPolicy="no-referrer"
        src={user.image || undefined}
        alt="Avatar"
      />
    )
  }

  if (type === 'image') {
    return avatar()
  }

  return (
    <div className={`${className} ${type === 'compact' ? 'flex' : ''}`}>
      {
        !!user.image && (
          <div className="flex flex-col items-center">
            {avatar()}
          </div>
        )
      }
      <div className={`px-5 ${type === 'compact' ? 'pt-2' : 'pt-4'}`}>
        <div className="font-bold text-xl">
          {user.name}
        </div>
        <div className="text-sm text-gray-400">
          {user.email}
        </div>
        {
          type === 'normal' && !!onLogout && (
            <div className="mt-3">
              <a
                href="#"
                className="hover:underline text-ml"
                onClick={handleLogout}
              >
                Log out
              </a>
            </div>
          )
        }
      </div>
    </div>
  )
}
