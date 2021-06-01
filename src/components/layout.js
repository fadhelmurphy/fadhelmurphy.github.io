/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
import {Container} from 'reactstrap'
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Menu from "./menu"
import Header from "./header"

const Layout = ({ children, postInfo,location}) => {
  console.log(location)
  if (postInfo) {
    var { postTitle, postDate } = postInfo
  }
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
    <Menu position="fixed-top" location={location}/>
      {postTitle && postDate ? (
        <Header postInfo={{ postTitle, postDate }} />
      ) : (
        <Header siteTitle={data.site.siteMetadata.title} />
      )}
      <main className="container">{children}</main>
      <Container>
      <footer className="d-block w-100">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
