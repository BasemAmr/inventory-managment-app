import React from 'react'

type HeaderProps = {
    name: string
}

const Header = (
    { name }: HeaderProps
) => {
  return (
    <div className="font-bold text-3xl text-gray-800 mb-6">
      {name}
    </div>
  )
}

export default Header