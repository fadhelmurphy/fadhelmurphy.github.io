import { useCallback, useState, useMemo, useEffect } from 'react'
import './navbar.css'
import Hamburger from '@/Components/hamburger/hamburger'
import { menulist } from 'Consts/navbar'
import { type menulistType } from 'Consts/types/navbar.type'

interface NavbarProps {
  onClick?: (params: boolean) => void
  customClassName?: string
}

function Navbar ({ onClick = (params) => { }, customClassName }: NavbarProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [pathname, setPathname] = useState<string>('')
  const activeHandler = useCallback(
    (active: boolean) => {
      setIsActive(active)
      onClick(active)
    },
    [isActive, onClick]
  )
  const className = useMemo(() => `z-[99] fixed top-[5%] right-[7%] navbar${isActive ? ' navbar-active' : ''}${customClassName ? ` ${customClassName}` : ''}`, [customClassName, isActive])
  useEffect(() => {
    typeof window !== 'undefined' && setPathname(window?.location.pathname)
  }, [pathname])
  return (
    <div className={className}>
      <div className="all-menu">
        <div className="header">
          <Hamburger isActive={isActive} onClick={activeHandler} customClassName="relative" />
        </div>
        <div className='content'>
          {menulist.map((item: menulistType) => {
            const isCurrentNav = pathname !== '' && (pathname === '/' || pathname.includes(item.text.toLowerCase())) ? ' nav-active' : ''
            return (
              <a className={`nav-link${isCurrentNav}`} href={item.link}>{item.text}</a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Navbar
