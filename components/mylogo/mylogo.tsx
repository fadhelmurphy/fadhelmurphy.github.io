import logo from '@/Assets/img/menu/logo.png'
import { useState, useEffect } from 'react'

function MyLogo (): JSX.Element {
  const [isHeaderScroll, setHeaderScroll] = useState<boolean>(true)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', function (e) {
        // print "false" if direction is down and "true" if up
        setHeaderScroll(this?.scrollY < 1100)
      })
    }
  }, [])
  return (
    <a href="/" className={`mylogo ${!isHeaderScroll ? 'logo-hide' : ''}`}>
        <img src={logo.src} />
        <p>Fadhel</p>
    </a>
  )
}

export default MyLogo
