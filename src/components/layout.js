/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Container, Col, Row } from "reactstrap"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Menu from "./menu"
import Header from "./header"
import FooterTemplate from "./footer"

const Layout = ({ children, postInfo, location, project }) => {
  if (postInfo) {
    var { postTitle, postDate } = postInfo
  }
  var pathname = ""
  if (location) {
    pathname = location.pathname
  }
  if(postDate.length>0){
    postDate = postDate.join(", ")
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
      <Menu position="fixed-top" location={location} />
      {postTitle && postDate ? (
        <Header postInfo={{ postTitle, postDate }} />
      ) : (
        <Header siteTitle={data.site.siteMetadata.title} />
      )}
      <main className={!project?"container":null}>{children}</main>
      <FooterTemplate pathname={pathname} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
