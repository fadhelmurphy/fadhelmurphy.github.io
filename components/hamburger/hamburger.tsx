import React, { useCallback, useMemo } from 'react'
import './hamburger.css'

interface HamburgerProps {
  isActive?: boolean | false
  customClassName?: string
  onClick?: (params: boolean) => void
}

function Hamburger ({ onClick = (params) => {}, isActive, customClassName }: HamburgerProps): JSX.Element {
  const activeHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const active = !isActive
      onClick(active)
    },
    [isActive, onClick]
  )
  const className = useMemo(() => `hamburger${isActive ? ' hamburger-active' : ''}${customClassName ? ` ${customClassName}` : ''}`, [isActive])
  return (
    <div className={className} onClick={activeHandler}>
    <div id="bar1" className="bar"></div>
    <div id="bar2" className="bar"></div>
    <div id="bar3" className="bar"></div>
    </div>
  )
}

export default Hamburger
