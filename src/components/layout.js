/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"

//import "./layout.css"
import './core-ui/css/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./core-ui/css/clean-blog.min.css"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

const Layout = ({ children,postTitle,postDate }) => {
  // console.log(postTitle)
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
    {postTitle && postDate ? (
      <Header siteTitle={postTitle} postDate={postDate} />
    ) : (
      <Header siteTitle={data.site.siteMetadata.title} />
    )}
        <main>{children}</main>
        <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
