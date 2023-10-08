import { useCallback, useState, useMemo } from 'react'
import './navbar.css'
import Hamburger from '@/Components/hamburger/hamburger'

interface NavbarProps {
  onClick?: (params: boolean) => void
  customClassName?: string
}

function Navbar ({ onClick = (params) => { }, customClassName }: NavbarProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false)
  const activeHandler = useCallback(
    (active: boolean) => {
      setIsActive(active)
      onClick(active)
    },
    [isActive, onClick]
  )
  const className = useMemo(() => `z-[99] fixed top-[5%] right-[7%] navbar${isActive ? ' navbar-active' : ''}${customClassName ? ` ${customClassName}` : ''}`, [customClassName, isActive])
  return (
    <div className={className}>
      <div className="all-menu">
        <div className="header">
          <Hamburger isActive={isActive} onClick={activeHandler} customClassName="relative" />
        </div>
        <div className='content'>
          <a className='nav-link' href='/'>Home</a>
          <a className='nav-link' href='/blog'>Blog</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
