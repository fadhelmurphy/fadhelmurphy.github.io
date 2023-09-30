import React from 'react'
interface IMenuList {
  text: string
  link: string
}

interface INavbarProps {
  menuList: IMenuList[]
}

const defaultMenuList = [
  {
    text: 'UWAUW',
    link: 'https://fadhelmurphy.github.io'
  }
]

function Navbar ({ menuList = defaultMenuList }: INavbarProps): JSX.Element {
  return (
    <>
    {/* {menuList.map((item: IMenuList) => ())} */}
    </>
  )
}

export default Navbar
