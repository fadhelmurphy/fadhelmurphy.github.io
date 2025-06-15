import React from 'react'
import '../src/assets/global.css'
import { prefix } from 'Consts/config'

interface Props {
  titlePage?: string
  Header?: React.ReactNode
  Footer?: React.ReactNode
  children: React.ReactNode
  content?: Record<string, string>
}
const Layout = ({
  titlePage = 'Home',
  Header,
  Footer,
  children
}: Props): JSX.Element => {
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href={`${prefix}favicon.png`} />
        <title>{`${titlePage} | Fadhel Ijlal Falah`}</title>
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" as="style" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.min.js"></script>
      </head>
      <body>
      {Header}
      {children}
      {Footer}
      <script defer>
        AOS.init();
      </script>
    <script src="/scripts/addCopyButton.js" defer></script>
      </body>
    </>
  )
}

export default Layout
