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

const Layout = ({ children, postInfo, location }) => {
  if (postInfo) {
    var { postTitle, postDate } = postInfo
  }
  var pathname = ""
  if (location) {
    pathname = location.pathname
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
      <main className="container">{children}</main>
      <Container>
        {pathname !== "/" ? (
          <footer>
            <Row>
              <Col xs="12" md="6" className="text-center text-md-left">
                © {new Date().getFullYear()} Built with{" "}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
              </Col>
              <Col xs="12" md="6" className="text-center text-md-right">
                Designed and developed by me
              </Col>
            </Row>
          </footer>
        ) : null}
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
