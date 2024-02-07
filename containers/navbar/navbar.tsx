import { useState, useMemo, useEffect } from 'react'
import './navbar.css'
import Mylogo from '@/Components/mylogo/mylogo'
import { menulist } from 'Consts/navbar'
import { type menulistType } from 'Consts/types/navbar.type'

interface NavbarProps {
  onClick?: (params: boolean) => void
  customClassName?: string
}

function Navbar ({ onClick = (params) => { }, customClassName }: NavbarProps): JSX.Element {
  const [pathname, setPathname] = useState<string | undefined>()
  const [isHeaderScroll, setHeaderScroll] = useState<boolean>(true)
  const className = useMemo(() => `z-[99] fixed top-[5%] right-[6%] md:right-[45%] navbar${customClassName ? ` ${customClassName}` : ''}`, [customClassName])
  useEffect(() => {
    typeof window !== 'undefined' && setPathname(window?.location.pathname.slice(1))
  }, [pathname])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', function (e) {
        // print "false" if direction is down and "true" if up
        setHeaderScroll(this?.scrollY < 1100)
      })
    }
  }, [])
  return (
    <div className={className}>
      <div className="all-menu">
        <div className="header">
          <Mylogo />
        </div>
        <div className='content'>
          {menulist.map((item: menulistType) => {
            const isCurrentNav = pathname !== undefined && (pathname === item.link.slice(1)) ? ' nav-active' : ''
            return (
              <a className={`nav-link${isCurrentNav}`} href={item.link}>{item.text}</a>
            )
          })}
        </div>
        <div onClick={() => { window?.scrollTo({ top: 0, behavior: 'smooth' }) }} className={`cursor-pointer bottom ${!isHeaderScroll ? 'active' : ''}`}>
          <img src='https://www.svgrepo.com/show/4166/up-arrow.svg' />
        </div>
      </div>
    </div>
  )
}

export default Navbar
