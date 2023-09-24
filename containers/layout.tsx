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
  titlePage = 'Home | Fadhel Ijlal Falah',
  content = {},
  Header,
  Footer,
  children
}: Props): JSX.Element => {
  content.title = content?.title || titlePage
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href={`${prefix}favicon.png`} />
        <title>{content.title}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </head>
      <body>
      <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
      {Header}
      {children}
      {Footer}
      <script>
        AOS.init();
      </script>
      </body>
    </>
  )
}

export default Layout
